package com.example.blog.controller;

import com.example.blog.dto.ArticleRequest;
import com.example.blog.dto.ArticleResponse;
import com.example.blog.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> getAll(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime publishedAfter,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime publishedBefore,
            @RequestParam(required = false) List<String> tags
    ) {
        return ResponseEntity.ok(articleService.findAll(publishedAfter, publishedBefore, tags));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ArticleResponse> create(@Valid @RequestBody ArticleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(articleService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ArticleRequest request
    ) {
        return ResponseEntity.ok(articleService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
