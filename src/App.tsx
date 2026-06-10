import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent/20 via-background to-accent/10">
      <header className="border-b border-primary/20 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 sticky top-0 z-10 shadow-sm">
        <div className="container flex items-center justify-center h-16">
          <Link to="/measurement" className="flex items-center">
            <img
              src="/images/logo.jpg"
              alt="Logo"
              className="h-14 w-32 object-contain"
            />
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
