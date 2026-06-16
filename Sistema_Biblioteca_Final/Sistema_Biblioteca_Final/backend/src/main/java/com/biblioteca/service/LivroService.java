package com.biblioteca.service;

import com.biblioteca.dto.LivroRequest;
import com.biblioteca.dto.LivroResponse;
import com.biblioteca.model.Categoria;
import com.biblioteca.model.Livro;
import com.biblioteca.model.StatusEmprestimo;
import com.biblioteca.repository.EmprestimoRepository;
import com.biblioteca.repository.LivroRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LivroService {
    private final LivroRepository livroRepository;
    private final CategoriaService categoriaService;
    private final EmprestimoRepository emprestimoRepository;

    public LivroService(LivroRepository livroRepository, CategoriaService categoriaService,
            EmprestimoRepository emprestimoRepository) {
        this.livroRepository = livroRepository;
        this.categoriaService = categoriaService;
        this.emprestimoRepository = emprestimoRepository;
    }

    @Transactional(readOnly = true)
    public List<LivroResponse> listar(String termo) {
        List<Livro> livros = (termo == null || termo.isBlank())
                ? livroRepository.findAll()
                : livroRepository.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(termo, termo);

        return livros.stream().map(LivroResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public LivroResponse buscar(Long id) {
        return LivroResponse.from(buscarLivro(id));
    }

    @Transactional
    public LivroResponse criar(LivroRequest request) {
        validarIsbnUnico(request.isbn(), null);
        Categoria categoria = categoriaService.buscarCategoria(request.categoriaId());
        Livro livro = new Livro(
                request.titulo(),
                request.autor(),
                normalizarTextoOpcional(request.isbn()),
                request.editora(),
                request.anoPublicacao(),
                request.quantidadeTotal(),
                categoria);
        return LivroResponse.from(livroRepository.save(livro));
    }

    @Transactional
    public LivroResponse atualizar(Long id, LivroRequest request) {
        Livro livro = buscarLivro(id);
        validarIsbnUnico(request.isbn(), id);
        Categoria categoria = categoriaService.buscarCategoria(request.categoriaId());

        livro.setTitulo(request.titulo());
        livro.setAutor(request.autor());
        livro.setIsbn(normalizarTextoOpcional(request.isbn()));
        livro.setEditora(request.editora());
        livro.setAnoPublicacao(request.anoPublicacao());
        livro.setCategoria(categoria);
        livro.atualizarQuantidadeTotal(request.quantidadeTotal());

        return LivroResponse.from(livro);
    }

    @Transactional
    public void excluir(Long id) {
        Livro livro = buscarLivro(id);
        if (emprestimoRepository.existsByLivroIdAndStatus(id, StatusEmprestimo.ATIVO)) {
            throw new IllegalArgumentException("Nao e possivel excluir um livro com emprestimo ativo.");
        }
        if (emprestimoRepository.existsByLivroId(id)) {
            throw new IllegalArgumentException("Nao e possivel excluir um livro que possui historico de emprestimos.");
        }
        livroRepository.delete(livro);
    }

    public Livro buscarLivro(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Livro nao encontrado."));
    }

    private void validarIsbnUnico(String isbn, Long idAtual) {
        String isbnNormalizado = normalizarTextoOpcional(isbn);
        if (isbnNormalizado == null) {
            return;
        }
        boolean existe = idAtual == null
                ? livroRepository.findByIsbn(isbnNormalizado).isPresent()
                : livroRepository.existsByIsbnAndIdNot(isbnNormalizado, idAtual);
        if (existe) {
            throw new IllegalArgumentException("Ja existe um livro cadastrado com este ISBN.");
        }
    }

    private String normalizarTextoOpcional(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }
}
