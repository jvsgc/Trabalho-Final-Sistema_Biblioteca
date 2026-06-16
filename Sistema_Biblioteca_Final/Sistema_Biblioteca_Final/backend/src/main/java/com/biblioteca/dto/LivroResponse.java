package com.biblioteca.dto;

import com.biblioteca.model.Livro;

public record LivroResponse(
        Long id,
        String titulo,
        String autor,
        String isbn,
        String editora,
        Integer anoPublicacao,
        int quantidadeTotal,
        int quantidadeDisponivel,
        Long categoriaId,
        String categoriaNome) {

    public static LivroResponse from(Livro livro) {
        return new LivroResponse(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getIsbn(),
                livro.getEditora(),
                livro.getAnoPublicacao(),
                livro.getQuantidadeTotal(),
                livro.getQuantidadeDisponivel(),
                livro.getCategoria().getId(),
                livro.getCategoria().getNome());
    }
}
