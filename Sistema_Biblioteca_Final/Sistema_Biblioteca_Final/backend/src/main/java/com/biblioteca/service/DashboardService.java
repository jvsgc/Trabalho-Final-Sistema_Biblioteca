package com.biblioteca.service;

import com.biblioteca.dto.DashboardResponse;
import com.biblioteca.model.Livro;
import com.biblioteca.model.StatusEmprestimo;
import com.biblioteca.repository.CategoriaRepository;
import com.biblioteca.repository.EmprestimoRepository;
import com.biblioteca.repository.LivroRepository;
import com.biblioteca.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;
    private final EmprestimoRepository emprestimoRepository;
    private final UsuarioRepository usuarioRepository;

    public DashboardService(LivroRepository livroRepository, CategoriaRepository categoriaRepository,
            EmprestimoRepository emprestimoRepository, UsuarioRepository usuarioRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
        this.emprestimoRepository = emprestimoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public DashboardResponse carregar() {
        long totalExemplares = livroRepository.findAll().stream().mapToLong(Livro::getQuantidadeTotal).sum();
        long exemplaresDisponiveis = livroRepository.findAll().stream().mapToLong(Livro::getQuantidadeDisponivel).sum();

        return new DashboardResponse(
                livroRepository.count(),
                totalExemplares,
                exemplaresDisponiveis,
                emprestimoRepository.countByStatus(StatusEmprestimo.ATIVO),
                categoriaRepository.count(),
                usuarioRepository.count());
    }
}
