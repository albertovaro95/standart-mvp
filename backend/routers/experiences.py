from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Experience
from schemas import ExperienceCreate, ExperienceResponse, ExperienceUpdate

router = APIRouter()


@router.get("/", response_model=list[ExperienceResponse])
async def get_experiences(db: Session = Depends(get_db)):
    """
    Lista todas las experiencias activas
    """
    experiences = db.query(Experience).filter(Experience.is_active == True).all()
    return experiences


@router.get("/{experience_id}", response_model=ExperienceResponse)
async def get_experience(experience_id: int, db: Session = Depends(get_db)):
    """
    Obtiene una experiencia por ID
    """
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experiencia no encontrada")
    return experience


@router.post("/", response_model=ExperienceResponse)
async def create_experience(experience_data: ExperienceCreate, db: Session = Depends(get_db)):
    """
    Crea una nueva experiencia (admin)
    """
    experience = Experience(**experience_data.model_dump())
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience

