
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import { FileWarning } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";

const initialWeeklyData = [
  { name: 'Semana 1', value: 7, meta: 5 },
  { name: 'Semana 2', value: 6, meta: 5 },
  { name: 'Semana 3', value: 4, meta: 5 },
  { name: 'Semana 4', value: 5, meta: 5 },
];

export default function ReclamosPersuasivasPage() {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);

  const handleBaseChange = () => {
    setWeeklyData(initialWeeklyData.map(d => ({...d, value: Math.floor(Math.random() * 6) + 3 })));
  };
  
  const avgValue = Math.round(weeklyData.reduce((acc, item) => acc + item.value, 0) / weeklyData.length);
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FileWarning className="h-8 w-8 text-[hsl(var(--chart-4))]" />
          <h1 className="font-headline text-3xl font-bold">Persuasivas: Reclamos</h1>
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
                          <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                      </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis unit=" uds."/>
                  <Tooltip
                      contentStyle={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      }}
                      formatter={(value: number) => `${value} uds.`}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="value" name="Reclamos" stroke="hsl(var(--chart-4))" fillOpacity={1} fill="url(#colorValue)" />
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
                    Análisis del indicador de <span className="font-semibold text-foreground">Reclamos de Persuasivas</span> para el periodo de <span className="font-semibold text-foreground">Enero 2025</span>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg text-center">
                        <p className="text-base text-muted-foreground">Promedio Semanal</p>
                        <p className="text-3xl font-bold text-[hsl(var(--chart-4))]">{avgValue} uds.</p>
                    </div>
                     <div className="border p-4 rounded-lg text-center">
                        <p className="text-base text-muted-foreground">Meta (máx)</p>
                        <p className="text-3xl font-bold">{weeklyData[0].meta} uds.</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg">Observaciones</h4>
                    <p className="text-base text-muted-foreground">El número de reclamos ha estado cerca de la meta, con una baja en la tercera semana. Se debe investigar el pico de la primera semana.</p>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
