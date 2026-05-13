package com.example.blog.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleResponse(
        Long id,
        String title,
        String content,
        String author,
        LocalDateTime publishedDate,
        List<String> tags,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
