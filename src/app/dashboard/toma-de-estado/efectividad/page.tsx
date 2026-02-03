
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
    callao: {
        promedio: 98.4,
        meta: 98.5,
        label: "Callao",
        ciclos: [
            { name: 'C01', lecturas: 15151, total: 15457, value: 98.0 },
            { name: 'C02', lecturas: 15771, total: 15971, value: 98.7 },
            { name: 'C03', lecturas: 19912, total: 19991, value: 99.6 },
            { name: 'C04', lecturas: 19370, total: 19490, value: 99.4 },
            { name: 'C05', lecturas: 21464, total: 21571, value: 99.5 },
            { name: 'C06', lecturas: 17978, total: 18202, value: 98.8 },
            { name: 'C07', lecturas: 14759, total: 15003, value: 98.4 },
            { name: 'C08', lecturas: 22312, total: 22579, value: 98.8 },
            { name: 'C09', lecturas: 20210, total: 20435, value: 98.9 },
            { name: 'C10', lecturas: 13444, total: 13703, value: 98.1 },
        ]
    },
    ate: {
        promedio: 98.6,
        meta: 98.5,
        label: "Ate",
        ciclos: [
            { name: 'C01', lecturas: 33140, total: 33671, value: 98.4 },
            { name: 'C02', lecturas: 28248, total: 28819, value: 98.0 },
            { name: 'C03', lecturas: 26301, total: 26542, value: 99.1 },
            { name: 'C04', lecturas: 27955, total: 28156, value: 99.3 },
            { name: 'C05', lecturas: 19822, total: 20028, value: 99.0 },
            { name: 'C06', lecturas: 19869, total: 20139, value: 98.7 },
            { name: 'C07', lecturas: 18366, total: 18573, value: 98.9 },
            { name: 'C08', lecturas: 19735, total: 20077, value: 98.3 },
            { name: 'C09', lecturas: 19686, total: 20123, value: 97.8 },
            { name: 'C10', lecturas: 16987, total: 17157, value: 99.0 },
        ]
    },
    brena: {
        promedio: 97.8,
        meta: 98.5,
        label: "Breña",
        ciclos: [
            { name: 'C01', lecturas: 21598, total: 21775, value: 99.2 },
            { name: 'C02', lecturas: 21113, total: 21475, value: 98.3 },
            { name: 'C03', lecturas: 14461, total: 14640, value: 98.8 },
            { name: 'C04', lecturas: 20658, total: 20857, value: 99.0 },
            { name: 'C05', lecturas: 20233, total: 20419, value: 99.1 },
            { name: 'C06', lecturas: 10327, total: 10620, value: 97.2 },
            { name: 'C07', lecturas: 11198, total: 11617, value: 96.4 },
            { name: 'C08', lecturas: 11230, total: 11533, value: 97.4 },
            { name: 'C09', lecturas: 9562, total: 9662, value: 99.0 },
            { name: 'C10', lecturas: 11804, total: 12082, value: 97.7 },
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
    },
    surquillo: {
        promedio: 99.0,
        meta: 98.5,
        label: "Surquillo",
        ciclos: [
            { name: 'C01', lecturas: 18044, total: 18223, value: 99.0 },
            { name: 'C02', lecturas: 18552, total: 18871, value: 98.3 },
            { name: 'C03', lecturas: 19282, total: 19674, value: 98.0 },
            { name: 'C04', lecturas: 19904, total: 20206, value: 98.5 },
            { name: 'C05', lecturas: 23218, total: 23452, value: 99.0 },
            { name: 'C06', lecturas: 20894, total: 21158, value: 98.8 },
            { name: 'C07', lecturas: 19420, total: 19640, value: 98.9 },
            { name: 'C08', lecturas: 16128, total: 16365, value: 98.6 },
            { name: 'C09', lecturas: 15944, total: 16218, value: 98.3 },
        ]
    },
    ves: {
        promedio: 98.2,
        meta: 98.5,
        label: "Villa el Salvador",
        ciclos: [
            { name: 'C01', lecturas: 27638, total: 28153, value: 98.2 },
            { name: 'C02', lecturas: 28916, total: 29509, value: 98.0 },
            { name: 'C03', lecturas: 30200, total: 30927, value: 97.6 },
            { name: 'C04', lecturas: 27909, total: 28265, value: 98.7 },
            { name: 'C05', lecturas: 28764, total: 29252, value: 98.3 },
            { name: 'C06', lecturas: 27765, total: 28216, value: 98.4 },
            { name: 'C07', lecturas: 27013, total: 27930, value: 96.7 },
            { name: 'C08', lecturas: 21168, total: 21444, value: 98.7 },
            { name: 'C10', lecturas: 15521, total: 15893, value: 97.7 },
        ]
    },
    'clientes-e': {
        promedio: 96.4,
        meta: 98.5,
        label: "Clientes especiales",
        ciclos: [
            { name: 'C01', lecturas: 2007, total: 2085, value: 96.3 },
            { name: 'C02', lecturas: 2003, total: 2108, value: 95.0 },
            { name: 'C03', lecturas: 1636, total: 1692, value: 96.7 },
            { name: 'C04', lecturas: 1386, total: 1452, value: 95.5 },
            { name: 'C05', lecturas: 1448, total: 1497, value: 96.7 },
            { name: 'C06', lecturas: 1611, total: 1670, value: 96.5 },
            { name: 'C07', lecturas: 1122, total: 1190, value: 94.3 },
            { name: 'C08', lecturas: 886, total: 925, value: 95.8 },
            { name: 'C09', lecturas: 548, total: 564, value: 97.2 },
            { name: 'C10', lecturas: 596, total: 623, value: 95.7 },
            { name: 'C11', lecturas: 5, total: 5, value: 100 },
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
    setSelectedBaseLabel(newData.label || "");
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
                <CardTitle className="text-xl font-bold">Detalle de Rendimiento por Ciclo {selectedBaseLabel}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4">
            <div className="max-h-[650px] overflow-y-auto rounded-xl border border-border/60 bg-card">
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
                    {data.ciclos.map((item) => (
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
