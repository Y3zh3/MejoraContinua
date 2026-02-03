
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
        promedio: 18.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 23, lecturas: 11642, total: 50621 },
            { name: 'C02', value: 13, lecturas: 5470, total: 42077 },
            { name: 'C03', value: 15, lecturas: 7433, total: 49555 },
            { name: 'C04', value: 21, lecturas: 10591, total: 50436 },
            { name: 'C05', value: 19, lecturas: 7706, total: 40558 },
            { name: 'C06', value: 21, lecturas: 8143, total: 38777 },
            { name: 'C07', value: 20, lecturas: 8071, total: 40358 },
            { name: 'C08', value: 21, lecturas: 8551, total: 40723 },
            { name: 'C09', value: 17, lecturas: 5815, total: 34207 },
            { name: 'C10', value: 22, lecturas: 7428, total: 33765 },
        ]
    },
    callao: {
        promedio: 11.5,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 22, lecturas: 105, total: 481 },
            { name: 'C02', value: 11, lecturas: 61, total: 556 },
            { name: 'C03', value: 14, lecturas: 57, total: 409 },
            { name: 'C04', value: 10, lecturas: 22, total: 221 },
            { name: 'C05', value: 10, lecturas: 65, total: 655 },
            { name: 'C06', value: 9, lecturas: 41, total: 463 },
            { name: 'C07', value: 8, lecturas: 38, total: 482 },
            { name: 'C08', value: 9, lecturas: 47, total: 530 },
            { name: 'C09', value: 15, lecturas: 109, total: 732 },
            { name: 'C10', value: 17, lecturas: 56, total: 331 },
        ]
    },
    ate: {
        promedio: 38.5,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 42, lecturas: 8520, total: 20285 },
            { name: 'C02', value: 39, lecturas: 7215, total: 18500 },
            { name: 'C03', value: 34, lecturas: 6426, total: 18900 },
            { name: 'C04', value: 37, lecturas: 7104, total: 19200 },
            { name: 'C05', value: 37, lecturas: 7030, total: 19000 },
            { name: 'C06', value: 25, lecturas: 4625, total: 18500 },
            { name: 'C07', value: 30, lecturas: 5700, total: 19000 },
            { name: 'C08', value: 46, lecturas: 9016, total: 19600 },
            { name: 'C09', value: 46, lecturas: 8878, total: 19300 },
            { name: 'C10', value: 50, lecturas: 9750, total: 19500 },
        ]
    },
    brena: {
        promedio: 26.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 33, lecturas: 4950, total: 15000 },
            { name: 'C02', value: 30, lecturas: 4440, total: 14800 },
            { name: 'C03', value: 33, lecturas: 4983, total: 15100 },
            { name: 'C04', value: 31, lecturas: 4619, total: 14900 },
            { name: 'C05', value: 19, lecturas: 2888, total: 15200 },
            { name: 'C06', value: 21, lecturas: 3150, total: 15000 },
            { name: 'C07', value: 29, lecturas: 4321, total: 14900 },
            { name: 'C08', value: 27, lecturas: 4077, total: 15100 },
            { name: 'C09', value: 17, lecturas: 2516, total: 14800 },
            { name: 'C10', value: 28, lecturas: 4200, total: 15000 },
        ]
    },
    sjl: {
        promedio: 11.2,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 10, lecturas: 2413, total: 24130 },
            { name: 'C02', value: 11, lecturas: 1918, total: 17437 },
            { name: 'C03', value: 13, lecturas: 2653, total: 20410 },
            { name: 'C04', value: 8, lecturas: 1089, total: 13615 },
            { name: 'C05', value: 10, lecturas: 1897, total: 18970 },
            { name: 'C06', value: 12, lecturas: 1350, total: 11252 },
            { name: 'C07', value: 12, lecturas: 1588, total: 13235 },
            { name: 'C08', value: 13, lecturas: 1697, total: 13056 },
            { name: 'C09', value: 11, lecturas: 2086, total: 18971 },
            { name: 'C10', value: 12, lecturas: 1732, total: 14438 },
        ]
    },
    surquillo: {
        promedio: 15.8,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 20, lecturas: 2000, total: 10000 },
            { name: 'C02', value: 15, lecturas: 1530, total: 10200 },
            { name: 'C03', value: 20, lecturas: 1980, total: 9900 },
            { name: 'C04', value: 18, lecturas: 1818, total: 10100 },
            { name: 'C05', value: 13, lecturas: 1300, total: 10000 },
            { name: 'C06', value: 12, lecturas: 1176, total: 9800 },
            { name: 'C07', value: 15, lecturas: 1530, total: 10200 },
            { name: 'C08', value: 15, lecturas: 1515, total: 10100 },
            { name: 'C09', value: 14, lecturas: 1386, total: 9900 },
            { name: 'C10', value: 16, lecturas: 1600, total: 10000 },
        ]
    },
    ves: {
        promedio: 22.8,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 38, lecturas: 4560, total: 12000 },
            { name: 'C02', value: 35, lecturas: 4235, total: 12100 },
            { name: 'C03', value: 27, lecturas: 3213, total: 11900 },
            { name: 'C04', value: 21, lecturas: 2520, total: 12000 },
            { name: 'C05', value: 19, lecturas: 2280, total: 12000 },
            { name: 'C06', value: 15, lecturas: 1830, total: 12200 },
            { name: 'C07', value: 14, lecturas: 1652, total: 11800 },
            { name: 'C08', value: 19, lecturas: 2280, total: 12000 },
            { name: 'C09', value: 27, lecturas: 3267, total: 12100 },
            { name: 'C10', value: 20, lecturas: 2380, total: 11900 },
        ]
    },
    'clientes-e': {
        promedio: 38.3,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 45, lecturas: 450, total: 1000 },
            { name: 'C02', value: 46, lecturas: 483, total: 1050 },
            { name: 'C03', value: 45, lecturas: 427, total: 950 },
            { name: 'C04', value: 59, lecturas: 590, total: 1000 },
            { name: 'C05', value: 54, lecturas: 540, total: 1000 },
            { name: 'C06', value: 29, lecturas: 304, total: 1050 },
            { name: 'C07', value: 40, lecturas: 380, total: 950 },
            { name: 'C08', value: 32, lecturas: 320, total: 1000 },
            { name: 'C09', value: 27, lecturas: 283, total: 1050 },
            { name: 'C10', value: 26, lecturas: 247, total: 950 },
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
                            Monitoreo de incidencias por contratista en campo. El objetivo principal es la reducción progresiva de estos eventos, asegurando un proceso de toma de estado limpio y eficiente que minimice las anomalías.
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
