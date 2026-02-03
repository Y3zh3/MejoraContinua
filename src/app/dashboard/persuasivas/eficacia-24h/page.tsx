"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Clock4 } from "lucide-react";
import { BaseSelector } from '@/components/base-selector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const eficaciaData = {
    todas: {
        promedio: 57.6,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 4992, total: 7254, value: 68.8, meta: 70 },
            { name: 'C02', atendidos: 3249, total: 6183, value: 52.5, meta: 70 },
            { name: 'C03', atendidos: 3841, total: 5832, value: 65.9, meta: 70 },
            { name: 'C04', atendidos: 3529, total: 8185, value: 43.1, meta: 70 },
        ]
    }
};

export default function Eficacia24hPersuasivasPage() {
  const [data, setData] = useState(eficaciaData.todas);

  const handleBaseChange = (base: string) => {
    setData(eficaciaData[base as keyof typeof eficaciaData] || eficaciaData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Clock4 className="h-8 w-8 text-[hsl(var(--chart-2))]" />
            <h1 className="font-headline text-3xl font-bold">Persuasivas: Eficacia 24H</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
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
                    <div>
                        <h4 className="font-semibold text-base mb-1 uppercase tracking-tight text-muted-foreground">Observaciones</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Análisis de la Eficacia 24H. El gráfico muestra la evolución de la eficacia en las primeras 24 horas frente a la meta del 70%.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl">Tendencia de Eficacia (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.ciclos}>
                        <defs>
                            <linearGradient id="colorEficacia" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
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
                            formatter={(value: number) => `${value}%`}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="value" name="Eficacia" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorEficacia)" strokeWidth={3} />
                        <ReferenceLine y={70} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </AreaChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Con Reap Antes 24</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="text-right font-bold">Eficacia (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-semibold">{item.name}</TableCell>
                        <TableCell>{item.atendidos.toLocaleString()}</TableCell>
                        <TableCell>{item.total.toLocaleString()}</TableCell>
                        <TableCell className={`text-right font-medium ${item.value < item.meta ? "text-destructive" : ""}`}>
                            {item.value}%
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