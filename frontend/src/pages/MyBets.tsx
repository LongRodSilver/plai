export default function MyBets() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">My Bets</h1>
      <p className="text-[var(--text-muted)]">Active bets, settled history, and earnings summary.</p>
      
      <div className="mt-8 rounded-xl overflow-hidden border border-[var(--bg-surface2)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-surface)]">
              <th className="p-4 font-medium text-[var(--text-muted)] border-b border-[var(--bg-surface2)]">Match</th>
              <th className="p-4 font-medium text-[var(--text-muted)] border-b border-[var(--bg-surface2)]">Prediction</th>
              <th className="p-4 font-medium text-[var(--text-muted)] border-b border-[var(--bg-surface2)]">Wager</th>
              <th className="p-4 font-medium text-[var(--text-muted)] border-b border-[var(--bg-surface2)]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-[var(--bg-surface2)]">Vitality vs G2</td>
              <td className="p-4 border-b border-[var(--bg-surface2)]">ZywOo &gt; 20 Kills</td>
              <td className="p-4 border-b border-[var(--bg-surface2)] font-mono">50.00 ckUSDC</td>
              <td className="p-4 border-b border-[var(--bg-surface2)]"><span className="text-yellow-500">Pending Match</span></td>
            </tr>
            <tr>
              <td className="p-4">Astralis vs Heroic</td>
              <td className="p-4">Heroic Wins Series</td>
              <td className="p-4 font-mono">100.00 ckUSDC</td>
              <td className="p-4"><span className="text-[var(--accent)]">Settled (Won)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
