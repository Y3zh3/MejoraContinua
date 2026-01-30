
import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type KpiCardProps = {
  title: string;
  value: number;
  meta: number;
  indicador: string;
  icon: LucideIcon;
  description?: string;
  valueFormatter?: (value: number) => string;
};

export const KpiCard: FC<KpiCardProps> = ({ title, value, meta, indicador, icon: Icon, description, valueFormatter = (v) => v.toString() }) => {
  const isInverse = indicador.toUpperCase().includes('INCIDENCIA') || indicador.toUpperCase().includes('RECLAMO');
  const isSuccess = isInverse ? value <= meta : value >= meta;
  
  return (
    <Card className={cn(
      "border-2 transition-all hover:shadow-lg hover:scale-105",
      isSuccess ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", isSuccess ? "text-green-500" : "text-red-500")} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valueFormatter(value)}</div>
        <p className="text-xs text-muted-foreground">
          {description || `Meta: ${valueFormatter(meta)}`}
        </p>
      </CardContent>
    </Card>
  );
};
