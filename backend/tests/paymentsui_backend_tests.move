#[test_only]
module protectedpay::secure_payment_tests {
    use sui::test_scenario::{Self as ts, Scenario};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::clock::{Self, Clock};
    use sui::test_utils;
    use std::string;
    
    use protectedpay::secure_payment::{Self, ProtectedTransfer, UsernameRegistry, GlobalStats, AdminCap};
    
    const SENDER: address = @0xA;
    const RECIPIENT: address = @0xB;
    const ADMIN: address = @0xC;
    
    #[test]
    fun test_init_contract() {
        let mut scenario = ts::begin(ADMIN);
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        ts::next_tx(&mut scenario, ADMIN);
        {
            // Check that admin cap was created
            let admin_cap = ts::take_from_sender<AdminCap>(&scenario);
            ts::return_to_sender(&scenario, admin_cap);
            
            // Check that registry and stats were created
            let registry = ts::take_shared<UsernameRegistry>(&scenario);
            let stats = ts::take_shared<GlobalStats>(&scenario);
            
            ts::return_shared(registry);
            ts::return_shared(stats);
        };
        
        ts::end(scenario);
    }
    
    #[test]
    fun test_username_registration() {
        let mut scenario = ts::begin(ADMIN);
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        ts::next_tx(&mut scenario, SENDER);
        {
            let mut registry = ts::take_shared<UsernameRegistry>(&scenario);
            
            // Register username
            secure_payment::register_username(
                &mut registry,
                string::utf8(b"alice"),
                ts::ctx(&mut scenario)
            );
            
            // Verify registration
            let resolved_addr = secure_payment::resolve_username(&registry, string::utf8(b"alice"));
            assert!(resolved_addr == SENDER, 0);
            
            ts::return_shared(registry);
        };
        
        ts::end(scenario);
    }
    
    #[test]
    fun test_create_and_claim_transfer() {
        let mut scenario = ts::begin(ADMIN);
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        // Create transfer
        ts::next_tx(&mut scenario, SENDER);
        {
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            // Create test coin
            let coin = coin::mint_for_testing<SUI>(1000000000, ts::ctx(&mut scenario)); // 1 SUI
            
            // Create protected transfer
            secure_payment::create_transfer(
                coin,
                RECIPIENT,
                24, // 24 hours
                string::utf8(b"Test payment"),
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            clock::destroy_for_testing(clock);
            ts::return_shared(stats);
        };
        
        // Claim transfer
        ts::next_tx(&mut scenario, RECIPIENT);
        {
            let mut transfer = ts::take_shared<ProtectedTransfer<SUI>>(&scenario);
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            // Claim the transfer
            secure_payment::claim_transfer(
                &mut transfer,
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            // Verify recipient received the coin
            assert!(ts::has_most_recent_for_address<Coin<SUI>>(RECIPIENT), 1);
            
            clock::destroy_for_testing(clock);
            ts::return_shared(transfer);
            ts::return_shared(stats);
        };
        
        ts::end(scenario);
    }
    
    #[test]
    fun test_transfer_cancellation() {
        let mut scenario = ts::begin(ADMIN);
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        // Create transfer
        ts::next_tx(&mut scenario, SENDER);
        {
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            let coin = coin::mint_for_testing<SUI>(500000000, ts::ctx(&mut scenario)); // 0.5 SUI
            
            secure_payment::create_transfer(
                coin,
                RECIPIENT,
                48,
                string::utf8(b"Cancellable payment"),
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            clock::destroy_for_testing(clock);
            ts::return_shared(stats);
        };
        
        // Cancel transfer
        ts::next_tx(&mut scenario, SENDER);
        {
            let mut transfer = ts::take_shared<ProtectedTransfer<SUI>>(&scenario);
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            
            secure_payment::cancel_transfer(
                &mut transfer,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            // Verify sender received refund
            assert!(ts::has_most_recent_for_address<Coin<SUI>>(SENDER), 2);
            
            ts::return_shared(transfer);
            ts::return_shared(stats);
        };
        
        ts::end(scenario);
    }
    
    #[test]
    fun test_username_transfer() {
        let mut scenario = ts::begin(ADMIN);
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        // Register username for recipient
        ts::next_tx(&mut scenario, RECIPIENT);
        {
            let mut registry = ts::take_shared<UsernameRegistry>(&scenario);
            
            secure_payment::register_username(
                &mut registry,
                string::utf8(b"bob"),
                ts::ctx(&mut scenario)
            );
            
            ts::return_shared(registry);
        };
        
        // Create transfer using username
        ts::next_tx(&mut scenario, SENDER);
        {
            let registry = ts::take_shared<UsernameRegistry>(&scenario);
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            let coin = coin::mint_for_testing<SUI>(250000000, ts::ctx(&mut scenario)); // 0.25 SUI
            
            secure_payment::create_transfer_by_username(
                coin,
                string::utf8(b"bob"),
                &registry,
                12,
                string::utf8(b"Payment to bob"),
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            clock::destroy_for_testing(clock);
            ts::return_shared(registry);
            ts::return_shared(stats);
        };
        
        ts::end(scenario);
    }
    
    #[test]
    #[expected_failure(abort_code = protectedpay::secure_payment::ERROR_NOT_RECIPIENT)]
    fun test_unauthorized_claim() {
        let mut scenario = ts::begin(ADMIN);
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        // Create transfer
        ts::next_tx(&mut scenario, SENDER);
        {
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            let coin = coin::mint_for_testing<SUI>(100000000, ts::ctx(&mut scenario));
            
            secure_payment::create_transfer(
                coin,
                RECIPIENT,
                24,
                string::utf8(b"Test"),
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            clock::destroy_for_testing(clock);
            ts::return_shared(stats);
        };
        
        // Try to claim with wrong address (should fail)
        ts::next_tx(&mut scenario, ADMIN); // Wrong address
        {
            let mut transfer = ts::take_shared<ProtectedTransfer<SUI>>(&scenario);
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            secure_payment::claim_transfer(
                &mut transfer,
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            clock::destroy_for_testing(clock);
            ts::return_shared(transfer);
            ts::return_shared(stats);
        };
        
        ts::end(scenario);
    }
}