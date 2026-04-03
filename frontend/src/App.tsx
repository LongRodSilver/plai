import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import Home from './pages/Home';
import Match from './pages/Match';
import MyBets from './pages/MyBets';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AdminCreateMatch from './pages/AdminCreateMatch';

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
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[var(--accent)] tracking-tighter mix-blend-screen">
              PLAI
            </Link>
            
            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium h-full">
              <NavLink to="/" className={navClasses} end>Feed</NavLink>
              <NavLink to="/match/lobby" className={navClasses}>Match Lobby</NavLink>
              <NavLink to="/my-bets" className={navClasses}>My Bets</NavLink>
              <NavLink to="/leaderboard" className={navClasses}>Leaderboard</NavLink>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/profile" className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md font-medium transition-colors">
                Wallet
              </Link>
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
