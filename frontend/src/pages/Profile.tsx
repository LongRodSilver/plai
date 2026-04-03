export default function Profile() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-4xl font-bold">Profile & Wallet</h1>
      <p className="text-[var(--text-muted)]">Manage your ckUSDC balance and Internet Identity.</p>

      <div className="p-8 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-xl mt-8 flex flex-col items-center">
        <h2 className="text-xl mb-2 text-[var(--text-muted)]">Available Balance</h2>
        <div className="text-5xl font-mono font-bold text-[var(--accent)] mb-8">
          1,420.50 <span className="text-xl text-[var(--text-muted)]">ckUSDC</span>
        </div>
        
        <div className="flex gap-4 w-full">
          <button className="flex-1 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md font-medium transition-colors">
            Deposit ckUSDC
          </button>
          <button className="flex-1 py-3 bg-[var(--bg-surface2)] hover:bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--bg-surface2)] rounded-md font-medium transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      <div className="p-6 border border-[var(--bg-surface2)] rounded-xl mt-4">
        <h3 className="font-bold mb-4">Internet Identity</h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">Currently connected via @dfinity/auth-client.</p>
        <button className="px-4 py-2 text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded transition-colors border border-red-500/20">
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
}
