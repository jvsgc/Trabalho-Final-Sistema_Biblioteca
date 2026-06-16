package com.biblioteca.service;

import com.biblioteca.dto.EmprestimoRequest;
import com.biblioteca.dto.EmprestimoResponse;
import com.biblioteca.model.Emprestimo;
import com.biblioteca.model.Livro;
import com.biblioteca.model.StatusEmprestimo;
import com.biblioteca.repository.EmprestimoRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmprestimoService {
    private final EmprestimoRepository emprestimoRepository;
    private final LivroService livroService;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroService livroService) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroService = livroService;
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponse> listar() {
        return emprestimoRepository.findAllByOrderByDataEmprestimoDesc().stream()
                .map(EmprestimoResponse::from)
                .toList();
    }

    @Transactional
    public EmprestimoResponse emprestar(EmprestimoRequest request) {
        Livro livro = livroService.buscarLivro(request.livroId());
        livro.emprestar();
        Emprestimo emprestimo = emprestimoRepository.save(new Emprestimo(livro, request.leitor()));
        return EmprestimoResponse.from(emprestimo);
    }

    @Transactional
    public EmprestimoResponse devolver(Long id) {
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Emprestimo nao encontrado."));
        if (emprestimo.getStatus() == StatusEmprestimo.DEVOLVIDO) {
            throw new IllegalArgumentException("Este emprestimo ja foi devolvido.");
        }
        emprestimo.getLivro().devolver();
        emprestimo.devolver();
        return EmprestimoResponse.from(emprestimo);
    }
}
