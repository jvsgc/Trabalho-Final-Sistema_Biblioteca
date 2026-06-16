package com.biblioteca.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ApiError(LocalDateTime timestamp, int status, String mensagem, List<String> detalhes) {
    public static ApiError of(int status, String mensagem, List<String> detalhes) {
        return new ApiError(LocalDateTime.now(), status, mensagem, detalhes);
    }
}
