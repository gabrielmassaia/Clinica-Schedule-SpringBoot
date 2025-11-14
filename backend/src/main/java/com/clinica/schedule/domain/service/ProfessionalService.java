package com.clinica.schedule.domain.service;

import com.clinica.schedule.api.dto.ProfessionalRequest;
import com.clinica.schedule.api.dto.ProfessionalResponse;
import com.clinica.schedule.api.mapper.ProfessionalMapper;
import com.clinica.schedule.domain.exception.ResourceNotFoundException;
import com.clinica.schedule.domain.model.Professional;
import com.clinica.schedule.domain.repository.ProfessionalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessionalService {

    private final ProfessionalRepository professionalRepository;
    private final ProfessionalMapper mapper;

    public ProfessionalService(ProfessionalRepository professionalRepository, ProfessionalMapper mapper) {
        this.professionalRepository = professionalRepository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<ProfessionalResponse> listar() {
        return professionalRepository.findAll().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProfessionalResponse criar(ProfessionalRequest request) {
        Professional professional = mapper.toEntity(request);
        return mapper.toResponse(professionalRepository.save(professional));
    }

    @Transactional
    public ProfessionalResponse atualizar(Long id, ProfessionalRequest request) {
        Professional professional = buscarEntidade(id);
        mapper.updateEntity(request, professional);
        return mapper.toResponse(professionalRepository.save(professional));
    }

    @Transactional
    public void remover(Long id) {
        Professional professional = buscarEntidade(id);
        professionalRepository.delete(professional);
    }

    @Transactional(readOnly = true)
    public Professional buscarEntidade(Long id) {
        return professionalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profissional não encontrado"));
    }
}
