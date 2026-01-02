import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FinancialData {
  monthlyBenefit?: string;
  hasConsignado: string;
  consignadoValue?: string;
  monthlySalary?: string;
  hasFGTS: string;
  fgtsBalance?: string;
  birthDate: string;
}

interface FinancialDataFormProps {
  occupation: string;
  onSubmit: (data: FinancialData) => void;
  onBack: () => void;
}

export function FinancialDataForm({ occupation, onSubmit, onBack }: FinancialDataFormProps) {
  const [formData, setFormData] = useState<FinancialData>({
    hasConsignado: "nao",
    hasFGTS: "nao",
    birthDate: "",
  });

  const showBenefit = occupation === "inss" || occupation === "bpc";
  const showSalary = occupation === "clt";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = (Number(numbers) / 100).toFixed(2);
    return formatted.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleCurrencyChange = (field: keyof FinancialData, value: string) => {
    setFormData({ ...formData, [field]: formatCurrency(value) });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 sm:px-6 py-8 min-h-[calc(100vh-180px)]">
      <div className="space-y-2">
        <p className="text-foreground/70">
          Essas informações ajudarão a recomendar o melhor produto para você
        </p>
      </div>

      <div className="space-y-4 flex-1">
        {showBenefit && (
          <div className="space-y-2">
            <Label htmlFor="monthlyBenefit" className="text-foreground">Valor do benefício mensal</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">R$</span>
              <Input
                id="monthlyBenefit"
                type="text"
                placeholder="0,00"
                value={formData.monthlyBenefit || ""}
                onChange={(e) => handleCurrencyChange("monthlyBenefit", e.target.value)}
                className="rounded-xl border-2 pl-10"
              />
            </div>
          </div>
        )}

        {showSalary && (
          <div className="space-y-2">
            <Label htmlFor="monthlySalary" className="text-foreground">Salário mensal</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">R$</span>
              <Input
                id="monthlySalary"
                type="text"
                placeholder="0,00"
                value={formData.monthlySalary || ""}
                onChange={(e) => handleCurrencyChange("monthlySalary", e.target.value)}
                className="rounded-xl border-2 pl-10"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="hasConsignado" className="text-foreground">Possui consignado ativo?</Label>
          <Select
            value={formData.hasConsignado}
            onValueChange={(value) => setFormData({ ...formData, hasConsignado: value })}
          >
            <SelectTrigger id="hasConsignado" className="rounded-xl border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim</SelectItem>
              <SelectItem value="nao">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.hasConsignado === "sim" && (
          <div className="space-y-2">
            <Label htmlFor="consignadoValue" className="text-foreground">Valor da parcela do consignado</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">R$</span>
              <Input
                id="consignadoValue"
                type="text"
                placeholder="0,00"
                value={formData.consignadoValue || ""}
                onChange={(e) => handleCurrencyChange("consignadoValue", e.target.value)}
                className="rounded-xl border-2 pl-10"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="hasFGTS" className="text-foreground">Possui saldo no FGTS?</Label>
          <Select
            value={formData.hasFGTS}
            onValueChange={(value) => setFormData({ ...formData, hasFGTS: value })}
          >
            <SelectTrigger id="hasFGTS" className="rounded-xl border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim</SelectItem>
              <SelectItem value="nao">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.hasFGTS === "sim" && (
          <div className="space-y-2">
            <Label htmlFor="fgtsBalance" className="text-foreground">Valor do saldo FGTS</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">R$</span>
              <Input
                id="fgtsBalance"
                type="text"
                placeholder="0,00"
                value={formData.fgtsBalance || ""}
                onChange={(e) => handleCurrencyChange("fgtsBalance", e.target.value)}
                className="rounded-xl border-2 pl-10"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-foreground">Data de nascimento</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="rounded-xl border-2"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 mt-auto pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-xl py-6"
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className="flex-1 rounded-xl py-6"
          disabled={!formData.birthDate}
        >
          Continuar
        </Button>
      </div>
    </form>
  );
}