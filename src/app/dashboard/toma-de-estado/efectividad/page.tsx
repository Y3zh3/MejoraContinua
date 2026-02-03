
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { TrendingUp } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const efectividadData = {
    todas: {
        promedio: 98.6,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.6 },
            { name: 'C02', value: 99.1 },
            { name: 'C03', value: 98.8 },
            { name: 'C04', value: 98.2 },
            { name: 'C05', value: 97.5 },
            { name: 'C06', value: 98.0 },
            { name: 'C07', value: 96.9 },
            { name: 'C08', value: 98.5 },
            { name: 'C09', value: 97.4 },
            { name: 'C10', value: 99.0 },
            { name: 'C11', value: 99.8 },
        ]
    },
    comas: {
        promedio: 97.2,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 96.5 },
            { name: 'C02', value: 100.9 },
            { name: 'C03', value: 97.2 },
            { name: 'C04', value: 96.8 },
            { name: 'C05', value: 95.4 },
            { name: 'C06', value: 96.1 },
            { name: 'C07', value: 95.8 },
            { name: 'C08', value: 97.5 },
            { name: 'C09', value: 96.2 },
            { name: 'C10', value: 98.1 },
            { name: 'C11', value: 98.8 },
        ]
    },
    callao: {
        promedio: 99.2,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.0 },
            { name: 'C02', value: 99.5 },
            { name: 'C03', value: 99.2 },
            { name: 'C04', value: 99.4 },
            { name: 'C05', value: 98.8 },
            { name: 'C06', value: 99.1 },
            { name: 'C07', value: 98.9 },
            { name: 'C08', value: 99.3 },
            { name: 'C09', value: 99.0 },
            { name: 'C10', value: 99.5 },
            { name: 'C11', value: 99.7 },
        ]
    }
};

export default function EfectividadTomaDeEstadoPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(efectividadData.todas);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBaseChange = (base: string) => {
    const newData = efectividadData[base as keyof typeof efectividadData] || efectividadData.todas;
    setData(newData);
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-[hsl(var(--chart-2))]" />
            <h1 className="font-headline text-3xl font-bold">Toma de Estado: Efectividad</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio Periodo</p>
                            <p className="text-3xl font-bold text-[hsl(var(--chart-2))]">{data.promedio}%</p>
                        </div>
                         <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta</p>
                            <p className="text-3xl font-bold">{data.meta}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Rendimiento por Ciclo</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.ciclos}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[90, 102]} unit="%"/>
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                            formatter={(value: number) => `${value}%`}
                        />
                        <Legend />
                        <ReferenceLine y={98.5} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                        <Bar dataKey="value" name="Efectividad" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="text-right font-bold">Rendimiento (%)</TableHead>
                    <TableHead className="text-right font-bold">Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-semibold">{item.name}</TableCell>
                        <TableCell className={`text-right font-medium ${item.value < 98.5 ? "text-destructive" : "text-primary"}`}>
                            {item.value}%
                        </TableCell>
                        <TableCell className="text-right">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.value < 98.5 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                             {item.value < 98.5 ? "Bajo Meta" : "Cumple"}
                           </span>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
