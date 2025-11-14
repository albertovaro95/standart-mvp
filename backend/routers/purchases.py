from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Purchase, Voucher, Experience
from schemas import PurchaseCreate, PurchaseResponse
from datetime import datetime, timedelta
import random
import string

router = APIRouter()


def generate_voucher_code(experience_id: int) -> str:
    """Genera un código único de voucher"""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"EXP-{experience_id}-{timestamp}-{random_suffix}"


@router.post("/", response_model=PurchaseResponse)
async def create_purchase(purchase_data: PurchaseCreate, db: Session = Depends(get_db)):
    """
    Crea una compra y genera un voucher único
    """
    # Validar que la experiencia existe y está activa
    experience = db.query(Experience).filter(
        Experience.id == purchase_data.experience_id,
        Experience.is_active == True
    ).first()
    
    if not experience:
        raise HTTPException(
            status_code=404,
            detail=f"Experiencia con ID {purchase_data.experience_id} no encontrada o no disponible"
        )
    
    # Generar código único de voucher (con retry si colisiona)
    max_retries = 5
    voucher_code = None
    for _ in range(max_retries):
        code = generate_voucher_code(purchase_data.experience_id)
        existing = db.query(Purchase).filter(Purchase.voucher_code == code).first()
        if not existing:
            voucher_code = code
            break
    
    if not voucher_code:
        raise HTTPException(
            status_code=500,
            detail="Error al generar código de voucher único"
        )
    
    # Crear la compra
    purchase = Purchase(
        experience_id=purchase_data.experience_id,
        buyer_name=purchase_data.buyer_name,
        buyer_email=purchase_data.buyer_email,
        buyer_phone=purchase_data.buyer_phone,
        recipient_name=purchase_data.recipient_name,
        recipient_email=purchase_data.recipient_email,
        voucher_code=voucher_code,
        total_price=experience.price
    )
    
    db.add(purchase)
    db.flush()  # Para obtener el ID de purchase
    
    # Crear el voucher (válido hasta 31 de enero del año siguiente)
    current_year = datetime.now().year
    next_year = current_year + 1
    valid_until = datetime(next_year, 1, 31, 23, 59, 59)
    
    voucher = Voucher(
        purchase_id=purchase.id,
        code=voucher_code,
        is_redeemed=False,
        valid_until=valid_until
    )
    
    db.add(voucher)
    db.commit()
    db.refresh(purchase)
    
    return purchase


@router.get("/", response_model=list[PurchaseResponse])
async def get_purchases(db: Session = Depends(get_db)):
    """
    Lista todas las compras (para panel admin)
    """
    purchases = db.query(Purchase).order_by(Purchase.created_at.desc()).all()
    return purchases

