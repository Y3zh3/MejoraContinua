"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityDetailModal } from '@/components/activity-detail-modal';
import { Handshake, Activity, Megaphone, ClipboardList } from 'lucide-react';

const mockData = [
  {
    id: 'persuasivas',
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
    id: 'toma_de_estado',
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
    id: 'comunicados',
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
    id: 'inspecciones',
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

type ActivityData = typeof mockData[0];

export default function ReporteAnualPage() {
    const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(null);

    const handleCardClick = (activity: ActivityData) => {
        setSelectedActivity(activity);
    };

    const handleCloseModal = () => {
        setSelectedActivity(null);
    };

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Cuadros de Mando Anuales</h1>
                <p className="text-muted-foreground">Resumen de indicadores por grupo de actividad.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {mockData.map((activity) => (
                    <Card key={activity.id} className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary" onClick={() => handleCardClick(activity)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                             <CardTitle className="text-xl font-headline">{activity.nombre}</CardTitle>
                             <activity.icon className="h-6 w-6 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-bold text-primary">{activity.promedioAnual}%</div>
                            <p className="text-xs text-muted-foreground">Promedio Anual Actual</p>
                        </CardContent>
                    </Card>
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
