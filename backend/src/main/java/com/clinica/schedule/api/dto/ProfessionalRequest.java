package com.clinica.schedule.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ProfessionalRequest(
        @NotBlank(message = "Nome é obrigatório")
        String nome,
        @NotBlank(message = "Especialidade é obrigatória")
        String especialidade,
        @NotBlank(message = "Telefone é obrigatório")
        String telefone,
        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email
) {
}
