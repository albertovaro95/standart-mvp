# 🔧 Guía de Troubleshooting

## Error: "No se pudo conectar con el servidor"

Este error significa que el **backend no está corriendo**.

### Solución Rápida

**Opción 1: Usar Makefile (Recomendado)**
```bash
# Iniciar backend y frontend juntos
make start

# O solo el backend
make backend
```

**Opción 2: Manual**
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate  # En Windows: venv\Scripts\activate
python main.py

# Terminal 2 - Frontend (si no está corriendo)
cd frontend
npm run dev
```

### Verificar que todo está corriendo

**Script de diagnóstico:**
```bash
./check-backend.sh
```

**O manualmente:**
```bash
# Verificar backend
curl http://localhost:8000/health
# Debería responder: {"status":"healthy"}

# Verificar frontend
curl http://localhost:5173
# Debería responder con HTML
```

### URLs Importantes

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

### Problemas Comunes

#### 1. Puerto 8000 ya en uso
```bash
# Ver qué está usando el puerto
lsof -ti:8000

# Matar el proceso (cuidado)
kill $(lsof -ti:8000)
```

#### 2. Entorno virtual no existe
```bash
make install-backend
```

#### 3. Dependencias no instaladas
```bash
make install
```

#### 4. Base de datos corrupta
```bash
make clean-db
# Luego reinicia el backend
```

### Ver Logs del Backend

Si el backend está corriendo pero hay errores, revisa la terminal donde lo ejecutaste. Los errores de Python aparecerán ahí.

### Ver Logs del Frontend

Abre la consola del navegador (F12) para ver errores de JavaScript o problemas de red.

