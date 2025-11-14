package com.clinica.schedule.domain.repository;

import com.clinica.schedule.domain.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
