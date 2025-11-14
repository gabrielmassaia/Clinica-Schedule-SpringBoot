package com.clinica.schedule.api.mapper;

import com.clinica.schedule.api.dto.ProfessionalRequest;
import com.clinica.schedule.api.dto.ProfessionalResponse;
import com.clinica.schedule.domain.model.Professional;
import org.springframework.stereotype.Component;

@Component
public class ProfessionalMapper {

    public Professional toEntity(ProfessionalRequest request) {
        Professional professional = new Professional();
        professional.setNome(request.nome());
        professional.setEspecialidade(request.especialidade());
        professional.setTelefone(request.telefone());
        professional.setEmail(request.email());
        return professional;
    }

    public void updateEntity(ProfessionalRequest request, Professional professional) {
        professional.setNome(request.nome());
        professional.setEspecialidade(request.especialidade());
        professional.setTelefone(request.telefone());
        professional.setEmail(request.email());
    }

    public ProfessionalResponse toResponse(Professional professional) {
        return new ProfessionalResponse(
                professional.getId(),
                professional.getNome(),
                professional.getEspecialidade(),
                professional.getTelefone(),
                professional.getEmail()
        );
    }
}
