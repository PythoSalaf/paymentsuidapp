#[test_only]
module protectedpay::integration_tests {
    use sui::test_scenario::{Self as ts};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::clock::{Self, Clock};
    use std::string;
    
    use protectedpay::secure_payment::{Self, ProtectedTransfer, UsernameRegistry, GlobalStats};
    
    const ALICE: address = @0xA11CE;
    const BOB: address = @0xB0B;
    const CHARLIE: address = @0xCHA12E;
    
    #[test]
    fun test_full_workflow() {
        let mut scenario = ts::begin(ALICE);
        
        // Initialize contract
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        // Alice registers username
        ts::next_tx(&mut scenario, ALICE);
        {
            let mut registry = ts::take_shared<UsernameRegistry>(&scenario);
            secure_payment::register_username(
                &mut registry,
                string::utf8(b"alice"),
                ts::ctx(&mut scenario)
            );
            ts::return_shared(registry);
        };
        
        // Bob registers username
        ts::next_tx(&mut scenario, BOB);
        {
            let mut registry = ts::take_shared<UsernameRegistry>(&scenario);
            secure_payment::register_username(
                &mut registry,
                string::utf8(b"bob"),
                ts::ctx(&mut scenario)
            );
            ts::return_shared(registry);
        };
        
        // Alice sends payment to Bob using username
        ts::next_tx(&mut scenario, ALICE);
        {
            let registry = ts::take_shared<UsernameRegistry>(&scenario);
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            let coin = coin::mint_for_testing<SUI>(1500000000, ts::ctx(&mut scenario)); // 1.5 SUI
            
            secure_payment::create_transfer_by_username(
                coin,
                string::utf8(b"bob"),
                &registry,
                72, // 3 days
                string::utf8(b"Payment for services"),
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            // Check stats were updated
            let (total_transfers, total_volume, active_transfers) = secure_payment::get_global_stats(&stats);
            assert!(total_transfers == 1, 0);
            assert!(total_volume == 1500000000, 1);
            assert!(active_transfers == 1, 2);
            
            clock::destroy_for_testing(clock);
            ts::return_shared(registry);
            ts::return_shared(stats);
        };
        
        // Bob claims the payment
        ts::next_tx(&mut scenario, BOB);
        {
            let mut transfer = ts::take_shared<ProtectedTransfer<SUI>>(&scenario);
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            // Verify transfer is claimable
            assert!(secure_payment::is_claimable(&transfer, &clock), 3);
            
            secure_payment::claim_transfer(
                &mut transfer,
                &clock,
                &mut stats,
                ts::ctx(&mut scenario)
            );
            
            // Verify stats updated
            let (_, _, active_transfers) = secure_payment::get_global_stats(&stats);
            assert!(active_transfers == 0, 4);
            
            clock::destroy_for_testing(clock);
            ts::return_shared(transfer);
            ts::return_shared(stats);
        };
        
        ts::end(scenario);
    }
    
    #[test]
    fun test_multiple_concurrent_transfers() {
        let mut scenario = ts::begin(ALICE);
        
        // Initialize
        {
            secure_payment::init_for_testing(ts::ctx(&mut scenario));
        };
        
        // Create multiple transfers from Alice
        ts::next_tx(&mut scenario, ALICE);
        {
            let mut stats = ts::take_shared<GlobalStats>(&scenario);
            let clock = clock::create_for_testing(ts::ctx(&mut scenario));
            
            // Transfer 1: Alice -> Bob
            let coin1 = coin::mint_for_testing<SUI>(100000000, ts::ctx(&mut scenario));
            secure_payment::create_transfer(
                coin1, BOB, 24, string::utf8(b"Payment 1"), &clock, &mut stats, ts::ctx(&mut scenario)
            );
            
            // Transfer 2: Alice -> Charlie
            let coin2 = coin::mint_for_testing<SUI>(200000000, ts::ctx(&mut scenario));
            secure_payment::create_transfer(
                coin2, CHARLIE, 48, string::utf8(b"Payment 2"), &clock, &mut stats, ts::ctx(&mut scenario)
            );
            
            // Check stats
            let (total_transfers, total_volume, active_transfers) = secure_payment::get_global_stats(&stats);
            assert!(total_transfers == 2, 0);
            assert!(total_volume == 300000000, 1);
            assert!(active_transfers == 2, 2);
            
            clock::destroy_for_testing(clock);
            ts::return_shared(stats);
        };
        
        ts::end(scenario);
    }
}