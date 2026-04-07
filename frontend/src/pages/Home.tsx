import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createBettingActor } from "../services/icp";
import type { Match } from "../../../src/declarations/betting/betting.did.d.ts";

// ── Fallback data ──────────────────────────────────────────────────────────
// Shown while the local replica is offline or before dfx deploy.
const FALLBACK_MATCHES: Match[] = [
  { id: "match-1", team1: "NaVi",   team2: "FaZe",    tournament: "IEM Katowice 2026", pool: 12450n, status: { open: null } },
  { id: "match-2", team1: "G2",     team2: "Vitality", tournament: "IEM Katowice 2026", pool: 8200n,  status: { open: null } },
  { id: "match-3", team1: "Liquid", team2: "MOUZ",     tournament: "IEM Katowice 2026", pool: 5100n,  status: { open: null } },
];

function formatPool(pool: bigint): string {
  return `$${Number(pool).toLocaleString()}`;
}

// ── Loading skeleton ───────────────────────────────────────────────────────
function MatchSkeleton() {
  return (
    <div className="p-6 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-xl animate-pulse">
      <div className="h-3 w-32 bg-[var(--bg-surface2)] rounded mb-3" />
      <div className="h-5 w-48 bg-[var(--bg-surface2)] rounded mb-5" />
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-[var(--bg-surface2)] rounded" />
        <div className="h-8 w-20 bg-[var(--bg-surface2)] rounded-md" />
      </div>
    </div>
  );
}

export default function Home() {
  const [matches, setMatches]   = useState<Match[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isLive, setIsLive]     = useState(false);
  const [error,  setError]      = useState<string | null>(null);

  useEffect(() => {
    const bettingActor = createBettingActor();

    bettingActor
      .getOpenMatches()
      .then((result) => {
        setMatches(result.length > 0 ? result : FALLBACK_MATCHES);
        setIsLive(true);
      })
      .catch((err: unknown) => {
        console.warn("[Betting canister] getOpenMatches failed, using fallback:", err);
        setMatches(FALLBACK_MATCHES);
        setError("Canister offline — showing demo data");
      })
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Live Matches</h1>
          <p className="text-[var(--text-muted)] mt-1">Open bets and featured CS2 matches.</p>
        </div>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Canister Live
            </span>
          )}
          {error && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Demo Mode
            </span>
          )}
        </div>
      </div>

      {/* ── Match grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {isFetching
          ? [1, 2, 3].map((i) => <MatchSkeleton key={i} />)
          : matches.map((match) => (
              <div
                key={match.id}
                className="group p-6 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] hover:border-[var(--accent)] rounded-xl transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wide">
                  {match.tournament}
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {match.team1}{" "}
                  <span className="text-[var(--text-muted)] font-normal">vs</span>{" "}
                  {match.team2}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-mono text-[var(--accent)] text-sm font-medium">
                    {formatPool(match.pool)} Pool
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
          ⚠️ {error} — run{" "}
          <code className="font-mono">dfx start &amp;&amp; dfx deploy</code> to connect.
        </p>
      )}
    </div>
  );
}
