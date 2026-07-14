import Link from "next/link";

export default function PublicPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-16 items-center justify-between py-4">
          <Link href="/" className="font-bold text-lg">
            ProofVault
          </Link>
          <nav>
            <Link
              href="/(auth)/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="container py-6">
        <div className="text-center text-sm text-muted-foreground">
          Built with ProofVault
        </div>
      </footer>
    </div>
  );
}