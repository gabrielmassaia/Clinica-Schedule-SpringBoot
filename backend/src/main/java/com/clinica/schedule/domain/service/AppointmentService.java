package com.clinica.schedule.domain.service;

import com.clinica.schedule.api.dto.AppointmentRequest;
import com.clinica.schedule.api.dto.AppointmentResponse;
import com.clinica.schedule.api.mapper.AppointmentMapper;
import com.clinica.schedule.domain.exception.BusinessException;
import com.clinica.schedule.domain.exception.ResourceNotFoundException;
import com.clinica.schedule.domain.model.Appointment;
import com.clinica.schedule.domain.model.Client;
import com.clinica.schedule.domain.model.Professional;
import com.clinica.schedule.domain.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ClientService clientService;
    private final ProfessionalService professionalService;
    private final AppointmentMapper mapper;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              ClientService clientService,
                              ProfessionalService professionalService,
                              AppointmentMapper mapper) {
        this.appointmentRepository = appointmentRepository;
        this.clientService = clientService;
        this.professionalService = professionalService;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> listar() {
        return appointmentRepository.findAll().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AppointmentResponse buscarPorId(Long id) {
        return mapper.toResponse(buscarEntidade(id));
    }

    @Transactional
    public AppointmentResponse criar(AppointmentRequest request) {
        Client client = clientService.buscarEntidade(request.clienteId());
        Professional professional = professionalService.buscarEntidade(request.profissionalId());
        validarConflito(professional, request.dataHora(), null);
        Appointment appointment = mapper.toEntity(request, client, professional);
        return mapper.toResponse(appointmentRepository.save(appointment));
    }

    @Transactional
    public AppointmentResponse atualizar(Long id, AppointmentRequest request) {
        Appointment existing = buscarEntidade(id);
        Client client = clientService.buscarEntidade(request.clienteId());
        Professional professional = professionalService.buscarEntidade(request.profissionalId());
        validarConflito(professional, request.dataHora(), id);
        mapper.updateEntity(request, existing, client, professional);
        return mapper.toResponse(appointmentRepository.save(existing));
    }

    @Transactional
    public void remover(Long id) {
        Appointment appointment = buscarEntidade(id);
        appointmentRepository.delete(appointment);
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> buscarPorProfissionalEData(Long profissionalId, LocalDate data) {
        return appointmentRepository.findByProfessionalAndDate(profissionalId, data).stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    protected Appointment buscarEntidade(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado"));
    }

    private void validarConflito(Professional professional, java.time.LocalDateTime dataHora, Long currentId) {
        appointmentRepository.findByProfessionalAndDateTime(professional, dataHora)
                .ifPresent(existing -> {
                    if (currentId == null || !existing.getId().equals(currentId)) {
                        throw new BusinessException("Já existe um agendamento para este profissional neste horário");
                    }
                });
    }
}
