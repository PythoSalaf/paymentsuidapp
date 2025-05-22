/*
/// Module: protectedpay
module protectedpay::protectedpay;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions


module protectedpay::secure_payment {
    //use sui::object::{Self, UID, ID};
    use sui::coin::{Self, Coin};
    //use sui::transfer;
    //use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::balance::Balance;
    use sui::event;
    use sui::dynamic_field as df;
    use sui::table::{Self, Table};
    use std::string::{Self, String};
    //use std::vector;
    //use std::option::{Self, Option};

    // ============== Error Constants ==============
    const ERROR_UNAUTHORIZED: u64 = 1;
    const ERROR_ALREADY_CLAIMED: u64 = 2;
    const ERROR_EXPIRED: u64 = 3;
    const ERROR_INVALID_STATE: u64 = 4;
    const ERROR_NOT_RECIPIENT: u64 = 5;
    const ERROR_USERNAME_NOT_FOUND: u64 = 6;
    const ERROR_USERNAME_TAKEN: u64 = 7;
    //const ERROR_INSUFFICIENT_FUNDS: u64 = 8;
    const ERROR_INVALID_AMOUNT: u64 = 9;

    // ============== Status Constants ==============
    const STATUS_PENDING: u8 = 0;
    const STATUS_CLAIMED: u8 = 1;
    const STATUS_CANCELLED: u8 = 2;
    const STATUS_EXPIRED: u8 = 3;

    // ============== Events ==============
    public struct TransferCreated has copy, drop {
        transfer_id: ID,
        sender: address,
        recipient: address,
        amount: u64,
        expiry: u64,
        memo: String,
    }

    public struct TransferClaimed has copy, drop {
        transfer_id: ID,
        claimer: address,
        amount: u64,
    }

    public struct TransferCancelled has copy, drop {
        transfer_id: ID,
        sender: address,
        amount: u64,
    }

    public struct UsernameRegistered has copy, drop {
        username: String,
        owner: address,
    }

    // ============== Structs ==============
    
    // Admin capability for system management
    public struct AdminCap has key, store {
        id: UID,
    }

    // Username registry for user-friendly transfers
   public  struct UsernameRegistry has key {
        id: UID,
        usernames: Table<String, address>,
        addresses: Table<address, String>,
        admin: address,
    }

    // Main protected transfer object
    public struct ProtectedTransfer<phantom T> has key, store {
        id: UID,
        sender: address,
        recipient: address,
        amount: u64,
        expiry_timestamp: u64,
        status: u8,
        memo: String,
        created_at: u64,
        // Balance is stored as dynamic field for flexibility
    }

    // Transfer receipt for tracking
    public struct TransferReceipt has key, store {
        id: UID,
        transfer_id: ID,
        sender: address,
        recipient: address,
        amount: u64,
        status: u8,
    }

    // Global statistics object
   public  struct GlobalStats has key {
        id: UID,
        total_transfers: u64,
        total_volume: u64,
        active_transfers: u64,
    }

    // ============== Initialization ==============
    fun init(ctx: &mut TxContext) {
        let admin = tx_context::sender(ctx);
        
        // Create admin capability
        transfer::transfer(
            AdminCap { id: object::new(ctx) },
            admin
        );

        // Create username registry
        let registry = UsernameRegistry {
            id: object::new(ctx),
            usernames: table::new(ctx),
            addresses: table::new(ctx),
            admin,
        };
        transfer::share_object(registry);

        // Create global stats
        let stats = GlobalStats {
            id: object::new(ctx),
            total_transfers: 0,
            total_volume: 0,
            active_transfers: 0,
        };
        transfer::share_object(stats);
    }

    // ============== Username Management ==============
    
    /// Register a username for easier transfers
    public entry fun register_username(
        registry: &mut UsernameRegistry,
        username: String,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Validate username length (3-20 characters)
        let username_bytes = string::as_bytes(&username);
        assert!(vector::length(username_bytes) >= 3 && vector::length(username_bytes) <= 20, ERROR_INVALID_STATE);
        
        // Ensure username is not taken
        assert!(!table::contains(&registry.usernames, username), ERROR_USERNAME_TAKEN);
        
        // If user already has a username, remove old mapping
        if (table::contains(&registry.addresses, sender)) {
            let old_username = table::remove(&mut registry.addresses, sender);
            table::remove(&mut registry.usernames, old_username);
        };
        
        // Register new username
        table::add(&mut registry.usernames, username, sender);
        table::add(&mut registry.addresses, sender, username);
        
        // Emit event
        event::emit(UsernameRegistered { 
            username,
            owner: sender
        });
    }

    /// Resolve username to address
    public fun resolve_username(registry: &UsernameRegistry, username: String): address {
        assert!(table::contains(&registry.usernames, username), ERROR_USERNAME_NOT_FOUND);
        *table::borrow(&registry.usernames, username)
    }

    /// Get username by address
    public fun get_username(registry: &UsernameRegistry, addr: address): Option<String> {
        if (table::contains(&registry.addresses, addr)) {
            option::some(*table::borrow(&registry.addresses, addr))
        } else {
            option::none()
        }
    }

    // ============== Protected Transfer Functions ==============
    
    /// Create a protected transfer to an address
    public entry fun create_transfer<T>(
        coin: Coin<T>,
        recipient: address,
        expiry_hours: u64,
        memo: String,
        clock: &Clock,
        stats: &mut GlobalStats,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let amount = coin::value(&coin);
        
        // Validate amount
        assert!(amount > 0, ERROR_INVALID_AMOUNT);
        
        // Calculate expiry timestamp
        let current_time = clock::timestamp_ms(clock);
        let expiry_timestamp = current_time + (expiry_hours * 3600000); // Convert hours to milliseconds
        
        // Create transfer object
        let  mut transfer_obj = ProtectedTransfer<T> {
            id: object::new(ctx),
            sender,
            recipient,
            amount,
            expiry_timestamp,
            status: STATUS_PENDING,
            memo,
            created_at: current_time,
        };
        
        let transfer_id = object::id(&transfer_obj);
        
        // Store the coin balance as dynamic field
        let balance = coin::into_balance(coin);
        df::add(&mut transfer_obj.id, b"balance", balance);
        
        // Create transfer receipt for sender
        let receipt = TransferReceipt {
            id: object::new(ctx),
            transfer_id,
            sender,
            recipient,
            amount,
            status: STATUS_PENDING,
        };
        
        // Update global stats
        stats.total_transfers = stats.total_transfers + 1;
        stats.total_volume = stats.total_volume + amount;
        stats.active_transfers = stats.active_transfers + 1;
        
        // Transfer receipt to sender and share transfer object
        transfer::transfer(receipt, sender);
        transfer::share_object(transfer_obj);
        
        // Emit event
        event::emit(TransferCreated {
            transfer_id,
            sender,
            recipient,
            amount,
            expiry: expiry_timestamp,
            memo,
        });
    }

    /// Create a protected transfer using username
    public entry fun create_transfer_by_username<T>(
        coin: Coin<T>,
        username: String,
        registry: &UsernameRegistry,
        expiry_hours: u64,
        memo: String,
        clock: &Clock,
        stats: &mut GlobalStats,
        ctx: &mut TxContext
    ) {
        let recipient = resolve_username(registry, username);
        create_transfer(coin, recipient, expiry_hours, memo, clock, stats, ctx);
    }

    /// Claim a protected transfer
    public entry fun claim_transfer<T>(
        transfer: &mut ProtectedTransfer<T>,
        clock: &Clock,
        stats: &mut GlobalStats,
        ctx: &mut TxContext
    ) {
        let claimer = tx_context::sender(ctx);
        
        // Verify claimer is the recipient
        assert!(claimer == transfer.recipient, ERROR_NOT_RECIPIENT);
        
        // Check transfer status
        assert!(transfer.status == STATUS_PENDING, ERROR_ALREADY_CLAIMED);
        
        // Check if not expired
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time <= transfer.expiry_timestamp, ERROR_EXPIRED);
        
        // Update transfer status
        transfer.status = STATUS_CLAIMED;
        
        // Extract balance and create coin
        let balance = df::remove<vector<u8>, Balance<T>>(&mut transfer.id, b"balance");
        let coin = coin::from_balance(balance, ctx);
        
        // Transfer coin to claimer
        transfer::public_transfer(coin, claimer);
        
        // Update stats
        stats.active_transfers = stats.active_transfers - 1;
        
        // Emit event
        event::emit(TransferClaimed {
            transfer_id: object::id(transfer),
            claimer,
            amount: transfer.amount,
        });
    }

    /// Cancel a transfer (sender only)
    public entry fun cancel_transfer<T>(
        transfer: &mut ProtectedTransfer<T>,
        stats: &mut GlobalStats,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Verify sender owns this transfer
        assert!(sender == transfer.sender, ERROR_UNAUTHORIZED);
        
        // Check transfer status
        assert!(transfer.status == STATUS_PENDING, ERROR_INVALID_STATE);
        
        // Update status
        transfer.status = STATUS_CANCELLED;
        
        // Extract balance and return to sender
        let balance = df::remove<vector<u8>, Balance<T>>(&mut transfer.id, b"balance");
        let coin = coin::from_balance(balance, ctx);
        transfer::public_transfer(coin, sender);
        
        // Update stats
        stats.active_transfers = stats.active_transfers - 1;
        
        // Emit event
        event::emit(TransferCancelled {
            transfer_id: object::id(transfer),
            sender,
            amount: transfer.amount,
        });
    }

    /// Process expired transfers (anyone can call to clean up)
    public entry fun process_expired_transfer<T>(
        transfer: &mut ProtectedTransfer<T>,
        clock: &Clock,
        stats: &mut GlobalStats,
        ctx: &mut TxContext
    ) {
        // Check if transfer is pending and expired
        assert!(transfer.status == STATUS_PENDING, ERROR_INVALID_STATE);
        
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time > transfer.expiry_timestamp, ERROR_INVALID_STATE);
        
        // Update status
        transfer.status = STATUS_EXPIRED;
        
        // Return funds to sender
        let balance = df::remove<vector<u8>, Balance<T>>(&mut transfer.id, b"balance");
        let coin = coin::from_balance(balance, ctx);
        transfer::public_transfer(coin, transfer.sender);
        
        // Update stats
        stats.active_transfers = stats.active_transfers - 1;
        
        // Emit cancellation event (similar outcome)
        event::emit(TransferCancelled {
            transfer_id: object::id(transfer),
            sender: transfer.sender,
            amount: transfer.amount,
        });
    }

    // ============== View Functions ==============
    
    /// Get transfer details
    public fun get_transfer_info<T>(transfer: &ProtectedTransfer<T>): (address, address, u64, u64, u8, String, u64) {
        (
            transfer.sender,
            transfer.recipient,
            transfer.amount,
            transfer.expiry_timestamp,
            transfer.status,
            transfer.memo,
            transfer.created_at
        )
    }

    /// Get global statistics
    public fun get_global_stats(stats: &GlobalStats): (u64, u64, u64) {
        (stats.total_transfers, stats.total_volume, stats.active_transfers)
    }

    /// Check if transfer is claimable
    public fun is_claimable<T>(transfer: &ProtectedTransfer<T>, clock: &Clock): bool {
        let current_time = clock::timestamp_ms(clock);
        transfer.status == STATUS_PENDING && current_time <= transfer.expiry_timestamp
    }

    /// Check if transfer is expired
    public fun is_expired<T>(transfer: &ProtectedTransfer<T>, clock: &Clock): bool {
        let current_time = clock::timestamp_ms(clock);
        transfer.status == STATUS_PENDING && current_time > transfer.expiry_timestamp
    }

    // ============== Admin Functions ==============
    
    /// Admin function to update registry admin (admin only)
    public entry fun update_registry_admin(
        _: &AdminCap,
        registry: &mut UsernameRegistry,
        new_admin: address,
    ) {
        registry.admin = new_admin;
    }

    /// Admin function to remove inappropriate username (admin only)
    public entry fun remove_username(
        _: &AdminCap,
        registry: &mut UsernameRegistry,
        username: String,
    ) {
        if (table::contains(&registry.usernames, username)) {
            let addr = table::remove(&mut registry.usernames, username);
            table::remove(&mut registry.addresses, addr);
        };
    }

    // ============== Helper Functions ==============
    
    /// Helper to convert hours to milliseconds
    public fun hours_to_ms(hours: u64): u64 {
        hours * 3600000
    }

    /// Helper to check status constants
    public fun status_pending(): u8 { STATUS_PENDING }
    public fun status_claimed(): u8 { STATUS_CLAIMED }
    public fun status_cancelled(): u8 { STATUS_CANCELLED }
    public fun status_expired(): u8 { STATUS_EXPIRED }

    #[test_only]
    /// Test helper to create a test scenario
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}

