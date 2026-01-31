"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock9 } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";

const initialWeeklyData = [
  { name: 'Semana 1', value: 98, meta: 99 },
  { name: 'Semana 2', value: 97, meta: 99 },
  { name: 'Semana 3', value: 99, meta: 99 },
  { name: 'Semana 4', value: 100, meta: 99 },
];

export default function Eficacia48hPersuasivasPage() {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);

  const handleBaseChange = () => {
    setWeeklyData(initialWeeklyData.map(d => ({...d, value: Math.floor(Math.random() * 6) + 95 })));
  };
  
  const avgValue = Math.round(weeklyData.reduce((acc, item) => acc + item.value, 0) / weeklyData.length);
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Clock9 className="h-8 w-8 text-[hsl(var(--chart-3))]" />
          <h1 className="font-headline text-3xl font-bold">Persuasivas: Eficacia 48H</h1>
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
                <LineChart data={weeklyData}>
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
                <Line type="monotone" dataKey="value" name="Eficacia" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                <Line type="monotone" dataKey="meta" name="Meta" stroke="hsl(var(--border))" strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-6">
                <p className="text-muted-foreground">
                    Análisis del indicador de <span className="font-semibold text-foreground">Eficacia 48H</span> para el periodo de <span className="font-semibold text-foreground">Enero 2025</span>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Promedio del periodo</p>
                        <p className="text-3xl font-bold text-[hsl(var(--chart-3))]">{avgValue}%</p>
                    </div>
                     <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Meta establecida</p>
                        <p className="text-3xl font-bold">{weeklyData[0].meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold">Observaciones</h4>
                    <p className="text-sm text-muted-foreground">El rendimiento de eficacia a 48 horas es excelente y cumple consistentemente con la meta. El proceso es muy efectivo.</p>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
