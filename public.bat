@echo off
setlocal

echo ==========================================
echo       Velox Framework Publisher
echo ==========================================
echo.

echo [1/4] Logging in to NPM...
call npm login
if %ERRORLEVEL% NEQ 0 (
    echo Login failed! Exiting...
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/4] Publishing @remyyy/velox...
cd packages\velox
call npm publish --access public
cd ..\..

echo.
echo [3/4] Publishing vite-plugin-velox...
cd packages\vite-plugin-velox
call npm publish --access public
cd ..\..

echo.
echo [4/4] Publishing create-velox...
cd packages\create-velox
call npm publish --access public
cd ..\..

echo.
echo ==========================================
echo       All packages published!
echo ==========================================
pause
