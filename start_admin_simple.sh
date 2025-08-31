#!/bin/bash
echo "🚀 Starting FAQ Admin Interface (Fixed Version)..."
echo ""
echo "📍 Make sure you're in the backend directory"
cd backend
echo ""
echo "🔍 Testing syntax first..."
python3 -m py_compile admin_interface.py
if [ $? -ne 0 ]; then
    echo "❌ Syntax error found! Please check the code."
    exit 1
fi
echo "✅ Syntax check passed!"
echo ""
echo "🔍 Testing basic functionality..."
python3 test_admin_fixed.py
if [ $? -ne 0 ]; then
    echo "❌ Functionality test failed! Please check the code."
    exit 1
fi
echo "✅ Functionality test passed!"
echo ""
echo "🚀 Starting admin interface..."
python3 admin_interface.py

