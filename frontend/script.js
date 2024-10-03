document.getElementById('reservaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const dataHora = document.getElementById('dataHora').value;
    const telefone = document.getElementById('telefone').value;
    const quantidadePessoas = document.getElementById('mesa').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Criação do objeto usuário
    const usuarioData = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    // Enviar o usuário para o backend
    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao criar usuário');

        return response.json();
    })
    .then(usuario => {
        const mesaId = 1; // Substitua pelo ID correto da mesa que está sendo reservada
        const reservaData = {
            usuarioId: usuario.id,
            dataReserva: dataHora,
            quantidadePessoas: quantidadePessoas
        };

        // Enviar a reserva para o backend
        return fetch(`http://localhost:8080/mesas/${mesaId}/reservas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservaData)
        });
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 422) {
                alert('Horário indisponível para reserva.');
            }
            throw new Error('Erro ao criar reserva');
        }

        return response.json();
    })
    .then(reserva => {
        alert('Reserva criada com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
