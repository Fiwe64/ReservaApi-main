package com.reserva.ReservaApi.repository;

import com.reserva.ReservaApi.domain.mesa.Mesa;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MesaRepository extends JpaRepository<Mesa,Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT m FROM Mesa m WHERE m.id = :id")
    Optional<Mesa> findByIdWithPessimisticLock(Long id);
}
