package com.biblioteca.dto;

public record DashboardResponse(
        long totalLivros,
        long totalExemplares,
        long exemplaresDisponiveis,
        long emprestimosAtivos,
        long totalCategorias,
        long totalUsuarios) {
}
