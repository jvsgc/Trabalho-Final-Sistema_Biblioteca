package com.biblioteca.dto;

import com.biblioteca.model.Emprestimo;
import com.biblioteca.model.StatusEmprestimo;
import java.time.LocalDateTime;

public record EmprestimoResponse(
        Long id,
        Long livroId,
        String livroTitulo,
        String leitor,
        LocalDateTime dataEmprestimo,
        LocalDateTime dataDevolucao,
        StatusEmprestimo status) {

    public static EmprestimoResponse from(Emprestimo emprestimo) {
        return new EmprestimoResponse(
                emprestimo.getId(),
                emprestimo.getLivro().getId(),
                emprestimo.getLivro().getTitulo(),
                emprestimo.getLeitor(),
                emprestimo.getDataEmprestimo(),
                emprestimo.getDataDevolucao(),
                emprestimo.getStatus());
    }
}
