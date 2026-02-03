
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityDetailModal } from '@/components/activity-detail-modal';
import { BaseSelector } from '@/components/base-selector';
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  HardHat, 
  CameraOff, 
  ShieldCheck, 
  AlertTriangle, 
  CircleOff,
  Clock4,
  Clock9,
  Gauge,
  FileWarning,
  Receipt,
  Activity,
  Megaphone,
  ClipboardList,
  Handshake
} from 'lucide-react';

const categories = [
  {
    title: "Toma de Estado",
    icon: Activity,
    color: "text-[hsl(var(--chart-2))]",
    hoverBg: "hover:bg-[hsl(var(--chart-2))]/5",
    hoverBorder: "hover:border-[hsl(var(--chart-2))]/40",
    items: [
      { id: 'tde_efectividad', nombre: 'Efectividad', icon: TrendingUp, metaAnual: 98.5 },
      { id: 'tde_contratista', nombre: 'Contratista', icon: HardHat, metaAnual: 15 },
      { id: 'tde_incidencias', nombre: 'Incidencias de Fotografía', icon: CameraOff, metaAnual: 5 },
    ]
  },
  {
    title: "Comunicados",
    icon: Megaphone,
    color: "text-[hsl(var(--chart-3))]",
    hoverBg: "hover:bg-[hsl(var(--chart-3))]/5",
    hoverBorder: "hover:border-[hsl(var(--chart-3))]/40",
    items: [
      { id: 'com_atipicas', nombre: 'Atípicas', icon: AlertTriangle, metaAnual: 85 },
      { id: 'com_preventivas', nombre: 'Preventivas', icon: ShieldCheck, metaAnual: 85 },
      { id: 'com_cierres', nombre: 'Cierres', icon: CircleOff, metaAnual: 15 },
    ]
  },
  {
    title: "Inspecciones",
    icon: ClipboardList,
    color: "text-[hsl(var(--chart-4))]",
    hoverBg: "hover:bg-[hsl(var(--chart-4))]/5",
    hoverBorder: "hover:border-[hsl(var(--chart-4))]/40",
    items: [
      { id: 'ins_atipicas', nombre: 'Atípicas', icon: AlertTriangle, metaAnual: 85 },
      { id: 'ins_reclamos', nombre: 'Reclamos', icon: FileWarning, metaAnual: 85 },
    ]
  },
  {
    title: "Persuasivas",
    icon: Handshake,
    color: "text-[hsl(var(--chart-5))]",
    hoverBg: "hover:bg-[hsl(var(--chart-5))]/5",
    hoverBorder: "hover:border-[hsl(var(--chart-5))]/40",
    items: [
      { id: 'per_eficiencia', nombre: 'Eficiencia', icon: Gauge, metaAnual: 98 },
      { id: 'per_24h', nombre: 'Eficacia 24H', icon: Clock4, metaAnual: 70 },
      { id: 'per_48h', nombre: 'Eficacia 48H', icon: Clock9, metaAnual: 70 },
      { id: 'per_reclamos', nombre: 'Reclamos', icon: FileWarning, metaAnual: 5 },
    ]
  },
  {
    title: "Recibos",
    icon: Receipt,
    color: "text-[hsl(var(--chart-1))]",
    hoverBg: "hover:bg-[hsl(var(--chart-1))]/5",
    hoverBorder: "hover:border-[hsl(var(--chart-1))]/40",
    items: [
      { id: 'rec_reclamos', nombre: 'Reclamos', icon: Receipt, metaAnual: 2 },
    ]
  }
];

// Mock generic detail data generator
const generateMockDetail = (nombre: string, meta: number) => ({
  nombre,
  promedioAnual: Math.floor(Math.random() * 15) + (meta - 5),
  metaAnual: meta,
  historicoMensual: [
    { mes: 'Ene', valor: meta - 2, meta }, { mes: 'Feb', valor: meta + 1, meta }, { mes: 'Mar', valor: meta - 1, meta },
    { mes: 'Abr', valor: meta, meta }, { mes: 'May', valor: meta + 2, meta }, { mes: 'Jun', valor: meta - 3, meta },
    { mes: 'Jul', valor: meta + 1, meta }, { mes: 'Ago', valor: meta - 1, meta }, { mes: 'Sep', valor: meta, meta },
    { mes: 'Oct', valor: meta + 2, meta }, { mes: 'Nov', valor: meta - 2, meta }, { mes: 'Dic', valor: meta + 3, meta },
  ],
  detalleSedes: [
    { sede: 'Comas', valor: meta + 1 }, { sede: 'Callao', valor: meta - 2 }, { sede: 'Ate', valor: meta + 3 },
    { sede: 'Breña', valor: meta }, { sede: 'SJL', valor: meta - 4 }, { sede: 'Surquillo', valor: meta + 2 },
    { sede: 'VES', valor: meta - 1 }, { sede: 'Clientes Especiales', valor: meta + 5 },
  ],
});

export default function ReporteAnualPage() {
    const [selectedActivity, setSelectedActivity] = useState<any | null>(null);

    const handleCardClick = (activity: any) => {
        const detail = generateMockDetail(activity.nombre, activity.metaAnual);
        setSelectedActivity(detail);
    };

    const handleCloseModal = () => {
        setSelectedActivity(null);
    };

    const handleBaseChange = (base: string) => {
        setSelectedActivity(null);
    };

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto pb-12 pt-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div>
                    <h1 className="font-headline text-4xl font-bold text-primary">Cuadros de Mando Anuales</h1>
                    <p className="text-xl text-muted-foreground">Visión 360° de los indicadores de gestión operativa agrupados por categoría.</p>
                </div>
                <BaseSelector onBaseChange={handleBaseChange} />
            </div>

            {/* Categorized Indicators */}
            <div className="flex flex-col gap-14">
                {categories.map((cat) => (
                    <div key={cat.title} className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg bg-card border shadow-sm ${cat.color}`}>
                                <cat.icon className="h-6 w-6" />
                            </div>
                            <h2 className="font-headline text-3xl font-bold text-foreground whitespace-nowrap">{cat.title}</h2>
                            <Separator className="flex-1" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cat.items.map((item) => (
                                <Card 
                                    key={item.id} 
                                    className={`cursor-pointer transition-all border border-border/60 group shadow-sm ${cat.hoverBg} ${cat.hoverBorder}`}
                                    onClick={() => handleCardClick(item)}
                                >
                                    <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0">
                                        <CardTitle className={`text-base font-bold text-muted-foreground group-hover:${cat.color} transition-colors uppercase tracking-tight`}>
                                            {item.nombre}
                                        </CardTitle>
                                        <item.icon className={`h-5 w-5 text-muted-foreground group-hover:${cat.color} transition-colors`} />
                                    </CardHeader>
                                    <CardContent className="px-5 pb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-3xl font-bold text-foreground group-hover:${cat.color} transition-colors tabular-nums`}>
                                                {Math.floor(Math.random() * 10) + (item.metaAnual - 5)}%
                                            </span>
                                            <span className="text-xs font-semibold text-muted-foreground uppercase">Promedio</span>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full opacity-80 bg-current ${cat.color}`} 
                                                    style={{ width: `${Math.min(100, Math.floor(Math.random() * 10) + (item.metaAnual - 5))}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">META: {item.metaAnual}%</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <ActivityDetailModal 
                isOpen={!!selectedActivity} 
                onClose={handleCloseModal} 
                activityData={selectedActivity} 
            />
        </div>
    );
}

