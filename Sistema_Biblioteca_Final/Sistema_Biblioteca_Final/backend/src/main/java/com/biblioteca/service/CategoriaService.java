package com.biblioteca.service;

import com.biblioteca.dto.CategoriaRequest;
import com.biblioteca.dto.CategoriaResponse;
import com.biblioteca.model.Categoria;
import com.biblioteca.repository.CategoriaRepository;
import com.biblioteca.repository.LivroRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    private final LivroRepository livroRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, LivroRepository livroRepository) {
        this.categoriaRepository = categoriaRepository;
        this.livroRepository = livroRepository;
    }

    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream()
                .map(CategoriaResponse::from)
                .toList();
    }

    @Transactional
    public CategoriaResponse criar(CategoriaRequest request) {
        validarNomeUnico(request.nome());
        Categoria categoria = categoriaRepository.save(new Categoria(request.nome(), request.descricao()));
        return CategoriaResponse.from(categoria);
    }

    @Transactional
    public CategoriaResponse atualizar(Long id, CategoriaRequest request) {
        Categoria categoria = buscarCategoria(id);
        if (!categoria.getNome().equalsIgnoreCase(request.nome())) {
            validarNomeUnico(request.nome());
        }
        categoria.setNome(request.nome());
        categoria.setDescricao(request.descricao());
        return CategoriaResponse.from(categoria);
    }

    @Transactional
    public void excluir(Long id) {
        buscarCategoria(id);
        if (livroRepository.existsByCategoriaId(id)) {
            throw new IllegalArgumentException("Nao e possivel excluir uma categoria com livros cadastrados.");
        }
        categoriaRepository.deleteById(id);
    }

    public Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Categoria nao encontrada."));
    }

    private void validarNomeUnico(String nome) {
        if (categoriaRepository.existsByNomeIgnoreCase(nome)) {
            throw new IllegalArgumentException("Ja existe uma categoria com este nome.");
        }
    }
}
