
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
    ate: {
        promedio: 47.2,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 59, lecturas: 341, total: 577 },
            { name: 'C02', value: 55, lecturas: 343, total: 620 },
            { name: 'C03', value: 41, lecturas: 112, total: 270 },
            { name: 'C04', value: 29, lecturas: 72, total: 247 },
            { name: 'C05', value: 41, lecturas: 128, total: 316 },
            { name: 'C06', value: 42, lecturas: 187, total: 443 },
            { name: 'C07', value: 27, lecturas: 139, total: 524 },
            { name: 'C08', value: 68, lecturas: 265, total: 391 },
            { name: 'C09', value: 69, lecturas: 324, total: 472 },
            { name: 'C10', value: 64, lecturas: 118, total: 183 },
        ]
    },
    brena: {
        promedio: 27.7,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21, lecturas: 56, total: 262 },
            { name: 'C02', value: 34, lecturas: 152, total: 441 },
            { name: 'C03', value: 25, lecturas: 67, total: 268 },
            { name: 'C04', value: 30, lecturas: 80, total: 267 },
            { name: 'C05', value: 39, lecturas: 101, total: 261 },
            { name: 'C06', value: 24, lecturas: 86, total: 353 },
            { name: 'C07', value: 30, lecturas: 142, total: 469 },
            { name: 'C08', value: 17, lecturas: 66, total: 389 },
            { name: 'C09', value: 27, lecturas: 36, total: 132 },
            { name: 'C10', value: 27, lecturas: 88, total: 329 },
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
            { name: 'C11', value: 32, lecturas: 42, total: 133 },
        ]
    },
    surquillo: {
        promedio: 14.8,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21, lecturas: 81, total: 378 },
            { name: 'C02', value: 18, lecturas: 117, total: 650 },
            { name: 'C03', value: 17, lecturas: 103, total: 598 },
            { name: 'C04', value: 20, lecturas: 121, total: 612 },
            { name: 'C05', value: 15, lecturas: 72, total: 469 },
            { name: 'C06', value: 11, lecturas: 52, total: 481 },
            { name: 'C07', value: 11, lecturas: 55, total: 521 },
            { name: 'C08', value: 7, lecturas: 41, total: 555 },
            { name: 'C09', value: 21, lecturas: 92, total: 441 },
        ]
    },
    ves: {
        promedio: 20.3,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 11, lecturas: 89, total: 819 },
            { name: 'C02', value: 25, lecturas: 199, total: 795 },
            { name: 'C03', value: 19, lecturas: 182, total: 937 },
            { name: 'C04', value: 29, lecturas: 146, total: 511 },
            { name: 'C05', value: 23, lecturas: 147, total: 639 },
            { name: 'C06', value: 19, lecturas: 118, total: 615 },
            { name: 'C07', value: 13, lecturas: 131, total: 1009 },
            { name: 'C08', value: 27, lecturas: 115, total: 429 },
            { name: 'C09', value: 27, lecturas: 120, total: 440 },
        ]
    },
    'clientes-e': {
        promedio: 24.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 27, lecturas: 22, total: 83 },
            { name: 'C02', value: 22, lecturas: 27, total: 125 },
            { name: 'C03', value: 25, lecturas: 17, total: 67 },
            { name: 'C04', value: 28, lecturas: 19, total: 68 },
            { name: 'C05', value: 30, lecturas: 19, total: 64 },
            { name: 'C06', value: 31, lecturas: 21, total: 67 },
            { name: 'C07', value: 15, lecturas: 11, total: 71 },
            { name: 'C08', value: 30, lecturas: 13, total: 43 },
            { name: 'C09', value: 24, lecturas: 5, total: 21 },
            { name: 'C10', value: 39, lecturas: 11, total: 28 },
            { name: 'C11', value: 0, lecturas: 0, total: 0 },
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
