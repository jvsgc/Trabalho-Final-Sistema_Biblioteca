package com.biblioteca.config;

import com.biblioteca.model.Categoria;
import com.biblioteca.model.Emprestimo;
import com.biblioteca.model.Livro;
import com.biblioteca.model.Role;
import com.biblioteca.model.Usuario;
import com.biblioteca.repository.CategoriaRepository;
import com.biblioteca.repository.EmprestimoRepository;
import com.biblioteca.repository.LivroRepository;
import com.biblioteca.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner popularBancoInicial(
            UsuarioRepository usuarioRepository,
            CategoriaRepository categoriaRepository,
            LivroRepository livroRepository,
            EmprestimoRepository emprestimoRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            if (usuarioRepository.count() == 0) {
                usuarioRepository.save(new Usuario(
                        "Administrador",
                        "admin@biblioteca.com",
                        passwordEncoder.encode("admin123"),
                        Role.ROLE_ADMIN));
                usuarioRepository.save(new Usuario(
                        "Bibliotecario",
                        "user@biblioteca.com",
                        passwordEncoder.encode("user123"),
                        Role.ROLE_USER));
            }

            if (categoriaRepository.count() == 0) {
                Categoria literatura = categoriaRepository.save(new Categoria("Literatura", "Romances e classicos"));
                Categoria fantasia = categoriaRepository.save(new Categoria("Fantasia", "Obras de fantasia e aventura"));
                Categoria tecnologia = categoriaRepository.save(new Categoria("Tecnologia", "Livros tecnicos e computacao"));

                livroRepository.save(new Livro("Dom Casmurro", "Machado de Assis", "9788535910663",
                        "Companhia das Letras", 1899, 4, literatura));
                livroRepository.save(new Livro("1984", "George Orwell", "9788535914849",
                        "Companhia das Letras", 1949, 3, literatura));
                Livro hobbit = livroRepository.save(new Livro("O Hobbit", "J. R. R. Tolkien", "9788595084742",
                        "HarperCollins", 1937, 5, fantasia));
                livroRepository.save(new Livro("Clean Code", "Robert C. Martin", "9780132350884",
                        "Prentice Hall", 2008, 2, tecnologia));

                hobbit.emprestar();
                emprestimoRepository.save(new Emprestimo(hobbit, "Ana Souza"));
                livroRepository.save(hobbit);
            }
        };
    }
}
