import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { isAuthenticated, principal, login, logout, isLoading } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-4xl font-bold">Profile & Wallet</h1>
      <p className="text-[var(--text-muted)]">Manage your ckUSDC balance and Internet Identity.</p>

      {isAuthenticated ? (
        <>
          {/* Balance card */}
          <div className="p-8 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-xl mt-8 flex flex-col items-center">
            <h2 className="text-xl mb-2 text-[var(--text-muted)]">Available Balance</h2>
            <div className="text-5xl font-mono font-bold text-[var(--accent)] mb-8">
              — <span className="text-xl text-[var(--text-muted)]">ckUSDC</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Connect wallet to view balance
            </p>

            <div className="flex gap-4 w-full">
              <button className="flex-1 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md font-medium transition-colors">
                Deposit ckUSDC
              </button>
              <button className="flex-1 py-3 bg-[var(--bg-surface2)] hover:bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--bg-surface2)] rounded-md font-medium transition-colors">
                Withdraw
              </button>
            </div>
          </div>

          {/* Identity card */}
          <div className="p-6 border border-[var(--bg-surface2)] rounded-xl">
            <h3 className="font-bold mb-1">Internet Identity</h3>
            <p className="text-xs text-[var(--text-muted)] font-mono break-all mb-4">
              {principal}
            </p>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded transition-colors border border-red-500/20"
            >
              Disconnect
            </button>
          </div>
        </>
      ) : (
        /* Logged-out state */
        <div className="p-10 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-xl mt-8 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-surface2)] flex items-center justify-center text-3xl">
            🔐
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Connect your wallet</h2>
            <p className="text-[var(--text-muted)] text-sm">
              Login with Internet Identity to view your balance and bet history.
            </p>
          </div>
          <button
            onClick={login}
            disabled={isLoading}
            className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? "Connecting..." : "Connect with Internet Identity"}
          </button>
        </div>
      )}
    </div>
  );
}
