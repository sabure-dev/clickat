"""Challenge

Revision ID: 2d835952e20d
Revises: 922ca4c0bf06
Create Date: 2024-06-22 19:39:10.029665

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2d835952e20d'
down_revision: Union[str, None] = '922ca4c0bf06'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'challenge', ['name'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'challenge', type_='unique')
    # ### end Alembic commands ###
