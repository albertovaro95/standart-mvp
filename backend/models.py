from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    image_url = Column(String, nullable=True)
    includes = Column(String)  # JSON string o texto plano
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    purchases = relationship("Purchase", back_populates="experience")


class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"), nullable=False)
    buyer_name = Column(String, nullable=False)
    buyer_email = Column(String, nullable=False)
    buyer_phone = Column(String, nullable=False)
    recipient_name = Column(String, nullable=True)  # Si es regalo
    recipient_email = Column(String, nullable=True)
    voucher_code = Column(String, unique=True, nullable=False, index=True)
    total_price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    experience = relationship("Experience", back_populates="purchases")
    voucher = relationship("Voucher", back_populates="purchase", uselist=False)


class Voucher(Base):
    __tablename__ = "vouchers"

    id = Column(Integer, primary_key=True, index=True)
    purchase_id = Column(Integer, ForeignKey("purchases.id"), nullable=False, unique=True)
    code = Column(String, unique=True, nullable=False, index=True)
    is_redeemed = Column(Boolean, default=False)
    valid_until = Column(DateTime, nullable=False)  # Fecha de validez (ej: 31 de enero)
    created_at = Column(DateTime, default=datetime.utcnow)

    purchase = relationship("Purchase", back_populates="voucher")

