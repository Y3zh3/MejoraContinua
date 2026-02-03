
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { TrendingUp } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SEDES_CONFIG = [
    { id: 'comas', name: 'Comas', group: 'ITEM 1', color: 'hsl(var(--chart-1))' },
    { id: 'callao', name: 'Callao', group: 'ITEM 1', color: 'hsl(var(--chart-2))' },
    { id: 'ate', name: 'Ate', group: 'ITEM 2', color: 'hsl(var(--chart-3))' },
    { id: 'brena', name: 'Breña', group: 'ITEM 2', color: 'hsl(var(--chart-4))' },
    { id: 'sjl', name: 'SJL', group: 'ITEM 2', color: 'hsl(var(--chart-5))' },
    { id: 'surquillo', name: 'Surquillo', group: 'ITEM 3', color: '#2563eb' },
    { id: 'ves', name: 'Villa el Salvador', group: 'ITEM 3', color: '#7c3aed' },
    { id: 'clientes-e', name: 'Clientes especiales', group: 'ITEM 4', color: '#10b981' },
];

const matrixData = [
  { name: 'C01', comas: 98.6, callao: 98.0, ate: 98.4, brena: 99.2, sjl: 99.2, surquillo: 99.0, ves: 98.2, clientesE: 96.3, meta: 98.5 },
  { name: 'C02', comas: 100.9, callao: 98.7, ate: 98.0, brena: 98.3, sjl: 99.4, surquillo: 98.3, ves: 98.0, clientesE: 95.0, meta: 98.5 },
  { name: 'C03', comas: 98.4, callao: 99.6, ate: 99.1, brena: 98.8, sjl: 99.5, surquillo: 98.0, ves: 97.6, clientesE: 96.7, meta: 98.5 },
  { name: 'C04', comas: 96.2, callao: 99.4, ate: 99.3, brena: 99.0, sjl: 99.3, surquillo: 98.5, ves: 98.7, clientesE: 95.5, meta: 98.5 },
  { name: 'C05', comas: 94.3, callao: 99.5, ate: 99.0, brena: 99.1, sjl: 99.3, surquillo: 99.0, ves: 98.3, clientesE: 96.7, meta: 98.5 },
  { name: 'C06', comas: 96.2, callao: 98.8, ate: 98.7, brena: 97.2, sjl: 99.1, surquillo: 98.8, ves: 98.4, clientesE: 96.5, meta: 98.5 },
  { name: 'C07', comas: 93.6, callao: 98.4, ate: 98.9, brena: 96.4, sjl: 99.5, surquillo: 98.9, ves: 96.7, clientesE: 94.3, meta: 98.5 },
  { name: 'C08', comas: 96.9, callao: 98.8, ate: 98.3, brena: 97.4, sjl: 99.3, surquillo: 98.6, ves: 98.7, clientesE: 95.8, meta: 98.5 },
  { name: 'C09', comas: 96.0, callao: 98.9, ate: 97.8, brena: 99.0, sjl: 98.9, surquillo: 98.3, ves: 97.7, clientesE: 97.2, meta: 98.5 },
  { name: 'C10', comas: 96.3, callao: 98.1, ate: 99.0, brena: 97.7, sjl: 99.2, surquillo: null, ves: 95.7, clientesE: 95.7, meta: 98.5 },
  { name: 'C11', comas: null, callao: null, ate: null, brena: null, sjl: 99.5, surquillo: null, ves: null, clientesE: 100.0, meta: 98.5 },
];

export default function EfectividadTomaDeEstadoPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedBase, setSelectedBase] = useState('todas');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const filteredSedes = selectedBase === 'todas' 
    ? SEDES_CONFIG 
    : SEDES_CONFIG.filter(s => s.id === selectedBase);

  const getAverage = () => {
    let sum = 0;
    let count = 0;
    matrixData.forEach(d => {
        filteredSedes.forEach(s => {
            const val = d[s.id as keyof typeof d] as number | null;
            if (val !== null) {
                sum += val;
                count++;
            }
        });
    });
    return count > 0 ? (sum / count).toFixed(1) : "0";
  };

  const groupedRows = ['ITEM 1', 'ITEM 2', 'ITEM 3', 'ITEM 4'].map(group => ({
    group,
    items: SEDES_CONFIG.filter(s => s.group === group && (selectedBase === 'todas' || s.id === selectedBase))
  })).filter(g => g.items.length > 0);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-[hsl(var(--chart-2))]" />
            <h1 className="font-headline text-3xl font-bold">Toma de Estado: Efectividad</h1>
        </div>
        <BaseSelector onBaseChange={setSelectedBase} />
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
                            <p className="text-3xl font-bold text-[hsl(var(--chart-2))]">{getAverage()}%</p>
                        </div>
                         <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta</p>
                            <p className="text-3xl font-bold">98.5%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Tendencia Comparativa (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={matrixData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[90, 102]} unit="%"/>
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "8px",
                            }}
                            formatter={(value: number) => `${value}%`}
                        />
                        {selectedBase === 'todas' && <Legend />}
                        <ReferenceLine y={98.5} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                        {filteredSedes.map((sede) => (
                            <Line 
                                key={sede.id}
                                type="monotone" 
                                dataKey={sede.id} 
                                name={sede.name}
                                stroke={sede.color} 
                                strokeWidth={selectedBase === 'todas' ? 2 : 4}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                                connectNulls
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">Matriz de Rendimiento por Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
            <div className="max-h-[600px] overflow-auto">
                <Table>
                <TableHeader className="sticky top-0 bg-background z-20 shadow-sm">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-bold bg-muted/30 w-[180px]">ITEM</TableHead>
                        <TableHead className="font-bold text-center text-primary bg-muted/30">Meta</TableHead>
                        {['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'C10', 'C11'].map(c => (
                            <TableHead key={c} className="font-bold text-right">{c}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {groupedRows.map((group) => (
                        <div key={group.group} className="contents">
                            <TableRow className="bg-muted/40 hover:bg-muted/40 border-y-2">
                                <TableCell colSpan={13} className="font-bold py-2 uppercase tracking-wider text-xs text-muted-foreground">
                                    {group.group}
                                </TableCell>
                            </TableRow>
                            {group.items.map((sede) => (
                                <TableRow key={sede.id} className="hover:bg-primary/5 transition-colors">
                                    <TableCell className="font-semibold pl-6">{sede.name}</TableCell>
                                    <TableCell className="text-center font-bold text-primary">98.5%</TableCell>
                                    {matrixData.map((cycle) => {
                                        const val = cycle[sede.id as keyof typeof cycle] as number | null;
                                        return (
                                            <TableCell key={cycle.name} className={`text-right tabular-nums ${val !== null && val < 98.5 ? "text-destructive font-medium" : ""}`}>
                                                {val !== null ? `${val}%` : '-'}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </div>
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
