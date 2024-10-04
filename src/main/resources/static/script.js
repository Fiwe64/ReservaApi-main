document.addEventListener('DOMContentLoaded', function () {
    const mesaSelect = document.getElementById('mesa');

    // Função para buscar mesas criadas e preencher o select
    async function carregarMesas() {
        try {
            const response = await fetch('http://localhost:8080/mesas');  // Chamada ao backend
            if (!response.ok) {
                throw new Error(`Erro ao buscar mesas: ${response.status}`);
            }

            const mesas = await response.json();  // Converte a resposta para JSON

            // Limpar as opções anteriores
            mesaSelect.innerHTML = '<option value="">Selecione uma mesa</option>';

            // Preencher o select com as mesas e suas respectivas quantidades de lugares
            mesas.forEach(mesa => {
                const option = document.createElement('option');
                option.value = mesa.id;  // O valor da opção será o ID da mesa
                option.textContent = `Mesa ${mesa.id} - ${mesa.quantidadeDeLugares} lugares`;  // Exibe o ID e os lugares
                mesaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar mesas:', error);
        }
    }

    // Carregar as mesas ao carregar a página
    carregarMesas();

    // Evento de envio do formulário
    document.getElementById('reservaForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const dataHora = document.getElementById('dataHora').value;
        const telefone = document.getElementById('telefone').value;
        const mesaId = document.getElementById('mesa').value;  // ID da mesa selecionada
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
    
        // Validação para garantir que uma mesa foi selecionada
        if (!mesaId) {
            alert("Por favor, selecione uma mesa.");
            return;
        }
    
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
            const reservaData = {
                usuarioId: usuario.id,
                dataReserva: dataHora,
                mesaId: mesaId  // ID da mesa selecionada
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
