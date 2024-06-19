from pydantic import BaseModel


class UserClicks(BaseModel):
    clicks: float


class UserLvl(BaseModel):
    lvl: int
    required_clicks: int
