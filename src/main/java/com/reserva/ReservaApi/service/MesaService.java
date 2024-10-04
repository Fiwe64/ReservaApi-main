package com.reserva.ReservaApi.service;

import com.reserva.ReservaApi.domain.mesa.Mesa;
import com.reserva.ReservaApi.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesaService {

    @Autowired
    private final MesaRepository mesaRepository;

    public MesaService(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }

    public Mesa criarMesa(Mesa mesa) {
        // Aqui você pode adicionar qualquer lógica adicional de negócio necessária
        return mesaRepository.save(mesa);
    }

    // Novo método para listar todas as mesas
    public List<Mesa> listarMesas() {
        return mesaRepository.findAll();
    }
}
