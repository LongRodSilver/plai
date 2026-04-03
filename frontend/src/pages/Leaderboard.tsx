export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Leaderboard</h1>
      <p className="text-[var(--text-muted)]">Top bettors ranked by net winnings.</p>
      
      <div className="max-w-2xl mt-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 mb-2 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-8 text-center font-bold text-[var(--text-muted)]">#{i}</div>
              <div className="w-10 h-10 rounded-full bg-[var(--bg-surface2)]" />
              <div className="font-medium">UserPricinpal-{Math.floor(Math.random() * 1000)}</div>
            </div>
            <div className="font-mono text-[var(--accent)] font-bold">
              +{(Math.random() * 10000).toFixed(2)} ckUSDC
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
