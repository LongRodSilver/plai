import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createBettingActor } from "../services/icp";

interface Match {
  id: string;
  event: string;
  teamA: string;
  teamB: string;
  pool: string;
}

// Fallback data shown while the local replica is offline or before dfx deploy
const FALLBACK_MATCHES: Match[] = [
  { id: "match-1", event: "IEM Katowice 2026", teamA: "NaVi", teamB: "FaZe", pool: "$12,450" },
  { id: "match-2", event: "IEM Katowice 2026", teamA: "G2", teamB: "Vitality", pool: "$8,200" },
  { id: "match-3", event: "IEM Katowice 2026", teamA: "Liquid", teamB: "MOUZ", pool: "$5,100" },
];

export default function Home() {
  const [matches, setMatches] = useState<Match[]>(FALLBACK_MATCHES);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to fetch open matches from the betting canister.
    // Gracefully falls back to static data if the replica is not running.
    const bettingActor = createBettingActor();

    // The current betting canister exposes createBet / settleMatch / getCommissionRate.
    // TODO: add a `getOpenMatches` query method to betting/main.mo and call it here.
    // For now we just verify the canister is reachable via getCommissionRate.
    bettingActor
      .getCommissionRate()
      .then((rate) => {
        console.info("[Betting canister] commission rate:", rate);
        setIsLive(true);
        // TODO: replace FALLBACK_MATCHES with real canister data once
        // a `getOpenMatches : () -> query [Match]` method is added.
      })
      .catch((err) => {
        console.warn("[Betting canister] unreachable, showing fallback data:", err);
        setError("Canister offline — showing demo data");
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Live Matches</h1>
          <p className="text-[var(--text-muted)] mt-1">Open bets and featured CS2 matches.</p>
        </div>
        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Canister Live
            </span>
          ) : error ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Demo Mode
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="group p-6 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] hover:border-[var(--accent)] rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <div className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wide">
              {match.event}
            </div>
            <h3 className="text-xl font-bold mb-1">
              {match.teamA}{" "}
              <span className="text-[var(--text-muted)] font-normal">vs</span>{" "}
              {match.teamB}
            </h3>
            <div className="flex justify-between items-center mt-4">
              <span className="font-mono text-[var(--accent)] text-sm font-medium">
                {match.pool} Pool
              </span>
              <Link
                to={`/match/${match.id}`}
                className="px-3 py-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm rounded-md transition-colors"
              >
                Predict
              </Link>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-xs text-[var(--text-muted)] text-center mt-4">
          ⚠️ {error} — run <code className="font-mono">dfx start &amp;&amp; dfx deploy</code> to connect.
        </p>
      )}
    </div>
  );
}
