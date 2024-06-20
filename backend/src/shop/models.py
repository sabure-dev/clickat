from typing import Annotated

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base
from auth import models


class Skin(Base):
    __tablename__ = "skin"

    name: Mapped[str] = mapped_column(primary_key=True, unique=True)
    price: Mapped[int]
    image: Mapped[str]

    owners: Mapped[list["models.User"]] = relationship(
        back_populates="skins",
        secondary="userskins",
    )
