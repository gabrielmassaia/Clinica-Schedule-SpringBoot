package com.clinica.schedule;

import com.clinica.schedule.api.dto.AppointmentRequest;
import com.clinica.schedule.api.mapper.AppointmentMapper;
import com.clinica.schedule.api.mapper.ClientMapper;
import com.clinica.schedule.api.mapper.ProfessionalMapper;
import com.clinica.schedule.domain.exception.BusinessException;
import com.clinica.schedule.domain.model.AppointmentStatus;
import com.clinica.schedule.domain.model.Client;
import com.clinica.schedule.domain.model.Professional;
import com.clinica.schedule.domain.repository.AppointmentRepository;
import com.clinica.schedule.domain.repository.ClientRepository;
import com.clinica.schedule.domain.repository.ProfessionalRepository;
import com.clinica.schedule.domain.service.AppointmentService;
import com.clinica.schedule.domain.service.ClientService;
import com.clinica.schedule.domain.service.ProfessionalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class AppointmentServiceTest {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private AppointmentMapper appointmentMapper;

    @Autowired
    private ProfessionalMapper professionalMapper;

    @Autowired
    private ClientMapper clientMapper;

    private AppointmentService appointmentService;

    private ClientService clientService;

    private ProfessionalService professionalService;

    private Client client;

    private Professional professional;

    @BeforeEach
    void setUp() {
        clientService = new ClientService(clientRepository, clientMapper);
        professionalService = new ProfessionalService(professionalRepository, professionalMapper);
        appointmentService = new AppointmentService(appointmentRepository, clientService, professionalService, appointmentMapper);

        client = new Client();
        client.setNome("Cliente Teste");
        client.setCpf("12345678901");
        client.setTelefone("11999999999");
        client.setEmail("cliente@teste.com");
        client = clientRepository.save(client);

        professional = new Professional();
        professional.setNome("Profissional Teste");
        professional.setEspecialidade("Estética");
        professional.setTelefone("11888888888");
        professional.setEmail("prof@teste.com");
        professional = professionalRepository.save(professional);
    }

    @Test
    void deveImpedirAgendamentoDuplicadoParaMesmoHorarioEProfissional() {
        LocalDateTime dataHora = LocalDateTime.now().plusDays(1).withHour(10).withMinute(0).withSecond(0).withNano(0);

        AppointmentRequest primeiro = new AppointmentRequest(
                client.getId(),
                professional.getId(),
                dataHora,
                "Procedimento",
                AppointmentStatus.AGENDADO
        );

        appointmentService.criar(primeiro);

        AppointmentRequest duplicado = new AppointmentRequest(
                client.getId(),
                professional.getId(),
                dataHora,
                "Procedimento",
                AppointmentStatus.AGENDADO
        );

        assertThatThrownBy(() -> appointmentService.criar(duplicado))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Já existe um agendamento");
    }
}
