
"use client";

import { StatCard } from "@/components/stat-card";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const eficaciaPorCicloData = [
    { ciclo: "8.CE", eficacia: 100 },
    { ciclo: "3. ATE", eficacia: 85 },
    { ciclo: "2. CA", eficacia: 83 },
    { ciclo: "6.SUR", eficacia: 81 },
    { ciclo: "5. SJL", eficacia: 77 },
    { ciclo: "1. CO", eficacia: 64 },
    { ciclo: "4. BRE", eficacia: 63 },
    { ciclo: "7.VES", eficacia: 46 },
];

const chartConfig = {
  eficacia: {
    label: "%Eficacia",
    color: "hsl(var(--chart-1))",
  },
  ciclo: {
    label: "Ciclo"
  }
};


const EficaciaPorCicloChart = () => (
    <Card className="w-full h-full">
        <CardHeader className="p-4">
            <CardTitle className="text-center font-bold text-primary text-xl">%EFICACIA POR CICLO</CardTitle>
            <CardDescription className="text-center text-sm">Meta 80%</CardDescription>
        </CardHeader>
        <CardContent className="p-2 h-[calc(100%-80px)]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart data={eficaciaPorCicloData} layout="vertical" margin={{ top: 20, right: 40, left: 0, bottom: 10 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <YAxis dataKey="ciclo" type="category" tickLine={false} axisLine={false} tickMargin={10} fontSize={14} fontWeight="bold" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="eficacia" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} barSize={30}>
                        <LabelList dataKey="eficacia" position="right" formatter={(value:number) => `${value}%`} className="fill-foreground font-bold" fontSize={14} />
                    </Bar>
                </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
    </Card>
);


export default function ComunicadosPage() {
  const kpis = [
    { title: "TOTAL DE CARTAS", value: "401" },
    { title: "CON FIRMA", value: "288" },
    { title: "BAJO PUERTA", value: "113" },
    { title: "% DE EFICACIA", value: "72%" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="cartas-b3">
        <TabsList>
          <TabsTrigger value="cartas-b3">Cartas B3</TabsTrigger>
          <TabsTrigger value="preventivas-b4">Preventivas B4</TabsTrigger>
        </TabsList>
        <TabsContent value="cartas-b3" className="mt-4">
          <div className="flex flex-col gap-6">

            <div className="flex items-center gap-6">
                <div className="w-24 h-24 flex-shrink-0">
                   <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                       <span className="text-sm text-muted-foreground">Logo</span>
                   </div>
                </div>
                <h1 className="text-2xl font-bold text-primary flex-1 text-center">Reporte de efectividad en la entrega de los comunicados "Con firma"</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map(kpi => <StatCard key={kpi.title} title={kpi.title} value={kpi.value} />)}
            </div>
            
            <div className="w-[30%] h-[70vh]">
                <EficaciaPorCicloChart />
            </div>

          </div>
        </TabsContent>
        <TabsContent value="preventivas-b4" className="mt-4">
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">El contenido para "Preventivas B4" estará disponible pronto.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
