
"use client";

import { ActivitySummary, type Activity } from "@/components/activity-summary";
import { Megaphone, ClipboardList, Handshake, Siren, Activity as ActivityIcon, Droplet } from "lucide-react";


export default function DashboardPage() {
    // Mock data based on the new architecture
    const activities: Activity[] = [
        {
            name: "Toma de Estado",
            kpis: [
                { id: 'ts1', indicador: "% Efectividad", sede: "Promedio", valor: 98.5, meta: 95, icon: Droplet, description: "Efectividad de lectura" },
                { id: 'ts2', indicador: "INCIDENCIA: Relecturas", sede: "Promedio", valor: 3, meta: 5, icon: Droplet, description: "Menor es mejor (%)" },
            ]
        },
        {
            name: "Comunicados",
            kpis: [
                { id: 'c1', indicador: "% Eficacia Entrega", sede: "Promedio", valor: 72, meta: 80, icon: Megaphone, description: "Eficacia de entrega" },
                { id: 'c2', indicador: "INCIDENCIA: Cartas 'Bajo Puerta'", sede: "Promedio", valor: 113, meta: 100, icon: Megaphone, description: "Menor es mejor" },
            ]
        },
        {
            name: "Inspecciones",
            kpis: [
                { id: 'i1', indicador: "Inspecciones Realizadas", sede: "Promedio", valor: 340, meta: 300, icon: ClipboardList, description: "Total realizadas" },
                { id: 'i2', indicador: "INCIDENCIA: No Conformidades", sede: "Promedio", valor: 15, meta: 20, icon: ClipboardList, description: "Menor es mejor" },
            ]
        },
        {
            name: "Acuerdos Persuasivos",
            kpis: [
                { id: 'p1', indicador: "Acuerdos Logrados", sede: "Promedio", valor: 128, meta: 120, icon: Handshake, description: "Total acuerdos" },
                { id: 'p2', indicador: "RECLAMO: Tasa de Incumplimiento", sede: "Promedio", valor: 8, meta: 10, icon: Handshake, description: "Menor es mejor (%)" },
            ]
        },
        {
            name: "Emergencias",
            kpis: [
                { id: 'e1', indicador: "Emergencias Atendidas", sede: "Promedio", valor: 42, meta: 40, icon: Siren, description: "Total atendidas" },
                { id: 'e2', indicador: "RECLAMO: Tiempo de Respuesta (h)", sede: "Promedio", valor: 2, meta: 3, icon: Siren, description: "Menor es mejor" },
            ]
        },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Dashboard de Gestión Operativa</h1>
                <p className="text-muted-foreground">Capa de Resumen por Actividad (High-Level)</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activities.map(activity => <ActivitySummary key={activity.name} activity={activity} />)}
            </div>
        </div>
    );
}
