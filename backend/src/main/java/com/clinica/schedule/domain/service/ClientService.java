package com.clinica.schedule.domain.service;

import com.clinica.schedule.api.dto.ClientRequest;
import com.clinica.schedule.api.dto.ClientResponse;
import com.clinica.schedule.api.mapper.ClientMapper;
import com.clinica.schedule.domain.exception.ResourceNotFoundException;
import com.clinica.schedule.domain.model.Client;
import com.clinica.schedule.domain.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper mapper;

    public ClientService(ClientRepository clientRepository, ClientMapper mapper) {
        this.clientRepository = clientRepository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<ClientResponse> listar() {
        return clientRepository.findAll().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ClientResponse criar(ClientRequest request) {
        Client client = mapper.toEntity(request);
        return mapper.toResponse(clientRepository.save(client));
    }

    @Transactional
    public ClientResponse atualizar(Long id, ClientRequest request) {
        Client client = buscarEntidade(id);
        mapper.updateEntity(request, client);
        return mapper.toResponse(clientRepository.save(client));
    }

    @Transactional
    public void remover(Long id) {
        Client client = buscarEntidade(id);
        clientRepository.delete(client);
    }

    @Transactional(readOnly = true)
    public Client buscarEntidade(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));
    }
}
