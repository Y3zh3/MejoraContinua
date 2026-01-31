
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const initialWeeklyData = [
  { name: 'Semana 1', value: 5, meta: 3 },
  { name: 'Semana 2', value: 4, meta: 3 },
  { name: 'Semana 3', value: 6, meta: 3 },
  { name: 'Semana 4', value: 3, meta: 3 },
];


export default function AtipicasInspeccionesPage() {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);

  const handleBaseChange = () => {
    setWeeklyData(initialWeeklyData.map(d => ({...d, value: Math.floor(Math.random() * 7) + 1 })));
  };
  
  const avgValue = Math.round(weeklyData.reduce((acc, item) => acc + item.value, 0) / weeklyData.length);
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AlertTriangle className="h-8 w-8 text-[hsl(var(--chart-4))]" />
          <h1 className="font-headline text-3xl font-bold">Inspecciones: Atípicas</h1>
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
                <BarChart data={weeklyData}>
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
                <Bar dataKey="value" name="Casos" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta" fill="hsl(var(--border))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="transition-colors hover:bg-primary/10">
            <CardHeader>
            <CardTitle>Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-6">
                <p className="text-base text-muted-foreground">
                    Análisis del indicador de <span className="font-semibold text-foreground">Inspecciones Atípicas</span> para el periodo de <span className="font-semibold text-foreground">Enero 2025</span>.
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
                    <p className="text-base text-muted-foreground">El número de inspecciones atípicas ha estado por encima de la meta la mayor parte del mes. Es crucial investigar las causas para reducir la incidencia.</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card className="transition-colors hover:bg-primary/10">
        <CardHeader>
            <CardTitle>Detalle Semanal de Inspecciones Atípicas</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose de los casos de inspecciones atípicas por semana.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                    <TableHead className="w-[150px]">Semana</TableHead>
                    <TableHead>Casos</TableHead>
                    <TableHead className="text-right">Meta (máx)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {weeklyData.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.value} uds.</TableCell>
                    <TableCell className="text-right font-medium">{item.meta} uds.</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
