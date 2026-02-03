"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Mejora Continua" },
    { 
        label: "Toma de estado",
        href: "/dashboard/toma-de-estado",
        subItems: [
            { href: "/dashboard/toma-de-estado/efectividad", label: "Efectividad" },
            { href: "/dashboard/toma-de-estado/contratista", label: "Contratista" },
            { href: "/dashboard/toma-de-estado/incidencias-de-fotografia", label: "Incidencias de Fotografia" },
        ]
    },
    { 
        label: "Comunicados",
        href: "/dashboard/comunicados",
        subItems: [
            { href: "/dashboard/comunicados/atipicas", label: "Atipicas" },
            { href: "/dashboard/comunicados/preventivas", label: "Preventivas" },
            { href: "/dashboard/comunicados/cierres", label: "Cierres" },
        ]
    },
    { 
        label: "Inspecciones",
        href: "/dashboard/inspecciones",
        subItems: [
            { href: "/dashboard/inspecciones/atipicas", label: "Atipicas" },
            { href: "/dashboard/inspecciones/reclamos", label: "Reclamos" },
        ]
    },
    { 
        label: "Persuasivas",
        href: "/dashboard/persuasivas",
        subItems: [
            { href: "/dashboard/persuasivas/eficiencia", label: "Eficiencia" },
            { href: "/dashboard/persuasivas/eficacia-24h", label: "Eficacia 24H" },
            { href: "/dashboard/persuasivas/eficacia-48h", label: "Eficacia 48h" },
            { href: "/dashboard/persuasivas/reclamos", label: "Reclamos" },
        ]
    },
    { 
        label: "Recibos",
        href: "/dashboard/recibos",
        subItems: [
            { href: "/dashboard/recibos/reclamos", label: "Reclamos" },
        ]
    },
    { href: "/dashboard/reporte-anual", label: "Reporte Anual" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
       <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4 flex h-20 items-center">
            <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {navItems.map((item) => {
                    const isActive = item.subItems 
                        ? pathname.startsWith(item.href) 
                        : pathname === item.href;
                    
                    return item.subItems ? (
                        <DropdownMenu key={item.label}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={cn(
                                        "flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary outline-none",
                                        isActive ? "font-semibold" : ""
                                    )}
                                >
                                    {item.label}
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-none bg-primary text-primary-foreground">
                                {item.subItems.map((subItem) => (
                                    <DropdownMenuItem key={subItem.label} asChild className="cursor-pointer focus:bg-primary/80">
                                        <Link href={subItem.href}>{subItem.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "px-3 py-2 text-sm font-medium text-primary",
                                isActive ? "font-semibold" : ""
                            )}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            
            <div className="flex flex-1 items-center justify-end">
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
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}