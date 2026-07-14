import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="font-bold text-xl">
            ProofVault
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/(auth)/login"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign In
            </Link>
            <Link
              href="/(auth)/register"
              className={buttonVariants({ size: "sm" })}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="container py-6 md:py-8">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ProofVault. All rights reserved.
        </div>
      </footer>
    </div>
  );
}