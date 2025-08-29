
"use client";

import { StatCard } from "@/components/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/charts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


const resumenEficaciaData = [
  { base: "3. ATE", conFirma: 36, bajoPuerta: 6, total: 42, meta: "80%", eficacia: 86 },
  { base: "5. SJL", conFirma: 22, bajoPuerta: 5, total: 27, meta: "80%", eficacia: 81 },
  { base: "2. CA", conFirma: 56, bajoPuerta: 15, total: 71, meta: "80%", eficacia: 79 },
  { base: "4. BRE", conFirma: 40, bajoPuerta: 17, total: 57, meta: "80%", eficacia: 70 },
  { base: "1. CO", conFirma: 134, bajoPuerta: 70, total: 204, meta: "80%", eficacia: 66 },
];

const chartConfig = {
  eficacia: {
    label: "Eficacia",
    color: "hsl(var(--chart-1))",
  },
};


const ResumenEficaciaTable = () => {
  const totals = resumenEficaciaData.reduce(
    (acc, item) => {
      acc.conFirma += item.conFirma;
      acc.bajoPuerta += item.bajoPuerta;
      acc.total += item.total;
      return acc;
    },
    { conFirma: 0, bajoPuerta: 0, total: 0 }
  );

  const totalEficacia = totals.total > 0 ? Math.round((totals.conFirma / totals.total) * 100) : 0;

  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle className="text-center font-headline text-primary text-sm">RESUMEN DE % DE EFICACIA POR BASE</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-1 text-xs">BASE</TableHead>
              <TableHead className="text-center p-1 text-xs">Con firma</TableHead>
              <TableHead className="text-center p-1 text-xs">Bajo puerta</TableHead>
              <TableHead className="text-center p-1 text-xs">Total</TableHead>
              <TableHead className="text-center p-1 text-xs">Meta</TableHead>
              <TableHead className="text-center p-1 text-xs">%Eficacia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumenEficaciaData.map((row) => (
              <TableRow key={row.base}>
                <TableCell className="font-medium p-1 text-xs">{row.base}</TableCell>
                <TableCell className="text-center p-1 text-xs">{row.conFirma}</TableCell>
                <TableCell className="text-center p-1 text-xs">{row.bajoPuerta}</TableCell>
                <TableCell className="text-center p-1 text-xs">{row.total}</TableCell>
                <TableCell className="text-center p-1 text-xs">{row.meta}</TableCell>
                <TableCell className="text-center font-bold p-1 text-xs">
                  <div className="flex items-center justify-center gap-1">
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      row.eficacia >= 80 ? "bg-green-500" : "bg-red-500"
                    )}></span>
                    {row.eficacia}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-primary text-primary-foreground hover:bg-primary/90">
              <TableCell className="font-bold p-1 text-xs">Total</TableCell>
              <TableCell className="text-center font-bold p-1 text-xs">{totals.conFirma}</TableCell>
              <TableCell className="text-center font-bold p-1 text-xs">{totals.bajoPuerta}</TableCell>
              <TableCell className="text-center font-bold p-1 text-xs">{totals.total}</TableCell>
              <TableCell className="text-center font-bold p-1 text-xs">80%</TableCell>
              <TableCell className="text-center font-bold p-1 text-xs">{totalEficacia}%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};


function BasesChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={resumenEficaciaData}
        layout="vertical"
        margin={{ right: 30, top: 10, bottom: 10 }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="base"
          type="category"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          tick={{ fontSize: 10, fontWeight: 'bold' }}
        />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          hide
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent
            indicator="dot"
            formatter={(value) => `${value}%`}
          />}
        />
        <Bar dataKey="eficacia" fill="var(--color-eficacia)" radius={4}>
            <LabelList
                dataKey="eficacia"
                position="right"
                offset={8}
                formatter={(value: number) => `${value}%`}
                className="fill-foreground font-bold"
                fontSize={10}
             />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export default function ComunicadosPage() {
  const kpis = [
    { title: "Total de Cartas", value: "401" },
    { title: "Con Firma", value: "288" },
    { title: "Bajo Puerta", value: "113" },
    { title: "% de Eficacia", value: "72%" },
  ];

  const trabajadoresEncimaMeta = [
    { base: "1. CO", nombre: "CHUMPITAZ LOPEZ", conFirma: 34, bajoPuerta: 0, total: 34, meta: "80%", eficacia: "100%" },
    { base: "2. CA", nombre: "ASTORGA QUIROZ V", conFirma: 24, bajoPuerta: 0, total: 24, meta: "80%", eficacia: "100%" },
    { base: "2. CA", nombre: "CASTAÑEDA BARCO", conFirma: 32, bajoPuerta: 0, total: 32, meta: "80%", eficacia: "100%" },
    { base: "3. ATE", nombre: "ELESCANO RIOS DA", conFirma: 8, bajoPuerta: 0, total: 8, meta: "80%", eficacia: "100%" },
    { base: "4. BRE", nombre: "ALDAZABAL SAIRE", conFirma: 30, bajoPuerta: 0, total: 30, meta: "80%", eficacia: "100%" },
    { base: "5. SJL", nombre: "QUISPE QUISPE JA", conFirma: 17, bajoPuerta: 0, total: 17, meta: "80%", eficacia: "100%" },
  ];

  const trabajadoresDebajoMeta = [
    { base: "1. CO", nombre: "PEREZ TRISTAN JO", conFirma: 29, bajoPuerta: 37, total: 66, meta: "80%", eficacia: "44%" },
    { base: "3. ATE", nombre: "MORE MORALES EDU", conFirma: 22, bajoPuerta: 6, total: 28, meta: "80%", eficacia: "79%" },
    { base: "4. BRE", nombre: "JURO GONZALES NI", conFirma: 0, bajoPuerta: 17, total: 17, meta: "80%", eficacia: "0%" },
    { base: "5. SJL", nombre: "CHICCHE BAILON D", conFirma: 0, bajoPuerta: 5, total: 5, meta: "80%", eficacia: "0%" },
  ];

  const getEficaciaVariant = (eficacia: string) => {
    const value = parseInt(eficacia.replace('%', ''));
    if (value >= 80) return "success";
    if (value < 50) return "destructive";
    return "warning";
  }

  return (
    <div className="flex flex-col gap-2">
      <Tabs defaultValue="cartas-b3">
        <TabsList>
          <TabsTrigger value="cartas-b3">Cartas B3</TabsTrigger>
          <TabsTrigger value="preventivas-b4">Preventivas B4</TabsTrigger>
        </TabsList>
        <TabsContent value="cartas-b3" className="mt-2">
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <h1 className="font-headline text-xl font-bold">Eficacia de Comunicados Cartas B3</h1>
              <p className="text-xs text-muted-foreground">Análisis de la efectividad de las comunicaciones con cédula.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
              {kpis.map((kpi) => (
                <StatCard key={kpi.title} title={kpi.title} value={kpi.value} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <ResumenEficaciaTable />
              <ChartCard
                title="Eficacia por Base"
                description="Porcentaje de eficacia de comunicados por cada base."
                chart={<BasesChart />}
              />
            </div>
            

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="font-headline text-sm">Trabajadores con Resultados por Encima de la Meta</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="p-1 text-xs">BASE</TableHead>
                        <TableHead className="p-1 text-xs">Nombre</TableHead>
                        <TableHead className="text-right p-1 text-xs">C/Firma</TableHead>
                        <TableHead className="text-right p-1 text-xs">B/Puerta</TableHead>
                        <TableHead className="text-right p-1 text-xs">Total</TableHead>
                        <TableHead className="text-right p-1 text-xs">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresEncimaMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium p-1 text-xs">{trabajador.base}</TableCell>
                          <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                          <TableCell className="text-right p-1 text-xs">
                            <Badge variant={getEficaciaVariant(trabajador.eficacia)}>{trabajador.eficacia}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="font-headline text-sm">Trabajadores por Debajo de la Meta</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="p-1 text-xs">BASE</TableHead>
                        <TableHead className="p-1 text-xs">Nombre</TableHead>
                        <TableHead className="text-right p-1 text-xs">C/Firma</TableHead>
                        <TableHead className="text-right p-1 text-xs">B/Puerta</TableHead>
                        <TableHead className="text-right p-1 text-xs">Total</TableHead>
                        <TableHead className="text-right p-1 text-xs">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresDebajoMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium p-1 text-xs">{trabajador.base}</TableCell>
                          <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                          <TableCell className="text-right p-1 text-xs">
                            <Badge variant={getEficaciaVariant(trabajador.eficacia)}>{trabajador.eficacia}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </TabsContent>
        <TabsContent value="preventivas-b4" className="mt-2">
        <div className="flex flex-col gap-2">
            <div className="text-center">
              <h1 className="font-headline text-xl font-bold">Reporte de efectividad en la entrega de los comunicados "Con firma"</h1>
              <p className="text-xs text-muted-foreground">Análisis de la efectividad de las comunicaciones con cédula.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
              {kpis.map((kpi) => (
                <StatCard key={kpi.title} title={kpi.title} value={kpi.value} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="font-headline text-sm">Trabajadores con Resultados por Encima de la Meta</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="p-1 text-xs">BASE</TableHead>
                        <TableHead className="p-1 text-xs">Nombre</TableHead>
                        <TableHead className="text-right p-1 text-xs">C/Firma</TableHead>
                        <TableHead className="text-right p-1 text-xs">B/Puerta</TableHead>
                        <TableHead className="text-right p-1 text-xs">Total</TableHead>
                        <TableHead className="text-right p-1 text-xs">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresEncimaMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium p-1 text-xs">{trabajador.base}</TableCell>
                          <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                          <TableCell className="text-right p-1 text-xs">
                            <Badge variant={getEficaciaVariant(trabajador.eficacia)}>{trabajador.eficacia}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="font-headline text-sm">Trabajadores por Debajo de la Meta</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="p-1 text-xs">BASE</TableHead>
                        <TableHead className="p-1 text-xs">Nombre</TableHead>
                        <TableHead className="text-right p-1 text-xs">C/Firma</TableHead>
                        <TableHead className="text-right p-1 text-xs">B/Puerta</TableHead>
                        <TableHead className="text-right p-1 text-xs">Total</TableHead>
                        <TableHead className="text-right p-1 text-xs">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresDebajoMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium p-1 text-xs">{trabajador.base}</TableCell>
                          <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                          <TableCell className="text-right p-1 text-xs">
                            <Badge variant={getEficaciaVariant(trabajador.eficacia)}>{trabajador.eficacia}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <ChartCard
              title="Calidad de Comunicados por Base"
              description="Efectividad de entrega de comunicados con cédula por cada base."
              chart={<BasesChart />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
