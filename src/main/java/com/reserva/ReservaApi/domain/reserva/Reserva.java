package com.reserva.ReservaApi.domain.reserva;

import com.reserva.ReservaApi.domain.mesa.Mesa;
import com.reserva.ReservaApi.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import static java.time.LocalDateTime.now;

@Entity
@Data
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Mesa mesa;

    @ManyToOne(optional = false)
    private Usuario reservadoPor;

    @Column(nullable = false)
    private LocalDateTime reservadoPara;

    @Column(nullable = false)
    private LocalDateTime criadoEm = now();

    public Reserva(Mesa mesa, Usuario reservadoPor, LocalDateTime reservadoPara) {
        this.mesa = mesa;
        this.reservadoPor = reservadoPor;
        this.reservadoPara = reservadoPara;
    }
}
