"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { TrendingUp } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const efectividadData = {
    todas: {
        promedio: 98.1,
        meta: 98.5,
        ciclos: [
            { name: 'C01', lecturas: 181245, total: 184560, value: 98.2 },
            { name: 'C02', lecturas: 156780, total: 159430, value: 98.3 },
            { name: 'C03', lecturas: 172340, total: 174890, value: 98.5 },
            { name: 'C04', lecturas: 165430, total: 168900, value: 97.9 },
            { name: 'C05', lecturas: 158900, total: 162100, value: 98.0 },
            { name: 'C06', lecturas: 145600, total: 148900, value: 97.8 },
            { name: 'C07', lecturas: 142300, total: 146100, value: 97.4 },
            { name: 'C08', lecturas: 148900, total: 152340, value: 97.7 },
            { name: 'C09', lecturas: 140100, total: 143500, value: 97.6 },
            { name: 'C10', lecturas: 135400, total: 138900, value: 97.5 },
            { name: 'C11', lecturas: 12242, total: 12302, value: 99.5 },
        ]
    },
    comas: {
        promedio: 96.8,
        meta: 98.5,
        label: "Comas",
        ciclos: [
            { name: 'C01', lecturas: 49915, total: 50621, value: 98.6 },
            { name: 'C02', lecturas: 42440, total: 42077, value: 100.9 },
            { name: 'C03', lecturas: 48785, total: 49555, value: 98.4 },
            { name: 'C04', lecturas: 48521, total: 50436, value: 96.2 },
            { name: 'C05', lecturas: 38252, total: 40558, value: 94.3 },
            { name: 'C06', lecturas: 37315, total: 38777, value: 96.2 },
            { name: 'C07', lecturas: 37756, total: 40358, value: 93.6 },
            { name: 'C08', lecturas: 39454, total: 40723, value: 96.9 },
            { name: 'C09', lecturas: 32835, total: 34207, value: 96.0 },
            { name: 'C10', lecturas: 32525, total: 33765, value: 96.3 },
        ]
    },
    sjl: {
        promedio: 99.3,
        meta: 98.5,
        label: "SJL",
        ciclos: [
            { name: 'C01', lecturas: 23933, total: 24130, value: 99.2 },
            { name: 'C02', lecturas: 17333, total: 17437, value: 99.4 },
            { name: 'C03', lecturas: 20302, total: 20410, value: 99.5 },
            { name: 'C04', lecturas: 13526, total: 13615, value: 99.3 },
            { name: 'C05', lecturas: 18841, total: 18970, value: 99.3 },
            { name: 'C06', lecturas: 11150, total: 11252, value: 99.1 },
            { name: 'C07', lecturas: 13174, total: 13235, value: 99.5 },
            { name: 'C08', lecturas: 12962, total: 13056, value: 99.3 },
            { name: 'C09', lecturas: 18761, total: 18971, value: 98.9 },
            { name: 'C10', lecturas: 14327, total: 14438, value: 99.2 },
            { name: 'C11', lecturas: 12237, total: 12297, value: 99.5 },
        ]
    }
};

export default function EfectividadTomaDeEstadoPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(efectividadData.todas);
  const [selectedBaseLabel, setSelectedBaseLabel] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBaseChange = (base: string) => {
    const newData = (efectividadData as any)[base] || efectividadData.todas;
    setData(newData);
    setSelectedBaseLabel(newData.label ? ` ${newData.label}` : "");
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
        <div className="flex flex-col gap-6">
            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-center">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-border/50 py-3 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Promedio Periodo</p>
                            <p className="text-3xl font-black text-[hsl(var(--chart-2))]">{data.promedio}%</p>
                        </div>
                         <div className="border border-border/50 py-3 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Meta</p>
                            <p className="text-3xl font-black">98.5%</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
                            Este indicador refleja el cumplimiento operativo en la captura de lecturas de medidores. Una alta efectividad asegura que la facturación se base en consumos reales, minimizando errores y mejorando la satisfacción del cliente.
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
                    <BarChart data={data.ciclos.filter(c => c.value > 0)} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis domain={[80, 105]} unit="%" tick={{ fontSize: 12 }} />
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
                        <Legend iconType="rect" verticalAlign="bottom" wrapperStyle={{ paddingTop: '5px' }} />
                        <Bar dataKey="value" name="Efectividad" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} />
                        <ReferenceLine y={98.5} label={{ position: 'top', value: 'Meta', fontSize: 10, fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </BarChart>
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
                    {data.ciclos.filter(c => c.total > 0).map((item) => (
                    <TableRow key={item.name} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                        <TableCell className="font-bold text-foreground pl-6">{item.name}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground font-medium">
                            {item.lecturas?.toLocaleString()}
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
