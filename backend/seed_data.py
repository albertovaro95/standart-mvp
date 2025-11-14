"""
Script para crear datos de ejemplo (opcional, para demo)
Ejecutar: python seed_data.py
"""
from database import SessionLocal
from models import Experience

def seed_experiences():
    db = SessionLocal()
    try:
        # Verificar si ya hay experiencias
        existing = db.query(Experience).first()
        if existing:
            print("Ya existen experiencias en la base de datos. Saltando seed.")
            return

        experiences = [
            Experience(
                name="Cena Navideña Premium",
                description="Una experiencia gastronómica única con menú de 5 platos especialmente diseñado para Navidad. Incluye maridaje de vinos y ambiente festivo.",
                price=150.00,
                image_url=None,
                includes="Menú de 5 platos, maridaje de vinos, decoración temática navideña, música en vivo, postre especial",
                is_active=True
            ),
            Experience(
                name="Brunch Navideño Familiar",
                description="Perfecto para toda la familia. Disfruta de un brunch especial con platos tradicionales navideños y actividades para niños.",
                price=45.00,
                image_url=None,
                includes="Brunch completo, actividades para niños, decoración navideña, bebidas incluidas",
                is_active=True
            ),
            Experience(
                name="Cena Romántica de Nochebuena",
                description="Una velada íntima y especial para parejas. Menú degustación con ambiente romántico y decoración exclusiva.",
                price=120.00,
                image_url=None,
                includes="Menú degustación de 6 platos, champán de bienvenida, decoración romántica, música ambiente",
                is_active=True
            ),
        ]

        for exp in experiences:
            db.add(exp)
        
        db.commit()
        print(f"✓ Creadas {len(experiences)} experiencias de ejemplo")
    except Exception as e:
        print(f"Error al crear datos de ejemplo: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_experiences()

