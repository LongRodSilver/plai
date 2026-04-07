import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import { useAuth } from './hooks/useAuth';
import { useState } from 'react';
import Home from './pages/Home';
import Match from './pages/Match';
import MyBets from './pages/MyBets';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AdminCreateMatch from './pages/AdminCreateMatch';

function NavbarWalletButton() {
  const { isAuthenticated, principal, login, logout, isLoading } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  function getAvatarData(p: string) {
    const initials = p.slice(0, 2).toUpperCase();
    const shortId = p.slice(-4);
    const colors = [
      '#3b6bff', // Accent Blue
      '#6690ff', // Lighter Blue
      '#2855e0', // Indigo
      '#1a3dbf', // Darker Blue
      '#5580ff', // Accent Hover
      '#0066ff', // Deep Blue
    ];
    
    // Simple hash of first 6 chars
    const hash = p.slice(0, 6).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = colors[hash % colors.length];
    
    return { initials, shortId, color };
  }

  if (isLoading) {
    return (
      <div className="px-4 py-2 bg-[var(--bg-surface2)] rounded-md text-[var(--text-muted)] text-sm animate-pulse w-24 h-9" />
    );
  }

  if (isAuthenticated && principal) {
    const { initials, shortId, color } = getAvatarData(principal);
    
    return (
      <div
        className="relative"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-1.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface2)] border border-[var(--bg-surface2)] text-[var(--text-main)] rounded-full transition-all hover:border-[var(--accent)] group"
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-inner"
            style={{ backgroundColor: color }}
          >
            {initials}
          </div>
          <span className="text-sm font-medium pr-1 group-hover:text-[var(--accent)] transition-colors">
            Player#{shortId}
          </span>
        </Link>
        {showLogout && (
          <button
            onClick={() => { setShowLogout(false); logout(); }}
            className="absolute right-0 top-full mt-2 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--bg-surface2)] text-red-400 hover:text-red-300 rounded-md text-sm whitespace-nowrap z-50 shadow-lg transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md font-medium transition-colors"
    >
      Login
    </button>
  );
}

export default function App() {
  const navClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors py-[22px] border-b-2 -mb-[2px] ${
      isActive
        ? "text-[var(--text-main)] border-[var(--accent)] font-medium"
        : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-main)]"
    }`;

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-[var(--bg-main)]/80 backdrop-blur-md border-b border-[var(--bg-surface)]">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-[var(--accent)] tracking-tighter">
              PLAI
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium h-full">
              <NavLink to="/" className={navClasses} end>Feed</NavLink>
              <NavLink to="/match/lobby" className={navClasses}>Match Lobby</NavLink>
              <NavLink to="/my-bets" className={navClasses}>My Bets</NavLink>
              <NavLink to="/leaderboard" className={navClasses}>Leaderboard</NavLink>
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <NavbarWalletButton />
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/match/:id" element={<Match />} />
            <Route path="/my-bets" element={<MyBets />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/create-match" element={<AdminCreateMatch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
