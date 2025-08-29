import { Droplet } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Droplet className="h-8 w-8" />
          </div>
          <h1 className="font-headline text-4xl font-bold text-primary">
            Aqua Insights
          </h1>
          <p className="mt-2 text-muted-foreground">
            Por favor, inicia sesión para acceder a tu panel
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
