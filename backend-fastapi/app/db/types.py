from sqlalchemy import JSON
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.types import TypeDecorator

# Portable JSON list type: uses JSONB on PostgreSQL and JSON elsewhere (SQLite).
# Mirrors Laravel's `$casts = ['field' => 'array']` behaviour.
JSONList = JSON().with_variant(JSONB, "postgresql")


class JSONListNullSafe(TypeDecorator):
    """JSON list that coerces NULL to an empty list when read."""

    impl = JSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(JSONB())
        return dialect.type_descriptor(JSON())

    def process_result_value(self, value, dialect):
        return value if value is not None else []
