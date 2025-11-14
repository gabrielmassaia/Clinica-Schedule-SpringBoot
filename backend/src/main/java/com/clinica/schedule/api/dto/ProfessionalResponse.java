package com.clinica.schedule.api.dto;

public record ProfessionalResponse(
        Long id,
        String nome,
        String especialidade,
        String telefone,
        String email
) {
}
