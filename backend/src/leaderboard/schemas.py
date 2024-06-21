from pydantic import BaseModel


class Leader(BaseModel):
    username: str
    lvl: int
    clicks: float
    active_skin: str
