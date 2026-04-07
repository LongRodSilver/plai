import Result "mo:base/Result";
import Array "mo:base/Array";

actor Betting {

    // ── Types ─────────────────────────────────────────────────────────────────

    public type MatchStatus = {
        #open;
        #closed;
        #resolved;
    };

    public type Match = {
        id         : Text;
        team1      : Text;
        team2      : Text;
        tournament : Text;
        pool       : Nat;
        status     : MatchStatus;
    };

    // ── State ─────────────────────────────────────────────────────────────────

    // 5% commission fee
    let COMMISSION_FEE : Float = 0.05;

    // Stable seed data — replaced by real admin-created matches once
    // a createMatch() admin endpoint is added.
    let seedMatches : [Match] = [
        { id = "match-1"; team1 = "NaVi";   team2 = "FaZe";     tournament = "IEM Katowice 2026"; pool = 12450; status = #open },
        { id = "match-2"; team1 = "G2";     team2 = "Vitality";  tournament = "IEM Katowice 2026"; pool = 8200;  status = #open },
        { id = "match-3"; team1 = "Liquid"; team2 = "MOUZ";      tournament = "IEM Katowice 2026"; pool = 5100;  status = #open },
    ];

    // ── Queries ───────────────────────────────────────────────────────────────

    /// Returns all matches whose status is #open.
    public query func getOpenMatches() : async [Match] {
        return Array.filter<Match>(seedMatches, func(m) { m.status == #open });
    };

    public query func getCommissionRate() : async Float {
        return COMMISSION_FEE;
    };

    // ── Updates ───────────────────────────────────────────────────────────────

    /// Placeholder for bet creation — escrow logic via ckUSDC transfer.
    public shared(_msg) func createBet(matchId : Text, prediction : Text, amount : Nat64) : async Result.Result<Text, Text> {
        // TODO: validate matchId exists and is #open, then lock ckUSDC in escrow
        let _ = (matchId, prediction, amount);
        return #ok("Bet created successfully");
    };

    /// Placeholder for settling a match — distributes pool to winners.
    public shared(_msg) func settleMatch(matchId : Text, winningPrediction : Text) : async Result.Result<Text, Text> {
        // TODO:
        // 1. Mark match as #resolved
        // 2. Distribute pool to winners proportionally, minus COMMISSION_FEE
        let _ = (matchId, winningPrediction);
        return #ok("Match settled and payouts distributed");
    };
}
