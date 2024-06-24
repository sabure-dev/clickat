"""qweeeeeeeeeee

Revision ID: b111b63f84ba
Revises: 9e6c36391aea
Create Date: 2024-06-22 23:04:06.417438

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b111b63f84ba'
down_revision: Union[str, None] = '9e6c36391aea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('challenge', 'reward')
    op.drop_column('challenge', 'target')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('challenge', sa.Column('target', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('challenge', sa.Column('reward', sa.VARCHAR(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
