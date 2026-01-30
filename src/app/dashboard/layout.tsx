"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  LogOut,
  Settings,
  UserCircle,
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
        "px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-primary"
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
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-50 grid h-20 grid-cols-3 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex items-center justify-start">
            <Link href="/dashboard">
              <Image 
                src="https://picsum.photos/seed/sedapal-logo/150/40" 
                alt="Logo" 
                width={150} 
                height={40}
                data-ai-hint="logo company"
              />
            </Link>
          </div>

          <nav className="hidden justify-center font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              {navItems.map((item) => (
                <HorizontalNavLink key={item.href} href={item.href}>
                  {item.label}
                </HorizontalNavLink>
              ))}
          </nav>
          
          <div className="flex items-center justify-end gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar"
                className="pl-9 sm:w-[150px] md:w-[200px] lg:w-[250px] rounded-full border-primary/30 focus:border-primary"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/100" data-ai-hint="profile picture" />
                    <AvatarFallback>UA</AvatarFallback>
                  </Avatar>
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
      <main className="flex-1 p-8 md:p-12">
        {children}
      </main>
    </div>
  );
}
