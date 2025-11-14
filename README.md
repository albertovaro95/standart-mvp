# standart-mvp

Crear proyecto en modo MVP para validar ideas de forma ágil y sencilla

## 🚀 Inicio Rápido

### Opción 1: Setup completo e iniciar (Recomendado)

```bash
# Setup completo e iniciar servidores (todo en uno)
make quick-start
```

### Opción 2: Paso a paso

```bash
# 1. Instalar todas las dependencias
make setup

# 2. Iniciar backend y frontend en paralelo
make start
```

### Opción 3: Comandos individuales

```bash
# Instalar dependencias
make install

# Iniciar solo backend
make backend

# Iniciar solo frontend
make frontend

# Iniciar ambos en paralelo
make dev
```

### Opción 4: Manual (sin Makefile)

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
standart-mvp/
├── backend/              # API FastAPI
├── frontend/             # Aplicación React con Vite
└── .cursor/              # Configuración Cursor (Agentes, Commands)
```

## 🔧 Configuración

1. Copia `.cursor/mcp.json.example` a `.cursor/mcp.json`
2. Edita `.cursor/mcp.json` con tus credenciales de GitHub
3. Reinicia Cursor

## 📝 Notas

Este proyecto fue generado usando el template de standart-ai-development.
Objetivo: MVP
