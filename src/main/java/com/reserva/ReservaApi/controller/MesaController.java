package com.reserva.ReservaApi.controller;

import com.reserva.ReservaApi.domain.mesa.Mesa;
import com.reserva.ReservaApi.service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/mesas")
public class MesaController {

    @Autowired
    private final MesaService mesaService;

    public MesaController(MesaService mesaService) {
        this.mesaService = mesaService;
    }

    @PostMapping
    public ResponseEntity<Mesa> criarMesa(
            @RequestBody Mesa mesa,
            UriComponentsBuilder uriBuilder
    ) {
        Mesa novaMesa = mesaService.criarMesa(mesa);

        URI location = uriBuilder.path("/mesas/{id}")
                .buildAndExpand(novaMesa.getId())
                .toUri();

        return ResponseEntity.created(location).body(novaMesa);
    }

    // Novo endpoint para listar todas as mesas
    @GetMapping
    public ResponseEntity<List<Mesa>> listarMesas() {
        List<Mesa> mesas = mesaService.listarMesas();
        return ResponseEntity.ok(mesas);
    }
}
