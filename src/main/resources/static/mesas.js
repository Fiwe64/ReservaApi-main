// URL da API para mesas
const apiUrlMesas = "http://localhost:8080/mesas";

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

// Função para selecionar uma mesa
function selecionarMesa(mesaId) {
    console.log(`Mesa ${mesaId} selecionada`);
    localStorage.setItem('mesaSelecionada', mesaId); // Armazena a mesa selecionada para usar em outra página
    window.location.href = 'fazerReserva.html'; // Redireciona para a página de reserva
}

// Carregar a lista de mesas ao iniciar a página
window.onload = listarMesas;
