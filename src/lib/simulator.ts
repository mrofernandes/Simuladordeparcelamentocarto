import { CreditCard } from "../components/CardsForm";

export interface CardAnalysis {
  id: string;
  name: string;
  debt: number;
  interest: number;
  minimumPayment: number;
  monthlyCost: number;
  strategy: "priorizar" | "minimo" | "renegociar";
  estimatedMonths: number;
  estimatedMonthsMinimum: number;
  estimatedMonthsMeutudo: number;
  observation: string;
}

export interface SimulationResult {
  cards: CardAnalysis[];
  summary: {
    totalMonthsMinimum: number;
    totalMonthsOptimized: number;
    totalMonthsMeutudo: number;
    totalInterestMinimum: number;
    totalInterestOptimized: number;
    totalInterestMeutudo: number;
    savingsOptimized: number;
    savingsWithMeutudo: number;
  };
  recommendation: {
    product: string;
    description: string;
    benefits: string[];
    profile: string;
    conditions: string;
    message: string;
  };
  alerts: string[];
  hasMinimumAlert: boolean;
}

const parseCurrency = (value: string): number => {
  return Number(value.replace(/\./g, '').replace(',', '.')) || 0;
};

const parsePercent = (value: string): number => {
  return Number(value.replace(',', '.')) / 100 || 0;
};

export function simulatePayoff(
  cards: CreditCard[],
  availableAmount: string,
  occupation: string,
  financialData: any
): SimulationResult {
  const available = parseCurrency(availableAmount);
  const alerts: string[] = [];
  
  // Parse cards data
  const parsedCards = cards.map(card => ({
    id: card.id,
    name: card.name || `Cartão ${card.id}`,
    debt: parseCurrency(card.totalDebt),
    interest: parsePercent(card.monthlyInterest),
    minimumPayment: parseCurrency(card.minimumPayment),
  }));

  // Check if sum of minimums exceeds available
  const totalMinimums = parsedCards.reduce((sum, card) => sum + card.minimumPayment, 0);
  const hasMinimumAlert = totalMinimums > available;
  
  if (hasMinimumAlert) {
    alerts.push(
      "O valor mensal informado não cobre o pagamento mínimo de todos os cartões. Considere renegociar ou buscar crédito adicional."
    );
  }

  // Calculate monthly cost for each card
  const cardsWithCost = parsedCards.map(card => ({
    ...card,
    monthlyCost: card.debt * card.interest,
  }));

  // Classify cards based on strategy with proper observations
  const classifiedCards: CardAnalysis[] = cardsWithCost.map(card => {
    let strategy: "priorizar" | "minimo" | "renegociar";
    let observation = "";

    const interestPercent = card.interest * 100;

    // Classification based on document criteria
    if (interestPercent > 15) {
      strategy = "renegociar";
      if (card.debt > 5000) {
        observation = "Dívida alta com juros altos - renegociação urgente recomendada";
      } else {
        observation = "Alta taxa de juros - considere quitação com crédito mais barato";
      }
    } else if (interestPercent > 10) {
      const costToMinimumRatio = card.monthlyCost / card.minimumPayment;
      if (costToMinimumRatio > 0.7 || card.debt > 3000) {
        strategy = "priorizar";
        observation = "Juros altos - priorize pagamento acima do mínimo";
      } else {
        strategy = "minimo";
        observation = "Juros médios - mantenha o mínimo enquanto prioriza outros cartões";
      }
    } else {
      strategy = "minimo";
      observation = "Juros baixos - pague o mínimo e priorize cartões com juros maiores";
    }

    return {
      ...card,
      strategy,
      observation,
      estimatedMonths: 0,
      estimatedMonthsMinimum: 0,
      estimatedMonthsMeutudo: 0,
    };
  });

  // Calculate estimated months for each card
  const calculateMonths = (debt: number, payment: number, interest: number): number => {
    if (payment <= 0 || interest >= 1) return 999;
    if (payment <= debt * interest) return 999; // Payment doesn't cover interest
    
    let currentDebt = debt;
    let months = 0;
    const maxMonths = 600;

    while (currentDebt > 0.01 && months < maxMonths) {
      currentDebt = currentDebt - payment;
      if (currentDebt > 0) {
        currentDebt = currentDebt * (1 + interest);
      }
      months++;
    }

    return months;
  };

  // SCENARIO A: Minimum payments only
  const scenarioA = classifiedCards.map(card => {
    const months = calculateMonths(card.debt, card.minimumPayment, card.interest);
    const totalPaid = card.minimumPayment * months;
    const totalInterest = totalPaid - card.debt;
    return { ...card, months, totalInterest };
  });

  const totalInterestMinimum = scenarioA.reduce((sum, card) => sum + card.totalInterest, 0);
  const maxMonthsMinimum = Math.max(...scenarioA.map(c => c.months));

  // SCENARIO B: Optimized distribution
  const totalMinPayments = classifiedCards.reduce((sum, card) => sum + card.minimumPayment, 0);
  const surplus = Math.max(0, available - totalMinPayments);

  // Sort cards by priority for surplus distribution
  const sortedForDistribution = [...classifiedCards].sort((a, b) => {
    if (a.strategy === "renegociar" && b.strategy !== "renegociar") return -1;
    if (a.strategy !== "renegociar" && b.strategy === "renegociar") return 1;
    if (a.strategy === "priorizar" && b.strategy === "minimo") return -1;
    if (a.strategy === "minimo" && b.strategy === "priorizar") return 1;
    return b.interest - a.interest;
  });

  // Distribute surplus to priority cards
  const scenarioB = sortedForDistribution.map(card => {
    let payment = card.minimumPayment;
    
    if (surplus > 0 && (card.strategy === "priorizar" || card.strategy === "renegociar")) {
      const priorityCards = sortedForDistribution.filter(c => 
        c.strategy === "priorizar" || c.strategy === "renegociar"
      );
      const totalPriorityWeight = priorityCards.reduce((sum, c) => sum + (c.debt * c.interest), 0);
      const cardWeight = card.debt * card.interest;
      const cardShare = totalPriorityWeight > 0 ? (cardWeight / totalPriorityWeight) * surplus : 0;
      payment += cardShare;
    }
    
    const months = calculateMonths(card.debt, payment, card.interest);
    const totalPaid = payment * months;
    const totalInterest = totalPaid - card.debt;
    
    return { ...card, payment, months, totalInterest };
  });

  const totalInterestOptimized = scenarioB.reduce((sum, card) => sum + card.totalInterest, 0);
  const maxMonthsOptimized = Math.max(...scenarioB.map(c => c.months));

  // SCENARIO C: With meutudo credit (assume 2% monthly interest for all debts)
  const meutudoInterest = 0.02; // 2% ao mês
  const totalDebt = classifiedCards.reduce((sum, card) => sum + card.debt, 0);
  
  const scenarioC = classifiedCards.map(card => {
    // With meutudo, consolidate debt at lower rate
    const payment = card.minimumPayment; // Keep same payment but with lower interest
    const months = calculateMonths(card.debt, payment, meutudoInterest);
    const totalPaid = payment * months;
    const totalInterest = totalPaid - card.debt;
    
    return { ...card, months, totalInterest };
  });

  const totalInterestMeutudo = scenarioC.reduce((sum, card) => sum + card.totalInterest, 0);
  const maxMonthsMeutudo = Math.max(...scenarioC.map(c => c.months));

  // Final cards with all scenarios
  const finalCards: CardAnalysis[] = classifiedCards.map(card => {
    const cardA = scenarioA.find(c => c.id === card.id)!;
    const cardB = scenarioB.find(c => c.id === card.id)!;
    const cardC = scenarioC.find(c => c.id === card.id)!;
    
    return {
      ...card,
      estimatedMonthsMinimum: cardA.months,
      estimatedMonths: cardB.months,
      estimatedMonthsMeutudo: cardC.months,
    };
  });

  // Calculate savings
  const savingsOptimized = totalInterestMinimum - totalInterestOptimized;
  const savingsWithMeutudo = totalInterestMinimum - totalInterestMeutudo;

  // Determine product recommendation
  const recommendation = getProductRecommendation(occupation, financialData);

  return {
    cards: finalCards,
    summary: {
      totalMonthsMinimum: maxMonthsMinimum,
      totalMonthsOptimized: maxMonthsOptimized,
      totalMonthsMeutudo: maxMonthsMeutudo,
      totalInterestMinimum,
      totalInterestOptimized,
      totalInterestMeutudo,
      savingsOptimized,
      savingsWithMeutudo,
    },
    recommendation,
    alerts,
    hasMinimumAlert,
  };
}

function getProductRecommendation(occupation: string, financialData: any) {
  const hasConsignado = financialData.hasConsignado === "sim";
  const hasFGTS = financialData.hasFGTS === "sim";
  const fgtsBalance = financialData.fgtsBalance ? parseCurrency(financialData.fgtsBalance) : 0;
  const monthlyBenefit = financialData.monthlyBenefit ? parseCurrency(financialData.monthlyBenefit) : 0;
  const monthlySalary = financialData.monthlySalary ? parseCurrency(financialData.monthlySalary) : 0;
  
  // Calculate age if birthDate is provided
  let age = 0;
  if (financialData.birthDate) {
    const birthDate = new Date(financialData.birthDate);
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  }

  // Portabilidade de consignado (priority if has active consignado)
  if (hasConsignado && (occupation === "inss" || occupation === "bpc")) {
    return {
      product: "Portabilidade de Consignado INSS",
      description: "Transfira seu consignado para a meutudo e reduza suas parcelas com taxas menores.",
      benefits: [
        "Reduza até 40% no valor da parcela",
        "Mesmas condições de pagamento ou melhores",
        "Processo 100% digital e rápido",
        "Libere margem para novo empréstimo se necessário"
      ],
      profile: "Aposentado/Pensionista INSS com consignado ativo",
      conditions: `Benefício: R$ ${monthlyBenefit.toFixed(2).replace('.', ',')} | Consignado ativo: Sim`,
      message: "Você pode reduzir o valor da sua parcela atual transferindo seu consignado para a meutudo."
    };
  }

  if (hasConsignado && occupation === "clt") {
    return {
      product: "Portabilidade de Consignado Privado",
      description: "Transfira seu consignado e obtenha condições melhores.",
      benefits: [
        "Reduza o valor da parcela mensal",
        "Taxas mais competitivas",
        "Mantenha o desconto em folha",
        "Libere margem consignável"
      ],
      profile: "Trabalhador CLT com consignado ativo",
      conditions: `Salário: R$ ${monthlySalary.toFixed(2).replace('.', ',')} | Consignado ativo: Sim`,
      message: "Melhore as condições do seu consignado atual com a portabilidade."
    };
  }

  // Consignado INSS (sem consignado ativo)
  if ((occupation === "inss" || occupation === "bpc") && !hasConsignado && monthlyBenefit >= 1400) {
    return {
      product: "Consignado INSS",
      description: "Crédito com desconto direto no benefício, taxas reduzidas e aprovação facilitada.",
      benefits: [
        "Taxas a partir de 1,80% ao mês",
        "Até 84 meses para pagar",
        "Desconto automático no benefício",
        "Aprovação rápida e sem burocracia"
      ],
      profile: "Aposentado/Pensionista INSS",
      conditions: `Benefício: R$ ${monthlyBenefit.toFixed(2).replace('.', ',')} | Consignado ativo: Não`,
      message: "Você tem margem disponível para contratar crédito consignado com as melhores taxas do mercado."
    };
  }

  // Consignado CLT
  if (occupation === "clt" && !hasConsignado && monthlySalary >= 1500) {
    return {
      product: "Consignado Privado",
      description: "Crédito com desconto em folha para trabalhadores CLT de empresas conveniadas.",
      benefits: [
        "Taxas competitivas a partir de 2,14% ao mês",
        "Desconto automático na folha de pagamento",
        "Até 96 meses para pagar",
        "Sem consulta ao SPC/Serasa"
      ],
      profile: "Trabalhador CLT",
      conditions: `Salário: R$ ${monthlySalary.toFixed(2).replace('.', ',')} | Consignado ativo: Não`,
      message: "Contrate crédito consignado com desconto em folha e taxas mais baixas que o cartão."
    };
  }

  // Antecipação de FGTS
  if (hasFGTS && fgtsBalance >= 1000 && age >= 18) {
    return {
      product: "Antecipação do Saque-Aniversário FGTS",
      description: "Antecipe até 10 anos do seu FGTS de uma só vez.",
      benefits: [
        "Receba seu dinheiro em até 24 horas",
        "Use seu FGTS sem sair do emprego",
        "Taxas justas e transparentes",
        "Processo 100% online"
      ],
      profile: "Trabalhador com saldo FGTS disponível",
      conditions: `Saldo FGTS: R$ ${fgtsBalance.toFixed(2).replace('.', ',')} | Idade: ${age} anos`,
      message: "Antecipe seu FGTS e use o valor para quitar suas dívidas com juros altos."
    };
  }

  // Fallback: Planilha de educação financeira
  return {
    product: "Planilha de Educação Financeira",
    description: "Material gratuito para organizar suas finanças e planejar a quitação de dívidas.",
    benefits: [
      "Planilha completa de controle financeiro",
      "Guia passo a passo para sair das dívidas",
      "Calculadora de juros e parcelas",
      "Dicas de economia e planejamento"
    ],
    profile: "Não elegível para produtos de crédito no momento",
    conditions: "Continue organizando suas finanças",
    message: "Baixe nossa planilha para planejar como quitar suas dívidas aos poucos."
  };
}