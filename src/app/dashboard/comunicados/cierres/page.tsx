
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import { CircleOff } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";

const initialWeeklyData = [
  { name: 'Semana 1', value: 98, meta: 99 },
  { name: 'Semana 2', value: 99, meta: 99 },
  { name: 'Semana 3', value: 97, meta: 99 },
  { name: 'Semana 4', value: 100, meta: 99 },
];

export default function CierresComunicadosPage() {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);

  const handleBaseChange = () => {
    setWeeklyData(initialWeeklyData.map(d => ({...d, value: Math.floor(Math.random() * 6) + 95 })));
  };

  const avgValue = Math.round(weeklyData.reduce((acc, item) => acc + item.value, 0) / weeklyData.length);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CircleOff className="h-8 w-8 text-[hsl(var(--chart-3))]" />
          <h1 className="font-headline text-3xl font-bold">Comunicados: Cierres</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10">
            <CardHeader className="p-4">
                <CardTitle>Rendimiento - Enero 2025</CardTitle>
            </CardHeader>
            <CardContent className="h-96 p-2">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                      </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[90, 100]} unit="%"/>
                  <Tooltip
                      contentStyle={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      }}
                      formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="value" name="Efectividad" stroke="hsl(var(--chart-3))" fillOpacity={1} fill="url(#colorValue)" />
                  <Line type="monotone" dataKey="meta" name="Meta" stroke="hsl(var(--border))" strokeDasharray="5 5" />
                </AreaChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="transition-colors hover:bg-primary/10">
            <CardHeader>
            <CardTitle>Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-6">
                <p className="text-base text-muted-foreground">
                    Análisis del indicador de <span className="font-semibold text-foreground">Efectividad de Cierres</span> para el periodo de <span className="font-semibold text-foreground">Enero 2025</span>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg text-center">
                        <p className="text-base text-muted-foreground">Promedio del periodo</p>
                        <p className="text-3xl font-bold text-[hsl(var(--chart-3))]">{avgValue}%</p>
                    </div>
                     <div className="border p-4 rounded-lg text-center">
                        <p className="text-base text-muted-foreground">Meta establecida</p>
                        <p className="text-3xl font-bold">{weeklyData[0].meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg">Observaciones</h4>
                    <p className="text-base text-muted-foreground">El rendimiento es consistentemente alto, cumpliendo o superando la meta en la mayoría de las semanas. El proceso parece estar bien controlado.</p>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
