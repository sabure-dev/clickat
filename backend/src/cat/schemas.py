from pydantic import BaseModel


class UserData(BaseModel):
    clicks: int
    lvl: int
