"""Central import of all ORM models so Alembic autogenerate and
``Base.metadata.create_all`` can discover them.

Import new models here as modules are added in later phases.
"""

from app.modules.auth.models import User  # noqa: F401
from app.modules.blog.models import Blog  # noqa: F401
from app.modules.contact_lead.models import ContactLead  # noqa: F401
from app.modules.project.models import Project  # noqa: F401
from app.modules.service.models import Service  # noqa: F401
from app.modules.subscriber.models import Subscriber  # noqa: F401
from app.modules.team_member.models import TeamMember  # noqa: F401

__all__ = ["User", "Blog", "ContactLead", "Project", "Service", "Subscriber", "TeamMember"]
