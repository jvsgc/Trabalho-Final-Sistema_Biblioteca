package com.biblioteca.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record LivroRequest(
        @NotBlank(message = "O titulo e obrigatorio.")
        @Size(max = 180, message = "O titulo deve ter no maximo 180 caracteres.")
        String titulo,

        @NotBlank(message = "O autor e obrigatorio.")
        @Size(max = 140, message = "O autor deve ter no maximo 140 caracteres.")
        String autor,

        @Size(max = 30, message = "O ISBN deve ter no maximo 30 caracteres.")
        String isbn,

        @Size(max = 120, message = "A editora deve ter no maximo 120 caracteres.")
        String editora,

        @Min(value = 1450, message = "Ano de publicacao invalido.")
        @Max(value = 2100, message = "Ano de publicacao invalido.")
        Integer anoPublicacao,

        @NotNull(message = "Informe a quantidade total.")
        @Min(value = 1, message = "A quantidade deve ser maior que zero.")
        Integer quantidadeTotal,

        @NotNull(message = "A categoria e obrigatoria.")
        Long categoriaId) {
}
