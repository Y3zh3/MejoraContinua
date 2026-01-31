"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import { Gauge } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";

const initialWeeklyData = [
  { name: 'Semana 1', value: 85, meta: 90 },
  { name: 'Semana 2', value: 88, meta: 90 },
  { name: 'Semana 3', value: 87, meta: 90 },
  { name: 'Semana 4', value: 91, meta: 90 },
];

export default function EficienciaPersuasivasPage() {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);

  const handleBaseChange = () => {
    setWeeklyData(initialWeeklyData.map(d => ({...d, value: Math.floor(Math.random() * 11) + 85 })));
  };
  
  const avgValue = Math.round(weeklyData.reduce((acc, item) => acc + item.value, 0) / weeklyData.length);
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Gauge className="h-8 w-8 text-[hsl(var(--chart-1))]" />
          <h1 className="font-headline text-3xl font-bold">Persuasivas: Eficiencia</h1>
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
                <AreaChart data={weeklyData}>
                  <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                      </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[70, 100]} unit="%"/>
                  <Tooltip
                      contentStyle={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      }}
                      formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="value" name="Eficiencia" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorValue)" />
                  <Line type="monotone" dataKey="meta" name="Meta" stroke="hsl(var(--border))" strokeDasharray="5 5" />
                </AreaChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-6">
                <p className="text-muted-foreground">
                    Análisis del indicador de <span className="font-semibold text-foreground">Eficiencia</span> para el periodo de <span className="font-semibold text-foreground">Enero 2025</span>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Promedio del periodo</p>
                        <p className="text-3xl font-bold text-[hsl(var(--chart-1))]">{avgValue}%</p>
                    </div>
                     <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Meta establecida</p>
                        <p className="text-3xl font-bold">{weeklyData[0].meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold">Observaciones</h4>
                    <p className="text-sm text-muted-foreground">La eficiencia ha mejorado a lo largo del mes, superando la meta en la última semana. Se debe mantener la estrategia actual.</p>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
