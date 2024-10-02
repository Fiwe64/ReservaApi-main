package com.reserva.ReservaApi.domain.mesa;

import com.reserva.ReservaApi.domain.reserva.Reserva;
import com.reserva.ReservaApi.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer quantidadeDeLugares;

    @Column(nullable = false)
    private boolean disponivelParaReserva;

    public Mesa(Integer quantidadeDeLugares) {
        this.quantidadeDeLugares = quantidadeDeLugares;
        this.disponivelParaReserva=true;
    }

    @Deprecated
    public Mesa() {
    }

    public Long getId() {
        return id;
    }

    public Reserva reservar(Usuario usuario, LocalDateTime dataReserva) {
        if(!disponivelParaReserva){
            throw  new MesaIndisponivelException("Mesa indisponivel para reserva");
        }

        this.disponivelParaReserva=false;
        return new Reserva(this,usuario,dataReserva);
    }
}
