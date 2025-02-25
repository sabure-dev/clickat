"""required_lvl_add

Revision ID: 44ee86c749e6
Revises: c707bbad4819
Create Date: 2024-06-15 21:43:17.051738

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '44ee86c749e6'
down_revision: Union[str, None] = 'c707bbad4819'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('required_lvl', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'required_lvl')
    # ### end Alembic commands ###
