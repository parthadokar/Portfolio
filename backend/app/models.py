from sqlalchemy import Column, BigInteger, String, Text, DateTime, ForeignKey, event
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .database import Base


class ArticleTag(Base):
    __tablename__ = "article_tags"
    article_id = Column(BigInteger, ForeignKey("article.id", ondelete="CASCADE"), primary_key=True)
    tag = Column(String, primary_key=True)


class Article(Base):
    __tablename__ = "article"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String)
    published_date = Column(DateTime)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    tags = relationship("ArticleTag", cascade="all, delete-orphan", lazy="joined")


@event.listens_for(Article, "before_update")
def update_timestamp(mapper, connection, target):
    target.updated_at = datetime.now(timezone.utc)
