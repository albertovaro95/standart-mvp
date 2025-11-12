from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Por ahora sin base de datos, se puede agregar después
Base = declarative_base()
