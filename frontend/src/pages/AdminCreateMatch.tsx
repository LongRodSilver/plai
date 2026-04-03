import { useState } from 'react';

// Hardcoded admin principal whitelist placeholder.
// To be replaced with canister-level auth checks later.
const ADMIN_PRINCIPALS: string[] = [];
// Assuming current user principal check here. We'll stub it.
const CURRENT_PRINCIPAL = "user-principal-placeholder";

export default function AdminCreateMatch() {
  const [matchName, setMatchName] = useState('');
  
  // Basic admin check logic scaffold
  // For dev scaffolding, we pass if the array is empty.
  const isAdmin = ADMIN_PRINCIPALS.length === 0 || ADMIN_PRINCIPALS.includes(CURRENT_PRINCIPAL);

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-xl border border-red-500/20 max-w-md mx-auto mt-12">
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p className="opacity-80">You do not have administrative permission to view the Match Creation portal.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-4xl font-bold">Admin: Create Match</h1>
         <span className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider rounded-full border border-red-500/20">
           Admin Only
         </span>
      </div>
      <p className="text-[var(--text-muted)]">Instantiate a new match into the Plai lobby system so users can bet on it.</p>
      
      <div className="p-8 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] rounded-xl mt-8">
        <h2 className="text-2xl font-bold mb-6">Match Initialization</h2>
        <div className="space-y-4 max-w-md">
          <input 
            type="text" 
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
            placeholder="Match Title (e.g. Navi vs FaZe)" 
            className="w-full p-3 bg-[var(--bg-main)] border border-[var(--bg-surface2)] rounded-md outline-none focus:border-[var(--accent)]" 
          />
          <button className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md font-medium transition-colors">
            Post To Chain
          </button>
        </div>
      </div>
    </div>
  );
}
