import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Match() {
  const { id } = useParams();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [wager, setWager] = useState<string>('');

  const teams = { A: "Navi", B: "FaZe" };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Match Lobby {id !== "lobby" ? `#${id}` : ""}</h1>
      <p className="text-[var(--text-muted)]">Place your prediction for this specific match.</p>

      {/* Match Info & Betting Interface */}
      <div className="p-8 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-xl mt-8">
        <h2 className="text-2xl font-bold mb-2">{teams.A} vs {teams.B}</h2>
        <div className="font-mono text-[var(--accent)] font-medium mb-8">Current Pool: 2,500.00 ckUSDC</div>

        <div className="space-y-6 max-w-md">
          {/* Team Selection */}
          <div className="flex gap-4">
            <button 
              onClick={() => setSelectedTeam(teams.A)}
              className={`flex-1 py-3 rounded-md font-medium transition-colors border outline-none ${
                selectedTeam === teams.A 
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]' 
                  : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--bg-surface2)] hover:border-[var(--text-muted)]'
              }`}
            >
              Bet {teams.A}
            </button>
            <button 
              onClick={() => setSelectedTeam(teams.B)}
              className={`flex-1 py-3 rounded-md font-medium transition-colors border outline-none ${
                selectedTeam === teams.B 
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]' 
                  : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--bg-surface2)] hover:border-[var(--text-muted)]'
              }`}
            >
              Bet {teams.B}
            </button>
          </div>

          {/* Wager Input & Confirmation */}
          {selectedTeam && (
            <div className="space-y-4 pt-4 border-t border-[var(--bg-surface2)]">
              <input 
                type="number" 
                value={wager}
                onChange={(e) => setWager(e.target.value)}
                placeholder="Wager amount (ckUSDC)" 
                className="w-full p-3 bg-[var(--bg-main)] border border-[var(--bg-surface2)] rounded-md outline-none focus:border-[var(--accent)] font-mono" 
              />
              
              <button 
                disabled={!wager || parseFloat(wager) <= 0}
                className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-surface2)] disabled:text-[var(--text-muted)] disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
              >
                Confirm Bet on {selectedTeam}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
