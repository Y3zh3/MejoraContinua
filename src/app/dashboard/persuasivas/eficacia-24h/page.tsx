"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock4 } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";

const initialWeeklyData = [
  { name: 'Semana 1', value: 92, meta: 95 },
  { name: 'Semana 2', value: 94, meta: 95 },
  { name: 'Semana 3', value: 95, meta: 95 },
  { name: 'Semana 4', value: 96, meta: 95 },
];


export default function Eficacia24hPersuasivasPage() {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);

  const handleBaseChange = () => {
    setWeeklyData(initialWeeklyData.map(d => ({...d, value: Math.floor(Math.random() * 9) + 90 })));
  };
  
  const avgValue = Math.round(weeklyData.reduce((acc, item) => acc + item.value, 0) / weeklyData.length);
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Clock4 className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Persuasivas: Eficacia 24H</h1>
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
                <YAxis domain={[80, 100]} unit="%"/>
                <Tooltip
                    contentStyle={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    }}
                    formatter={(value: number) => `${value}%`}
                />
                <Legend />
                <Bar dataKey="value" name="Eficacia" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
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
                    Análisis del indicador de <span className="font-semibold text-foreground">Eficacia 24H</span> para el periodo de <span className="font-semibold text-foreground">Enero 2025</span>.
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
                    <p className="text-sm text-muted-foreground">La eficacia a 24 horas muestra una tendencia positiva y se acerca a la meta. Se deben reforzar las acciones para asegurar el cumplimiento.</p>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
