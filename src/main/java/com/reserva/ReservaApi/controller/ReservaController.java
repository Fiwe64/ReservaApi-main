package com.reserva.ReservaApi.controller;

import com.reserva.ReservaApi.domain.mesa.Mesa;
import com.reserva.ReservaApi.domain.mesa.ReservaMesaRequest;
import com.reserva.ReservaApi.domain.reserva.Reserva;
import com.reserva.ReservaApi.domain.usuario.Usuario;
import com.reserva.ReservaApi.repository.MesaRepository;
import com.reserva.ReservaApi.repository.ReservaRepository;
import com.reserva.ReservaApi.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@RestController
public class ReservaController {
    @Autowired
    private final MesaRepository mesaRepository;

    private final UsuarioRepository usuarioRepository;
    private final ReservaRepository reservaRepository;

    public ReservaController(MesaRepository mesaRepository, UsuarioRepository usuarioRepository, ReservaRepository reservaRepository) {
        this.mesaRepository = mesaRepository;
        this.usuarioRepository = usuarioRepository;
        this.reservaRepository = reservaRepository;
    }

    @PostMapping("/mesas/{id}/reservas")
    @Transactional
    public ResponseEntity<?> reservar(
            @PathVariable(value = "id") Long mesaId,
            @RequestBody ReservaMesaRequest request,
            UriComponentsBuilder uriBuilder
    ) {
        Mesa mesa = mesaRepository.findByIdWithPessimisticLock(mesaId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Mesa não cadastrada"));

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResponseStatusException(UNPROCESSABLE_ENTITY, "Usuario não cadastrado"));

        LocalDateTime dataDaReserva = request.getDataReserva();

        if (reservaRepository.existsMesaByIdAndReservadoParaIs(mesaId, dataDaReserva)) {
            throw new ResponseStatusException(UNPROCESSABLE_ENTITY, "Horario indisponivel para reserva");
        }

        Reserva reserva = mesa.reservar(usuario, dataDaReserva);

        reservaRepository.save(reserva);

        URI location = uriBuilder.path("/mesas/{id}/reservas/{reservaId}")
                .buildAndExpand(mesa.getId(), reserva.getId())
                .toUri();

        return ResponseEntity.created(location).build();

    }
}
