
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="w-full">
      <Card className="border-none shadow-none rounded-none bg-transparent">
        <div className="relative h-[400px] w-full">
          <Image
            src="https://picsum.photos/seed/sedapal-hero/1200/400"
            alt="Trámites y servicios"
            fill
            className="object-cover"
            data-ai-hint="paperwork signing"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-12">
            <h1 className="text-5xl font-bold text-white">Trámites y servicios</h1>
            <p className="mt-2 text-lg text-white/90">
              Conoce los procedimientos y obtén los formatos necesarios
            </p>
          </div>
        </div>
        <div className="bg-background p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Requisitos para la presentación de Reclamos</h2>
          <ul className="list-disc space-y-4 pl-6 text-lg">
            <li>
              <Link href="#" className="text-primary hover:underline">
                Procedimiento de Recepción y Atención de Requerimientos, Solicitud de Atención de Problemas y Reclamos.
              </Link>
            </li>
            <li>
              Requisitos para presentación de reclamos:
              <ul className="list-disc space-y-2 pl-8 mt-2 text-base">
                <li>Cuando es titular del suministro:</li>
              </ul>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
