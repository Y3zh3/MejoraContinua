
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";


const morosidadData = [
    { month: "Ene", morosidad: 60, recuperacion: 40 },
    { month: "Feb", morosidad: 55, recuperacion: 45 },
    { month: "Mar", morosidad: 58, recuperacion: 42 },
    { month: "Abr", morosidad: 62, recuperacion: 38 },
    { month: "May", morosidad: 57, recuperacion: 43 },
    { month: "Jun", morosidad: 65, recuperacion: 35 },
];

const volumenAnualData = [
    { year: '2019', value: 24145282 },
    { year: '2020', value: 24353121 },
    { year: '2021', value: 24394440 },
    { year: '2022', value: 25291879 },
    { year: '2023', value: 25058487 },
];

const facturadoData = [
    { name: 'Importe', value: 346873, meta: 400000 },
];

const oportunidadesData = [
    { entidad: "EPSEL S.A.", objeto: "Adquisición de micro medidores y conexiones domiciliarias.", fecha: "15/05/2024", valor: "S/ 1,500,000" },
    { entidad: "SEDAPAL", objeto: "Servicio de consultoría para la supervisión de la obra.", fecha: "20/05/2024", valor: "S/ 850,000" },
    { entidad: "EPS GRAU S.A.", objeto: "Contratación de servicio de mantenimiento de redes.", fecha: "22/05/2024", valor: "S/ 300,000" },
    { entidad: "EMAPA HUACHO", objeto: "Adquisición de tuberías y accesorios de PVC.", fecha: "25/05/2024", valor: "S/ 750,000" },
    { entidad: "SEDALIB S.A.", objeto: "Servicio de transporte de materiales y equipos.", fecha: "28/05/2024", valor: "S/ 420,000" },
];

const CylinderBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    const radius = width / 2;
  
    // Don't render if height is 0 or less
    if (height <= 0) return null;
  
    // Adjusted to prevent visual glitches on very small heights
    const bodyHeight = Math.max(height - radius, 0);
  
    return (
      <g>
        {/* Cylinder Body */}
        <rect x={x} y={y} width={width} height={bodyHeight} fill={fill} />
  
        {/* Bottom Ellipse (base of the cylinder) */}
        <ellipse
          cx={x + radius}
          cy={y + bodyHeight}
          rx={radius}
          ry={radius / 3}
          fill={fill}
          style={{ filter: 'brightness(0.85)' }}
        />
  
        {/* Top Ellipse (surface of the water) */}
        <ellipse
          cx={x + radius}
          cy={y}
          rx={radius}
          ry={radius / 3}
          fill={fill}
          style={{ filter: 'brightness(1.15)' }}
        />
      </g>
    );
  };

const VolumenAnualChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumenAnualData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => new Intl.NumberFormat('es-PE').format(value)}
                    domain={[24000000, 'dataMax + 100000']}
                    tickCount={7}
                 />
                <Tooltip
                    cursor={{fill: 'rgba(206, 212, 218, 0.2)'}}
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="p-2 bg-background border rounded-md shadow-md">
                                    <p className="font-bold">{label}</p>
                                    <p style={{ color: "hsl(var(--chart-1))" }}>Volumen: {new Intl.NumberFormat('es-PE').format(payload[0].value as number)} m³</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" shape={<CylinderBar />} barSize={60}>
                    <LabelList 
                        dataKey="value" 
                        position="center" 
                        formatter={(value: number) => new Intl.NumberFormat('es-PE').format(value)}
                        fill="#fff"
                        fontSize={11}
                        fontWeight="bold"
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};



const CylinderChart = ({ data, title, description, color }: { data: any[], title: string, description: string, color: string }) => {
    const percentage = (data[0].value / data[0].meta) * 100;
    const formattedValue = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(data[0].value);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center h-[260px] gap-4">
                <div className="relative w-28 h-52 bg-gray-200/50 rounded-lg flex items-end overflow-hidden" style={{borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px'}}>
                     <div className="absolute w-full h-8 bg-gray-300/40" style={{top: 0, borderTopLeftRadius: '60px', borderTopRightRadius: '60px'}}></div>
                    <div 
                        className="relative w-full" 
                        style={{ 
                            height: `${percentage}%`,
                            backgroundColor: color,
                            borderBottomLeftRadius: '60px',
                            borderBottomRightRadius: '60px',
                        }}
                    >
                         <div 
                            className="absolute w-full h-8 rounded-full -top-4" 
                            style={{
                                backgroundColor: color, 
                                filter: 'brightness(1.2)'
                            }}>
                        </div>
                    </div>
                     <div 
                        className="absolute w-full h-8 bg-gray-800/80 " 
                        style={{ bottom: '-15px', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}>
                    </div>


                    <div className="absolute z-10 text-white text-center w-full bottom-1/2 translate-y-1/2">
                        <p className="font-bold text-lg drop-shadow">{formattedValue}</p>
                        <p className="text-xs drop-shadow">({percentage.toFixed(1)}%)</p>
                    </div>

                </div>
                 <div className="text-center mt-2">
                    <p className="text-xl font-bold">Importe Facturado</p>
                </div>
            </CardContent>
        </Card>
    );
};


export default function InspeccionesPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Panel de Control Operativo</h1>
                <p className="text-muted-foreground">Visualización integral de métricas clave de la operación.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Volumen producido de agua potable</CardTitle>
                        <CardDescription>Fuentes: Eps Sedacusco SA-2023</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <VolumenAnualChart />
                    </CardContent>
                </Card>
                <CylinderChart 
                    data={facturadoData} 
                    title="Importe facturado por Agua y Alcantarillado" 
                    description="Fuentes: Eps Sedacusco SA-2023"
                    color="hsl(var(--chart-2))" 
                />
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Evolución nivel de morosidad</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={morosidadData} layout="vertical" stackOffset="expand">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="month" axisLine={false} tickLine={false} />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="p-2 bg-background border rounded-md shadow-md">
                                                    <p className="font-bold">{label}</p>
                                                    <p style={{ color: "hsl(var(--chart-5))" }}>Morosidad: {((payload[1].value || 0) * 100).toFixed(0)}%</p>
                                                    <p style={{ color: "hsl(var(--chart-3))" }}>Recuperación: {((payload[0].value || 0) * 100).toFixed(0)}%</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="recuperacion" stackId="a" fill="hsl(var(--chart-3))" radius={[5, 0, 0, 5]} />
                                <Bar dataKey="morosidad" stackId="a" fill="hsl(var(--chart-5))" radius={[0, 5, 5, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Oportunidad Venta - SEACE</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Entidad</TableHead>
                                    <TableHead>Objeto de Contratación</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead className="text-right">Valor Estimado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {oportunidadesData.map((op, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{op.entidad}</TableCell>
                                        <TableCell>{op.objeto}</TableCell>
                                        <TableCell>{op.fecha}</TableCell>
                                        <TableCell className="text-right font-bold">{op.valor}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    