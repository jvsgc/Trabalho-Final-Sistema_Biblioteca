package com.biblioteca.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "emprestimos")
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id", nullable = false)
    private Livro livro;

    @Column(nullable = false, length = 140)
    private String leitor;

    @Column(nullable = false)
    private LocalDateTime dataEmprestimo = LocalDateTime.now();

    private LocalDateTime dataDevolucao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusEmprestimo status = StatusEmprestimo.ATIVO;

    protected Emprestimo() {
    }

    public Emprestimo(Livro livro, String leitor) {
        this.livro = livro;
        this.leitor = leitor;
    }

    public void devolver() {
        if (status == StatusEmprestimo.DEVOLVIDO) {
            throw new IllegalArgumentException("Este emprestimo ja foi devolvido.");
        }
        status = StatusEmprestimo.DEVOLVIDO;
        dataDevolucao = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Livro getLivro() {
        return livro;
    }

    public String getLeitor() {
        return leitor;
    }

    public LocalDateTime getDataEmprestimo() {
        return dataEmprestimo;
    }

    public LocalDateTime getDataDevolucao() {
        return dataDevolucao;
    }

    public StatusEmprestimo getStatus() {
        return status;
    }
}
