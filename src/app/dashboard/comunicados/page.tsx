import { StatCard } from "@/components/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/charts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const basesData = [
  { name: "CO", quality: 92 },
  { name: "CA", quality: 85 },
  { name: "ATE", quality: 78 },
  { name: "BRE", quality: 95 },
  { name: "SJL", quality: 88 },
  { name: "CE", quality: 98 },
  { name: "SUR", quality: 91 },
  { name: "VES", quality: 82 },
];

const chartConfig = {
  quality: {
    label: "Calidad",
    color: "hsl(var(--chart-1))",
  },
};

function BasesChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={basesData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent
            formatter={(value) => `${value}%`}
            indicator="dot"
          />}
        />
        <Bar dataKey="quality" fill="var(--color-quality)" radius={8} />
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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Reporte de efectividad en la entrega de los comunicados "Con firma"</h1>
        <p className="text-muted-foreground">Análisis de la efectividad de las comunicaciones con cédula.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}
