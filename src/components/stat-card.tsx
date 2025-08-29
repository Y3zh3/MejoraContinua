import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatCardProps = {
  title: string;
  value: string;
};

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <Card className="text-center">
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-3xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
};
