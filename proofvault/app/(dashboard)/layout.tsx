import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-1 border-b bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="flex w-full items-center justify-between">
            <div></div> {/* Spacer for alignment */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <UserIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}