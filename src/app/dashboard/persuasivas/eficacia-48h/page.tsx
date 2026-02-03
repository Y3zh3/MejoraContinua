"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Clock9 } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const eficacia48Data = {
    todas: {
        promedio: 69.5,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 5214, total: 7464, value: 69.9, meta: 70 },
            { name: 'C2', atendidos: 3774, total: 5732, value: 65.8, meta: 70 },
            { name: 'C3', atendidos: 4325, total: 6129, value: 70.6, meta: 70 },
            { name: 'C4', atendidos: 2746, total: 3794, value: 72.4, meta: 70 },
        ]
    }
};

export default function Efectividad48hPersuasivasPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(eficacia48Data.todas);
  const [selectedBaseLabel, setSelectedBaseLabel] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBaseChange = (base: string) => {
    const newData = (eficacia48Data as any)[base] || eficacia48Data.todas;
    setData(newData);
    setSelectedBaseLabel(base !== "todas" ? ` ${base.charAt(0).toUpperCase() + base.slice(1)}` : "");
  };

  if (!isMounted) return null;
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Clock9 className="h-8 w-8 text-[hsl(var(--chart-1))]" />
            <h1 className="font-headline text-3xl font-bold uppercase tracking-tight text-primary">Persuasivas: Efectividad 48H</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-6">
            <Card className="border shadow-sm">
                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl font-bold text-center">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="border border-border/50 py-2 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Promedio Periodo</p>
                            <p className="text-3xl font-black text-[hsl(var(--chart-1))]">{data.promedio}%</p>
                        </div>
                         <div className="border border-border/50 py-2 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Meta</p>
                            <p className="text-3xl font-black">{data.meta}%</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
                            Evalúa el cumplimiento físico de las órdenes de corte en un plazo de 48 horas. Garantizamos que el servicio sea efectivamente suspendido cuando el cliente no cumple con sus obligaciones de pago.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">Tendencia de Efectividad (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-[320px] p-0 px-2 pb-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.ciclos} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
                            formatter={(value: number) => [`${value}%`, "Efectividad"]}
                        />
                        <Legend iconType="rect" verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
                        <Line type="monotone" dataKey="value" name="Efectividad" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                        <ReferenceLine y={70} label={{ position: 'top', value: 'Meta', fontSize: 10, fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col min-h-[650px]">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Detalle de Ejecución por Ciclo{selectedBaseLabel}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4">
            <div className="max-h-[650px] overflow-y-auto rounded-xl border border-border/60 bg-card">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/30 backdrop-blur-md z-10">
                    <TableRow className="hover:bg-transparent border-b">
                    <TableHead className="w-[100px] font-bold text-muted-foreground uppercase text-[11px] tracking-wider pl-6">Ciclo</TableHead>
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">Cortes Efectivos</TableHead>
                    <TableHead className="font-bold text-right text-muted-foreground uppercase text-[11px] tracking-wider">Total Programado</TableHead>
                    <TableHead className="text-right font-bold text-muted-foreground uppercase text-[11px] tracking-wider pr-6">Efectividad (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                        <TableCell className="font-bold text-foreground pl-6">{item.name}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">{item.atendidos.toLocaleString()}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">{item.total.toLocaleString()}</TableCell>
                        <TableCell className={`text-right font-bold tabular-nums pr-6 ${item.value < item.meta ? "text-destructive" : "text-foreground"}`}>
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