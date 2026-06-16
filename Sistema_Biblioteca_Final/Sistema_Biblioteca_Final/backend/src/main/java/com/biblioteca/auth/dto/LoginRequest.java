package com.biblioteca.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @Email(message = "E-mail invalido.")
        @NotBlank(message = "O e-mail e obrigatorio.")
        String email,

        @NotBlank(message = "A senha e obrigatoria.")
        String senha) {
}
