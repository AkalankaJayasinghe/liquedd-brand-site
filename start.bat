@echo off
echo Starting Liqued Backend Server...
cd liqued-backend\server
start cmd /k "npm start"
timeout /t 3

echo Starting Liqued Frontend...
cd ..\..\my-liquedd
start cmd /k "npm run dev"

echo.
echo ========================================
echo   Liqued Application Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:3000/admin/login
echo.
echo Both servers are starting in separate windows.
echo Close those windows to stop the servers.
echo ========================================
