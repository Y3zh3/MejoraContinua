
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ComposedChart, LabelList } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


const basesData = [
  { name: "CO", quality: 92, total: 905 },
  { name: "CA", quality: 85, total: 468 },
  { name: "ATE", quality: 78, total: 734 },
  { name: "BRE", quality: 95, total: 1834 },
  { name: "SJL", quality: 88, total: 1270 },
  { name: "CE", quality: 98, total: 640 },
  { name: "SUR", quality: 91, total: 87 },
  { name: "VES", quality: 82, total: 341 },
];

const chartConfig = {
  quality: {
    label: "Eficacia",
    color: "hsl(var(--chart-1))",
  },
  total: {
    label: "Total Comunicados",
    color: "hsl(var(--chart-2))",
  }
};

const resumenEficaciaData = [
  { base: "3. ATE", conFirma: 36, bajoPuerta: 6, total: 42, meta: "80%", eficacia: 86 },
  { base: "5. SJL", conFirma: 22, bajoPuerta: 5, total: 27, meta: "80%", eficacia: 81 },
  { base: "2. CA", conFirma: 56, bajoPuerta: 15, total: 71, meta: "80%", eficacia: 79 },
  { base: "4. BRE", conFirma: 40, bajoPuerta: 17, total: 57, meta: "80%", eficacia: 70 },
  { base: "1. CO", conFirma: 134, bajoPuerta: 70, total: 204, meta: "80%", eficacia: 66 },
];

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

  const totalEficacia = Math.round((totals.conFirma / totals.total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center font-headline text-primary">RESUMEN DE % DE EFICACIA POR BASE</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>BASE</TableHead>
              <TableHead className="text-center">Con firma</TableHead>
              <TableHead className="text-center">Bajo puerta</TableHead>
              <TableHead className="text-center">Total de cartas</TableHead>
              <TableHead className="text-center">Meta</TableHead>
              <TableHead className="text-center">%Eficacia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumenEficaciaData.map((row) => (
              <TableRow key={row.base}>
                <TableCell className="font-medium">{row.base}</TableCell>
                <TableCell className="text-center">{row.conFirma}</TableCell>
                <TableCell className="text-center">{row.bajoPuerta}</TableCell>
                <TableCell className="text-center">{row.total}</TableCell>
                <TableCell className="text-center">{row.meta}</TableCell>
                <TableCell className="text-center font-bold">
                  <div className="flex items-center justify-center gap-2">
                    <span className={cn(
                      "h-3 w-3 rounded-full",
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
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-center font-bold">{totals.conFirma}</TableCell>
              <TableCell className="text-center font-bold">{totals.bajoPuerta}</TableCell>
              <TableCell className="text-center font-bold">{totals.total}</TableCell>
              <TableCell className="text-center font-bold">80%</TableCell>
              <TableCell className="text-center font-bold">{totalEficacia}%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};


function BasesChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ComposedChart
        accessibilityLayer
        data={basesData}
        margin={{ top: 30, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fontWeight: 'bold' }}
        />
        <YAxis
          yAxisId="left"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          hide
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, Math.max(...basesData.map(d => d.total)) + 500]}
          hide
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent
            indicator="dot"
            formatter={(value, name) => name === 'quality' ? `${value}%` : value}
          />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="quality" yAxisId="left" fill="var(--color-quality)" radius={8}>
            <LabelList
                dataKey="total"
                position="top"
                offset={10}
                className="fill-foreground font-bold"
                fontSize={12}
             />
             <LabelList
                dataKey="quality"
                position="inside"
                formatter={(value: number) => `${value}%`}
                className="fill-primary-foreground font-bold"
                fontSize={12}
             />
        </Bar>
        <Line
          dataKey="total"
          yAxisId="right"
          type="monotone"
          stroke="var(--color-total)"
          strokeWidth={2}
          strokeDasharray="3 3"
          dot={{
            fill: "var(--color-total)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </ComposedChart>
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
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="cartas-b3">
        <TabsList>
          <TabsTrigger value="cartas-b3">Cartas B3</TabsTrigger>
          <TabsTrigger value="preventivas-b4">Preventivas B4</TabsTrigger>
        </TabsList>
        <TabsContent value="cartas-b3" className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h1 className="font-headline text-3xl font-bold">Eficacia de Comunicados Cartas B3</h1>
              <p className="text-muted-foreground">Análisis de la efectividad de las comunicaciones con cédula.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              {kpis.map((kpi) => (
                <StatCard key={kpi.title} title={kpi.title} value={kpi.value} />
              ))}
            </div>

            <ResumenEficaciaTable />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Trabajadores con Resultados por Encima de la Meta</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>BASE</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="text-right">Con Firma</TableHead>
                        <TableHead className="text-right">Bajo Puerta</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresEncimaMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{trabajador.base}</TableCell>
                          <TableCell>{trabajador.nombre}</TableCell>
                          <TableCell className="text-right">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right">{trabajador.total}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={getEficaciaVariant(trabajador.eficacia)}>{trabajador.eficacia}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Trabajadores por Debajo de la Meta</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>BASE</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="text-right">Con Firma</TableHead>
                        <TableHead className="text-right">Bajo Puerta</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresDebajoMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{trabajador.base}</TableCell>
                          <TableCell>{trabajador.nombre}</TableCell>
                          <TableCell className="text-right">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right">{trabajador.total}</TableCell>
                          <TableCell className="text-right">
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
        <TabsContent value="preventivas-b4" className="mt-6">
        <div className="flex flex-col gap-6">
            <div className="text-center">
              <h1 className="font-headline text-3xl font-bold">Reporte de efectividad en la entrega de los comunicados "Con firma"</h1>
              <p className="text-muted-foreground">Análisis de la efectividad de las comunicaciones con cédula.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              {kpis.map((kpi) => (
                <StatCard key={kpi.title} title={kpi.title} value={kpi.value} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Trabajadores con Resultados por Encima de la Meta</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>BASE</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="text-right">Con Firma</TableHead>
                        <TableHead className="text-right">Bajo Puerta</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresEncimaMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{trabajador.base}</TableCell>
                          <TableCell>{trabajador.nombre}</TableCell>
                          <TableCell className="text-right">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right">{trabajador.total}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={getEficaciaVariant(trabajador.eficacia)}>{trabajador.eficacia}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Trabajadores por Debajo de la Meta</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>BASE</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="text-right">Con Firma</TableHead>
                        <TableHead className="text-right">Bajo Puerta</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">% Eficacia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trabajadoresDebajoMeta.map((trabajador, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{trabajador.base}</TableCell>
                          <TableCell>{trabajador.nombre}</TableCell>
                          <TableCell className="text-right">{trabajador.conFirma}</TableCell>
                          <TableCell className="text-right">{trabajador.bajoPuerta}</TableCell>
                          <TableCell className="text-right">{trabajador.total}</TableCell>
                          <TableCell className="text-right">
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

    