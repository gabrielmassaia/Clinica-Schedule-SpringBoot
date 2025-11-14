package com.clinica.schedule.api.mapper;

import com.clinica.schedule.api.dto.ClientRequest;
import com.clinica.schedule.api.dto.ClientResponse;
import com.clinica.schedule.domain.model.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

    public Client toEntity(ClientRequest request) {
        Client client = new Client();
        client.setNome(request.nome());
        client.setCpf(request.cpf());
        client.setTelefone(request.telefone());
        client.setEmail(request.email());
        return client;
    }

    public void updateEntity(ClientRequest request, Client client) {
        client.setNome(request.nome());
        client.setCpf(request.cpf());
        client.setTelefone(request.telefone());
        client.setEmail(request.email());
    }

    public ClientResponse toResponse(Client client) {
        return new ClientResponse(
                client.getId(),
                client.getNome(),
                client.getCpf(),
                client.getTelefone(),
                client.getEmail()
        );
    }
}
