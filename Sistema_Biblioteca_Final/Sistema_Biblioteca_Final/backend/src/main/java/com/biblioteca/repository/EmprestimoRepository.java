package com.biblioteca.repository;

import com.biblioteca.model.Emprestimo;
import com.biblioteca.model.StatusEmprestimo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findAllByOrderByDataEmprestimoDesc();

    long countByStatus(StatusEmprestimo status);

    boolean existsByLivroIdAndStatus(Long livroId, StatusEmprestimo status);

    boolean existsByLivroId(Long livroId);
}
