import { SimulationResult } from "../lib/simulator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, TrendingDown, CheckCircle2, ArrowRight, Clock, DollarSign, Percent, Calendar, Smartphone, QrCode, CreditCard } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface ResultsProps {
  result: SimulationResult;
  onRestart: () => void;
}

export function Results({ result, onRestart }: ResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatMonths = (months: number) => {
    if (months >= 999) return "Mais de 50 anos";
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'ano' : 'anos'}`;
      }
      return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
    }
    return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  };

  const handleCTAClick = () => {
    // Track cta_click_meutudo event
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      (window as any).trackEvent('cta_click_meutudo', {
        product: result.recommendation.product
      });
    }
    
    // In a real app, this would redirect to meutudo
    if (result.recommendation.product === "Planilha de Educação Financeira") {
      alert('Iniciando download da planilha...');
    } else {
      alert(`Redirecionando para contratação de ${result.recommendation.product}...`);
    }
  };

  const isPlanilhaFallback = result.recommendation.product === "Planilha de Educação Financeira";

  // Calculate total debt and average interest
  const totalDebt = result.cards.reduce((sum, card) => sum + card.debt, 0);
  const averageInterest = result.cards.reduce((sum, card) => sum + (card.interest * card.debt), 0) / totalDebt;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Alerts */}
      {result.alerts.length > 0 && (
        <div className="space-y-3">
          {result.alerts.map((alert, index) => (
            <Alert key={index} variant="destructive" className="border-2 border-destructive-foreground/20 bg-destructive/10">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-foreground">Atenção</AlertTitle>
              <AlertDescription className="text-foreground/80">
                {alert}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* BLOCK 1 - Problem Summary */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-foreground">Sua situação hoje</h1>
        </div>

        <Card className="border-2 bg-destructive/5 border-destructive-foreground/20">
          <CardContent className="p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground/70">
                  <DollarSign className="h-5 w-5" />
                  <span>Total da dívida no cartão</span>
                </div>
                <p className="text-4xl text-destructive-foreground">
                  {formatCurrency(totalDebt)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Percent className="h-5 w-5" />
                  <span>Taxa média de juros mensal</span>
                </div>
                <p className="text-4xl text-destructive-foreground">
                  {(averageInterest * 100).toFixed(1)}%
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Clock className="h-5 w-5" />
                  <span>Tempo para quitar pagando mínimo</span>
                </div>
                <p className="text-2xl text-foreground">
                  {formatMonths(result.summary.totalMonthsMinimum)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground/70">
                  <TrendingDown className="h-5 w-5" />
                  <span>Juros totais pagando mínimo</span>
                </div>
                <p className="text-2xl text-destructive-foreground">
                  {formatCurrency(result.summary.totalInterestMinimum)}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-background/60 rounded-xl border border-destructive-foreground/20">
              <p className="text-foreground/80 text-center">
                Manter dívidas no cartão de crédito é uma das formas mais caras de se endividar.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BLOCK 2 - Recommended Action Plan */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-foreground">O melhor plano para você agora</h2>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-xl border-2 border-primary">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <p className="text-lg text-primary">Trocar dívidas de cartão por crédito com juros menores</p>
          </div>
        </div>

        <div className="space-y-4">
          {result.cards.map((card) => {
            // Default strategy: recommend credit for all cards
            // Only show "pay full amount" if it's truly viable (we'll keep it simple - always recommend credit)
            const shouldRecommendCredit = true; // Always recommend credit as per requirements
            
            return (
              <Card key={card.id} className="border-2 border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-2 flex-1 min-w-[200px]">
                        <h3 className="text-foreground">{card.name}</h3>
                        <div className="space-y-1">
                          <p className="text-foreground/70">
                            Dívida: <span className="text-foreground font-medium">{formatCurrency(card.debt)}</span>
                          </p>
                          <p className="text-foreground/70">
                            Taxa de juros: <span className="text-destructive-foreground font-medium">{(card.interest * 100).toFixed(1)}% ao mês</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="px-6 py-3 bg-primary border-2 border-primary rounded-xl">
                        <p className="text-primary-foreground">Quitar com crédito</p>
                      </div>
                    </div>

                    <div className="p-4 bg-background/60 rounded-lg border border-primary/20">
                      <p className="text-foreground/80">
                        Esse cartão cobra juros muito acima de um crédito com taxa menor. Quitar com crédito reduz o custo total da dívida.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* BLOCK 3 - Numerical Proof */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-foreground">Quanto você economiza trocando cartão por crédito</h2>
          <p className="text-foreground/70">Comparação clara entre manter a dívida no cartão e quitar com crédito</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Scenario A - Keep credit card debt */}
          <Card className="border-2 border-destructive-foreground/30 bg-destructive/5">
            <CardHeader className="border-b border-destructive-foreground/20">
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-destructive-foreground" />
                Cenário A: Manter no cartão
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">Taxa de juros média</p>
                  <p className="text-3xl text-destructive-foreground">
                    {(averageInterest * 100).toFixed(1)}% ao mês
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">Total de juros pagos</p>
                  <p className="text-3xl text-destructive-foreground">
                    {formatCurrency(result.summary.totalInterestMinimum)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">Tempo para quitar</p>
                  <p className="text-2xl text-foreground">
                    {formatMonths(result.summary.totalMonthsMinimum)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario B - Pay with credit */}
          <Card className="border-2 border-primary shadow-lg bg-primary/5">
            <CardHeader className="border-b border-primary/20 bg-primary/10">
              <CardTitle className="text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Cenário B: Quitar com crédito
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">Taxa de juros do crédito</p>
                  <p className="text-3xl text-primary">
                    2% ao mês
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">Total de juros pagos</p>
                  <p className="text-3xl text-primary">
                    {formatCurrency(result.summary.totalInterestMeutudo)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">Tempo para quitar</p>
                  <p className="text-2xl text-foreground">
                    {formatMonths(result.summary.totalMonthsMeutudo)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Savings highlight */}
        <Card className="border-4 border-primary shadow-xl bg-gradient-to-br from-primary/20 to-primary/5">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <p className="text-foreground/70">Economia total com crédito</p>
                <p className="text-5xl text-primary">
                  {formatCurrency(result.summary.savingsWithMeutudo)}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 rounded-xl border-2 border-primary/40">
                <TrendingDown className="h-5 w-5 text-primary" />
                <p className="text-foreground">
                  Você economiza{' '}
                  <span className="text-primary">
                    {((result.summary.savingsWithMeutudo / result.summary.totalInterestMinimum) * 100).toFixed(0)}%
                  </span>
                  {' '}em juros
                </p>
              </div>

              <div className="pt-4">
                <p className="text-foreground/80 text-lg">
                  Trocar dívidas de cartão por crédito com juros menores reduz drasticamente o custo total e acelera sua saída das dívidas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BLOCK 4 - Immediate Action with Meutudo (HIGHEST PROMINENCE) */}
      <div className="relative">
        {/* Maximum visual prominence */}
        <div className="absolute -inset-3 bg-gradient-to-r from-primary/40 via-primary/30 to-primary/40 rounded-3xl blur-3xl animate-pulse"></div>
        
        <Card className="relative border-4 border-primary shadow-2xl bg-gradient-to-br from-primary/15 via-background to-primary/10">
          <CardHeader className="pb-6 border-b-2 border-primary/30 bg-primary/10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/30 rounded-xl border-2 border-primary">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <span className="text-primary">Próximo passo</span>
              </div>
              <h2 className="text-foreground">Faça isso agora</h2>
            </div>
          </CardHeader>
          
          <CardContent className="pt-10 space-y-8">
            {/* Main message */}
            <div className="text-center space-y-4">
              <p className="text-foreground text-xl leading-relaxed">
                O crédito é a forma mais eficiente de sair das dívidas de cartão. Você reduz juros, organiza o orçamento e evita que a dívida cresça.
              </p>
            </div>

            {/* Credit features */}
            <div className="grid grid-cols-2 gap-6 p-8 bg-primary/5 rounded-2xl border-2 border-primary/30">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-foreground/70">Crédito disponível</p>
                  <p className="text-2xl text-primary">
                    {formatCurrency(totalDebt)}
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                  <Percent className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-foreground/70">Taxa menor que cartão</p>
                  <p className="text-2xl text-primary">
                    A partir de 2% a.m.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-foreground/70">Parcelas fixas</p>
                  <p className="text-2xl text-foreground">
                    Até 84 meses
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-foreground/70">Processo</p>
                  <p className="text-2xl text-foreground">
                    100% digital
                  </p>
                </div>
              </div>
            </div>

            {/* Main CTA */}
            <div className="space-y-4">
              <Button
                onClick={handleCTAClick}
                size="lg"
                className="w-full rounded-2xl py-10 text-2xl shadow-2xl hover:shadow-3xl transition-all"
              >
                <div className="flex items-center gap-4">
                  {isPlanilhaFallback ? (
                    <>
                      <CheckCircle2 className="h-8 w-8" />
                      Baixar Material Gratuito
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-8 w-8" />
                      Contratar crédito agora
                      <ArrowRight className="h-8 w-8" />
                    </>
                  )}
                </div>
              </Button>

              {!isPlanilhaFallback && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCTAClick}
                  className="w-full rounded-2xl py-6 border-2 border-primary text-primary hover:bg-primary/5"
                >
                  <Smartphone className="mr-2 h-6 w-6" />
                  Abrir app da meutudo
                </Button>
              )}
            </div>

            {/* Final reinforcement message */}
            <div className="p-8 bg-background/80 rounded-2xl border-2 border-primary/30">
              <p className="text-foreground text-center text-lg leading-relaxed">
                <strong className="text-primary">Manter dívida no cartão nunca é a melhor opção</strong> quando existe a possibilidade de trocar por crédito com juros menores.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restart button */}
      <div className="flex justify-center pt-6">
        <Button
          variant="outline"
          onClick={onRestart}
          className="px-8 py-6 rounded-xl border-2"
        >
          Fazer nova simulação
        </Button>
      </div>
    </div>
  );
}