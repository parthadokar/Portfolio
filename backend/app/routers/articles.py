from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from app.database import get_db
from app.models import Article, ArticleTag
from app.schemas import ArticleRequest, ArticleResponse
from app.auth import validate_token

router = APIRouter(prefix="/api/articles", tags=["articles"])
security = HTTPBearer(auto_error=False)


def require_auth(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if not credentials or not validate_token(credentials.credentials):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


def to_response(article: Article) -> ArticleResponse:
    return ArticleResponse(
        id=article.id,
        title=article.title,
        content=article.content,
        author=article.author,
        publishedDate=article.published_date,
        tags=[t.tag for t in article.tags],
        createdAt=article.created_at,
        updatedAt=article.updated_at,
    )


@router.get("", response_model=List[ArticleResponse])
def get_all(
    publishedAfter: Optional[datetime] = Query(None),
    publishedBefore: Optional[datetime] = Query(None),
    tags: Optional[List[str]] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Article)
    if publishedAfter:
        query = query.filter(Article.published_date >= publishedAfter)
    if publishedBefore:
        query = query.filter(Article.published_date <= publishedBefore)
    if tags:
        query = query.join(Article.tags).filter(ArticleTag.tag.in_(tags)).distinct()
    return [to_response(a) for a in query.all()]


@router.get("/{article_id}", response_model=ArticleResponse)
def get_by_id(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail=f"Article not found with id: {article_id}")
    return to_response(article)


@router.post("", response_model=ArticleResponse, status_code=201)
def create(request: ArticleRequest, db: Session = Depends(get_db), _=Depends(require_auth)):
    article = Article(
        title=request.title,
        content=request.content,
        author=request.author,
        published_date=request.publishedDate,
        tags=[ArticleTag(tag=t) for t in (request.tags or [])],
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return to_response(article)


@router.put("/{article_id}", response_model=ArticleResponse)
def update(article_id: int, request: ArticleRequest, db: Session = Depends(get_db), _=Depends(require_auth)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail=f"Article not found with id: {article_id}")
    article.title = request.title
    article.content = request.content
    article.author = request.author
    article.published_date = request.publishedDate
    article.tags = [ArticleTag(article_id=article_id, tag=t) for t in (request.tags or [])]
    db.commit()
    db.refresh(article)
    return to_response(article)


@router.delete("/{article_id}", status_code=204)
def delete(article_id: int, db: Session = Depends(get_db), _=Depends(require_auth)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail=f"Article not found with id: {article_id}")
    db.delete(article)
    db.commit()
