import datetime
from typing import Annotated

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


created_at = Annotated[datetime.datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    hashed_password: Mapped[str]
    lvl: Mapped[int]
    clicks: Mapped[int]
    required_clicks: Mapped[int]
    # skins: Mapped[list["shop.models.Skin.name"]] = relationship(
    #     back_populates="owner"
    # )
    created_at: Mapped[created_at]
