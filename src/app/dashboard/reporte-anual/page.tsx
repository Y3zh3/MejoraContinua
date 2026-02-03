
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityDetailModal } from '@/components/activity-detail-modal';
import { BaseSelector } from '@/components/base-selector';
import { Separator } from "@/components/ui/separator";
import { 
  Handshake, 
  Activity, 
  Megaphone, 
  ClipboardList, 
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
  Receipt
} from 'lucide-react';

const annualSummary = [
  {
    id: 'persuasivas_anual',
    nombre: 'Persuasivas',
    icon: Handshake,
    promedioAnual: 85,
    metaAnual: 90,
    historicoMensual: [
      { mes: 'Ene', valor: 75, meta: 90 }, { mes: 'Feb', valor: 78, meta: 90 }, { mes: 'Mar', valor: 82, meta: 90 },
      { mes: 'Abr', valor: 85, meta: 90 }, { mes: 'May', valor: 88, meta: 90 }, { mes: 'Jun', valor: 90, meta: 90 },
      { mes: 'Jul', valor: 91, meta: 90 }, { mes: 'Ago', valor: 89, meta: 90 }, { mes: 'Sep', valor: 87, meta: 90 },
      { mes: 'Oct', valor: 92, meta: 90 }, { mes: 'Nov', valor: 94, meta: 90 }, { mes: 'Dic', valor: 95, meta: 90 },
    ],
    detalleSedes: [
      { sede: 'Comas', valor: 88 }, { sede: 'Callao', valor: 82 }, { sede: 'Ate', valor: 91 },
      { sede: 'Breña', valor: 85 }, { sede: 'SJL', valor: 79 }, { sede: 'Surquillo', valor: 89 },
      { sede: 'VES', valor: 93 }, { sede: 'Clientes Especiales', valor: 95 },
    ],
  },
  {
    id: 'toma_de_estado_anual',
    nombre: 'Toma de Estado',
    icon: Activity,
    promedioAnual: 98.5,
    metaAnual: 95,
    historicoMensual: [
        { mes: 'Ene', valor: 98, meta: 95 }, { mes: 'Feb', valor: 99, meta: 95 }, { mes: 'Mar', valor: 97, meta: 95 },
        { mes: 'Abr', valor: 98.5, meta: 95 }, { mes: 'May', valor: 99.5, meta: 95 }, { mes: 'Jun', valor: 98, meta: 95 },
        { mes: 'Jul', valor: 99, meta: 95 }, { mes: 'Ago', valor: 98.2, meta: 95 }, { mes: 'Sep', valor: 97.5, meta: 95 },
        { mes: 'Oct', valor: 98.8, meta: 95 }, { mes: 'Nov', valor: 99.2, meta: 95 }, { mes: 'Dic', valor: 100, meta: 95 },
    ],
    detalleSedes: [
        { sede: 'Comas', valor: 99 }, { sede: 'Callao', valor: 98 }, { sede: 'Ate', valor: 97 },
        { sede: 'Breña', valor: 98.5 }, { sede: 'SJL', valor: 99.5 }, { sede: 'Surquillo', valor: 97 },
        { sede: 'VES', valor: 98 }, { sede: 'Clientes Especiales', valor: 100 },
    ],
  },
  {
    id: 'comunicados_anual',
    nombre: 'Comunicados',
    icon: Megaphone,
    promedioAnual: 72,
    metaAnual: 80,
    historicoMensual: [
        { mes: 'Ene', valor: 65, meta: 80 }, { mes: 'Feb', valor: 68, meta: 80 }, { mes: 'Mar', valor: 70, meta: 80 },
        { mes: 'Abr', valor: 72, meta: 80 }, { mes: 'May', valor: 75, meta: 80 }, { mes: 'Jun', valor: 71, meta: 80 },
        { mes: 'Jul', valor: 78, meta: 80 }, { mes: 'Ago', valor: 79, meta: 80 }, { mes: 'Sep', valor: 81, meta: 80 },
        { mes: 'Oct', valor: 80, meta: 80 }, { mes: 'Nov', valor: 77, meta: 80 }, { mes: 'Dic', valor: 75, meta: 80 },
    ],
    detalleSedes: [
        { sede: 'Comas', valor: 75 }, { sede: 'Callao', valor: 68 }, { sede: 'Ate', valor: 72 },
        { sede: 'Breña', valor: 80 }, { sede: 'SJL', valor: 65 }, { sede: 'Surquillo', valor: 78 },
        { sede: 'VES', valor: 70 }, { sede: 'Clientes Especiales', valor: 82 },
    ],
  },
  {
    id: 'inspecciones_anual',
    nombre: 'Inspecciones',
    icon: ClipboardList,
    promedioAnual: 94,
    metaAnual: 90,
    historicoMensual: [
        { mes: 'Ene', valor: 90, meta: 90 }, { mes: 'Feb', valor: 92, meta: 90 }, { mes: 'Mar', valor: 95, meta: 90 },
        { mes: 'Abr', valor: 93, meta: 90 }, { mes: 'May', valor: 94, meta: 90 }, { mes: 'Jun', valor: 96, meta: 90 },
        { mes: 'Jul', valor: 91, meta: 90 }, { mes: 'Ago', valor: 94, meta: 90 }, { mes: 'Sep', valor: 95, meta: 90 },
        { mes: 'Oct', valor: 97, meta: 90 }, { mes: 'Nov', valor: 98, meta: 90 }, { mes: 'Dic', valor: 99, meta: 90 },
    ],
    detalleSedes: [
        { sede: 'Comas', valor: 95 }, { sede: 'Callao', valor: 92 }, { sede: 'Ate', valor: 96 },
        { sede: 'Breña', valor: 90 }, { sede: 'SJL', valor: 94 }, { sede: 'Surquillo', valor: 97 },
        { sede: 'VES', valor: 93 }, { sede: 'Clientes Especiales', valor: 99 },
    ],
  },
];

const categories = [
  {
    title: "Toma de Estado",
    items: [
      { id: 'tde_efectividad', nombre: 'Efectividad', icon: TrendingUp, metaAnual: 98.5 },
      { id: 'tde_contratista', nombre: 'Contratista', icon: HardHat, metaAnual: 15 },
      { id: 'tde_incidencias', nombre: 'Incidencias de Fotografía', icon: CameraOff, metaAnual: 5 },
    ]
  },
  {
    title: "Comunicados",
    items: [
      { id: 'com_atipicas', nombre: 'Atípicas', icon: AlertTriangle, metaAnual: 85 },
      { id: 'com_preventivas', nombre: 'Preventivas', icon: ShieldCheck, metaAnual: 85 },
      { id: 'com_cierres', nombre: 'Cierres', icon: CircleOff, metaAnual: 15 },
    ]
  },
  {
    title: "Inspecciones",
    items: [
      { id: 'ins_atipicas', nombre: 'Atípicas', icon: AlertTriangle, metaAnual: 85 },
      { id: 'ins_reclamos', nombre: 'Reclamos', icon: FileWarning, metaAnual: 85 },
    ]
  },
  {
    title: "Persuasivas",
    items: [
      { id: 'per_eficiencia', nombre: 'Eficiencia', icon: Gauge, metaAnual: 98 },
      { id: 'per_24h', nombre: 'Eficacia 24H', icon: Clock4, metaAnual: 70 },
      { id: 'per_48h', nombre: 'Eficacia 48H', icon: Clock9, metaAnual: 70 },
      { id: 'per_reclamos', nombre: 'Reclamos', icon: FileWarning, metaAnual: 5 },
    ]
  },
  {
    title: "Recibos",
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
    const [summary, setSummary] = useState(annualSummary);
    const [selectedActivity, setSelectedActivity] = useState<any | null>(null);

    const handleCardClick = (activity: any) => {
        // If it's a summary card, it already has the detail. If it's a category card, generate mock detail.
        const detail = activity.historicoMensual ? activity : generateMockDetail(activity.nombre, activity.metaAnual);
        setSelectedActivity(detail);
    };

    const handleCloseModal = () => {
        setSelectedActivity(null);
    };

    const handleBaseChange = (base: string) => {
        setSummary(annualSummary.map(activity => ({
            ...activity,
            promedioAnual: Math.floor(Math.random() * 20) + 75
        })));
        setSelectedActivity(null);
    };

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto pb-12">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="font-headline text-4xl font-bold text-primary">Cuadros de Mando Anuales</h1>
                    <p className="text-xl text-muted-foreground">Visión 360° de los indicadores de gestión operativa.</p>
                </div>
                <BaseSelector onBaseChange={handleBaseChange} />
            </div>

            {/* Top Annual Summary */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {summary.map((activity) => (
                    <Card 
                        key={activity.id} 
                        className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50 group"
                        onClick={() => handleCardClick(activity)}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                             <CardTitle className="text-lg font-headline text-muted-foreground group-hover:text-primary transition-colors">
                                {activity.nombre}
                             </CardTitle>
                             <activity.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-bold text-primary">{activity.promedioAnual}%</div>
                            <p className="text-sm text-muted-foreground mt-1 font-medium">Promedio Anual</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Categorized Indicators */}
            <div className="flex flex-col gap-10">
                {categories.map((cat) => (
                    <div key={cat.title} className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <h2 className="font-headline text-2xl font-bold text-foreground whitespace-nowrap">{cat.title}</h2>
                            <Separator className="flex-1" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cat.items.map((item) => (
                                <Card 
                                    key={item.id} 
                                    className="cursor-pointer hover:bg-primary/5 transition-all border border-border/60 hover:border-primary/40 group"
                                    onClick={() => handleCardClick(item)}
                                >
                                    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                                        <CardTitle className="text-base font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                                            {item.nombre}
                                        </CardTitle>
                                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </CardHeader>
                                    <CardContent className="px-4 pb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                {Math.floor(Math.random() * 15) + (item.metaAnual - 5)}%
                                            </span>
                                            <span className="text-xs text-muted-foreground">Promedio</span>
                                        </div>
                                        <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                                            Meta: {item.metaAnual}%
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
