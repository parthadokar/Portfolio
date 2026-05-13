package com.example.blog.service;

import com.example.blog.dto.ArticleRequest;
import com.example.blog.dto.ArticleResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ArticleService {
    List<ArticleResponse> findAll(LocalDateTime publishedAfter, LocalDateTime publishedBefore, List<String> tags);
    ArticleResponse findById(Long id);
    ArticleResponse create(ArticleRequest request);
    ArticleResponse update(Long id, ArticleRequest request);
    void delete(Long id);
}
