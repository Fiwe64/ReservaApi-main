// URL da API
const apiUrlMesas = "http://localhost:8080/mesas";
const apiUrlUsuarios = "http://localhost:8080/usuarios";

// Seleção de elementos do formulário (para cadastrar usuário)
const reservaForm = document.querySelector("#form-cadastro");
const nomeInput = document.querySelector(".nome");
const emailInput = document.querySelector(".email");
const telefoneInput = document.querySelector(".telefone");

// Função para cadastrar um novo usuário
function cadastrarUsuario() {
    const usuarioData = {
        nome: nomeInput.value,
        email: emailInput.value,
        telefone: telefoneInput.value
    };

    return fetch(apiUrlUsuarios, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();  // Retorna o usuário cadastrado
        } else {
            throw new Error('Erro ao cadastrar usuário');
        }
    });
}

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

// Função para selecionar uma mesa e armazenar o ID da mesa no localStorage
function selecionarMesa(mesaId) {
    console.log(`Mesa ${mesaId} selecionada`);
    localStorage.setItem('mesaSelecionada', mesaId); // Armazena a mesa selecionada
    window.location.href = 'fazerReserva.html'; // Redireciona para a página de fazer reserva
}

// Função para fazer a reserva com o ID do usuário e a mesa selecionada
function reservarMesa(usuarioId) {
    const mesaId = localStorage.getItem('mesaSelecionada');
    const reservaData = {
        usuarioId: usuarioId,
        mesaId: mesaId,
        dataReserva: new Date().toISOString() // Exemplo de data atual
    };

    return fetch(`${apiUrlMesas}/${mesaId}/reservas`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
    })
    .then(res => {
        if (res.ok) {
            return res.json(); // Reserva realizada com sucesso
        } else {
            throw new Error('Erro ao reservar mesa');
        }
    });
}

// Função para cadastrar usuário e depois reservar mesa
function cadastrarUsuarioEReservar() {
    cadastrarUsuario()
    .then(usuario => {
        console.log("Usuário cadastrado:", usuario);
        return reservarMesa(usuario.id);  // Usa o ID do usuário cadastrado para fazer a reserva
    })
    .then(reserva => {
        console.log("Reserva realizada:", reserva);
        alert("Reserva realizada com sucesso!");
    })
    .catch(error => {
        console.error("Erro ao cadastrar ou reservar:", error);
        alert("Erro ao cadastrar usuário ou realizar a reserva!");
    });
}

// Carregar a lista de mesas ao iniciar a página
window.onload = listarMesas;

// Evento de submit do formulário para cadastro e reserva
if (reservaForm) {
    reservaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        cadastrarUsuarioEReservar(); // Chama a função para cadastrar e reservar
    });
}
