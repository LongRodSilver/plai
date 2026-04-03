import Principal "mo:base/Principal";

actor Ledger {
    // Placeholder representing the ckUSDC ICRC-2 Ledger integration.
    public shared(msg) func icrc1_balance_of(account: { owner: Principal; subaccount: ?Blob }) : async Nat {
        return 0; // Mock balance
    };
}
