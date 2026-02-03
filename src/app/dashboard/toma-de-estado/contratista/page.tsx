"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { HardHat } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const contratistaData = {
    todas: {
        promedio: 24.3,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 25.2, lecturas: 1013, total: 4009 },
            { name: 'C02', value: 29.1, lecturas: 1390, total: 4767 },
            { name: 'C03', value: 18.5, lecturas: 571, total: 3875 },
            { name: 'C04', value: 19.3, lecturas: 760, total: 4321 },
            { name: 'C05', value: 16.5, lecturas: 732, total: 5489 },
            { name: 'C06', value: 24.6, lecturas: 1073, total: 4357 },
            { name: 'C07', value: 18.2, lecturas: 1110, total: 6093 },
            { name: 'C08', value: 24.8, lecturas: 972, total: 3911 },
            { name: 'C09', value: 33.1, lecturas: 1279, total: 3865 },
            { name: 'C10', value: 37.0, lecturas: 863, total: 2439 },
        ]
    }
};

export default function ContratistaTomaDeEstadoPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(contratistaData.todas);
  const [selectedBaseLabel, setSelectedBaseLabel] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBaseChange = (base: string) => {
    const newData = (contratistaData as any)[base] || contratistaData.todas;
    setData(newData);
    setSelectedBaseLabel(base !== "todas" ? ` ${base.charAt(0).toUpperCase() + base.slice(1)}` : "");
  };

  if (!isMounted) return null;
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <HardHat className="h-8 w-8 text-[hsl(var(--chart-3))]" />
            <h1 className="font-headline text-3xl font-bold uppercase tracking-tight text-primary">Toma de Estado: Contratista</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-6">
            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-center">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-border/50 py-3 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Promedio Periodo</p>
                            <p className="text-3xl font-black text-[hsl(var(--chart-3))]">{data.promedio}%</p>
                        </div>
                         <div className="border border-border/50 py-3 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Meta</p>
                            <p className="text-3xl font-black">{data.meta}%</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
                            Evalúa el desempeño directo del personal contratista en campo, monitoreando la calidad y cantidad de las lecturas capturadas para asegurar el cumplimiento del servicio.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">Rendimiento por Ciclo (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-[320px] p-0 px-2 pb-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.ciclos} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "12px",
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            }}
                            formatter={(value: number) => [`${value}%`, "Rendimiento"]}
                        />
                        <Legend iconType="rect" verticalAlign="bottom" wrapperStyle={{ paddingTop: '5px' }} />
                        <Line type="monotone" dataKey="value" name="Rendimiento" stroke="hsl(var(--chart-3))" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                        <ReferenceLine y={15} label={{ position: 'top', value: 'Meta', fontSize: 10, fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col min-h-[600px]">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Detalle de Rendimiento por Ciclo{selectedBaseLabel}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4">
            <div className="max-h-[600px] overflow-y-auto rounded-xl border border-border/60 bg-card">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/30 backdrop-blur-md z-10">
                    <TableRow className="hover:bg-transparent border-b">
                    <TableHead className="w-[100px] font-bold text-muted-foreground uppercase text-[11px] tracking-wider pl-6">Ciclo</TableHead>
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">Lecturas Realizadas</TableHead>
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">Total Lecturas</TableHead>
                    <TableHead className="text-right font-bold text-muted-foreground uppercase text-[11px] tracking-wider pr-6">Rendimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((ciclo) => (
                    <TableRow key={ciclo.name} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                        <TableCell className="font-bold text-foreground pl-6">{ciclo.name}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">{ciclo.lecturas.toLocaleString()}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">{ciclo.total.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-bold tabular-nums pr-6 text-[hsl(var(--chart-3))]">
                          {ciclo.value}%
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
