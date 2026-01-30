"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
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
        "px-3 py-2 text-sm font-medium text-primary",
        isActive ? "font-semibold" : ""
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
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
            <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {navItems.map((item) => (
                  <HorizontalNavLink key={item.href} href={item.href}>
                    {item.label}
                  </HorizontalNavLink>
                ))}
            </nav>
            
            <div className="flex items-center justify-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar"
                  className="pl-9 sm:w-[150px] md:w-[200px] lg:w-[250px]"
                />
              </div>
            </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
