import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent/20 via-background to-accent/10">
      <header className="border-b border-primary/20 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 sticky top-0 z-10 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/measurement" className="flex items-center gap-2 group">
            <div className="relative">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                {/* Outer Circle - Tape Roll */}
                <circle cx="18" cy="18" r="16" className="fill-primary" />
                {/* Inner Circle - Center Hole */}
                <circle cx="18" cy="18" r="8" className="fill-white" />
                {/* Spiral Tape Layers */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="12"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="10"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                {/* Pulled Out Tape */}
                <rect
                  x="18"
                  y="2"
                  width="12"
                  height="4"
                  rx="2"
                  className="fill-secondary"
                />
                {/* Measurement Marks on Pulled Tape */}
                <line
                  x1="20"
                  y1="2"
                  x2="20"
                  y2="6"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <line
                  x1="24"
                  y1="2"
                  x2="24"
                  y2="6"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <line
                  x1="28"
                  y1="2"
                  x2="28"
                  y2="6"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-secondary/90 transition-all">
              MyPerfectFit
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-primary/20 py-6 text-center text-sm text-foreground/60 bg-gradient-to-r from-accent/30 to-background">
        © {new Date().getFullYear()} MyPerfectFit. All rights reserved.
      </footer>
    </div>
  );
}
