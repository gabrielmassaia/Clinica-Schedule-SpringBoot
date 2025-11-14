package com.clinica.schedule.domain.repository;

import com.clinica.schedule.domain.model.Appointment;
import com.clinica.schedule.domain.model.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT a FROM Appointment a WHERE a.profissional = :professional AND a.dataHora = :dateTime")
    Optional<Appointment> findByProfessionalAndDateTime(@Param("professional") Professional professional,
                                                        @Param("dateTime") LocalDateTime dateTime);

    @Query("SELECT a FROM Appointment a WHERE a.profissional.id = :professionalId AND DATE(a.dataHora) = :date")
    List<Appointment> findByProfessionalAndDate(@Param("professionalId") Long professionalId,
                                                @Param("date") LocalDate date);
}
