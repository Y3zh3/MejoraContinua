
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { CircleOff } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const cierresData = {
    todas: {
        promedio: 54.8,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 5312, total: 8437, value: 63.0, meta: 15 },
            { name: 'C02', cierres: 3477, total: 7048, value: 49.3, meta: 15 },
            { name: 'C03', cierres: 3662, total: 6843, value: 53.5, meta: 15 },
            { name: 'C04', cierres: 4354, total: 7926, value: 54.9, meta: 15 },
            { name: 'C05', cierres: 3580, total: 6712, value: 53.3, meta: 15 },
        ]
    },
    comas: {
        promedio: 100,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 2971, total: 2971, value: 100, meta: 15 },
            { name: 'C02', cierres: 2394, total: 2394, value: 100, meta: 15 },
            { name: 'C03', cierres: 1867, total: 1867, value: 100, meta: 15 },
            { name: 'C04', cierres: 2595, total: 2595, value: 100, meta: 15 },
            { name: 'C05', cierres: 1845, total: 1845, value: 100, meta: 15 },
        ]
    },
    callao: {
        promedio: 18.2,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 177, total: 611, value: 29.0, meta: 15 },
            { name: 'C02', cierres: 53, total: 399, value: 13.3, meta: 15 },
            { name: 'C03', cierres: 75, total: 507, value: 14.8, meta: 15 },
            { name: 'C04', cierres: 82, total: 681, value: 12.0, meta: 15 },
            { name: 'C05', cierres: 127, total: 589, value: 21.6, meta: 15 },
        ]
    },
    ate: {
        promedio: 52.6,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 651, total: 1156, value: 56.3, meta: 15 },
            { name: 'C02', cierres: 304, total: 1320, value: 23.0, meta: 15 },
            { name: 'C03', cierres: 820, total: 1143, value: 71.7, meta: 15 },
            { name: 'C04', cierres: 654, total: 1309, value: 50.0, meta: 15 },
            { name: 'C05', cierres: 573, total: 919, value: 62.3, meta: 15 },
        ]
    },
    brena: {
        promedio: 11.2,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 272, total: 844, value: 32.2, meta: 15 },
            { name: 'C02', cierres: 29, total: 618, value: 4.7, meta: 15 },
            { name: 'C03', cierres: 25, total: 595, value: 4.2, meta: 15 },
            { name: 'C04', cierres: 41, total: 706, value: 5.8, meta: 15 },
            { name: 'C05', cierres: 70, total: 765, value: 9.2, meta: 15 },
        ]
    },
    sjl: {
        promedio: 12.4,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 64, total: 744, value: 8.6, meta: 15 },
            { name: 'C02', cierres: 52, total: 517, value: 10.1, meta: 15 },
            { name: 'C03', cierres: 79, total: 694, value: 11.4, meta: 15 },
            { name: 'C04', cierres: 70, total: 508, value: 13.8, meta: 15 },
            { name: 'C05', cierres: 136, total: 744, value: 18.3, meta: 15 },
        ]
    },
    surquillo: {
        promedio: 20.9,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 249, total: 575, value: 43.3, meta: 15 },
            { name: 'C02', cierres: 98, total: 472, value: 20.8, meta: 15 },
            { name: 'C03', cierres: 55, total: 444, value: 12.4, meta: 15 },
            { name: 'C04', cierres: 75, total: 540, value: 13.9, meta: 15 },
            { name: 'C05', cierres: 73, total: 481, value: 15.2, meta: 15 },
        ]
    },
    ves: {
        promedio: 50.4,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 928, total: 1536, value: 60.4, meta: 15 },
            { name: 'C02', cierres: 547, total: 1328, value: 41.2, meta: 15 },
            { name: 'C03', cierres: 741, total: 1593, value: 46.5, meta: 15 },
            { name: 'C04', cierres: 837, total: 1587, value: 52.7, meta: 15 },
            { name: 'C05', cierres: 756, total: 1369, value: 55.2, meta: 15 },
        ]
    },
    'clientes-e': {
        promedio: 100,
        meta: 15,
        ciclos: [
            { name: 'C01', cierres: 10, total: 10, value: 100, meta: 15 },
            { name: 'C02', cierres: 10, total: 10, value: 100, meta: 15 },
            { name: 'C03', cierres: 10, total: 10, value: 100, meta: 15 },
            { name: 'C04', cierres: 10, total: 10, value: 100, meta: 15 },
            { name: 'C05', cierres: 10, total: 10, value: 100, meta: 15 },
        ]
    }
};

export default function CierresComunicadosPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(cierresData.todas);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBaseChange = (base: string) => {
    setData(cierresData[base as keyof typeof cierresData] || cierresData.todas);
  };

  if (!isMounted) return null;
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <CircleOff className="h-8 w-8 text-[hsl(var(--chart-3))]" />
            <h1 className="font-headline text-3xl font-bold">Comunicados: Cierres</h1>
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
                            <p className="text-3xl font-bold text-[hsl(var(--chart-3))]">{data.promedio}%</p>
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
                    <CardTitle className="text-xl">Efectividad de Cierres (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.ciclos}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 110]} unit="%"/>
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                            formatter={(value: number) => `${value.toFixed(1)}%`}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="value" name="Efectividad" stroke="hsl(var(--chart-3))" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                        <ReferenceLine y={15} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </AreaChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Efectividad de Cierres</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold text-right">Cierres sin</TableHead>
                    <TableHead className="font-bold text-right">Total</TableHead>
                    <TableHead className="text-right font-bold">Efectividad (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-semibold">{item.name}</TableCell>
                        <TableCell className="text-right">{item.cierres.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.total.toLocaleString()}</TableCell>
                        <TableCell className={`text-right font-medium ${item.value < item.meta ? "text-destructive" : ""}`}>
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
