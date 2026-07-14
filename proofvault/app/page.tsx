import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Showcase Your Work</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Build professional portfolios with privacy-respecting analytics
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/(auth)/login">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/(marketing)/about">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
          <p className="text-muted-foreground">
            Go from signup to a published portfolio in minutes, not hours.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">Real Analytics</h3>
          <p className="text-muted-foreground">
            Privacy-respecting insights on who is viewing your work.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
          <p className="text-muted-foreground">
            Templates designed for developers and creatives.
          </p>
        </div>
      </div>
    </div>
  );
}