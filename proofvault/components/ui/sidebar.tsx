"use client"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/lib/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { 
  LayoutDashboard, 
  FolderOpen, 
  Image, 
  BarChart3, 
  Bell, 
  Settings,
  Menu
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarItem {
  title: string
  href: string
  icon: React.ElementType
}

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", href: "/(dashboard)", icon: LayoutDashboard },
  { title: "Portfolio", href: "/(dashboard)/portfolio", icon: FolderOpen },
  { title: "Projects", href: "/(dashboard)/projects", icon: FolderOpen },
  { title: "Media Library", href: "/(dashboard)/media", icon: Image },
  { title: "Analytics", href: "/(dashboard)/analytics", icon: BarChart3 },
  { title: "Notifications", href: "/(dashboard)/notifications", icon: Bell },
  { title: "Settings", href: "/(dashboard)/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)

  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-64 p-0"
        >
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="text-xl">ProofVault</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {sidebarItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive &&
                      "text-primary bg-muted hover:bg-muted hover:text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-16 items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span className="text-xl">ProofVault</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive &&
                    "text-primary bg-muted hover:bg-muted hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}