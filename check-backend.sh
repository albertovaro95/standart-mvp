#!/bin/bash

echo "🔍 Verificando estado del backend..."
echo ""

# Verificar si el puerto 8000 está en uso
if lsof -ti:8000 > /dev/null 2>&1; then
    echo "✅ Puerto 8000 está en uso"
    PID=$(lsof -ti:8000)
    echo "   PID: $PID"
    echo ""
    
    # Intentar hacer una petición
    echo "🌐 Probando conexión..."
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo "✅ Backend responde correctamente"
        echo ""
        echo "Respuesta del health check:"
        curl -s http://localhost:8000/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:8000/health
        echo ""
    else
        echo "❌ Backend no responde a peticiones HTTP"
        echo "   Puede que el proceso esté corriendo pero no sea el servidor FastAPI"
    fi
else
    echo "❌ Puerto 8000 NO está en uso"
    echo ""
    echo "El backend no está corriendo."
    echo ""
    echo "Para iniciarlo, ejecuta:"
    echo "  cd backend"
    echo "  source venv/bin/activate  # o venv\\Scripts\\activate en Windows"
    echo "  python main.py"
    echo ""
    echo "O usa el Makefile:"
    echo "  make backend"
    echo "  # o"
    echo "  make start  # para iniciar backend y frontend juntos"
fi

echo ""
echo "📋 Verificando configuración..."
if [ -f "backend/main.py" ]; then
    echo "✅ backend/main.py existe"
else
    echo "❌ backend/main.py no encontrado"
fi

if [ -d "backend/venv" ]; then
    echo "✅ Entorno virtual existe"
else
    echo "⚠️  Entorno virtual no existe (ejecuta: make install-backend)"
fi

