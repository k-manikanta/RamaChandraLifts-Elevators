@echo off
REM Setup script for Ramachandra Lifts website

echo.
echo ====================================
echo Ramachandra Lifts & Elevators Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo.
    echo Please download and install Node.js from https://nodejs.org/
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo Node.js found!
node --version
npm --version
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.

REM Build CSS
echo Building CSS...
call npm run build

if %errorlevel% neq 0 (
    echo Error: Failed to build CSS
    pause
    exit /b 1
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Your website is ready!
echo.
echo Next steps:
echo 1. Open index.html in your browser
echo 2. Test the website
echo 3. Deploy to production
echo.
echo For development with auto-rebuild:
echo    npm run dev
echo.
echo For minified production CSS:
echo    npm run minify
echo.
echo For more info, see PRODUCTION_BUILD.md
echo.
pause
