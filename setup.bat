@echo off
echo ========================================
echo   Liqued E-Commerce - Quick Start
echo ========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if MySQL is installed
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: MySQL not found in PATH
    echo Make sure MySQL is installed and running
    echo.
)

echo [1/4] Checking backend dependencies...
cd liqued-backend\server
if not exist "node_modules\" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed.
)

echo.
echo [2/4] Checking backend .env file...
if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please edit liqued-backend/server/.env file
    echo    Update DB_PASSWORD and JWT_SECRET before starting!
    echo.
    pause
)

echo.
echo [3/4] Checking frontend dependencies...
cd ..\..\my-liquedd
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)

echo.
echo [4/4] Checking frontend .env file...
if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start Backend:
echo    cd liqued-backend\server
echo    npm start
echo.
echo 2. Start Frontend (in new terminal):
echo    cd my-liquedd
echo    npm run dev
echo.
echo 3. Access the application:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo    Admin:    http://localhost:3000/admin/login
echo.
echo Need help? Read INTEGRATION_GUIDE.md
echo ========================================
pause
