# DeskLab - Internet Testing Setup Script
# This script helps you set up ngrok for internet testing

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DeskLab - Internet Testing Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if ngrok is installed
Write-Host "Checking for ngrok..." -ForegroundColor Yellow
$ngrokInstalled = Get-Command ngrok -ErrorAction SilentlyContinue

if (-not $ngrokInstalled) {
    Write-Host "❌ ngrok not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ngrok using one of these methods:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://ngrok.com/download" -ForegroundColor White
    Write-Host "  2. Or use Chocolatey: choco install ngrok" -ForegroundColor White
    Write-Host ""
    Write-Host "After installing, create free account at https://ngrok.com/" -ForegroundColor Yellow
    Write-Host "Then run: ngrok config add-authtoken YOUR_TOKEN" -ForegroundColor White
    Write-Host ""
    exit
}

Write-Host "✅ ngrok is installed!" -ForegroundColor Green
Write-Host ""

# Start the signaling server
Write-Host "Starting signaling server on port 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run server"
Start-Sleep -Seconds 3

# Start ngrok tunnel
Write-Host "Starting ngrok tunnel..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ngrok http 3001"
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Check the ngrok window for your public URL" -ForegroundColor White
Write-Host "     (looks like: https://abc123.ngrok.io)" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Update your .env file:" -ForegroundColor White
Write-Host "     VITE_SOCKET_URL=https://YOUR-NGROK-URL" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Rebuild the app:" -ForegroundColor White
Write-Host "     npm run build:win" -ForegroundColor Gray
Write-Host ""
Write-Host "  4. Share the new build with testers!" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to close this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
