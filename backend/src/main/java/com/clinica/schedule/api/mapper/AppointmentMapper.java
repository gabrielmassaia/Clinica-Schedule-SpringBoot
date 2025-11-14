package com.clinica.schedule.api.mapper;

import com.clinica.schedule.api.dto.AppointmentRequest;
import com.clinica.schedule.api.dto.AppointmentResponse;
import com.clinica.schedule.domain.model.Appointment;
import com.clinica.schedule.domain.model.Client;
import com.clinica.schedule.domain.model.Professional;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public Appointment toEntity(AppointmentRequest request, Client client, Professional professional) {
        Appointment appointment = new Appointment();
        appointment.setCliente(client);
        appointment.setProfissional(professional);
        appointment.setDataHora(request.dataHora());
        appointment.setProcedimento(request.procedimento());
        appointment.setStatus(request.status());
        return appointment;
    }

    public void updateEntity(AppointmentRequest request, Appointment appointment, Client client, Professional professional) {
        appointment.setCliente(client);
        appointment.setProfissional(professional);
        appointment.setDataHora(request.dataHora());
        appointment.setProcedimento(request.procedimento());
        appointment.setStatus(request.status());
    }

    public AppointmentResponse toResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getCliente().getId(),
                appointment.getCliente().getNome(),
                appointment.getProfissional().getId(),
                appointment.getProfissional().getNome(),
                appointment.getDataHora(),
                appointment.getProcedimento(),
                appointment.getStatus()
        );
    }
}
