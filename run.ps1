# ========================================================
# 🌾 AGRI-MITHRA POWERSHELL QUICK LAUNCHER 🌾
# ========================================================
Write-Host "🌾 Agri-Mithra Local Server Setup 🌾" -ForegroundColor Green
Write-Host ""

# [1/2] Install dependencies
Write-Host "[1/2] Installing npm packages..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] npm install failed. Please verify Node.js is installed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# [2/2] Run server
Write-Host ""
Write-Host "[2/2] Launching Next.js server..." -ForegroundColor Cyan
Write-Host "Agri-Mithra local address: http://localhost:3000" -ForegroundColor Green
Write-Host ""
npm run dev
