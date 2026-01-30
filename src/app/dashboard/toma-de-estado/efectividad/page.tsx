"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";

const initialWeeklyData = [
  { name: 'Semana 1', value: 98, meta: 99 },
  { name: 'Semana 2', value: 99, meta: 99 },
  { name: 'Semana 3', value: 98, meta: 99 },
  { name: 'Semana 4', value: 100, meta: 99 },
];

export default function EfectividadTomaDeEstadoPage() {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);

  const handleBaseChange = () => {
    setWeeklyData(initialWeeklyData.map(d => ({...d, value: Math.floor(Math.random() * 4) + 97 })));
  };
  
  const avgValue = Math.round(weeklyData.reduce((acc, item) => acc + item.value, 0) / weeklyData.length);
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Toma de Estado: Efectividad</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Rendimiento - Enero 2025</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[95, 100]} unit="%"/>
                <Tooltip
                    contentStyle={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    }}
                    formatter={(value: number) => `${value}%`}
                />
                <Legend />
                <Bar dataKey="value" name="Rendimiento" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta" fill="hsl(var(--border))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-6">
                <p className="text-muted-foreground">
                    Análisis del indicador de <span className="font-semibold text-foreground">Efectividad</span> para el periodo de <span className="font-semibold text-foreground">Enero 2025</span>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Promedio del periodo</p>
                        <p className="text-3xl font-bold text-primary">{avgValue}%</p>
                    </div>
                     <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Meta establecida</p>
                        <p className="text-3xl font-bold">{weeklyData[0].meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold">Observaciones</h4>
                    <p className="text-sm text-muted-foreground">La efectividad es extremadamente alta, muy cerca o alcanzando el 100%. El proceso es robusto y se ejecuta con un alto grado de precisión.</p>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
