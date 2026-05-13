package com.example.blog.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleRequest(
        @NotBlank String title,
        @NotBlank String content,
        String author,
        LocalDateTime publishedDate,
        List<String> tags
) {}
