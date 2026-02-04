@echo off
echo Starting CloudHop deployment...
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed - trying dev server instead...
    echo.
    echo Starting development server...
    call npm run dev
    if %errorlevel% neq 0 (
        echo Dev server failed too
        pause
        exit /b 1
    )
) else (
    echo Build successful!
    echo.
    echo You can now deploy the dist/ folder
)

echo.
echo Deployment process complete!
pause
