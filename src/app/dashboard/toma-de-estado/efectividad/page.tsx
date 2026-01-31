"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const efectividadData = {
    todas: {
        promedio: 96.8,
        meta: 98.5,
        ciclos: [
          { name: 'C01', value: 98.6, total: 50621, lecturas: 49915 },
          { name: 'C02', value: 100.9, total: 50545, lecturas: 51000 },
          { name: 'C03', value: 98.4, total: 51423, lecturas: 50599 },
          { name: 'C04', value: 96.2, total: 52614, lecturas: 50615 },
          { name: 'C05', value: 94.3, total: 53696, lecturas: 50635 },
          { name: 'C06', value: 96.2, total: 52614, lecturas: 50615 },
          { name: 'C07', value: 93.6, total: 54104, lecturas: 50641 },
          { name: 'C08', value: 96.9, total: 52238, lecturas: 50619 },
          { name: 'C09', value: 96.0, total: 52734, lecturas: 50625 },
          { name: 'C10', value: 96.3, total: 52568, lecturas: 50623 },
        ]
    },
    comas: {
        promedio: 96.8,
        meta: 98.5,
        ciclos: [
          { name: 'C01', value: 98.6, total: 50621, lecturas: 49915 },
          { name: 'C02', value: 100.9, total: 50545, lecturas: 51000 },
          { name: 'C03', value: 98.4, total: 51423, lecturas: 50599 },
          { name: 'C04', value: 96.2, total: 52614, lecturas: 50615 },
          { name: 'C05', value: 94.3, total: 53696, lecturas: 50635 },
          { name: 'C06', value: 96.2, total: 52614, lecturas: 50615 },
          { name: 'C07', value: 93.6, total: 54104, lecturas: 50641 },
          { name: 'C08', value: 96.9, total: 52238, lecturas: 50619 },
          { name: 'C09', value: 96.0, total: 52734, lecturas: 50625 },
          { name: 'C10', value: 96.3, total: 52568, lecturas: 50623 },
        ]
    },
    callao: {
        promedio: 98.9,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.0, total: 52040, lecturas: 51000 },
            { name: 'C02', value: 98.7, total: 51460, lecturas: 50790 },
            { name: 'C03', value: 99.6, total: 50955, lecturas: 50751 },
            { name: 'C04', value: 99.4, total: 51100, lecturas: 50794 },
            { name: 'C05', value: 99.5, total: 51000, lecturas: 50745 },
            { name: 'C06', value: 98.8, total: 51300, lecturas: 50684 },
            { name: 'C07', value: 98.4, total: 51200, lecturas: 50379 },
            { name: 'C08', value: 98.8, total: 51000, lecturas: 50388 },
            { name: 'C09', value: 98.9, total: 50950, lecturas: 50389 },
            { name: 'C10', value: 98.1, total: 51000, lecturas: 50031 },
        ]
    },
    ate: {
        promedio: 98.6,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.4, total: 49800, lecturas: 49003 },
            { name: 'C02', value: 98.0, total: 49900, lecturas: 48902 },
            { name: 'C03', value: 99.1, total: 50000, lecturas: 49550 },
            { name: 'C04', value: 99.3, total: 50100, lecturas: 49749 },
            { name: 'C05', value: 99.0, total: 50200, lecturas: 49698 },
            { name: 'C06', value: 98.7, total: 50300, lecturas: 49646 },
            { name: 'C07', value: 98.9, total: 50400, lecturas: 49845 },
            { name: 'C08', value: 98.3, total: 50500, lecturas: 49641 },
            { name: 'C09', value: 97.8, total: 50600, lecturas: 49486 },
            { name: 'C10', value: 99.0, total: 50700, lecturas: 50193 },
        ]
    },
    brena: {
        promedio: 98.4,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.2, total: 51000, lecturas: 50592 },
            { name: 'C02', value: 98.3, total: 51100, lecturas: 50231 },
            { name: 'C03', value: 98.8, total: 51200, lecturas: 50585 },
            { name: 'C04', value: 99.0, total: 51300, lecturas: 50787 },
            { name: 'C05', value: 99.1, total: 51400, lecturas: 50937 },
            { name: 'C06', value: 97.2, total: 51500, lecturas: 50058 },
            { name: 'C07', value: 96.4, total: 51600, lecturas: 49742 },
            { name: 'C08', value: 97.4, total: 51700, lecturas: 50356 },
            { name: 'C09', value: 99.0, total: 51800, lecturas: 51282 },
            { name: 'C10', value: 97.7, total: 51900, lecturas: 50706 },
        ]
    },
    sjl: {
        promedio: 99.3,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.2, total: 52000, lecturas: 51584 },
            { name: 'C02', value: 99.4, total: 52100, lecturas: 51787 },
            { name: 'C03', value: 99.5, total: 52200, lecturas: 51939 },
            { name: 'C04', value: 99.3, total: 52300, lecturas: 51933 },
            { name: 'C05', value: 99.3, total: 52400, lecturas: 52033 },
            { name: 'C06', value: 99.1, total: 52500, lecturas: 52027 },
            { name: 'C07', value: 99.5, total: 52600, lecturas: 52337 },
            { name: 'C08', value: 99.3, total: 52700, lecturas: 52331 },
            { name: 'C09', value: 98.9, total: 52800, lecturas: 52219 },
            { name: 'C10', value: 99.2, total: 52900, lecturas: 52476 },
            { name: 'C11', value: 99.5, total: 53000, lecturas: 52735 },
        ]
    },
    surquillo: {
        promedio: 98.6,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 99.0, total: 49000, lecturas: 48510 },
            { name: 'C02', value: 98.3, total: 49100, lecturas: 48265 },
            { name: 'C03', value: 98.0, total: 49200, lecturas: 48216 },
            { name: 'C04', value: 98.5, total: 49300, lecturas: 48560 },
            { name: 'C05', value: 99.0, total: 49400, lecturas: 48906 },
            { name: 'C06', value: 98.8, total: 49500, lecturas: 48906 },
            { name: 'C07', value: 98.9, total: 49600, lecturas: 49054 },
            { name: 'C08', value: 98.6, total: 49700, lecturas: 49004 },
            { name: 'C09', value: 98.3, total: 49800, lecturas: 48953 },
        ]
    },
    ves: { // Villa el Salvador
        promedio: 98.0,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 98.2, total: 50000, lecturas: 49100 },
            { name: 'C02', value: 98.0, total: 50100, lecturas: 49098 },
            { name: 'C03', value: 97.6, total: 50200, lecturas: 49000 },
            { name: 'C04', value: 98.7, total: 50300, lecturas: 49646 },
            { name: 'C05', value: 98.3, total: 50400, lecturas: 49543 },
            { name: 'C06', value: 98.4, total: 50500, lecturas: 49692 },
            { name: 'C07', value: 96.7, total: 50600, lecturas: 48930 },
            { name: 'C08', value: 98.7, total: 50700, lecturas: 49940 },
            { name: 'C09', value: 97.7, total: 50800, lecturas: 49631 },
        ]
    },
    'clientes-e': {
        promedio: 95.9,
        meta: 98.5,
        ciclos: [
            { name: 'C01', value: 96.3, total: 10000, lecturas: 9630 },
            { name: 'C02', value: 95.0, total: 10100, lecturas: 9595 },
            { name: 'C03', value: 96.7, total: 10200, lecturas: 9863 },
            { name: 'C04', value: 95.5, total: 10300, lecturas: 9836 },
            { name: 'C05', value: 96.7, total: 10400, lecturas: 10056 },
            { name: 'C06', value: 96.5, total: 10500, lecturas: 10132 },
            { name: 'C07', value: 94.3, total: 10600, lecturas: 9995 },
            { name: 'C08', value: 95.8, total: 10700, lecturas: 10250 },
            { name: 'C09', value: 97.2, total: 10800, lecturas: 10497 },
            { name: 'C10', value: 95.7, total: 10900, lecturas: 10431 },
            { name: 'C11', value: 100, total: 11000, lecturas: 11000 },
        ]
    }
};

export default function EfectividadTomaDeEstadoPage() {
  const [data, setData] = useState(efectividadData.todas);

  const handleBaseChange = (base: string) => {
    setData(efectividadData[base as keyof typeof efectividadData] || efectividadData.todas);
  };
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <TrendingUp className="h-8 w-8 text-[hsl(var(--chart-2))]" />
          <h1 className="font-headline text-3xl font-bold">Toma de Estado: Efectividad</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Rendimiento por Ciclo - Enero 2026</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.ciclos}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[90, 101]} unit="%"/>
                <Tooltip
                    contentStyle={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    }}
                    formatter={(value: number) => `${value}%`}
                />
                <Legend />
                <Bar dataKey="value" name="Efectividad" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-6">
                <p className="text-muted-foreground">
                    Análisis del indicador de <span className="font-semibold text-foreground">Efectividad</span> para el periodo de <span className="font-semibold text-foreground">Enero 2026</span>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Promedio del periodo</p>
                        <p className="text-3xl font-bold text-[hsl(var(--chart-2))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Meta establecida</p>
                        <p className="text-3xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold">Observaciones</h4>
                    <p className="text-sm text-muted-foreground">La efectividad es extremadamente alta, muy cerca o alcanzando el 100%. El proceso es robusto y se ejecuta con un alto grado de precisión.</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Lecturas por Ciclo</CardTitle>
          <p className="text-sm text-muted-foreground">
            Desglose de lecturas realizadas frente al total programado para cada ciclo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead className="w-[100px]">Ciclo</TableHead>
                  <TableHead>Lecturas Realizadas</TableHead>
                  <TableHead>Total Lecturas</TableHead>
                  <TableHead className="text-right">Efectividad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.ciclos.map((ciclo) => (
                  <TableRow key={ciclo.name}>
                    <TableCell className="font-medium">{ciclo.name}</TableCell>
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
  );
}
