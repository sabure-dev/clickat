from typing import Annotated

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class Skin(Base):
    __tablename__ = "skin"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    price: Mapped[int]
