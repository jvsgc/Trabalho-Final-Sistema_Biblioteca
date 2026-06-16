package com.biblioteca.auth.dto;

import com.biblioteca.model.Role;
import com.biblioteca.model.Usuario;

public record UsuarioResponse(Long id, String nome, String email, Role role) {
    public static UsuarioResponse from(Usuario usuario) {
        return new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getRole());
    }
}
