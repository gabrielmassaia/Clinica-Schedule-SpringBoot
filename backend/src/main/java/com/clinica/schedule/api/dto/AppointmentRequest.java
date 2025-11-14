package com.clinica.schedule.api.dto;

import com.clinica.schedule.domain.model.AppointmentStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record AppointmentRequest(
        @NotNull(message = "Cliente é obrigatório")
        Long clienteId,
        @NotNull(message = "Profissional é obrigatório")
        Long profissionalId,
        @NotNull(message = "Data e hora são obrigatórias")
        @FutureOrPresent(message = "A data do agendamento deve ser futura ou presente")
        LocalDateTime dataHora,
        @NotBlank(message = "Procedimento é obrigatório")
        String procedimento,
        @NotNull(message = "Status é obrigatório")
        AppointmentStatus status
) {
}
