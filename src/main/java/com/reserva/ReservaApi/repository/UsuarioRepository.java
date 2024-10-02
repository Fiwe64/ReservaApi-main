package com.reserva.ReservaApi.repository;

import com.reserva.ReservaApi.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
