
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
  Handshake,
  CheckCircle2
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
      { id: 'com_efectividad', nombre: 'Efectividad', icon: CheckCircle2, metaAnual: 85 },
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

const TDE_CONTRATISTA_DATA: Record<string, number[]> = {
  comas: [23, 13, 15, 21, 19, 21, 20, 21, 17, 22],
  callao: [22, 11, 14, 10, 10, 9, 8, 9, 15, 17],
  ate: [42, 39, 34, 37, 37, 25, 30, 46, 46, 50],
  brena: [33, 30, 33, 31, 19, 21, 29, 27, 17, 28],
  sjl: [10, 11, 13, 8, 10, 12, 12, 13, 11, 12],
  surquillo: [20, 15, 20, 18, 13, 12, 15, 15, 14, 16],
  ves: [38, 35, 27, 21, 19, 15, 14, 19, 27, 20],
  'clientes-e': [45, 46, 45, 59, 54, 29, 40, 32, 27, 26],
};

const TDE_INCIDENCIAS_DATA: Record<string, number[]> = {
  comas: [8, 9, 11, 12, 10, 11, 9, 10, 23, 10],
  callao: [15, 12, 14, 13, 15, 16, 14, 15, 57, 29],
  ate: [10, 11, 12, 11, 10, 12, 11, 10, 24, 17],
  brena: [5, 4, 6, 5, 4, 5, 6, 5, 12, 1],
  sjl: [2, 1, 3, 2, 1, 2, 3, 2, 3, 0],
  surquillo: [4, 5, 6, 5, 4, 5, 6, 5, 6, 5],
  ves: [15, 14, 16, 15, 14, 15, 16, 15, 20, 2],
  'clientes-e': [2, 1, 3, 2, 1, 2, 3, 2, 1, 1],
};

const COM_ATIPICAS_DATA: Record<string, number[]> = {
  comas: [42, 36, 45, 66, 68, 72, 84, 82, 83, 84],
  callao: [50, 55, 49, 53, 83, 85, 82, 83, 83, 86],
  ate: [38, 70, 78, 77, 85, 83, 82, 83, 85, 90],
  brena: [28, 38, 58, 58, 62, 68, 76, 75, 82, 84],
  sjl: [75, 75, 81, 86, 81, 79, 81, 80, 88, 73],
  surquillo: [50, 47, 61, 81, 81, 84, 84, 78, 86, 89],
  ves: [8, 31, 45, 42, 45, 66, 63, 58, 56, 43],
  'clientes-e': [100, 100, 90, 100, 100, 88, 82, 89, 100, 100],
};

const COM_PREVENTIVAS_DATA: Record<string, number[]> = {
  comas: [84, 83, 84, 82, 82, 81, 80, 79, 78, 80],
  callao: [86, 85, 83, 87, 83, 80, 82, 82, 87, 86],
  ate: [84, 78, 82, 85, 78, 79, 75, 80, 81, 83],
  brena: [71, 66, 68, 70, 69, 70, 70, 70, 70, 73],
  sjl: [80, 83, 85, 86, 81, 83, 85, 83, 85, 82],
  surquillo: [81, 82, 81, 83, 83, 82, 82, 80, 82, 81],
  ves: [73, 73, 78, 79, 78, 79, 77, 78, 78, 75],
  'clientes-e': [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
};

const COM_CIERRES_DATA: Record<string, number[]> = {
  comas: [57, 33, 39, 59, 100, 100, 100, 100, 100, 100],
  callao: [33, 41, 29, 39, 12, 43, 23, 22, 20, 18],
  ate: [68, 54, 61, 63, 55, 61, 77, 57, 56, 51],
  brena: [17, 21, 14, 15, 21, 21, 11, 12, 7, 12],
  sjl: [26, 30, 41, 31, 30, 35, 32, 28, 31, 13],
  surquillo: [51, 24, 26, 41, 43, 27, 22, 39, 43, 22],
  ves: [74, 65, 49, 44, 50, 48, 42, 45, 47, 51],
  'clientes-e': [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
};

const COM_EFECTIVIDAD_DATA: Record<string, number[]> = {
  comas: [38, 36, 32, 24, 29, 38, 43, 38, 35, 32],
  callao: [25, 27, 24, 32, 34, 26, 27, 25, 28, 30],
  ate: [37, 43, 31, 32, 37, 38, 38, 51, 45, 42],
  brena: [16, 23, 24, 23, 19, 24, 25, 15, 20, 22],
  sjl: [53, 53, 53, 57, 51, 51, 49, 48, 52, 54],
  surquillo: [48, 53, 53, 53, 52, 50, 49, 54, 51, 53],
  ves: [7, 18, 26, 20, 18, 20, 23, 19, 21, 24],
  'clientes-e': [74, 68, 70, 71, 77, 75, 73, 72, 70, 71],
};

const INS_ATIPICAS_DATA: Record<string, number[]> = {
  comas: [77, 80, 85, 84, 79, 78, 80, 83, 74, 83],
  callao: [78, 83, 85, 87, 88, 87, 80, 89, 86, 88],
  ate: [58, 69, 73, 70, 70, 70, 67, 66, 65, 67],
  brena: [69, 76, 81, 76, 77, 82, 83, 83, 80, 85],
  sjl: [81, 80, 87, 90, 91, 88, 89, 90, 89, 89],
  surquillo: [62, 62, 74, 76, 77, 78, 77, 75, 71, 77],
  ves: [50, 60, 75, 78, 80, 81, 78, 77, 66, 63],
  'clientes-e': [25, 82, 100, 75, 100, 82, 64, 100, 40, 56],
};

const INS_RECLAMOS_DATA: Record<string, number[]> = {
  comas: [77, 83, 83, 81, 79, 78, 80, 80, 79, 79],
  callao: [85, 86, 86, 84, 86, 87, 88, 87, 85, 88],
  ate: [80, 81, 80, 81, 80, 83, 81, 80, 79, 80],
  brena: [79, 82, 81, 80, 82, 83, 82, 82, 78, 80],
  sjl: [77, 78, 75, 73, 75, 82, 77, 79, 73, 83],
  surquillo: [78, 78, 79, 82, 80, 81, 80, 82, 82, 81],
  ves: [72, 75, 76, 76, 77, 72, 74, 68, 69, 74],
  'clientes-e': [82, 85, 85, 85, 84, 80, 84, 86, 74, 91],
};

const PER_EFICIENCIA_DATA: Record<string, number[]> = {
  comas: [96, 93, 95, 95, 96, 97, 95, 93, 94, 88],
  callao: [93, 94, 96, 90, 92, 93, 95, 93, 89, 89],
  ate: [95, 93, 96, 93, 94, 97, 95, 95, 94, 93],
  brena: [95, 96, 98, 93, 95, 97, 95, 88, 94, 94],
  sjl: [99, 100, 100, 97, 99, 100, 100, 97, 99, 98],
  surquillo: [97, 95, 99, 89, 96, 97, 97, 93, 93, 87],
  ves: [93, 91, 95, 91, 95, 98, 95, 93, 91, 91],
  'clientes-e': [88, 98, 96, 94, 94, 94, 92, 97, 90, 88],
};

const PER_24H_DATA: Record<string, number[]> = {
  comas: [45, 46, 44, 53, 42, 54, 52, 62, 59, 60],
  callao: [44, 47, 48, 47, 49, 50, 46, 56, 50, 62],
  ate: [53, 49, 52, 51, 47, 52, 55, 60, 45, 45],
  brena: [53, 56, 58, 56, 58, 61, 57, 63, 58, 66],
  sjl: [54, 56, 51, 55, 55, 57, 61, 65, 65, 68],
  surquillo: [60, 55, 53, 57, 61, 63, 57, 62, 58, 62],
  ves: [53, 53, 51, 51, 52, 51, 47, 54, 55, 55],
  'clientes-e': [18, 14, 17, 34, 28, 8, 22, 11, 22, 0],
};

const PER_48H_DATA: Record<string, number[]> = {
  comas: [51, 53, 53, 61, 53, 65, 62, 69, 67, 68],
  callao: [52, 53, 55, 56, 57, 59, 55, 63, 57, 67],
  ate: [59, 56, 60, 60, 59, 62, 63, 66, 55, 66],
  brena: [60, 61, 65, 63, 64, 68, 64, 69, 65, 76],
  sjl: [61, 64, 58, 64, 65, 68, 70, 73, 73, 79],
  surquillo: [67, 61, 65, 67, 71, 72, 68, 72, 66, 74],
  ves: [60, 60, 61, 63, 61, 62, 58, 65, 64, 66],
  'clientes-e': [25, 42, 17, 45, 32, 9, 25, 14, 21, 7],
};

const PER_RECLAMOS_DATA: Record<string, number[]> = {
  comas: [38, 43, 17, 24, 21, 20, 23, 28, 32, 17],
  callao: [4, 6, 7, 5, 4, 1, 10, 4, 2, 6],
  ate: [5, 5, 14, 3, 6, 3, 4, 1, 0, 5],
  brena: [6, 3, 5, 1, 3, 0, 3, 3, 2, 5],
  sjl: [0, 0, 2, 2, 0, 1, 1, 3, 0, 0],
  surquillo: [13, 12, 8, 22, 13, 4, 10, 4, 4, 2],
  ves: [14, 1, 6, 3, 2, 4, 7, 11, 9, 2],
  'clientes-e': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const REC_RECLAMOS_DATA: Record<string, number[]> = {
  comas: [145, 138, 127, 130, 114, 97, 71, 36, 31, 10],
  callao: [34, 25, 20, 16, 12, 13, 13, 12, 9, 13],
  ate: [17, 15, 9, 11, 11, 13, 13, 11, 6, 5],
  brena: [12, 12, 12, 5, 7, 7, 7, 8, 3, 3],
  sjl: [16, 13, 18, 13, 7, 11, 4, 9, 7, 6],
  surquillo: [12, 12, 11, 13, 12, 2, 2, 4, 4, 1],
  ves: [4, 6, 11, 7, 0, 1, 0, 3, 13, 0],
  'clientes-e': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const MONTHS = ['Abr\'25', 'May\'25', 'Jun\'25', 'Jul\'25', 'Ago\'25', 'Set\'25', 'Oct\'25', 'Nov\'25', 'Dic\'25', 'Ene\'26'];

export default function ReporteAnualPage() {
    const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
    const [currentBase, setCurrentBase] = useState('todas');

    const handleCardClick = (activity: any) => {
        let values: number[] = [];
        let dataToUse: Record<string, number[]> | null = null;
        
        if (activity.id === 'tde_efectividad') dataToUse = TDE_EFECTIVIDAD_DATA;
        else if (activity.id === 'tde_contratista') dataToUse = TDE_CONTRATISTA_DATA;
        else if (activity.id === 'tde_incidencias') dataToUse = TDE_INCIDENCIAS_DATA;
        else if (activity.id === 'com_atipicas') dataToUse = COM_ATIPICAS_DATA;
        else if (activity.id === 'com_preventivas') dataToUse = COM_PREVENTIVAS_DATA;
        else if (activity.id === 'com_cierres') dataToUse = COM_CIERRES_DATA;
        else if (activity.id === 'com_efectividad') dataToUse = COM_EFECTIVIDAD_DATA;
        else if (activity.id === 'ins_atipicas') dataToUse = INS_ATIPICAS_DATA;
        else if (activity.id === 'ins_reclamos') dataToUse = INS_RECLAMOS_DATA;
        else if (activity.id === 'per_eficiencia') dataToUse = PER_EFICIENCIA_DATA;
        else if (activity.id === 'per_24h') dataToUse = PER_24H_DATA;
        else if (activity.id === 'per_48h') dataToUse = PER_48H_DATA;
        else if (activity.id === 'per_reclamos') dataToUse = PER_RECLAMOS_DATA;
        else if (activity.id === 'rec_reclamos') dataToUse = REC_RECLAMOS_DATA;

        if (dataToUse) {
            if (currentBase === 'todas') {
                values = MONTHS.map((_, i) => {
                    const allVals = Object.values(dataToUse!).map(b => b[i]).filter(v => v !== undefined);
                    return allVals.length > 0 ? Number((allVals.reduce((a, b) => a + b, 0) / allVals.length).toFixed(1)) : 0;
                });
            } else {
                values = dataToUse[currentBase] || [];
            }
        } else {
            values = MONTHS.map(() => Math.floor(Math.random() * 10) + (activity.metaAnual - 5));
        }

        const isBaseSelected = currentBase !== 'todas';
        const unit = (activity.id === 'per_reclamos' || activity.id === 'rec_reclamos') ? 'uds.' : '%';
        
        const detail = {
            nombre: activity.nombre,
            promedioAnual: Number((values.filter(v => v > 0).reduce((a, b) => a + b, 0) / values.filter(v => v > 0).length).toFixed(1)),
            metaAnual: activity.metaAnual,
            unidad: unit,
            historicoMensual: MONTHS.map((m, i) => ({ mes: m, valor: values[i] || 0, meta: activity.metaAnual })),
            detalleTabla: isBaseSelected 
                ? MONTHS.map((m, i) => ({ label: m, valor: values[i] || 0 }))
                : (dataToUse ? Object.entries(dataToUse) : []).map(([key, val]) => ({
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
        let dataToUse: Record<string, number[]> | null = null;
        if (id === 'tde_efectividad') dataToUse = TDE_EFECTIVIDAD_DATA;
        else if (id === 'tde_contratista') dataToUse = TDE_CONTRATISTA_DATA;
        else if (id === 'tde_incidencias') dataToUse = TDE_INCIDENCIAS_DATA;
        else if (id === 'com_atipicas') dataToUse = COM_ATIPICAS_DATA;
        else if (id === 'com_preventivas') dataToUse = COM_PREVENTIVAS_DATA;
        else if (id === 'com_cierres') dataToUse = COM_CIERRES_DATA;
        else if (id === 'com_efectividad') dataToUse = COM_EFECTIVIDAD_DATA;
        else if (id === 'ins_atipicas') dataToUse = INS_ATIPICAS_DATA;
        else if (id === 'ins_reclamos') dataToUse = INS_RECLAMOS_DATA;
        else if (id === 'per_eficiencia') dataToUse = PER_EFICIENCIA_DATA;
        else if (id === 'per_24h') dataToUse = PER_24H_DATA;
        else if (id === 'per_48h') dataToUse = PER_48H_DATA;
        else if (id === 'per_reclamos') dataToUse = PER_RECLAMOS_DATA;
        else if (id === 'rec_reclamos') dataToUse = REC_RECLAMOS_DATA;

        if (dataToUse) {
            if (currentBase === 'todas') {
                const allLastMonthVals = Object.values(dataToUse).map(b => b[b.length - 1]).filter(v => v !== undefined);
                return allLastMonthVals.length > 0 ? Number((allLastMonthVals.reduce((a, b) => a + b, 0) / allLastMonthVals.length).toFixed(1)) : 0;
            }
            const baseVals = dataToUse[currentBase];
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
                                const isUnit = (item.id === 'per_reclamos' || item.id === 'rec_reclamos');
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
                                                    {val > 0 ? `${val}${isUnit ? ' uds.' : '%'}` : '-%'}
                                                </span>
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Anual</span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full opacity-90 transition-all ${cat.bgColor}`} 
                                                        style={{ width: `${Math.min(100, val)}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap uppercase">Meta: {item.metaAnual}{isUnit ? ' uds.' : '%'}</span>
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
