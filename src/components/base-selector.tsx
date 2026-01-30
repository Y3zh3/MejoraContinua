"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BaseSelectorProps {
  onBaseChange: (base: string) => void;
}

export function BaseSelector({ onBaseChange }: BaseSelectorProps) {
  return (
    <div className="w-full max-w-xs">
        <Select onValueChange={onBaseChange}>
            <SelectTrigger>
                <SelectValue placeholder="Seleccionar Base" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todas">Todas las bases</SelectItem>
                <SelectItem value="comas">Comas</SelectItem>
                <SelectItem value="callao">Callao</SelectItem>
                <SelectItem value="ate">Ate Vitarte</SelectItem>
                <SelectItem value="brena">Breña</SelectItem>
                <SelectItem value="sjl">SJL</SelectItem>
                <SelectItem value="surquillo">Surquillo</SelectItem>
                <SelectItem value="ves">VES</SelectItem>
                <SelectItem value="clientes-e">Clientes E.</SelectItem>
            </SelectContent>
        </Select>
    </div>
  );
}
