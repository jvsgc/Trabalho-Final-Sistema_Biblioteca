package com.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EmprestimoRequest(
        @NotNull(message = "Selecione um livro.")
        Long livroId,

        @NotBlank(message = "Informe o nome do leitor.")
        @Size(max = 140, message = "O nome do leitor deve ter no maximo 140 caracteres.")
        String leitor) {
}
