"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  LogOut,
  Settings,
  UserCircle,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Mejora Continua" },
    { href: "/dashboard/toma-de-estado", label: "Toma de estado" },
    { href: "/dashboard/comunicados", label: "Comunicados" },
    { href: "/dashboard/inspecciones", label: "Inspecciones" },
    { href: "/dashboard/persuasivas", label: "Persuasivas" },
    { href: "/dashboard/recibos", label: "Recibos" },
    { href: "/dashboard/reporte-anual", label: "Reporte Anual" },
];

const HorizontalNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2",
        isActive
          ? "text-secondary-foreground font-semibold"
          : "text-secondary-foreground/80 hover:text-secondary-foreground"
      )}
    >
      {children}
    </Link>
  );
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b border-secondary/90 bg-secondary px-4 md:px-6 z-50">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg text-secondary-foreground">
            <TrendingUp className="h-7 w-7" />
          </Link>

          <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {navItems.map((item) => (
              <HorizontalNavLink key={item.href} href={item.href}>
                {item.label}
              </HorizontalNavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-foreground/70" />
            <Input
              type="search"
              placeholder="Buscar"
              className="pl-8 sm:w-[200px] md:w-[200px] lg:w-[300px] rounded-full bg-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/70 border-0 focus-visible:ring-secondary-foreground"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full hover:bg-secondary-foreground/10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/100" data-ai-hint="profile picture" />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Usuario Activo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ajustes</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
