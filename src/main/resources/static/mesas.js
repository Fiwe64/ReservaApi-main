// URL da API para mesas
const apiUrlMesas = "http://localhost:8080/mesas";
const apiUrlReservas = "http://localhost:8080/reservas";

// Função para listar mesas
function listarMesas() {
    fetch(apiUrlMesas)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar lista de mesas');
        }
        return response.json();
    })
    .then(mesas => {
        console.log("Lista de mesas:", mesas);

        // Gerar o HTML para a lista de mesas
        const listaHTML = mesas.map(mesa => `
            <div class="mesa-item">
                <p>Mesa ID: ${mesa.id}</p>
                <p>Número de Lugares: ${mesa.quantidadeDeLugares}</p>
                <p>Disponível: ${mesa.disponivelParaReserva ? 'Sim' : 'Não'}</p>
                ${mesa.disponivelParaReserva ? `<button onclick="selecionarMesa(${mesa.id})">Selecionar</button>` : ''}
            </div>
        `).join("");

        // Inserir a lista gerada no elemento HTML com o id "lista-mesas"
        document.getElementById("lista-mesas").innerHTML = listaHTML;
    })
    .catch(error => {
        console.error("Erro ao listar mesas:", error);
    });
}

// Função para selecionar uma mesa e fazer a reserva
function selecionarMesa(mesaId) {
    const usuario = JSON.parse(localStorage.getItem('usuarioCadastrado')); // Recupera o usuário armazenado

    if (!usuario) {
        alert("Nenhum usuário encontrado. Por favor, cadastre um usuário primeiro.");
        window.location.href = 'inicial.html'; // Redireciona para a página de cadastro, se não houver usuário
        return;
    }

    const dataReserva = localStorage.getItem("dataReserva");
    const horaReserva = localStorage.getItem("horaReserva");

    if (!dataReserva || !horaReserva) {
        alert("Data e hora de reserva não definidas.");
        return;
    }

    const reservaData = {
        usuarioId: usuario.id,
        dataReserva: `${dataReserva}T${horaReserva}:00` // Combina data e hora
    };

    fetch(`http://localhost:8080/mesas/${mesaId}/reservas`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
    })
    .then(response => {
        // Verifica se a resposta é ok e se o corpo contém dados
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Erro ao fazer a reserva: ${text}`);
            });
        }
        return response.json();  // Reserva realizada com sucesso
    })
    .then(reserva => {
        console.log("Reserva realizada:", reserva);
        alert("Reserva realizada com sucesso!");
    })
    .catch(error => {
        console.error("Erro ao realizar a reserva:", error);
        alert("Erro ao realizar a reserva!");
    });
}




// Carregar a lista de mesas ao iniciar a página
window.onload = listarMesas;
