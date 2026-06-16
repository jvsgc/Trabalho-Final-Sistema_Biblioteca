package com.biblioteca.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "O nome e obrigatorio.")
        @Size(max = 120, message = "O nome deve ter no maximo 120 caracteres.")
        String nome,

        @Email(message = "E-mail invalido.")
        @NotBlank(message = "O e-mail e obrigatorio.")
        String email,

        @Size(min = 6, message = "A senha deve ter ao menos 6 caracteres.")
        @NotBlank(message = "A senha e obrigatoria.")
        String senha) {
}
