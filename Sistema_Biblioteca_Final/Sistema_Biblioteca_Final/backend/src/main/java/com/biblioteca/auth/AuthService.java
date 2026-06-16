package com.biblioteca.auth;

import com.biblioteca.auth.dto.AuthResponse;
import com.biblioteca.auth.dto.LoginRequest;
import com.biblioteca.auth.dto.RegisterRequest;
import com.biblioteca.auth.dto.UsuarioResponse;
import com.biblioteca.model.Role;
import com.biblioteca.model.Usuario;
import com.biblioteca.repository.UsuarioRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha()));

        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado."));
        return new AuthResponse(jwtService.gerarToken(usuario), UsuarioResponse.from(usuario));
    }

    @Transactional
    public AuthResponse registrar(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Ja existe um usuario cadastrado com este e-mail.");
        }

        Usuario usuario = new Usuario(
                request.nome(),
                request.email(),
                passwordEncoder.encode(request.senha()),
                Role.ROLE_USER);
        usuarioRepository.save(usuario);

        return new AuthResponse(jwtService.gerarToken(usuario), UsuarioResponse.from(usuario));
    }
}
