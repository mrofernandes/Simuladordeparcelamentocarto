import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus, Trash2, Info } from "lucide-react";
import { toast } from "sonner@2.0.3";

export interface CreditCard {
  id: string;
  name: string;
  totalDebt: string;
  monthlyInterest: string;
  minimumPayment: string;
  isAverageRate?: boolean;
}

interface CardsFormProps {
  onSubmit: (cards: CreditCard[], availableAmount: string) => void;
  onBack: () => void;
}

export function CardsForm({ onSubmit, onBack }: CardsFormProps) {
  const [cards, setCards] = useState<CreditCard[]>([
    { id: "1", name: "", totalDebt: "", monthlyInterest: "", minimumPayment: "" }
  ]);
  const [availableAmount, setAvailableAmount] = useState("");

  const addCard = () => {
    if (cards.length < 5) {
      setCards([...cards, {
        id: Date.now().toString(),
        name: "",
        totalDebt: "",
        monthlyInterest: "",
        minimumPayment: ""
      }]);
    } else {
      toast.error("Você pode adicionar no máximo 5 cartões");
    }
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    } else {
      toast.error("É necessário ter pelo menos 1 cartão");
    }
  };

  const updateCard = (id: string, field: keyof CreditCard, value: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const setAverageRate = (cardId: string) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, monthlyInterest: "15,00", isAverageRate: true } : card
    ));
    toast.success("Taxa média de 15% aplicada. Você pode editá-la se souber a taxa exata.");
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = (Number(numbers) / 100).toFixed(2);
    return formatted.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const formatPercent = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = (Number(numbers) / 100).toFixed(2);
    return formatted.replace('.', ',');
  };

  const parseCurrency = (value: string): number => {
    return Number(value.replace(/\./g, '').replace(',', '.')) || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all cards have required data
    const invalidCard = cards.find(card => 
      !card.totalDebt || !card.monthlyInterest || !card.minimumPayment
    );
    
    if (invalidCard) {
      toast.error("Preencha todos os campos obrigatórios dos cartões");
      return;
    }
    
    if (!availableAmount) {
      toast.error("Informe o valor total que você consegue pagar por mês");
      return;
    }
    
    // Check if sum of minimums exceeds available amount
    const totalMinimums = cards.reduce((sum, card) => {
      return sum + parseCurrency(card.minimumPayment);
    }, 0);
    
    const available = parseCurrency(availableAmount);
    
    if (totalMinimums > available) {
      toast.error(
        `A soma dos pagamentos mínimos (R$ ${formatCurrency((totalMinimums * 100).toString())}) é maior que o valor disponível (R$ ${availableAmount}). Ajuste os valores.`
      );
      return;
    }
    
    // Track simulation_start event
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      (window as any).trackEvent('simulation_start', { 
        cardsCount: cards.length,
        totalMinimums,
        availableAmount: available
      });
    }
    
    onSubmit(cards, availableAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 sm:px-6 py-8 min-h-[calc(100vh-180px)]">
      <div className="space-y-2">
        <p className="text-foreground/70">
          Informe os dados de cada cartão com dívida. Quanto mais preciso, melhor será a simulação.
        </p>
      </div>

      <div className="space-y-4 flex-1">
        {cards.map((card, index) => (
          <Card key={card.id} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-foreground">Cartão {index + 1}</CardTitle>
              {cards.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCard(card.id)}
                  className="h-8 w-8 text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`name-${card.id}`} className="text-foreground">
                  Nome do cartão <span className="text-foreground/60">(opcional)</span>
                </Label>
                <Input
                  id={`name-${card.id}`}
                  placeholder="Ex: Nubank, Inter, C6..."
                  value={card.name}
                  onChange={(e) => updateCard(card.id, "name", e.target.value)}
                  className="rounded-xl border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`debt-${card.id}`} className="text-foreground">Valor total da dívida *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">R$</span>
                  <Input
                    id={`debt-${card.id}`}
                    type="text"
                    placeholder="0,00"
                    value={card.totalDebt}
                    onChange={(e) => updateCard(card.id, "totalDebt", formatCurrency(e.target.value))}
                    className="rounded-xl border-2 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`interest-${card.id}`} className="text-foreground">Taxa de juros mensal (%) *</Label>
                <div className="relative">
                  <Input
                    id={`interest-${card.id}`}
                    type="text"
                    placeholder="0,00"
                    value={card.monthlyInterest}
                    onChange={(e) => {
                      updateCard(card.id, "monthlyInterest", formatPercent(e.target.value));
                      if (card.isAverageRate) {
                        updateCard(card.id, "isAverageRate", undefined);
                      }
                    }}
                    className={`rounded-xl border-2 pr-8 ${card.isAverageRate ? 'bg-ring/20' : ''}`}
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground">%</span>
                </div>
                <div className="flex items-start gap-2">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setAverageRate(card.id)}
                    className="h-auto p-0 text-primary hover:text-primary/80"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Não sei a taxa, usar média
                  </Button>
                </div>
                {card.isAverageRate && (
                  <p className="text-xs text-foreground/60 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Taxa média de 15% ao mês aplicada (média nacional de cartões)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`minimum-${card.id}`} className="text-foreground">Pagamento mínimo *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">R$</span>
                  <Input
                    id={`minimum-${card.id}`}
                    type="text"
                    placeholder="0,00"
                    value={card.minimumPayment}
                    onChange={(e) => updateCard(card.id, "minimumPayment", formatCurrency(e.target.value))}
                    className="rounded-xl border-2 pl-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {cards.length < 5 && (
          <Button
            type="button"
            variant="outline"
            onClick={addCard}
            className="w-full rounded-xl py-6 border-2 border-dashed"
          >
            <Plus className="mr-2 h-5 w-5" />
            Adicionar outro cartão
          </Button>
        )}

        <Card className="border-2 border-primary bg-ring/30">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="available" className="text-foreground">
                Valor total que você consegue pagar por mês *
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">R$</span>
                <Input
                  id="available"
                  type="text"
                  placeholder="0,00"
                  value={availableAmount}
                  onChange={(e) => setAvailableAmount(formatCurrency(e.target.value))}
                  className="rounded-xl border-2 pl-10 bg-background"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
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
        >
          Simular quitação de cartões
        </Button>
      </div>
    </form>
  );
}