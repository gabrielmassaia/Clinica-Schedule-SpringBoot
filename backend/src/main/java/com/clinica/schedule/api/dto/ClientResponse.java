package com.clinica.schedule.api.dto;

public record ClientResponse(
        Long id,
        String nome,
        String cpf,
        String telefone,
        String email
) {
}
