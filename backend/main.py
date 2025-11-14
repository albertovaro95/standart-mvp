from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models import Experience, Purchase, Voucher

# Crear tablas al iniciar
Base.metadata.create_all(bind=engine)

# Crear datos de ejemplo si no existen (opcional, para demo)
try:
    from database import SessionLocal
    db = SessionLocal()
    if db.query(Experience).count() == 0:
        from seed_data import seed_experiences
        seed_experiences()
    db.close()
except Exception:
    pass  # Si falla, no es crítico

app = FastAPI(
    title="Christmas Experiences Store API",
    description="API REST para tienda de experiencias navideñas",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Christmas Experiences Store API funcionando"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Routers
from routers import purchases, experiences
app.include_router(purchases.router, prefix="/api/purchases", tags=["purchases"])
app.include_router(experiences.router, prefix="/api/experiences", tags=["experiences"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
