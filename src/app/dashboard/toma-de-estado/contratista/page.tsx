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
            { name: 'C01', value: 38, lecturas: 19236, total: 50621 },
            { name: 'C02', value: 43, lecturas: 18093, total: 42077 },
            { name: 'C03', value: 14, lecturas: 6937, total: 49555 },
            { name: 'C04', value: 12, lecturas: 6052, total: 50436 },
            { name: 'C05', value: 7, lecturas: 2839, total: 40558 },
            { name: 'C06', value: 21, lecturas: 8143, total: 38777 },
            { name: 'C07', value: 18, lecturas: 7264, total: 40358 },
            { name: 'C08', value: 23, lecturas: 9366, total: 40723 },
            { name: 'C09', value: 34, lecturas: 11630, total: 34207 },
            { name: 'C10', value: 33, lecturas: 11142, total: 33765 },
        ]
    },
    callao: {
        promedio: 19.1,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 20, lecturas: 4120, total: 20600 },
            { name: 'C02', value: 7, lecturas: 1520, total: 21714 },
            { name: 'C03', value: 8, lecturas: 1680, total: 21000 },
            { name: 'C04', value: 23, lecturas: 4830, total: 21000 },
            { name: 'C05', value: 6, lecturas: 1250, total: 20833 },
            { name: 'C06', value: 28, lecturas: 5880, total: 21000 },
            { name: 'C07', value: 26, lecturas: 5460, total: 21000 },
            { name: 'C08', value: 23, lecturas: 4830, total: 21000 },
            { name: 'C10', value: 37, lecturas: 7400, total: 20000 },
        ]
    },
    ate: {
        promedio: 47.2,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 59, lecturas: 14750, total: 25000 },
            { name: 'C02', value: 55, lecturas: 13750, total: 25000 },
            { name: 'C03', value: 41, lecturas: 10250, total: 25000 },
            { name: 'C04', value: 29, lecturas: 7250, total: 25000 },
            { name: 'C05', value: 41, lecturas: 10250, total: 25000 },
            { name: 'C06', value: 42, lecturas: 10500, total: 25000 },
            { name: 'C07', value: 27, lecturas: 6750, total: 25000 },
            { name: 'C08', value: 68, lecturas: 17000, total: 25000 },
            { name: 'C09', value: 69, lecturas: 17250, total: 25000 },
            { name: 'C10', value: 64, lecturas: 16000, total: 25000 },
        ]
    },
    brena: {
        promedio: 27.7,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21, lecturas: 3150, total: 15000 },
            { name: 'C02', value: 34, lecturas: 5100, total: 15000 },
            { name: 'C03', value: 25, lecturas: 3750, total: 15000 },
            { name: 'C04', value: 30, lecturas: 4500, total: 15000 },
            { name: 'C05', value: 39, lecturas: 5850, total: 15000 },
            { name: 'C06', value: 24, lecturas: 3600, total: 15000 },
            { name: 'C07', value: 30, lecturas: 4500, total: 15000 },
            { name: 'C08', value: 17, lecturas: 2550, total: 15000 },
            { name: 'C09', value: 27, lecturas: 4050, total: 15000 },
            { name: 'C10', value: 27, lecturas: 4050, total: 15000 },
        ]
    },
    sjl: {
        promedio: 11.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 6, lecturas: 1447, total: 24130 },
            { name: 'C02', value: 5, lecturas: 871, total: 17437 },
            { name: 'C03', value: 8, lecturas: 1632, total: 20410 },
            { name: 'C04', value: 6, lecturas: 816, total: 13615 },
            { name: 'C05', value: 11, lecturas: 2086, total: 18970 },
            { name: 'C06', value: 14, lecturas: 1575, total: 11252 },
            { name: 'C07', value: 5, lecturas: 661, total: 13235 },
            { name: 'C08', value: 5, lecturas: 652, total: 13056 },
            { name: 'C09', value: 26, lecturas: 4932, total: 18971 },
            { name: 'C10', value: 26, lecturas: 3753, total: 14438 },
            { name: 'C11', value: 32, lecturas: 3935, total: 12297 },
        ]
    },
    surquillo: {
        promedio: 14.8,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21, lecturas: 2100, total: 10000 },
            { name: 'C02', value: 18, lecturas: 1800, total: 10000 },
            { name: 'C03', value: 17, lecturas: 1700, total: 10000 },
            { name: 'C04', value: 20, lecturas: 2000, total: 10000 },
            { name: 'C05', value: 15, lecturas: 1500, total: 10000 },
            { name: 'C06', value: 11, lecturas: 1100, total: 10000 },
            { name: 'C07', value: 11, lecturas: 1100, total: 10000 },
            { name: 'C08', value: 7, lecturas: 700, total: 10000 },
            { name: 'C09', value: 21, lecturas: 2100, total: 10000 },
        ]
    },
    ves: {
        promedio: 20.3,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 11, lecturas: 1980, total: 18000 },
            { name: 'C02', value: 25, lecturas: 4500, total: 18000 },
            { name: 'C03', value: 19, lecturas: 3420, total: 18000 },
            { name: 'C04', value: 29, lecturas: 5220, total: 18000 },
            { name: 'C05', value: 23, lecturas: 4140, total: 18000 },
            { name: 'C06', value: 19, lecturas: 3420, total: 18000 },
            { name: 'C07', value: 13, lecturas: 2340, total: 18000 },
            { name: 'C08', value: 27, lecturas: 4860, total: 18000 },
            { name: 'C09', value: 27, lecturas: 4860, total: 18000 },
        ]
    },
    'clientes-e': {
        promedio: 24.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 27, lecturas: 2160, total: 8000 },
            { name: 'C02', value: 22, lecturas: 1760, total: 8000 },
            { name: 'C03', value: 25, lecturas: 2000, total: 8000 },
            { name: 'C04', value: 28, lecturas: 2240, total: 8000 },
            { name: 'C05', value: 30, lecturas: 2400, total: 8000 },
            { name: 'C06', value: 31, lecturas: 2480, total: 8000 },
            { name: 'C07', value: 15, lecturas: 1200, total: 8000 },
            { name: 'C08', value: 30, lecturas: 2400, total: 8000 },
            { name: 'C09', value: 24, lecturas: 1920, total: 8000 },
            { name: 'C10', value: 39, lecturas: 3120, total: 8000 },
            { name: 'C11', value: 0, lecturas: 0, total: 8000 },
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
                        <TableCell className={`text-right font-bold tabular-nums pr-6 ${ciclo.value > data.meta ? "text-destructive" : "text-[hsl(var(--chart-3))]"}`}>
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
