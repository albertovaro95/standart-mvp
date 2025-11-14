from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# Experience Schemas
class ExperienceCreate(BaseModel):
    name: str
    description: str
    price: float
    image_url: Optional[str] = None
    includes: str
    is_active: bool = True


class ExperienceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    includes: Optional[str] = None
    is_active: Optional[bool] = None


class ExperienceResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image_url: Optional[str]
    includes: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Purchase Schemas
class PurchaseCreate(BaseModel):
    experience_id: int
    buyer_name: str
    buyer_email: EmailStr
    buyer_phone: str
    recipient_name: Optional[str] = None  # Si es regalo
    recipient_email: Optional[EmailStr] = None


class PurchaseResponse(BaseModel):
    id: int
    experience_id: int
    buyer_name: str
    buyer_email: str
    buyer_phone: str
    recipient_name: Optional[str]
    recipient_email: Optional[str]
    voucher_code: str
    total_price: float
    created_at: datetime

    class Config:
        from_attributes = True


# Voucher Schema
class VoucherResponse(BaseModel):
    id: int
    code: str
    is_redeemed: bool
    valid_until: datetime
    created_at: datetime

    class Config:
        from_attributes = True

