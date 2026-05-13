package com.example.blog.repository;

import com.example.blog.model.Article;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public class ArticleSpecification {

    private ArticleSpecification() {}

    public static Specification<Article> publishedAfter(LocalDateTime date) {
        return (root, query, cb) ->
                date == null ? null : cb.greaterThanOrEqualTo(root.get("publishedDate"), date);
    }

    public static Specification<Article> publishedBefore(LocalDateTime date) {
        return (root, query, cb) ->
                date == null ? null : cb.lessThanOrEqualTo(root.get("publishedDate"), date);
    }

    public static Specification<Article> hasTags(List<String> tags) {
        return (root, query, cb) -> {
            if (tags == null || tags.isEmpty()) return null;
            query.distinct(true);
            Expression<Collection<String>> articleTags = root.get("tags");
            Predicate[] predicates = tags.stream()
                    .map(tag -> cb.isMember(tag, articleTags))
                    .toArray(Predicate[]::new);
            return cb.or(predicates);
        };
    }
}
