export type Language = "en" | "kn";

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  languageName: string;
  otherLanguage: string;
  navLanding: string;
  navFeatures: string;
  navHowItWorks: string;
  navFAQ: string;
  navContact: string;
  navDashboard: string;
  login: string;
  logout: string;
  register: string;
  email: string;
  password: string;
  phone: string;
  googleLogin: string;
  phoneLogin: string;
  otpVerify: string;
  sendOTP: string;
  enterOTP: string;
  verify: string;
  backToLogin: string;
  welcomeBack: string;
  welcomeMessage: string;
  roleDescription: string;
  diseaseScanner: string;
  diseaseScannerDesc: string;
  voiceAssistant: string;
  voiceAssistantDesc: string;
  weatherForecast: string;
  weatherForecastDesc: string;
  marketPrices: string;
  marketPricesDesc: string;
  recentScans: string;
  recentScansDesc: string;
  scannedOn: string;
  scanNewCrop: string;
  micTapToSpeak: string;
  micListening: string;
  micThinking: string;
  micSpeaking: string;
  voicePlaceholder: string;
  uploadCropImage: string;
  cameraCapture: string;
  dragDropImage: string;
  analyzeImage: string;
  diseaseResult: string;
  diseaseName: string;
  confidenceScore: string;
  symptoms: string;
  prevention: string;
  treatment: string;
  backToDashboard: string;
  settings: string;
  settingsDesc: string;
  location: string;
  preferredLanguage: string;
  voiceOutputEnabled: string;
  saveChanges: string;
  changesSaved: string;
  cropHelp: string;
  fertilizerSuggestions: string;
  govSchemes: string;
  cropName: string;
  mandiPrice: string;
  mandiLocation: string;
  priceTrend: string;
  rainPrediction: string;
  humidity: string;
  windSpeed: string;
  tempCelsius: string;
  backHome: string;
  contactUs: string;
  getStarted: string;
  featuresTitle: string;
  featuresSubtitle: string;
  howTitle: string;
  howSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  scanCardTitle: string;
  scanCardDesc: string;
  voiceCardTitle: string;
  voiceCardDesc: string;
  weatherCardTitle: string;
  weatherCardDesc: string;
  priceCardTitle: string;
  priceCardDesc: string;
  karnatakaDistricts: string;
  // Ecosystem Features
  navEquipment: string;
  navLearning: string;
  navSchemes: string;
  profileCompletion: string;
  recommendedVideos: string;
  eligibleSchemes: string;
  equipmentRentals: string;
  age: string;
  gender: string;
  village: string;
  state: string;
  experienceYears: string;
  totalAcres: string;
  soilType: string;
  waterSource: string;
  irrigationMethod: string;
  currentCrop: string;
  previousCrop: string;
  fertilizersUsed: string;
  pesticidesUsed: string;
  machineryOwned: string;
  annualIncome: string;
  existingLoans: string;
  sellingMethod: string;
  marketUsed: string;
  farmingType: string;
  navDigitalTwin: string;
  navRecycler: string;
  dtYieldPrediction: string;
  dtRiskAnalysis: string;
  dtWeatherAnalytics: string;
  dtMarketInsights: string;
  dtProfitForecasting: string;
  dtLoanEstimation: string;
  dtSmartIrrigation: string;
  dtMultiCropping: string;
  dtFarmOverview: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: "Krishi-Setu",
    tagline: "Your Friendly AI Farming Companion",
    languageName: "English",
    otherLanguage: "ಕನ್ನಡ",
    navLanding: "Home",
    navFeatures: "Features",
    navHowItWorks: "How It Works",
    navFAQ: "FAQ",
    navContact: "Contact",
    navDashboard: "Dashboard",
    login: "Sign In",
    logout: "Sign Out",
    register: "Create Account",
    email: "Email Address",
    password: "Password",
    phone: "Phone Number",
    googleLogin: "Sign In with Google",
    phoneLogin: "Sign In with Phone OTP",
    otpVerify: "Verify Phone OTP",
    sendOTP: "Send Verification Code",
    enterOTP: "6-Digit Code",
    verify: "Verify & Enter",
    backToLogin: "Back to Login",
    welcomeBack: "Welcome back",
    welcomeMessage: "Namaskara! How can Krishi-Setu help you today?",
    roleDescription: "Farmer Profile",
    diseaseScanner: "Crop Disease Scanner",
    diseaseScannerDesc: "Take or upload a photo of a sick plant for instant AI remedies",
    voiceAssistant: "Bilingual Voice Assistant",
    voiceAssistantDesc: "Talk in Kannada or English to ask farming questions anytime",
    weatherForecast: "Local Weather Updates",
    weatherForecastDesc: "Accurate rain alerts and weather tips tailored for your crops",
    marketPrices: "Mandi Market Prices",
    marketPricesDesc: "Check daily market prices for your crops in nearby mandis",
    recentScans: "Your Crop Health History",
    recentScansDesc: "Review and track previous disease scan reports",
    scannedOn: "Scanned on",
    scanNewCrop: "Scan New Crop",
    micTapToSpeak: "Tap microphone and ask anything...",
    micListening: "Listening closely to you...",
    micThinking: "Krishi-Setu is thinking...",
    micSpeaking: "Krishi-Setu is responding...",
    voicePlaceholder: "Try asking: 'Which fertilizer is best for Ragi?' or 'Will it rain today?'",
    uploadCropImage: "Upload Crop Photo",
    cameraCapture: "Take Photo with Camera",
    dragDropImage: "Drag and drop your crop photo here, or click to browse",
    analyzeImage: "Find Disease & Remedies Now",
    diseaseResult: "AI Disease Diagnosis",
    diseaseName: "Diagnosed Condition",
    confidenceScore: "AI Confidence",
    symptoms: "What is happening (Symptoms)",
    prevention: "How to prevent this next time",
    treatment: "How to cure it right now (Remedies)",
    backToDashboard: "Go Back to Home Screen",
    settings: "App Settings",
    settingsDesc: "Manage language, region, and voice preferences",
    location: "Your District / Location",
    preferredLanguage: "Preferred Language",
    voiceOutputEnabled: "Enable AI Auto-Voice Output (Text-to-Speech)",
    saveChanges: "Save My Settings",
    changesSaved: "Settings saved successfully!",
    cropHelp: "Crop Help",
    fertilizerSuggestions: "Fertilizer Helper",
    govSchemes: "Govt Schemes",
    cropName: "Crop Name",
    mandiPrice: "Current Market Price (per Quintal)",
    mandiLocation: "Mandi Name",
    priceTrend: "Price Trend",
    rainPrediction: "Rain Forecast",
    humidity: "Humidity",
    windSpeed: "Wind",
    tempCelsius: "Temperature",
    backHome: "Go to Main Site",
    contactUs: "Contact Support Team",
    getStarted: "Start Farming Smarter",
    featuresTitle: "Simple Tools Built For Farmers",
    featuresSubtitle: "Everything you need to protect your farm and boost harvest, in simple regional language.",
    howTitle: "As Easy As 1-2-3",
    howSubtitle: "Krishi-Setu is designed to be simple for elders and first-time mobile users.",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Got questions? We've got simple answers for you.",
    scanCardTitle: "Disease Scanning",
    scanCardDesc: "Point your phone camera at any leaf or crop. Krishi-Setu immediately identifies the problem and tells you the exact organic or chemical remedy to buy.",
    voiceCardTitle: "Multilingual Voice Chat",
    voiceCardDesc: "No typing required! Tap the mic button and speak in Kannada or English. The assistant reads answers out loud in a friendly voice, just like an expert friend.",
    weatherCardTitle: "Weather Crop Tips",
    weatherCardDesc: "Receive timely advice, e.g. 'Do not apply fertilizer today because rain is coming in 3 hours' or 'High humidity might lead to fungal infection.'",
    priceCardTitle: "Mandi Price Tracker",
    priceCardDesc: "Find out where to sell your Ragi, Tomato, or Paddy for the highest rate. Updated daily from official APMC Mandi databases in Karnataka.",
    karnatakaDistricts: "Karnataka Districts",
    // Ecosystem Features EN
    navEquipment: "Equipment Rental",
    navLearning: "Agri Learning Hub",
    navSchemes: "Govt Schemes",
    profileCompletion: "Profile Completion",
    recommendedVideos: "Recommended Videos",
    eligibleSchemes: "Eligible Govt Schemes",
    equipmentRentals: "Equipment Suggestions",
    age: "Age",
    gender: "Gender",
    village: "Village",
    state: "State",
    experienceYears: "Farming Experience (Years)",
    totalAcres: "Total Land (Acres)",
    soilType: "Soil Type",
    waterSource: "Water Source",
    irrigationMethod: "Irrigation Method",
    currentCrop: "Current Crop",
    previousCrop: "Previous Crop",
    fertilizersUsed: "Fertilizers Used",
    pesticidesUsed: "Pesticides Used",
    machineryOwned: "Machinery Owned",
    annualIncome: "Annual Income",
    existingLoans: "Existing Loans",
    sellingMethod: "Selling Method",
    marketUsed: "Market Used",
    farmingType: "Farming Type",
  navDigitalTwin: "Digital Twin",
  navRecycler: "Agri Recycler",
  dtYieldPrediction: "AI Yield Prediction",
  dtRiskAnalysis: "Risk Analysis",
  dtWeatherAnalytics: "Weather Analytics",
  dtMarketInsights: "Market Insights",
  dtProfitForecasting: "Profit Forecasting",
  dtLoanEstimation: "Loan Estimation & Finance",
  dtSmartIrrigation: "Smart Irrigation Pattern",
  dtMultiCropping: "Multi-Cropping Suggestions",
  dtFarmOverview: "Farm Overview"
  },
  kn: {
    appName: "ಅಗ್ರಿ-ಮಿತ್ರ",
    tagline: "ನಿಮ್ಮ ಆತ್ಮೀಯ ರೈತ ಸ್ನೇಹಿ ಎಐ ಸಹಾಯಕ",
    languageName: "ಕನ್ನಡ",
    otherLanguage: "English",
    navLanding: "ಮುಖ್ಯ ಪುಟ",
    navFeatures: "ಸೌಲಭ್ಯಗಳು",
    navHowItWorks: "ಬಳಸುವ ವಿಧಾನ",
    navFAQ: "ಪ್ರಶ್ನೋತ್ತರಗಳು",
    navContact: "ಸಂಪರ್ಕಿಸಿ",
    navDashboard: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    login: "ಲಾಗಿನ್ ಆಗಿ",
    logout: "ಹೊರಹೋಗಿ",
    register: "ಖಾತೆ ತೆರೆಯಿರಿ",
    email: "ಇಮೇಲ್ ವಿಳಾಸ",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    googleLogin: "ಗೂಗಲ್ ಬಳಸಿ ಲಾಗಿನ್",
    phoneLogin: "ಮೊಬೈಲ್ ಒಟಿಪಿ ಬಳಸಿ ಲಾಗಿನ್",
    otpVerify: "ಒಟಿಪಿ ಪರಿಶೀಲನೆ",
    sendOTP: "ವೆರಿಫಿಕೇಶನ್ ಕೋಡ್ ಕಳುಹಿಸಿ",
    enterOTP: "೬ ಅಂಕಿಯ ಒಟಿಪಿ ಕೋಡ್",
    verify: "ಖಚಿತಪಡಿಸಿ ಪ್ರವೇಶಿಸಿ",
    backToLogin: "ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    welcomeBack: "ಮತ್ತೆ ಸುಸ್ವಾಗತ",
    welcomeMessage: "ನಮಸ್ಕಾರ! ಇವತ್ತು ಅಗ್ರಿ-ಮಿತ್ರ ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    roleDescription: "ರೈತರ ಪ್ರೊಫೈಲ್",
    diseaseScanner: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಯಂತ್ರ",
    diseaseScannerDesc: "ಬೆಳೆಯ ಫೋಟೋ ತೆಗೆದು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ತಕ್ಷಣ ಪರಿಹಾರ ಪಡೆಯಿರಿ",
    voiceAssistant: "ಧ್ವನಿ ಸಹಾಯ",
    voiceAssistantDesc: "ಯಾವುದೇ ಪ್ರಶ್ನೆಯನ್ನು ಕನ್ನಡದಲ್ಲೇ ಕೇಳಿ ಮತ್ತು ಧ್ವನಿ ಮೂಲಕವೇ ಉತ್ತರ ಕೇಳಿ",
    weatherForecast: "ಹವಾಮಾನ ಮಾಹಿತಿ",
    weatherForecastDesc: "ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ನಿಖರ ಮಳೆ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಬೆಳೆ ಸಲಹೆಗಳು",
    marketPrices: "ಮಾರುಕಟ್ಟೆ ಧಾರಣೆ",
    marketPricesDesc: "ನಿಮ್ಮ ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಇಂದಿನ ಬೆಳೆ ಬೆಲೆಗಳನ್ನು ತಿಳಿಯಿರಿ",
    recentScans: "ನಿಮ್ಮ ಹಳೆಯ ಬೆಳೆ ವರದಿಗಳು",
    recentScansDesc: "ಹಿಂದೆ ಪತ್ತೆ ಹಚ್ಚಲಾದ ರೋಗಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು",
    scannedOn: "ಪರೀಕ್ಷಿಸಿದ ದಿನಾಂಕ",
    scanNewCrop: "ಹೊಸ ಬೆಳೆ ಪರೀಕ್ಷೆ",
    micTapToSpeak: "ಮೈಕ್ರೋಫೋನ್ ಒತ್ತಿ ಏನು ಬೇಕಿದ್ದರೂ ಕೇಳಿ...",
    micListening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
    micThinking: "ಅಗ್ರಿ-ಮಿತ್ರ ಯೋಚಿಸುತ್ತಿದ್ದಾನೆ...",
    micSpeaking: "ಅಗ್ರಿ-ಮಿತ್ರ ಮಾತನಾಡುತ್ತಿದ್ದಾನೆ...",
    voicePlaceholder: "ಹೀಗೆ ಕೇಳಿ: 'ರಾಗಿ ಬೆಳೆಗೆ ಯಾವ ಗೊಬ್ಬರ ಹಾಕಬೇಕು?' ಅಥವಾ 'ಇವತ್ತು ಮಳೆ ಬರುತ್ತಾ?'",
    uploadCropImage: "ಬೆಳೆ ಫೋಟೋ ಹಾಕಿ",
    cameraCapture: "ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗಿರಿ",
    dragDropImage: "ಫೋಟೋವನ್ನು ಇಲ್ಲಿಗೆ ಎಳೆದು ಹಾಕಿ, ಅಥವಾ ಹುಡುಕಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    analyzeImage: "ರೋಗ ಮತ್ತು ಪರಿಹಾರ ತಿಳಿಯಿರಿ",
    diseaseResult: "ಎಐ ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ",
    diseaseName: "ರೋಗದ ಹೆಸರು",
    confidenceScore: "ಎಐ ನಿಖರತೆ",
    symptoms: "ಕಂಡುಬಂದ ಲಕ್ಷಣಗಳು",
    prevention: "ಮುಂದಿನ ಬಾರಿ ಬರದಂತೆ ತಡೆಯಲು ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು",
    treatment: "ರೋಗ ವಾಸಿ ಮಾಡಲು ಈಗಲೇ ಮಾಡಬೇಕಾದ ಪರಿಹಾರಗಳು",
    backToDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    settings: "ಅಪ್ಲಿಕೇಶನ್ ಸೆಟ್ಟಿಂಗ್ಸ್",
    settingsDesc: "ಭಾಷೆ, ಜಿಲ್ಲೆ ಮತ್ತು ಧ್ವನಿ ಸೆಟ್ಟಿಂಗ್ಸ್ ಬದಲಾಯಿಸಿ",
    location: "ನಿಮ್ಮ ಜಿಲ್ಲೆ / ತಾಲೂಕು",
    preferredLanguage: "ನಿಮ್ಮ ಭಾಷೆ",
    voiceOutputEnabled: "ಉತ್ತರವನ್ನು ಧ್ವನಿ ಮೂಲಕ ಓದಿ ಹೇಳಿ (ಧ್ವನಿ ಸೌಲಭ್ಯ)",
    saveChanges: "ಸೆಟ್ಟಿಂಗ್ಸ್ ಉಳಿಸಿ",
    changesSaved: "ಸೆಟ್ಟಿಂಗ್ಸ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
    cropHelp: "ಬೆಳೆ ಸಹಾಯ",
    fertilizerSuggestions: "ಗೊಬ್ಬರ ಮಾಹಿತಿ",
    govSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    cropName: "ಬೆಳೆಯ ಹೆಸರು",
    mandiPrice: "ಇಂದಿನ ಬೆಲೆ (ಕ್ವಿಂಟಾಲ್‌ಗೆ)",
    mandiLocation: "ಮಾರುಕಟ್ಟೆ (ಮಂಡಿ) ಹೆಸರು",
    priceTrend: "ಬೆಲೆ ಏರಿಳಿತ",
    rainPrediction: "ಮಳೆ ಮುನ್ಸೂಚನೆ",
    humidity: "ಆರ್ದ್ರತೆ",
    windSpeed: "ಗಾಳಿಯ ವೇಗ",
    tempCelsius: "ತಾಪಮಾನ",
    backHome: "ಮುಖ್ಯ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಹೋಗಿ",
    contactUs: "ಸಹಾಯಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸಿ",
    getStarted: "ಕೃಷಿ ಜ್ಞಾನ ಆರಂಭಿಸಿ",
    featuresTitle: "ರೈತರಿಗಾಗಿ ಸರಳ ಸೌಲಭ್ಯಗಳು",
    featuresSubtitle: "ನಿಮ್ಮ ಬೆಳೆ ರಕ್ಷಿಸಲು ಮತ್ತು ಹೆಚ್ಚಿನ ಇಳುವರಿ ಪಡೆಯಲು ಬೇಕಾದ ಎಲ್ಲ ಮಾಹಿತಿ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಲಭ್ಯವಿದೆ.",
    howTitle: "ಬಹಳ ಸರಳವಾದ ೩ ಹಂತಗಳು",
    howSubtitle: "ಅಗ್ರಿ-ಮಿತ್ರವನ್ನು ಹಿರಿಯರು ಮತ್ತು ಮೊಬೈಲ್ ಹೆಚ್ಚು ಬಳಸದವರೂ ಸುಲಭವಾಗಿ ಉಪಯೋಗಿಸಬಹುದು.",
    faqTitle: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
    faqSubtitle: "ನಿಮ್ಮ ಮನಸ್ಸಿನಲ್ಲಿರುವ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಳ ಮತ್ತು ನೇರ ಉತ್ತರಗಳು.",
    scanCardTitle: "ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ",
    scanCardDesc: "ನಿಮ್ಮ ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾವನ್ನು ಯಾವುದೇ ಎಲೆ ಅಥವಾ ಬೆಳೆಗೆ ತೋರಿಸಿ. ರೋಗವನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಿ, ಸೂಕ್ತವಾದ ನೈಸರ್ಗಿಕ ಅಥವಾ ರಾಸಾಯನಿಕ ಪರಿಹಾರಗಳನ್ನು ಸೂಚಿಸಲಾಗುತ್ತದೆ.",
    voiceCardTitle: "ಕನ್ನಡದಲ್ಲೇ ಧ್ವನಿ ಚಾಟ್",
    voiceCardDesc: "ಟೈಪ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ! ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ. ಒಬ್ಬ ತಜ್ಞ ಸ್ನೇಹಿತನಂತೆ ಎಲ್ಲ ಉತ್ತರಗಳನ್ನು ಧ್ವನಿಯ ಮೂಲಕ ಓದಿ ಕೇಳಿಸಲಾಗುತ್ತದೆ.",
    weatherCardTitle: "ಹವಾಮಾನ ಬೆಳೆ ಸಲಹೆ",
    weatherCardDesc: "'ಮುಂದಿನ ೩ ಗಂಟೆಗಳಲ್ಲಿ ಮಳೆ ಬರುವುದರಿಂದ ಇಂದು ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ' ಅಥವಾ 'ಆರ್ದ್ರತೆ ಹೆಚ್ಚಿರುವುದರಿಂದ ಶಿಲೀಂಧ್ರ ರೋಗ ಬರುವ ಸಾಧ್ಯತೆ ಇದೆ' ಎಂಬಂತಹ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
    priceCardTitle: "ಮಂಡಿ ಮಾರುಕಟ್ಟೆ ದರ",
    priceCardDesc: "ನಿಮ್ಮ ರಾಗಿ, ಟೊಮೆಟೊ ಅಥವಾ ಭತ್ತಕ್ಕೆ ಎಲ್ಲಿ ಗರಿಷ್ಠ ದರ ಸಿಗುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ. ಕರ್ನಾಟಕದ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಗಳಿಂದ ಪ್ರತಿದಿನ ಹೊಸ ಬೆಲೆಗಳನ್ನು ಅಪ್‌ಡೇಟ್ ಮಾಡಲಾಗುತ್ತದೆ.",
    karnatakaDistricts: "ಕರ್ನಾಟಕದ ಜಿಲ್ಲೆಗಳು",
    // Ecosystem Features KN
    navEquipment: "ಯಂತ್ರೋಪಕರಣಗಳ ಬಾಡಿಗೆ",
    navLearning: "ಕೃಷಿ ಕಲಿಕಾ ಕೇಂದ್ರ",
    navSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    profileCompletion: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ",
    recommendedVideos: "ಸೂಚಿತ ವೀಡಿಯೊಗಳು",
    eligibleSchemes: "ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    equipmentRentals: "ಯಂತ್ರೋಪಕರಣಗಳ ಸಲಹೆ",
    age: "ವಯಸ್ಸು",
    gender: "ಲಿಂಗ",
    village: "ಗ್ರಾಮ",
    state: "ರಾಜ್ಯ",
    experienceYears: "ಕೃಷಿ ಅನುಭವ (ವರ್ಷಗಳು)",
    totalAcres: "ಒಟ್ಟು ಜಮೀನು (ಎಕರೆ)",
    soilType: "ಮಣ್ಣಿನ ವಿಧ",
    waterSource: "ನೀರಿನ ಮೂಲ",
    irrigationMethod: "ನೀರಾವರಿ ಪದ್ಧತಿ",
    currentCrop: "ಪ್ರಸ್ತುತ ಬೆಳೆ",
    previousCrop: "ಹಿಂದಿನ ಬೆಳೆ",
    fertilizersUsed: "ಬಳಸಿದ ರಸಗೊಬ್ಬರಗಳು",
    pesticidesUsed: "ಬಳಸಿದ ಕೀಟನಾಶಕಗಳು",
    machineryOwned: "ಹೊಂದಿರುವ ಯಂತ್ರೋಪಕರಣಗಳು",
    annualIncome: "ವಾರ್ಷಿಕ ಆದಾಯ",
    existingLoans: "ಹಾಲಿ ಸಾಲಗಳು",
    sellingMethod: "ಮಾರಾಟದ ವಿಧಾನ",
    marketUsed: "ಮಾರಾಟ ಮಾಡುವ ಮಾರುಕಟ್ಟೆ",
    farmingType: "ಕೃಷಿಯ ವಿಧ",
  navDigitalTwin: "ಡಿಜಿಟಲ್ ಟ್ವಿನ್",
  navRecycler: "ಕೃಷಿ ಮರುಬಳಕೆ",
  dtYieldPrediction: "AI ಇಳುವರಿ ಭವಿಷ್ಯ",
  dtRiskAnalysis: "ಅಪಾಯದ ವಿಶ್ಲೇಷಣೆ",
  dtWeatherAnalytics: "ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
  dtMarketInsights: "ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳು",
  dtProfitForecasting: "ಲಾಭದ ಮುನ್ಸೂಚನೆ",
  dtLoanEstimation: "ಸಾಲದ ಅಂದಾಜು",
  dtSmartIrrigation: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ",
  dtMultiCropping: "ಬಹು-ಬೆಳೆ ಸಲಹೆಗಳು",
  dtFarmOverview: "ಕೃಷಿ ಅವಲೋಕನ"
  }
};
