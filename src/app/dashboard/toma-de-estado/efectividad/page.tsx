
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { TrendingUp } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const efectividadData = {
    todas: {
        promedio: 97.2,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.4, efectivo: 9840, total: 10000 },
            { name: 'C02', value: 97.5, efectivo: 9750, total: 10000 },
            { name: 'C03', value: 98.8, efectivo: 9880, total: 10000 },
            { name: 'C04', value: 96.5, efectivo: 9650, total: 10000 },
            { name: 'C05', value: 98.2, efectivo: 9820, total: 10000 },
            { name: 'C06', value: 97.2, efectivo: 9720, total: 10000 },
            { name: 'C07', value: 96.3, efectivo: 9630, total: 10000 },
            { name: 'C08', value: 98.1, efectivo: 9810, total: 10000 },
            { name: 'C09', value: 97.8, efectivo: 9780, total: 10000 },
            { name: 'C10', value: 98.0, efectivo: 9800, total: 10000 },
            { name: 'C11', value: 99.0, efectivo: 9900, total: 10000 },
        ]
    },
    comas: {
        promedio: 95.8,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 96.1, efectivo: 2390, total: 2487 },
            { name: 'C02', value: 93.2, efectivo: 2350, total: 2522 },
            { name: 'C03', value: 94.5, efectivo: 2235, total: 2366 },
            { name: 'C04', value: 95.8, efectivo: 2176, total: 2272 },
            { name: 'C05', value: 95.6, efectivo: 2104, total: 2201 },
            { name: 'C06', value: 97.0, efectivo: 2018, total: 2081 },
            { name: 'C07', value: 97.0, efectivo: 1974, total: 2035 },
            { name: 'C08', value: 96.9, efectivo: 1887, total: 1948 },
            { name: 'C09', value: 96.2, efectivo: 1850, total: 1923 },
            { name: 'C10', value: 96.8, efectivo: 1775, total: 1834 },
            { name: 'C11', value: 97.2, efectivo: 1749, total: 1800 },
        ]
    },
    sjl: {
        promedio: 99.1,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.6, efectivo: 2958, total: 3000 },
            { name: 'C02', value: 99.1, efectivo: 2973, total: 3000 },
            { name: 'C03', value: 99.0, efectivo: 2970, total: 3000 },
            { name: 'C04', value: 99.5, efectivo: 2985, total: 3000 },
            { name: 'C05', value: 98.4, efectivo: 2952, total: 3000 },
            { name: 'C06', value: 99.0, efectivo: 2970, total: 3000 },
            { name: 'C07', value: 98.9, efectivo: 2967, total: 3000 },
            { name: 'C08', value: 99.8, efectivo: 2994, total: 3000 },
            { name: 'C09', value: 98.9, efectivo: 2967, total: 3000 },
            { name: 'C10', value: 99.3, efectivo: 2979, total: 3000 },
            { name: 'C11', value: 99.5, efectivo: 2985, total: 3000 },
        ]
    },
    callao: {
        promedio: 98.4,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.0, efectivo: 2078, total: 2121 },
            { name: 'C02', value: 98.8, efectivo: 2134, total: 2160 },
            { name: 'C03', value: 99.0, efectivo: 2075, total: 2096 },
            { name: 'C04', value: 98.9, efectivo: 2108, total: 2132 },
            { name: 'C05', value: 99.0, efectivo: 2053, total: 2074 },
            { name: 'C06', value: 98.8, efectivo: 1994, total: 2018 },
            { name: 'C07', value: 98.0, efectivo: 1962, total: 2002 },
            { name: 'C08', value: 97.0, efectivo: 1904, total: 1963 },
            { name: 'C09', value: 98.1, efectivo: 1902, total: 1939 },
            { name: 'C10', value: 98.9, efectivo: 1868, total: 1889 },
            { name: 'C11', value: 99.1, efectivo: 1833, total: 1850 },
        ]
    },
    ate: {
        promedio: 97.2,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.5, efectivo: 1970, total: 2000 },
            { name: 'C02', value: 95.6, efectivo: 1912, total: 2000 },
            { name: 'C03', value: 94.2, efectivo: 1884, total: 2000 },
            { name: 'C04', value: 98.3, efectivo: 1966, total: 2000 },
            { name: 'C05', value: 97.2, efectivo: 1944, total: 2000 },
            { name: 'C06', value: 95.2, efectivo: 1904, total: 2000 },
            { name: 'C07', value: 98.5, efectivo: 1970, total: 2000 },
            { name: 'C08', value: 98.3, efectivo: 1966, total: 2000 },
            { name: 'C09', value: 96.5, efectivo: 1930, total: 2000 },
            { name: 'C10', value: 98.6, efectivo: 1972, total: 2000 },
            { name: 'C11', value: 98.8, efectivo: 1976, total: 2000 },
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
    const newData = (efectividadData as any)[base] || efectividadData.todas;
    setData(newData);
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-[hsl(var(--chart-2))]" />
            <h1 className="font-headline text-3xl font-bold uppercase tracking-tight text-primary">Toma de Estado: Efectividad</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
                            <p className="text-4xl font-black">98.5%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">Rendimiento por Ciclo (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-[320px] p-0 px-2 pb-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.ciclos} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis domain={[80, 100]} unit="%" tick={{ fontSize: 12 }} />
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
                        <Legend iconType="rect" verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
                        <Bar dataKey="value" name="Efectividad" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} />
                        <ReferenceLine y={98.5} label={{ position: 'top', value: 'Meta', fontSize: 10, fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col min-h-[600px]">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Detalle de Rendimiento por Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4">
            <div className="max-h-[650px] overflow-y-auto rounded-xl border border-border/60 bg-card">
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
