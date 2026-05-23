"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAgriMithraStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { generateDigitalTwinStats } from "@/lib/digital-twin";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { 
  CloudRain, CloudSun, TrendingUp, AlertTriangle, Droplet, 
  Map, DollarSign, Sprout, Tractor, MoreHorizontal, Maximize2
} from "lucide-react";

export default function DigitalTwinPage() {
  const { language, profile } = useAgriMithraStore();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<any>(null);
  
  // Interactive Hover State
  const [activeZone, setActiveZone] = useState<any>(null);

  useEffect(() => {
    setStats(generateDigitalTwinStats(profile));
    setMounted(true);
  }, [profile]);

  if (!mounted || !stats) return null;

  // Custom Card Component for Glassmorphism
  const TwinCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(16,185,129,0.05)] rounded-[1.5rem] p-5 flex flex-col ${className}`}>
      {children}
    </div>
  );

  const totalAcres = Number(profile.totalAcres || 5);
  const mainCrop = profile.currentCrop || "Sugarcane";
  const secondaryCrop = profile.previousCrop || "Wheat";
  
  const zones = [
    { 
      id: 'z1', 
      crop: mainCrop, 
      acres: (totalAcres * 0.4).toFixed(1), 
      color: "bg-emerald-400 border-emerald-600",
      icon: <Sprout className="w-10 h-10 text-emerald-900 opacity-60 drop-shadow-md" />,
      yield: `${(totalAcres * 0.4 * 15).toFixed(0)} tons`,
      water: "4,500",
      profit: `₹${(totalAcres * 0.4 * 45000).toLocaleString()}`
    },
    { 
      id: 'z2', 
      crop: secondaryCrop, 
      acres: (totalAcres * 0.3).toFixed(1), 
      color: "bg-amber-300 border-amber-500",
      icon: <Sprout className="w-10 h-10 text-amber-800 opacity-60 drop-shadow-md" />,
      yield: `${(totalAcres * 0.3 * 8).toFixed(0)} tons`,
      water: "2,100",
      profit: `₹${(totalAcres * 0.3 * 35000).toLocaleString()}`
    },
    { 
      id: 'z3', 
      crop: "Vegetables (Intercrop)", 
      acres: (totalAcres * 0.2).toFixed(1), 
      color: "bg-lime-300 border-lime-500",
      icon: <Sprout className="w-10 h-10 text-lime-800 opacity-60 drop-shadow-md" />,
      yield: `${(totalAcres * 0.2 * 5).toFixed(0)} tons`,
      water: "1,200",
      profit: `₹${(totalAcres * 0.2 * 25000).toLocaleString()}`
    },
    { 
      id: 'z4', 
      crop: "Water Reservoir & Pump", 
      acres: (totalAcres * 0.1).toFixed(1), 
      color: "bg-blue-300 border-blue-500",
      icon: <Droplet className="w-10 h-10 text-blue-800 opacity-60 drop-shadow-md" />,
      yield: "N/A",
      water: "Storage",
      profit: "Infrastructure"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0FDF4] -m-4 sm:-m-8 p-4 sm:p-8 font-poppins relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-emerald-300/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-blue-300/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              AgriAssist <span className="text-emerald-600">Digital Twin</span>
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Live simulation powered by your farm profile</p>
          </div>
          <button className="bg-white/80 backdrop-blur border border-emerald-100 p-2.5 rounded-xl shadow-sm text-emerald-600 hover:bg-emerald-50 transition-colors hidden sm:block">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Weather Analytics */}
            <TwinCard>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-sm text-slate-700">{t.dtWeatherAnalytics || "Weather Analytics"}</h3>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <CloudSun className="w-10 h-10 text-amber-500" />
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-800">28°C</h2>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Partly Cloudy</p>
                </div>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div key={day} className="text-center">
                    <p className="text-[10px] font-bold text-slate-400">{day}</p>
                    <CloudRain className="w-4 h-4 mx-auto my-1 text-blue-400" />
                    <p className="text-[10px] font-bold text-slate-700">28°</p>
                  </div>
                ))}
              </div>
            </TwinCard>

            {/* Smart Irrigation */}
            <TwinCard>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-sm text-slate-700">{t.dtSmartIrrigation || "Smart Irrigation Pattern"}</h3>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Water Efficiency</span>
                <span className="text-sm font-extrabold text-emerald-600">{stats.waterUsage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-1 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${stats.waterUsage}%` }}></div>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 mt-2">
                Based on your {profile.irrigationMethod || "current"} system.
              </p>
            </TwinCard>

            {/* Multi Cropping */}
            <TwinCard className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-sm text-slate-700">{t.dtMultiCropping || "Multi-Cropping Suggestions"}</h3>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-[11px] font-medium text-slate-500 mb-4">
                Pair your {profile.currentCrop || "main crop"} with soil-enriching plants.
              </p>
              <div className="space-y-3">
                {stats.cropPairings.map((c: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{c}</h4>
                      <p className="text-[9px] text-slate-500 font-medium">Increases soil nitrogen</p>
                    </div>
                  </div>
                ))}
              </div>
            </TwinCard>
          </div>

          {/* CENTER COLUMN (3D FARM & YIELD/RISK) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Top Row: Yield & Risk */}
            <div className="grid grid-cols-2 gap-6">
              <TwinCard>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-slate-700">{t.dtYieldPrediction || "AI Yield Prediction"}</h3>
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Yield</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-800">{stats.estimatedTotalYield}</span>
                    <span className="text-xs font-bold text-slate-500">tons</span>
                  </div>
                </div>
                <div className="h-24 w-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.yieldTrend}>
                      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TwinCard>

              <TwinCard>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-slate-700">{t.dtRiskAnalysis || "Risk Analysis"}</h3>
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center relative py-4">
                  {/* Gauge Arc Simulation */}
                  <svg viewBox="0 0 100 50" className="w-full h-auto max-w-[150px] overflow-visible">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" 
                      stroke={stats.riskScore > 60 ? "#ef4444" : stats.riskScore > 30 ? "#f59e0b" : "#10b981"} 
                      strokeWidth="12" strokeLinecap="round" 
                      strokeDasharray={`${(stats.riskScore / 100) * 125}, 125`}
                    />
                  </svg>
                  <div className="absolute bottom-4 flex flex-col items-center">
                    <span className="text-lg font-extrabold text-slate-800">{stats.riskLevel}</span>
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-center text-slate-400 mt-auto">Based on {profile.farmingType} methods</p>
              </TwinCard>
            </div>

            {/* =============================================
                CENTRAL 3D CSS FARM — True 3D, no image cuts
                Each crop bed is a real CSS 3D box that pops
                straight up in Z-space on hover.
                ============================================= */}
            <div className="relative flex-1 min-h-[500px] bg-gradient-to-br from-sky-100 via-emerald-50 to-teal-100 border border-white/80 rounded-[2rem] shadow-sm flex flex-col items-center justify-center overflow-hidden">

              {/* ---- DIRECTIONAL TOOLTIPS ---- */}
              {/* Each tooltip pops out to its respective side (left or right) based on which bed is hovered */}
              {[
                { id: 'z1', side: 'left',  top: '22%', color: '#10b981', label: '🌿 Zone A' },
                { id: 'z2', side: 'right', top: '22%', color: '#f59e0b', label: '🌾 Zone B' },
                { id: 'z3', side: 'left',  top: '62%', color: '#84cc16', label: '🥦 Zone C' },
                { id: 'z4', side: 'right', top: '62%', color: '#6366f1', label: '🌽 Zone D' },
              ].map(({ id, side, top, color, label }) => {
                const zone = zones.find(z => z.id === id);
                const isActive = activeZone?.id === id;
                if (!zone) return null;
                return (
                  <div
                    key={id}
                    className="absolute z-50 pointer-events-none transition-all duration-300"
                    style={{
                      top,
                      [side]: '12px',
                      opacity: isActive ? 1 : 0,
                      transform: `translateY(-50%) translateX(${isActive ? '0' : side === 'left' ? '-24px' : '24px'})`,
                    }}
                  >
                    <div className="bg-white/96 backdrop-blur-md shadow-xl rounded-2xl p-3.5 w-44"
                      style={{ borderLeft: side === 'left' ? `3px solid ${color}` : 'none', borderRight: side === 'right' ? `3px solid ${color}` : 'none' }}
                    >
                      <div className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color }}>{label}</div>
                      <h4 className="font-extrabold text-slate-800 text-[11px] mb-2 leading-tight">{zone.crop}</h4>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between border-b border-slate-100 pb-0.5"><span className="text-slate-400">Area</span><span className="font-bold text-slate-700">{zone.acres} ac</span></div>
                        <div className="flex justify-between border-b border-slate-100 pb-0.5"><span className="text-slate-400">Yield</span><span className="font-bold text-slate-700">{zone.yield}</span></div>
                        <div className="flex justify-between border-b border-slate-100 pb-0.5"><span className="text-slate-400">Water</span><span className="font-bold text-blue-500">{zone.water} L/d</span></div>
                        <div className="flex justify-between border-b border-slate-100 pb-0.5"><span className="text-slate-400">Profit</span><span className="font-bold text-emerald-600">{zone.profit}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Irrigation</span><span className="font-bold text-slate-600">{profile.irrigationMethod || 'Drip'}</span></div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 3D Isometric Farm Scene */}
              <div style={{ perspective: '900px', perspectiveOrigin: '50% 35%' }} className="flex items-center justify-center w-full py-6">
                {/* Scene — isometric camera: tilt + rotate */}
                <div style={{ transform: 'rotateX(52deg) rotateZ(45deg)', transformStyle: 'preserve-3d', position: 'relative', width: '300px', height: '300px' }}>

                  {/* Earth Base Platform */}
                  <div style={{
                    position: 'absolute', inset: '-30px',
                    background: 'linear-gradient(135deg, #6D4C41 0%, #795548 40%, #5D4037 100%)',
                    transform: 'translateZ(-24px)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                    borderRadius: '12px',
                  }} />
                  {/* Earth side front */}
                  <div style={{
                    position: 'absolute', inset: '-30px', bottom: '-54px', top: 'auto', height: '24px',
                    background: '#4E342E',
                    transform: 'rotateX(-90deg)', transformOrigin: 'top center',
                  }} />

                  {/* 2x2 Grid Layout: 2 beds × 2 beds with irrigation channel gap */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 16px 1fr', gridTemplateRows: '1fr 16px 1fr', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>

                    {/* ---- CROP BEDS ---- */}
                    {[
                      { zone: zones[0], col: 1, row: 1, top: 'linear-gradient(135deg,#1B5E20,#2E7D32,#43A047,#66BB6A)', front: '#1B5E20', side: '#33691E', label: '🌿', rows: '#145214' },
                      { zone: zones[1], col: 3, row: 1, top: 'linear-gradient(135deg,#E65100,#EF6C00,#F9A825,#FFD54F)', front: '#BF360C', side: '#E65100', label: '🌾', rows: '#BF360C' },
                      { zone: zones[2], col: 1, row: 3, top: 'linear-gradient(135deg,#33691E,#558B2F,#7CB342,#AED581)', front: '#2E7D32', side: '#33691E', label: '🥦', rows: '#1B5E20' },
                      { zone: zones[3], col: 3, row: 3, top: 'linear-gradient(135deg,#4527A0,#5E35B1,#7E57C2,#B39DDB)', front: '#311B92', side: '#4527A0', label: '🌽', rows: '#311B92' },
                    ].map(({ zone, col, row, top, front, side, label, rows }) => {
                      const isActive = activeZone?.id === zone.id;
                      const bedH = 22; // wall height in px
                      return (
                        <div
                          key={zone.id}
                          onMouseEnter={() => setActiveZone(zone)}
                          onMouseLeave={() => setActiveZone(null)}
                          style={{
                            gridColumn: col, gridRow: row,
                            transformStyle: 'preserve-3d',
                            transform: isActive ? `translateZ(${bedH + 18}px)` : `translateZ(${bedH}px)`,
                            transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                            position: 'relative',
                            cursor: 'pointer',
                          }}
                        >
                          {/* TOP FACE — the crop surface */}
                          <div style={{
                            width: '100%', height: '100%',
                            background: top,
                            position: 'relative', overflow: 'hidden',
                            filter: isActive ? 'brightness(1.15) saturate(1.3)' : 'brightness(1)',
                            transition: 'filter 0.3s ease',
                            boxShadow: isActive ? `0 0 0 3px white, 0 0 0 5px ${front}` : 'none',
                          }}>
                            {/* Crop row texture lines */}
                            {[...Array(7)].map((_, i) => (
                              <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${(i / 7) * 100}%`, height: '2px', background: rows, opacity: 0.35 }} />
                            ))}
                            {/* Crop dot pattern */}
                            {[...Array(12)].map((_, i) => (
                              <div key={i} style={{
                                position: 'absolute',
                                left: `${(i % 4) * 25 + 12}%`, top: `${Math.floor(i / 4) * 33 + 16}%`,
                                width: '8px', height: '12px',
                                background: rows, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                opacity: 0.5,
                              }} />
                            ))}
                            {/* Zone label */}
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: '22px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>{label}</span>
                            </div>
                          </div>

                          {/* FRONT WALL — soil face visible in isometric */}
                          <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            height: `${bedH}px`,
                            background: `linear-gradient(180deg, ${front}, #3E2723)`,
                            transform: `rotateX(-90deg) translateZ(0)`,
                            transformOrigin: 'bottom center',
                          }} />

                          {/* RIGHT WALL — soil face visible in isometric */}
                          <div style={{
                            position: 'absolute', top: 0, bottom: 0, right: 0,
                            width: `${bedH}px`,
                            background: `linear-gradient(90deg, ${side}, #3E2723)`,
                            transform: `rotateY(90deg) translateZ(0)`,
                            transformOrigin: 'right center',
                          }} />
                        </div>
                      );
                    })}

                    {/* ---- IRRIGATION CHANNELS ---- */}
                    {/* Horizontal middle channel */}
                    <div style={{ gridColumn: '1 / span 3', gridRow: 2, background: 'linear-gradient(180deg,#0277BD,#29B6F6,#81D4FA)', transformStyle: 'preserve-3d', transform: 'translateZ(4px)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: '30%', left: '-100%', right: 0, height: '35%', background: 'rgba(255,255,255,0.4)', transform: 'skewX(-20deg)', animation: 'none' }} />
                    </div>
                    {/* Vertical left channel */}
                    <div style={{ gridColumn: 2, gridRow: 1, background: 'linear-gradient(90deg,#0277BD,#29B6F6,#81D4FA)', transformStyle: 'preserve-3d', transform: 'translateZ(4px)' }} />
                    {/* Vertical right channel */}
                    <div style={{ gridColumn: 2, gridRow: 3, background: 'linear-gradient(90deg,#0277BD,#29B6F6,#81D4FA)', transformStyle: 'preserve-3d', transform: 'translateZ(4px)' }} />
                    {/* Center junction */}
                    <div style={{ gridColumn: 2, gridRow: 2, background: '#29B6F6', transformStyle: 'preserve-3d', transform: 'translateZ(4px)' }} />
                  </div>
                </div>
              </div>

              {/* Instruction hint */}
              <p className="text-[10px] font-semibold text-slate-400 mt-2 text-center">Hover over any crop bed to explore</p>

              {/* Live badge */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow border border-white text-[10px] font-extrabold text-slate-700 flex items-center gap-1.5 z-30">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Digital Twin
              </div>
            </div>
              
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Loan Estimation */}
            <TwinCard>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-sm text-slate-700">{t.dtLoanEstimation || "Loan Estimation"}</h3>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Eligible Amount</p>
              <h2 className="text-2xl font-extrabold text-emerald-700 mb-1">{stats.loanFormatted}</h2>
              <p className="text-[10px] font-medium text-slate-500 mb-4">Based on {profile.totalAcres || "5"} acres collateral</p>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors">
                Apply Now
              </button>
            </TwinCard>

            {/* Profit Forecasting */}
            <TwinCard className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-sm text-slate-700">{t.dtProfitForecasting || "Profit Forecasting"}</h3>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 w-full min-h-[150px] -ml-5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.quarters} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Bar dataKey="revenue" fill="#10b981" radius={[2, 2, 0, 0]} barSize={12} />
                    <Bar dataKey="cost" fill="#f59e0b" radius={[2, 2, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-emerald-500"/> <span className="text-[9px] font-bold text-slate-500">Revenue</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-amber-500"/> <span className="text-[9px] font-bold text-slate-500">Costs</span></div>
              </div>
            </TwinCard>

            {/* Farm Overview */}
            <TwinCard>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-sm text-slate-700">{t.dtFarmOverview || "Farm Overview"}</h3>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="bg-emerald-50 p-1.5 rounded text-emerald-600"><Map className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400">Total Area</h4>
                    <p className="text-sm font-extrabold text-slate-800">{profile.totalAcres || "5"} ac</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-50 p-1.5 rounded text-blue-600"><Droplet className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400">Water</h4>
                    <p className="text-sm font-extrabold text-slate-800 line-clamp-1">{profile.waterSource || "Borewell"}</p>
                  </div>
                </div>
              </div>
            </TwinCard>

          </div>
        </div>
      </div>
    </div>
  );
}
