import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Krishi-Setu - Farmer-Friendly Multilingual AI Companion",
  description: "Bilingual Kannada and English farming assistant featuring plant disease scanner, voice help, APMC prices, and local weather forecasts.",
  keywords: ["Krishi-Setu", "AgriTech", "Farmer AI", "Karnataka APMC", "Kannada Voice Assistant", "Crop Disease Scanner", "India Agriculture"],
  authors: [{ name: "Krishi-Setu Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
