import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="container py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Share your tailoring measurements with confidence
        </h1>
        <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
          A modern, mobile-friendly form to send accurate measurements from
          anywhere in the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/measurement"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-secondary/90 transition-all"
          >
            Start Measurement
          </Link>
          <a
            href="#learn"
            className="inline-flex items-center justify-center rounded-md border-2 border-primary/30 px-6 py-3 text-base font-medium hover:bg-accent hover:border-primary/50 transition-all"
          >
            Learn more
          </a>
        </div>
      </div>
      <div className="aspect-video md:aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/50 border-2 border-primary/20 shadow-xl grid place-items-center p-8">
        <div className="text-center space-y-4">
          <div className="text-8xl md:text-9xl">🧵</div>
          <p className="mt-4 text-foreground/70 text-lg font-medium">
            Tailor-made, anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}
