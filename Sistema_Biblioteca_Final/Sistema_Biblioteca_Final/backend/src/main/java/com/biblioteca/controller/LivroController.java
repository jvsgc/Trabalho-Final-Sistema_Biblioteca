package com.biblioteca.controller;

import com.biblioteca.dto.LivroRequest;
import com.biblioteca.dto.LivroResponse;
import com.biblioteca.service.LivroService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/livros")
public class LivroController {
    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @GetMapping
    public List<LivroResponse> listar(@RequestParam(required = false) String termo) {
        return livroService.listar(termo);
    }

    @GetMapping("/{id}")
    public LivroResponse buscar(@PathVariable Long id) {
        return livroService.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public LivroResponse criar(@RequestBody @Valid LivroRequest request) {
        return livroService.criar(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public LivroResponse atualizar(@PathVariable Long id, @RequestBody @Valid LivroRequest request) {
        return livroService.atualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void excluir(@PathVariable Long id) {
        livroService.excluir(id);
    }
}
