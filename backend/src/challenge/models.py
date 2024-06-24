from typing import Annotated
from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base
from auth import models


class Challenge(Base):
    __tablename__ = "challenge"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    target: Mapped[int]
    reward: Mapped[int]
    active: Mapped[bool] = mapped_column(server_default="False")

    def __repr__(self):
        return str({'id': self.id, 'name': self.name, 'target': self.target, 'reward': self.reward})
