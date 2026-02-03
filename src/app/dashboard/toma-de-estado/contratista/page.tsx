
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { HardHat } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const contratistaData: Record<string, any> = {
    todas: {
        promedio: 24.3,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 25.2, lecturas: 12145, total: 48200 },
            { name: 'C02', value: 29.1, lecturas: 15200, total: 52230 },
            { name: 'C03', value: 18.5, lecturas: 9800, total: 52970 },
            { name: 'C04', value: 19.3, lecturas: 10450, total: 54140 },
            { name: 'C05', value: 16.5, lecturas: 8900, total: 53940 },
            { name: 'C06', value: 24.6, lecturas: 12300, total: 50000 },
            { name: 'C07', value: 18.2, lecturas: 9500, total: 52190 },
            { name: 'C08', value: 24.8, lecturas: 13100, total: 52820 },
            { name: 'C09', value: 33.1, lecturas: 17200, total: 51960 },
            { name: 'C10', value: 37.0, lecturas: 18500, total: 50000 },
        ]
    },
    comas: {
        promedio: 23.7,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 38, lecturas: 291, total: 761 },
            { name: 'C02', value: 43, lecturas: 492, total: 1140 },
            { name: 'C03', value: 14, lecturas: 121, total: 844 },
            { name: 'C04', value: 12, lecturas: 245, total: 1965 },
            { name: 'C05', value: 7, lecturas: 167, total: 2360 },
            { name: 'C06', value: 21, lecturas: 320, total: 1507 },
            { name: 'C07', value: 18, lecturas: 487, total: 2694 },
            { name: 'C08', value: 23, lecturas: 313, total: 1349 },
            { name: 'C09', value: 34, lecturas: 496, total: 1463 },
            { name: 'C10', value: 33, lecturas: 434, total: 1322 },
        ]
    },
    callao: {
        promedio: 19.1,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 20, lecturas: 94, total: 481 },
            { name: 'C02', value: 7, lecturas: 37, total: 556 },
            { name: 'C03', value: 8, lecturas: 32, total: 409 },
            { name: 'C04', value: 23, lecturas: 50, total: 221 },
            { name: 'C05', value: 6, lecturas: 40, total: 655 },
            { name: 'C06', value: 28, lecturas: 131, total: 463 },
            { name: 'C07', value: 26, lecturas: 126, total: 482 },
            { name: 'C08', value: 23, lecturas: 123, total: 530 },
            { name: 'C09', value: 10, lecturas: 74, total: 732 },
            { name: 'C10', value: 37, lecturas: 122, total: 331 },
        ]
    },
    sjl: {
        promedio: 11.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 6, lecturas: 39, total: 648 },
            { name: 'C02', value: 5, lecturas: 23, total: 440 },
            { name: 'C03', value: 8, lecturas: 37, total: 450 },
            { name: 'C04', value: 6, lecturas: 27, total: 426 },
            { name: 'C05', value: 11, lecturas: 58, total: 529 },
            { name: 'C06', value: 14, lecturas: 59, total: 408 },
            { name: 'C07', value: 5, lecturas: 19, total: 363 },
            { name: 'C08', value: 5, lecturas: 16, total: 330 },
            { name: 'C09', value: 26, lecturas: 132, total: 502 },
            { name: 'C10', value: 26, lecturas: 78, total: 302 },
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
    const newData = contratistaData[base] || contratistaData.todas;
    setData(newData);
    setSelectedBaseLabel(base !== "todas" ? ` ${base.charAt(0).toUpperCase() + base.slice(1).replace('-', ' ')}` : "");
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
                            Monitoreo de incidencias operativas del personal contratista en campo. Buscamos la reducción constante de estos eventos para garantizar la excelencia en la recolección de datos y la calidad del servicio.
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
                        <YAxis domain={[0, 'auto']} unit="%" tick={{ fontSize: 12 }} />
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
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">Lecturas</TableHead>
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">Total</TableHead>
                    <TableHead className="text-right font-bold text-muted-foreground uppercase text-[11px] tracking-wider pr-6">Rendimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((ciclo: any) => (
                    <TableRow key={ciclo.name} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                        <TableCell className="font-bold text-foreground pl-6">{ciclo.name}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">{ciclo.lecturas.toLocaleString()}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">{ciclo.total.toLocaleString()}</TableCell>
                        <TableCell className={`text-right font-bold tabular-nums pr-6 ${ciclo.value > data.meta ? "text-destructive" : "text-foreground"}`}>
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
