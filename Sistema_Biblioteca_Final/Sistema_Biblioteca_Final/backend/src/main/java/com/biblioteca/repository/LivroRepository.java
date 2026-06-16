package com.biblioteca.repository;

import com.biblioteca.model.Livro;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(String titulo, String autor);

    Optional<Livro> findByIsbn(String isbn);

    boolean existsByIsbnAndIdNot(String isbn, Long id);

    boolean existsByCategoriaId(Long categoriaId);
}
