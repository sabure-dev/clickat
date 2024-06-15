from pydantic import BaseModel


class UserClicks(BaseModel):
    clicks: int


class UserLvl(BaseModel):
    lvl: int
    required_clicks: int
