package com.clinica.schedule.api.controller;

import com.clinica.schedule.api.dto.ClientRequest;
import com.clinica.schedule.api.dto.ClientResponse;
import com.clinica.schedule.domain.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<List<ClientResponse>> listar() {
        return ResponseEntity.ok(clientService.listar());
    }

    @PostMapping
    public ResponseEntity<ClientResponse> criar(@Valid @RequestBody ClientRequest request) {
        ClientResponse response = clientService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponse> atualizar(@PathVariable Long id,
                                                    @Valid @RequestBody ClientRequest request) {
        return ResponseEntity.ok(clientService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        clientService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
