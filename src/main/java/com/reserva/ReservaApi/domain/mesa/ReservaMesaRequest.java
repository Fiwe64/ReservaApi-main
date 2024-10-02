package com.reserva.ReservaApi.domain.mesa;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public class ReservaMesaRequest {
    @Future
    @NotNull
    private LocalDateTime dataReserva;

    @Positive
    @NotNull
    private Long usuarioId;

    public ReservaMesaRequest(LocalDateTime dataReserva, Long usuarioId) {
        this.dataReserva = dataReserva;
        this.usuarioId = usuarioId;
    }

    public LocalDateTime getDataReserva() {
        return dataReserva;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }
}
