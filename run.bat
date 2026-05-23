@echo off
title Agri-Mithra Local Server
echo ========================================================
echo 🌾 AGRI-MITHRA QUICK START LAUNCHER 🌾
echo ========================================================
echo.
echo [1/2] Checking and installing dependencies...
echo.
call npm install
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] npm install failed. Please make sure Node.js is installed!
    pause
    exit /b %ERRORLEVEL%
)
echo.
echo [2/2] Launching local Next.js development server...
echo.
echo Agri-Mithra will start at: http://localhost:3000
echo.
call npm run dev
pause
