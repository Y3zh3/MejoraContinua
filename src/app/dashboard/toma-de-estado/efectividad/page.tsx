
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const efectividadData = {
    todas: {
        promedio: 97.7,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.6, total: 194115, lecturas: 191426 },
            { name: 'C02', value: 98.9, total: 176267, lecturas: 174376 },
            { name: 'C03', value: 98.6, total: 183431, lecturas: 180879 },
            { name: 'C04', value: 98.3, total: 174275, lecturas: 171309 },
            { name: 'C05', value: 97.2, total: 165747, lecturas: 161090 },
            { name: 'C06', value: 97.7, total: 148834, lecturas: 145404 },
            { name: 'C07', value: 96.7, total: 146546, lecturas: 141686 },
            { name: 'C08', value: 98.4, total: 146232, lecturas: 143878 },
            { name: 'C09', value: 97.2, total: 139989, lecturas: 136007 },
            { name: 'C10', value: 98.7, total: 106208, lecturas: 104868 },
            { name: 'C11', value: 99.5, total: 12302, lecturas: 12242 },
        ]
    },
    comas: {
        promedio: 96.7,
        meta: 98.5,
        ciclos: [
          { name: 'C01', value: 98.6, total: 50621, lecturas: 49915 },
          { name: 'C02', value: 100.9, total: 42077, lecturas: 42440 },
          { name: 'C03', value: 98.4, total: 49555, lecturas: 48785 },
          { name: 'C04', value: 96.2, total: 50436, lecturas: 48521 },
          { name: 'C05', value: 94.3, total: 40558, lecturas: 38252 },
          { name: 'C06', value: 96.2, total: 38777, lecturas: 37315 },
          { name: 'C07', value: 93.6, total: 40358, lecturas: 37756 },
          { name: 'C08', value: 96.9, total: 40723, lecturas: 39454 },
          { name: 'C09', value: 96.0, total: 34207, lecturas: 32835 },
          { name: 'C10', value: 96.3, total: 33765, lecturas: 32525 },
        ]
    },
    callao: {
        promedio: 98.8,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.0, total: 15457, lecturas: 15151 },
            { name: 'C02', value: 98.7, total: 15971, lecturas: 15771 },
            { name: 'C03', value: 99.6, total: 19991, lecturas: 19912 },
            { name: 'C04', value: 99.4, total: 19490, lecturas: 19370 },
            { name: 'C05', value: 99.5, total: 21571, lecturas: 21464 },
            { name: 'C06', value: 98.8, total: 18202, lecturas: 17978 },
            { name: 'C07', value: 98.4, total: 15003, lecturas: 14759 },
            { name: 'C08', value: 98.8, total: 22579, lecturas: 22312 },
            { name: 'C09', value: 98.9, total: 20435, lecturas: 20210 },
            { name: 'C10', value: 98.1, total: 13703, lecturas: 13444 },
        ]
    },
    ate: {
        promedio: 98.7,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.4, total: 33671, lecturas: 33140 },
            { name: 'C02', value: 98.0, total: 28819, lecturas: 28248 },
            { name: 'C03', value: 99.1, total: 26542, lecturas: 26301 },
            { name: 'C04', value: 99.3, total: 28156, lecturas: 27955 },
            { name: 'C05', value: 99.0, total: 20028, lecturas: 19822 },
            { name: 'C06', value: 98.7, total: 20139, lecturas: 19869 },
            { name: 'C07', value: 98.9, total: 18573, lecturas: 18366 },
            { name: 'C08', value: 98.3, total: 20077, lecturas: 19735 },
            { name: 'C09', value: 97.8, total: 20123, lecturas: 19686 },
            { name: 'C10', value: 99.0, total: 17157, lecturas: 16987 },
        ]
    },
    brena: {
        promedio: 98.2,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.2, total: 21775, lecturas: 21598 },
            { name: 'C02', value: 98.3, total: 21475, lecturas: 21113 },
            { name: 'C03', value: 98.8, total: 14640, lecturas: 14461 },
            { name: 'C04', value: 99.0, total: 20857, lecturas: 20658 },
            { name: 'C05', value: 99.1, total: 20419, lecturas: 20233 },
            { name: 'C06', value: 97.2, total: 10620, lecturas: 10327 },
            { name: 'C07', value: 96.4, total: 11617, lecturas: 11198 },
            { name: 'C08', value: 97.4, total: 11533, lecturas: 11230 },
            { name: 'C09', value: 99.0, total: 9662, lecturas: 9562 },
            { name: 'C10', value: 97.7, total: 12082, lecturas: 11804 },
        ]
    },
    sjl: {
        promedio: 99.3,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.2, total: 24130, lecturas: 23933 },
            { name: 'C02', value: 99.4, total: 17437, lecturas: 17333 },
            { name: 'C03', value: 99.5, total: 20410, lecturas: 20302 },
            { name: 'C04', value: 99.3, total: 13615, lecturas: 13526 },
            { name: 'C05', value: 99.3, total: 18970, lecturas: 18841 },
            { name: 'C06', value: 99.1, total: 11252, lecturas: 11150 },
            { name: 'C07', value: 99.5, total: 13235, lecturas: 13174 },
            { name: 'C08', value: 99.3, total: 13056, lecturas: 12962 },
            { name: 'C09', value: 98.9, total: 18971, lecturas: 18761 },
            { name: 'C10', value: 94.2, total: 14438, lecturas: 14327 },
            { name: 'C11', value: 99.5, total: 12297, lecturas: 12237 },
        ]
    },
    surquillo: {
        promedio: 98.6,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.0, total: 18223, lecturas: 18044 },
            { name: 'C02', value: 98.3, total: 18871, lecturas: 18552 },
            { name: 'C03', value: 98.0, total: 19674, lecturas: 19282 },
            { name: 'C04', value: 98.5, total: 20206, lecturas: 19904 },
            { name: 'C05', value: 99.0, total: 23452, lecturas: 23218 },
            { name: 'C06', value: 98.8, total: 21158, lecturas: 20894 },
            { name: 'C07', value: 98.9, total: 19640, lecturas: 19420 },
            { name: 'C08', value: 98.6, total: 16365, lecturas: 16128 },
            { name: 'C09', value: 98.3, total: 16218, lecturas: 15944 },
        ]
    },
    ves: { // Villa el Salvador
        promedio: 98.0,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.2, total: 28153, lecturas: 27638 },
            { name: 'C02', value: 98.0, total: 29509, lecturas: 28916 },
            { name: 'C03', value: 97.6, total: 30927, lecturas: 30200 },
            { name: 'C04', value: 98.7, total: 28265, lecturas: 27909 },
            { name: 'C05', value: 98.3, total: 29252, lecturas: 28764 },
            { name: 'C06', value: 98.4, total: 28216, lecturas: 27765 },
            { name: 'C07', value: 96.7, total: 27930, lecturas: 27013 },
            { name: 'C08', value: 98.7, total: 21444, lecturas: 21168 },
            { name: 'C09', value: 97.7, total: 15893, lecturas: 15521 },
        ]
    },
    'clientes-e': {
        promedio: 96.3,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 96.3, total: 2085, lecturas: 2007 },
            { name: 'C02', value: 95.0, total: 2108, lecturas: 2003 },
            { name: 'C03', value: 96.7, total: 1692, lecturas: 1636 },
            { name: 'C04', value: 95.5, total: 1452, lecturas: 1386 },
            { name: 'C05', value: 96.7, total: 1497, lecturas: 1448 },
            { name: 'C06', value: 96.5, total: 1670, lecturas: 1611 },
            { name: 'C07', value: 94.3, total: 1190, lecturas: 1122 },
            { name: 'C08', value: 925, total: 925, lecturas: 886 },
            { name: 'C09', value: 97.2, total: 564, lecturas: 548 },
            { name: 'C10', value: 95.7, total: 623, lecturas: 596 },
            { name: 'C11', value: 100.0, total: 5, lecturas: 5 },
        ]
    }
};

export default function EfectividadTomaDeEstadoPage() {
  const [data, setData] = useState(efectividadData.todas);

  const handleBaseChange = (base: string) => {
    setData(efectividadData[base as keyof typeof efectividadData] || efectividadData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <TrendingUp className="h-8 w-8 text-[hsl(var(--chart-2))]" />
          <h1 className="font-headline text-3xl font-bold">Toma de Estado: Efectividad</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader>
                <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 pt-2 h-60 overflow-y-auto">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Análisis del indicador de <span className="font-semibold text-foreground">Efectividad</span> para el periodo de <span className="font-semibold text-foreground">Enero 2026</span>.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                            <p className="text-4xl font-bold text-[hsl(var(--chart-2))]">{data.promedio}%</p>
                        </div>
                         <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                            <p className="text-4xl font-bold">{data.meta}%</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            La efectividad es extremadamente alta, muy cerca o alcanzando el 100%. El proceso es robusto y se ejecuta con un alto grado de precisión.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl">Rendimiento por Ciclo - Enero 2026</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.ciclos}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[90, 101]} unit="%"/>
                    <Tooltip
                        contentStyle={{
                        background: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px",
                        }}
                        formatter={(value: number) => `${value}%`}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Efectividad" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm h-full flex flex-col">
            <CardHeader>
            <CardTitle className="text-xl">Detalle de Lecturas por Ciclo</CardTitle>
            <p className="text-base text-muted-foreground">
                Desglose de lecturas realizadas frente al total programado para cada ciclo.
            </p>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[580px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Lecturas Realizadas</TableHead>
                    <TableHead className="font-bold">Total Lecturas</TableHead>
                    <TableHead className="text-right font-bold">Efectividad (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((ciclo) => (
                    <TableRow key={ciclo.name}>
                        <TableCell className="font-semibold">{ciclo.name}</TableCell>
                        <TableCell>{ciclo.lecturas.toLocaleString()}</TableCell>
                        <TableCell>{ciclo.total.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">{ciclo.value}%</TableCell>
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
