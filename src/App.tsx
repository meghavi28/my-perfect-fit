import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent/20 via-background to-accent/10">
      <header className="border-b border-primary/20 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 sticky top-0 z-10 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/measurement" className="flex items-center gap-2 group">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-secondary/90 transition-all">
              Rivaaj Fabric
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-primary/20 py-6 text-center text-sm text-foreground/60 bg-gradient-to-r from-accent/30 to-background">
        © {new Date().getFullYear()} Rivaaj Fabric. All rights reserved.
      </footer>
    </div>
  );
}
