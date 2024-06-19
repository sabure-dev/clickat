import datetime
from typing import Annotated, List
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base
from shop import models


created_at = Annotated[datetime.datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    hashed_password: Mapped[str]
    lvl: Mapped[int]
    clicks: Mapped[float]
    required_clicks: Mapped[int]
    active_skin: Mapped[str] = mapped_column(ForeignKey(models.Skin.name))
    skins: Mapped[str]
    enter_time: Mapped[str | None]
    created_at: Mapped[created_at]
