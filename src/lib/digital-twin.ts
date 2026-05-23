import { UserProfile } from "./store";

// Helper to generate a realistic sequence of numbers with some random variance
const generateTrendData = (base: number, points: number, variancePercent: number) => {
  return Array.from({ length: points }).map(() => {
    const variance = base * (variancePercent / 100);
    const randomShift = (Math.random() * variance * 2) - variance;
    return Math.max(0, Math.round(base + randomShift)); // ensure non-negative
  });
};

export const generateDigitalTwinStats = (profile: UserProfile) => {
  const acres = parseInt(profile.totalAcres || "0") || 5;
  const crop = profile.currentCrop || "Sugarcane";
  
  // 1. AI Yield Prediction
  // Base yield per acre varies by crop (dummy logic)
  let baseYieldPerAcre = 20; // tons for sugarcane
  if (crop.toLowerCase().includes("wheat")) baseYieldPerAcre = 2; // tons
  if (crop.toLowerCase().includes("ragi")) baseYieldPerAcre = 1.5;
  
  const estimatedTotalYield = baseYieldPerAcre * acres;
  const yieldTrend = generateTrendData(estimatedTotalYield, 9, 15); // 9 months of data

  // 2. Profit Forecasting
  // Mock Revenue & Cost for 4 Quarters
  const baseRevenue = estimatedTotalYield * (crop.toLowerCase().includes("sugarcane") ? 3000 : 25000); 
  const baseCost = baseRevenue * 0.6; // 60% cost margin
  
  const q1Rev = baseRevenue / 4 + (Math.random() * 50000);
  const q1Cost = baseCost / 4 + (Math.random() * 20000);
  const quarters = [
    { name: "Q1", revenue: q1Rev, cost: q1Cost, profit: q1Rev - q1Cost },
    { name: "Q2", revenue: q1Rev * 1.1, cost: q1Cost * 1.05, profit: (q1Rev * 1.1) - (q1Cost * 1.05) },
    { name: "Q3", revenue: q1Rev * 1.2, cost: q1Cost * 1.1, profit: (q1Rev * 1.2) - (q1Cost * 1.1) },
    { name: "Q4", revenue: q1Rev * 0.9, cost: q1Cost * 0.95, profit: (q1Rev * 0.9) - (q1Cost * 0.95) },
  ];

  // 3. Loan Estimation
  const estimatedLoan = acres * 100000; // 1 Lakh per acre max limit
  const loanFormatted = `₹${(estimatedLoan / 100000).toFixed(1)} Lakhs`;

  // 4. Smart Irrigation
  let waterUsage = 60; // baseline
  if (profile.irrigationMethod?.toLowerCase().includes("drip")) waterUsage = 95; // Highly efficient
  if (profile.irrigationMethod?.toLowerCase().includes("flood")) waterUsage = 30; // Highly inefficient

  // 5. Risk Analysis
  let riskScore = 40; // Medium-low default
  let riskLevel = "Medium";
  if (profile.farmingType === "Chemical" && !profile.irrigationMethod?.includes("Drip")) {
    riskScore = 75; // High risk if chemical + poor irrigation
    riskLevel = "High";
  } else if (profile.farmingType === "Organic" && profile.irrigationMethod?.includes("Drip")) {
    riskScore = 15; // Low risk
    riskLevel = "Low";
  }

  // 6. Multi-Cropping Suggestions
  const cropPairings = crop.toLowerCase().includes("sugarcane") 
    ? ["Legumes", "Sweet Potato"] 
    : ["Beans", "Mustard"];

  return {
    estimatedTotalYield,
    yieldTrend: yieldTrend.map((y, i) => ({ month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"][i], value: y })),
    quarters,
    loanFormatted,
    waterUsage,
    riskScore,
    riskLevel,
    cropPairings
  };
};
