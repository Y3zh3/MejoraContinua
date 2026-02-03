
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
            { name: 'C01', value: 98.6, efectivo: 14200, total: 14401 },
            { name: 'C02', value: 99.1, efectivo: 15100, total: 15237 },
            { name: 'C03', value: 98.8, efectivo: 13950, total: 14119 },
            { name: 'C04', value: 98.2, efectivo: 14500, total: 14765 },
            { name: 'C05', value: 97.5, efectivo: 12800, total: 13128 },
            { name: 'C06', value: 98.0, efectivo: 11500, total: 11734 },
            { name: 'C07', value: 96.9, efectivo: 10200, total: 10526 },
            { name: 'C08', value: 98.5, efectivo: 9800, total: 9949 },
            { name: 'C09', value: 97.4, efectivo: 9500, total: 9753 },
            { name: 'C10', value: 99.0, efectivo: 8900, total: 8989 },
            { name: 'C11', value: 99.8, efectivo: 7500, total: 7515 },
        ]
    },
    comas: {
        promedio: 97.2,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 96.5, efectivo: 2400, total: 2487 },
            { name: 'C02', value: 99.1, efectivo: 2500, total: 2522 },
            { name: 'C03', value: 97.2, efectivo: 2300, total: 2366 },
            { name: 'C04', value: 96.8, efectivo: 2200, total: 2272 },
            { name: 'C05', value: 95.4, efectivo: 2100, total: 2201 },
            { name: 'C06', value: 96.1, efectivo: 2000, total: 2081 },
            { name: 'C07', value: 95.8, efectivo: 1950, total: 2035 },
            { name: 'C08', value: 97.5, efectivo: 1900, total: 1948 },
            { name: 'C09', value: 96.2, efectivo: 1850, total: 1923 },
            { name: 'C10', value: 98.1, efectivo: 1800, total: 1834 },
            { name: 'C11', value: 98.8, efectivo: 1750, total: 1771 },
        ]
    },
    callao: {
        promedio: 99.2,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.0, efectivo: 2100, total: 2121 },
            { name: 'C02', value: 99.5, efectivo: 2150, total: 2160 },
            { name: 'C03', value: 99.2, efectivo: 2080, total: 2096 },
            { name: 'C04', value: 99.4, efectivo: 2120, total: 2132 },
            { name: 'C05', value: 98.8, efectivo: 2050, total: 2074 },
            { name: 'C06', value: 99.1, efectivo: 2000, total: 2018 },
            { name: 'C07', value: 98.9, efectivo: 1980, total: 2002 },
            { name: 'C08', value: 99.3, efectivo: 1950, total: 1963 },
            { name: 'C09', value: 99.0, efectivo: 1920, total: 1939 },
            { name: 'C10', value: 99.5, efectivo: 1880, total: 1889 },
            { name: 'C11', value: 99.7, efectivo: 1850, total: 1855 },
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
            <h1 className="font-headline text-3xl font-bold uppercase tracking-tight">Toma de Estado: Efectividad</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Columna Izquierda: Análisis */}
        <div className="flex flex-col gap-8">
            <Card className="border shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-center">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="border border-border/50 p-6 rounded-2xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-[0.2em]">Promedio Periodo</p>
                            <p className="text-4xl font-black text-[hsl(var(--chart-2))]">{data.promedio}%</p>
                        </div>
                         <div className="border border-border/50 p-6 rounded-2xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-[0.2em]">Meta</p>
                            <p className="text-4xl font-black">{data.meta}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold">Rendimiento por Ciclo (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-64 p-0 px-2 pb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.ciclos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 110]} unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "12px",
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            }}
                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                            formatter={(value: number) => [`${value}%`, "Efectividad"]}
                        />
                        <Legend iconType="rect" verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="value" name="Efectividad" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} />
                        <ReferenceLine y={98.5} label={{ position: 'top', value: 'Meta', fontSize: 12, fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        {/* Columna Derecha: Tabla */}
        <Card className="border shadow-sm h-full flex flex-col min-h-[600px]">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Detalle de Rendimiento por Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4">
            <div className="max-h-[580px] overflow-y-auto rounded-xl border border-border/60 bg-card">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/30 backdrop-blur-md z-10">
                    <TableRow className="hover:bg-transparent border-b">
                    <TableHead className="w-[100px] font-bold text-muted-foreground uppercase text-[11px] tracking-wider pl-6">Ciclo</TableHead>
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">C/Ingreso</TableHead>
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">Total</TableHead>
                    <TableHead className="text-right font-bold text-muted-foreground uppercase text-[11px] tracking-wider pr-6">Rendimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                        <TableCell className="font-bold text-foreground pl-6">{item.name}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">
                            {item.efectivo?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">
                            {item.total?.toLocaleString()}
                        </TableCell>
                        <TableCell className={`text-right font-bold tabular-nums pr-6 ${item.value < 98.5 ? "text-destructive" : "text-foreground"}`}>
                            {item.value.toFixed(1)}%
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
