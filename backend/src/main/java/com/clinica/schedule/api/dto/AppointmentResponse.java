package com.clinica.schedule.api.dto;

import com.clinica.schedule.domain.model.AppointmentStatus;

import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        Long clienteId,
        String clienteNome,
        Long profissionalId,
        String profissionalNome,
        LocalDateTime dataHora,
        String procedimento,
        AppointmentStatus status
) {
}
