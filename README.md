# standart-mvp

Crear proyecto en modo MVP para validar ideas de forma ágil y sencilla

## 🚀 Inicio Rápido

### Opción 1: Usando Makefile (Recomendado)

```bash
# Instalar todas las dependencias
make install

# Levantar backend y frontend en paralelo
make dev
```

### Opción 2: Manual

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
