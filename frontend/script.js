document.getElementById('mesa-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const quantidadeDeLugares = document.getElementById('quantidadeDeLugares').value;

    fetch('http://localhost:8080/mesas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantidadeDeLugares: quantidadeDeLugares,
            disponivelParaReserva: true
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Mesa criada com sucesso!');
        listarMesas(); // Atualiza a lista de mesas
    })
    .catch(error => console.error('Erro:', error));
});

document.getElementById('reserva-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const mesaId = document.getElementById('mesaId').value;
    const usuarioId = document.getElementById('usuarioId').value;
    const dataReserva = document.getElementById('dataReserva').value;

    fetch(`http://localhost:8080/mesas/${mesaId}/reservas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuarioId: usuarioId,
            dataReserva: dataReserva
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na reserva da mesa');
        }
        return response.json();
    })
    .then(data => {
        alert('Mesa reservada com sucesso!');
    })
    .catch(error => console.error('Erro:', error));
});

function listarMesas() {
    fetch('http://localhost:8080/mesas')
        .then(response => response.json())
        .then(data => {
            const listaMesas = document.getElementById('lista-mesas');
            listaMesas.innerHTML = ''; // Limpa a lista antes de preencher
            data.forEach(mesa => {
                const li = document.createElement('li');
                li.textContent = `Mesa ID: ${mesa.id}, Lugares: ${mesa.quantidadeDeLugares}, Disponível: ${mesa.disponivelParaReserva}`;
                listaMesas.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao listar mesas:', error));
}

// Chama a função ao carregar a página
listarMesas();
