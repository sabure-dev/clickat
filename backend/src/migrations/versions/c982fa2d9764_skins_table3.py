"""skins_table3

Revision ID: c982fa2d9764
Revises: 5d9754b0d760
Create Date: 2024-06-15 23:37:36.372989

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c982fa2d9764'
down_revision: Union[str, None] = '5d9754b0d760'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('active_skin', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'user', 'skin', ['active_skin'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'active_skin')
    # ### end Alembic commands ###
