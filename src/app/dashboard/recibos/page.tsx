
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Receipt } from "lucide-react";

const cycleData = Array.from({ length: 13 }, (_, i) => ({
  name: `C${i + 1}`,
  value: Math.floor(Math.random() * 10) + 90,
  meta: 98,
}));

export default function RecibosPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Receipt className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Recibos</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rendimiento por Ciclo</CardTitle>
          <div className="w-48">
            <Select defaultValue="todas">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Sede" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las Sedes</SelectItem>
                <SelectItem value="comas">Comas</SelectItem>
                <SelectItem value="callao">Callao</SelectItem>
                <SelectItem value="ate">Ate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cycleData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar dataKey="value" name="Rendimiento" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mapa de Calor (Heatmap) por Sede/Mes</CardTitle>
        </CardHeader>
        <CardContent className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">Componente de Heatmap próximamente.</p>
        </CardContent>
      </Card>
    </div>
  );
}
