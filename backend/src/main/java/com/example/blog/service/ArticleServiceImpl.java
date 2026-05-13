package com.example.blog.service;

import com.example.blog.dto.ArticleRequest;
import com.example.blog.dto.ArticleResponse;
import com.example.blog.exception.ArticleNotFoundException;
import com.example.blog.model.Article;
import com.example.blog.repository.ArticleRepository;
import com.example.blog.repository.ArticleSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArticleResponse> findAll(LocalDateTime publishedAfter, LocalDateTime publishedBefore, List<String> tags) {
        Specification<Article> spec = Specification
                .where(ArticleSpecification.publishedAfter(publishedAfter))
                .and(ArticleSpecification.publishedBefore(publishedBefore))
                .and(ArticleSpecification.hasTags(tags));
        return articleRepository.findAll(spec).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ArticleResponse findById(Long id) {
        return articleRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new ArticleNotFoundException(id));
    }

    @Override
    public ArticleResponse create(ArticleRequest request) {
        Article article = new Article();
        article.setTitle(request.title());
        article.setContent(request.content());
        article.setAuthor(request.author());
        article.setPublishedDate(request.publishedDate());
        article.setTags(request.tags() != null ? new ArrayList<>(request.tags()) : new ArrayList<>());
        return toResponse(articleRepository.save(article));
    }

    @Override
    public ArticleResponse update(Long id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
        article.setTitle(request.title());
        article.setContent(request.content());
        article.setAuthor(request.author());
        article.setPublishedDate(request.publishedDate());
        article.setTags(request.tags() != null ? new ArrayList<>(request.tags()) : new ArrayList<>());
        return toResponse(articleRepository.save(article));
    }

    @Override
    public void delete(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new ArticleNotFoundException(id);
        }
        articleRepository.deleteById(id);
    }

    private ArticleResponse toResponse(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getAuthor(),
                article.getPublishedDate(),
                article.getTags(),
                article.getCreatedAt(),
                article.getUpdatedAt()
        );
    }
}
