package com.biblioteca.controller;

import com.biblioteca.dto.EmprestimoRequest;
import com.biblioteca.dto.EmprestimoResponse;
import com.biblioteca.service.EmprestimoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {
    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @GetMapping
    public List<EmprestimoResponse> listar() {
        return emprestimoService.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmprestimoResponse emprestar(@RequestBody @Valid EmprestimoRequest request) {
        return emprestimoService.emprestar(request);
    }

    @PatchMapping("/{id}/devolver")
    public EmprestimoResponse devolver(@PathVariable Long id) {
        return emprestimoService.devolver(id);
    }
}
