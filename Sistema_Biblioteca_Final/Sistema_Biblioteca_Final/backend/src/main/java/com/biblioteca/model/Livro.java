package com.biblioteca.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "livros")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 180)
    private String titulo;

    @Column(nullable = false, length = 140)
    private String autor;

    @Column(unique = true, length = 30)
    private String isbn;

    @Column(length = 120)
    private String editora;

    private Integer anoPublicacao;

    @Column(nullable = false)
    private int quantidadeTotal;

    @Column(nullable = false)
    private int quantidadeDisponivel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    protected Livro() {
    }

    public Livro(String titulo, String autor, String isbn, String editora, Integer anoPublicacao,
            int quantidadeTotal, Categoria categoria) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.quantidadeTotal = quantidadeTotal;
        this.quantidadeDisponivel = quantidadeTotal;
        this.categoria = categoria;
    }

    public void emprestar() {
        if (quantidadeDisponivel <= 0) {
            throw new IllegalArgumentException("Livro sem exemplares disponiveis para emprestimo.");
        }
        quantidadeDisponivel--;
    }

    public void devolver() {
        if (quantidadeDisponivel < quantidadeTotal) {
            quantidadeDisponivel++;
        }
    }

    public void atualizarQuantidadeTotal(int novaQuantidadeTotal) {
        int emprestados = quantidadeTotal - quantidadeDisponivel;
        if (novaQuantidadeTotal < emprestados) {
            throw new IllegalArgumentException("A quantidade total nao pode ser menor que os exemplares emprestados.");
        }
        quantidadeTotal = novaQuantidadeTotal;
        quantidadeDisponivel = novaQuantidadeTotal - emprestados;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getEditora() {
        return editora;
    }

    public void setEditora(String editora) {
        this.editora = editora;
    }

    public Integer getAnoPublicacao() {
        return anoPublicacao;
    }

    public void setAnoPublicacao(Integer anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public int getQuantidadeTotal() {
        return quantidadeTotal;
    }

    public int getQuantidadeDisponivel() {
        return quantidadeDisponivel;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
