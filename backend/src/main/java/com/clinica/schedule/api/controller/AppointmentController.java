package com.clinica.schedule.api.controller;

import com.clinica.schedule.api.dto.AppointmentRequest;
import com.clinica.schedule.api.dto.AppointmentResponse;
import com.clinica.schedule.domain.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> listar() {
        return ResponseEntity.ok(appointmentService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> criar(@Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponse> atualizar(@PathVariable Long id,
                                                         @Valid @RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        appointmentService.remover(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/por-profissional")
    public ResponseEntity<List<AppointmentResponse>> buscarPorProfissionalEData(
            @RequestParam Long profissionalId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(appointmentService.buscarPorProfissionalEData(profissionalId, data));
    }
}
