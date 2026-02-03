
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
    bgColor: "bg-[hsl(var(--chart-2))]",
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
    bgColor: "bg-[hsl(var(--chart-3))]",
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
    bgColor: "bg-[hsl(var(--chart-4))]",
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
    bgColor: "bg-[hsl(var(--chart-5))]",
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
    bgColor: "bg-[hsl(var(--chart-1))]",
    hoverBg: "hover:bg-[hsl(var(--chart-1))]/5",
    hoverBorder: "hover:border-[hsl(var(--chart-1))]/40",
    items: [
      { id: 'rec_reclamos', nombre: 'Reclamos', icon: Receipt, metaAnual: 2 },
    ]
  }
];

const TDE_EFECTIVIDAD_DATA: Record<string, number[]> = {
  comas: [96.1, 93.2, 94.5, 95.8, 95.6, 97.0, 97.0, 96.9, 96.2, 96.8],
  callao: [98.0, 98.8, 99.0, 98.9, 99.0, 98.8, 98.0, 97.0, 98.1, 98.9],
  ate: [98.5, 98.6, 98.2, 98.3, 98.2, 97.2, 97.5, 98.3, 98.5, 98.6],
  brena: [98.3, 98.6, 98.7, 98.8, 97.4, 98.0, 98.2, 98.5, 97.1, 98.4],
  sjl: [96.6, 99.1, 99.0, 98.5, 98.4, 99.0, 98.9, 99.0, 98.9, 99.3],
  surquillo: [99.1, 98.2, 98.8, 98.7, 98.1, 97.7, 98.4, 98.6, 98.7, 98.6],
  ves: [98.4, 98.6, 98.3, 98.1, 97.7, 96.9, 96.7, 98.0, 98.1, 98.0],
  'clientes-e': [96.3, 94.8, 95.5, 95.4, 94.6, 94.3, 96.6, 96.2, 95.6, 95.9],
};

const MONTHS = ['Abr\'25', 'May\'25', 'Jun\'25', 'Jul\'25', 'Ago\'25', 'Set\'25', 'Oct\'25', 'Nov\'25', 'Dic\'25', 'Ene\'26'];

export default function ReporteAnualPage() {
    const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
    const [currentBase, setCurrentBase] = useState('todas');

    const handleCardClick = (activity: any) => {
        let values: number[] = [];
        
        if (activity.id === 'tde_efectividad') {
            if (currentBase === 'todas') {
                values = MONTHS.map((_, i) => {
                    const allVals = Object.values(TDE_EFECTIVIDAD_DATA).map(b => b[i]);
                    return Number((allVals.reduce((a, b) => a + b, 0) / allVals.length).toFixed(1));
                });
            } else {
                values = TDE_EFECTIVIDAD_DATA[currentBase] || [];
            }
        } else {
            values = MONTHS.map(() => Math.floor(Math.random() * 10) + (activity.metaAnual - 5));
        }

        const isBaseSelected = currentBase !== 'todas';
        const detail = {
            nombre: activity.nombre,
            promedioAnual: Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)),
            metaAnual: activity.metaAnual,
            historicoMensual: MONTHS.map((m, i) => ({ mes: m, valor: values[i], meta: activity.metaAnual })),
            detalleTabla: isBaseSelected 
                ? MONTHS.map((m, i) => ({ label: m, valor: values[i] }))
                : Object.entries(TDE_EFECTIVIDAD_DATA).map(([key, val]) => ({
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' '),
                    valor: val[val.length - 1]
                })),
            tituloTabla: isBaseSelected ? `Detalle de ${currentBase.charAt(0).toUpperCase() + currentBase.slice(1)}` : "Detalle por Sede",
            columnaLabel: isBaseSelected ? "Mes" : "Sede"
        };
        setSelectedActivity(detail);
    };

    const handleCloseModal = () => {
        setSelectedActivity(null);
    };

    const handleBaseChange = (base: string) => {
        setCurrentBase(base);
        setSelectedActivity(null);
    };

    const getIndicatorValue = (id: string, metaAnual: number) => {
        if (id === 'tde_efectividad') {
            if (currentBase === 'todas') {
                const allLastMonthVals = Object.values(TDE_EFECTIVIDAD_DATA).map(b => b[b.length - 1]);
                return Number((allLastMonthVals.reduce((a, b) => a + b, 0) / allLastMonthVals.length).toFixed(1));
            }
            const baseVals = TDE_EFECTIVIDAD_DATA[currentBase];
            return baseVals ? baseVals[baseVals.length - 1] : 0;
        }
        return Math.floor(Math.random() * 10) + (metaAnual - 5);
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
                            {cat.items.map((item) => {
                                const val = getIndicatorValue(item.id, item.metaAnual);
                                return (
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
                                                    {val}%
                                                </span>
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Actual</span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full opacity-90 transition-all ${cat.bgColor}`} 
                                                        style={{ width: `${Math.min(100, val)}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap uppercase">Meta: {item.metaAnual}%</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
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
