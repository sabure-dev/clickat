from pydantic import BaseModel


class UserClicks(BaseModel):
    clicks: int


class UserLvl(BaseModel):
    lvl: int
