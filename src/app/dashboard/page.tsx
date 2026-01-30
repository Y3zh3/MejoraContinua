
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Megaphone, ClipboardList, Handshake, Receipt, TrendingUp, TrendingDown, Minus } from "lucide-react";

const modules = [
    {
        title: "Toma de Estado",
        icon: Activity,
        compliance: 98.5,
        target: 95,
        href: "/dashboard/toma-de-estado",
    },
    {
        title: "Comunicados",
        icon: Megaphone,
        compliance: 72,
        target: 80,
        href: "/dashboard/comunicados",
    },
    {
        title: "Inspecciones",
        icon: ClipboardList,
        compliance: 94,
        target: 90,
        href: "/dashboard/inspecciones",
    },
    {
        title: "Persuasivas",
        icon: Handshake,
        compliance: 88,
        target: 85,
        href: "/dashboard/persuasivas",
    },
    {
        title: "Recibos",
        icon: Receipt,
        compliance: 99,
        target: 98,
        href: "/dashboard/recibos",
    },
];


const TrendIcon = ({ compliance, target }: { compliance: number, target: number }) => {
    if (compliance > target) {
        return <TrendingUp className="h-6 w-6 text-green-500" />;
    }
    if (compliance < target) {
        return <TrendingDown className="h-6 w-6 text-red-500" />;
    }
    return <Minus className="h-6 w-6 text-muted-foreground" />;
};


export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Dashboard de Gestión Operativa</h1>
                <p className="text-muted-foreground">Resumen de cumplimiento por Módulo de Actividad.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {modules.map((mod) => (
                    <Link href={mod.href} key={mod.title} className="flex">
                        <Card className="w-full flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary">
                            <CardHeader className="p-0 mb-4">
                                <mod.icon className="h-12 w-12 mx-auto text-primary" />
                            </CardHeader>
                            <CardContent className="p-0 flex-grow flex flex-col justify-center">
                                <CardTitle className="text-lg font-headline mb-2">{mod.title}</CardTitle>
                                <div className="flex items-center justify-center gap-2">
                                     <p className="text-4xl font-bold">{mod.compliance}%</p>
                                     <TrendIcon compliance={mod.compliance} target={mod.target} />
                                </div>
                                <p className="text-xs text-muted-foreground">Cumplimiento Total</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

             <div>
                <h2 className="font-headline text-2xl font-bold mt-8">Navegación por Módulos</h2>
                <p className="text-muted-foreground">
                    Haz clic en un módulo para acceder a la vista detallada con desglose por sedes y ciclos (Drill-Down).
                </p>
            </div>
        </div>
    );
}
