@echo off
echo 🚀 Starting FAQ Admin Interface (Fixed Version)...
echo.
echo 📍 Make sure you're in the backend directory
cd backend
echo.
echo 🔍 Testing syntax first...
python -m py_compile admin_interface.py
if %errorlevel% neq 0 (
    echo ❌ Syntax error found! Please check the code.
    pause
    exit /b 1
)
echo ✅ Syntax check passed!
echo.
echo 🔍 Testing basic functionality...
python test_admin_fixed.py
if %errorlevel% neq 0 (
    echo ❌ Functionality test failed! Please check the code.
    pause
    exit /b 1
)
echo ✅ Functionality test passed!
echo.
echo 🚀 Starting admin interface...
python admin_interface.py
pause
