package com.clinica.schedule.domain.repository;

import com.clinica.schedule.domain.model.Professional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
}
