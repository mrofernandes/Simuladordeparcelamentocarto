import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

interface QualificationData {
  fullName: string;
  email: string;
  occupation: string;
}

interface QualificationFormProps {
  onSubmit: (data: QualificationData) => void;
}

export function QualificationForm({ onSubmit }: QualificationFormProps) {
  const [formData, setFormData] = useState<QualificationData>({
    fullName: "",
    email: "",
    occupation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track lead_submit event
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      (window as any).trackEvent('lead_submit', formData);
    }
    
    onSubmit(formData);
  };

  const isValid = formData.fullName && formData.email && formData.occupation;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 sm:px-6 py-8">
      <div className="space-y-2">
        <p className="text-foreground/70">
          Preencha seus dados para começar a simulação
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-foreground">Nome completo</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="rounded-xl border-2"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="rounded-xl border-2"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-foreground">Ocupação atual</Label>
          <Select
            value={formData.occupation}
            onValueChange={(value) => setFormData({ ...formData, occupation: value })}
          >
            <SelectTrigger id="occupation" className="rounded-xl border-2">
              <SelectValue placeholder="Selecione sua ocupação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inss">Aposentado INSS</SelectItem>
              <SelectItem value="bpc">Beneficiário BPC/LOAS</SelectItem>
              <SelectItem value="clt">Trabalhador CLT</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="w-full rounded-xl py-6 mt-4"
      >
        Continuar
      </Button>
    </form>
  );
}