export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Live Matches</h1>
      <p className="text-[var(--text-muted)]">Open bets and featured CS2 matches.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Placeholder cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-xl">
            <div className="text-sm text-[var(--text-muted)] mb-2">IEM Katowice 2026</div>
            <h3 className="text-xl font-bold mb-4">Navi vs FaZe</h3>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[var(--accent)]">$12,450 Pool</span>
              <button className="px-3 py-1 bg-[var(--bg-surface2)] hover:bg-[var(--bg-main)] rounded transition-colors">
                Predict
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
