import { useState, useEffect } from "react";
import { QualificationForm } from "./components/QualificationForm";
import { FinancialDataForm } from "./components/FinancialDataForm";
import { CardsForm, CreditCard } from "./components/CardsForm";
import { Results } from "./components/Results";
import { simulatePayoff, SimulationResult } from "./lib/simulator";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";

type Step = "qualification" | "financial" | "cards" | "results";

interface QualificationData {
  fullName: string;
  email: string;
  occupation: string;
}

interface FinancialData {
  monthlyBenefit?: string;
  hasConsignado: string;
  consignadoValue?: string;
  monthlySalary?: string;
  hasFGTS: string;
  fgtsBalance?: string;
  birthDate: string;
}

// Setup event tracking
if (typeof window !== 'undefined') {
  (window as any).trackEvent = (eventName: string, data?: any) => {
    console.log(`[Event Tracked] ${eventName}:`, data);
    // In production, this would send to analytics service
    // Example: analytics.track(eventName, data);
  };
}

export default function App() {
  const [step, setStep] = useState<Step>("qualification");
  const [qualificationData, setQualificationData] = useState<QualificationData | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const handleQualificationSubmit = (data: QualificationData) => {
    setQualificationData(data);
    setStep("financial");
  };

  const handleFinancialSubmit = (data: FinancialData) => {
    setFinancialData(data);
    setStep("cards");
  };

  const handleCardsSubmit = (cards: CreditCard[], availableAmount: string) => {
    if (!qualificationData || !financialData) return;

    // Run simulation
    const result = simulatePayoff(
      cards,
      availableAmount,
      qualificationData.occupation,
      financialData
    );

    setSimulationResult(result);
    
    // Track simulation_complete event
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      (window as any).trackEvent('simulation_complete', {
        totalCards: cards.length,
        totalMonths: result.summary.totalMonths,
        savings: result.summary.savingsOptimized,
        recommendedProduct: result.recommendation.product,
      });
    }
    
    setStep("results");
  };

  const handleRestart = () => {
    setStep("qualification");
    setQualificationData(null);
    setFinancialData(null);
    setSimulationResult(null);
  };

  const getStepNumber = () => {
    switch (step) {
      case "qualification":
        return 1;
      case "financial":
        return 2;
      case "cards":
        return 3;
      case "results":
        return 4;
      default:
        return 1;
    }
  };

  const getTitle = () => {
    switch (step) {
      case "qualification":
        return "Simulador de parcelamento de fatura no cartão de crédito";
      case "financial":
        return "Dados Financeiros";
      case "cards":
        return "Seus Cartões";
      case "results":
        return "Resultado da Simulação";
      default:
        return "";
    }
  };

  const showBackButton = step === "financial" || step === "cards";

  const handleBack = () => {
    if (step === "financial") {
      setStep("qualification");
    } else if (step === "cards") {
      setStep("financial");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Clean header without mobile mockup */}
      {step !== "results" && (
        <header className="border-b bg-background sticky top-0 z-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div className="flex-1">
                <h2 className="text-foreground">{getTitle()}</h2>
                {/* Progress indicator */}
                <div className="flex gap-2 mt-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-lg transition-colors ${
                        index < getStepNumber() ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={step === "results" ? "" : "max-w-2xl mx-auto"}>
        {step === "qualification" && (
          <QualificationForm onSubmit={handleQualificationSubmit} />
        )}

        {step === "financial" && qualificationData && (
          <FinancialDataForm
            occupation={qualificationData.occupation}
            onSubmit={handleFinancialSubmit}
            onBack={() => setStep("qualification")}
          />
        )}

        {step === "cards" && (
          <CardsForm
            onSubmit={handleCardsSubmit}
            onBack={() => setStep("financial")}
          />
        )}

        {step === "results" && simulationResult && (
          <Results
            result={simulationResult}
            onRestart={handleRestart}
          />
        )}
      </main>

      <Toaster />
    </div>
  );
}