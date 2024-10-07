// URLs da API
const apiUrlMesas = "http://localhost:8080/mesas";
const apiUrlUsuarios = "http://localhost:8080/usuarios";

// Seleção de elementos do formulário
const reservaForm = document.querySelector("#reservaForm");
const mesaIdInput = document.querySelector("#mesaId");
const dataHoraInput = document.querySelector("#dataHora");

const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const telefoneInput = document.querySelector("#telefone");

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
            window.location.href = 'reservaTeste.html';
        } else {
            throw new Error('Erro ao cadastrar usuário');
        }
    });
}

// Função para reservar uma mesa
function reservarMesa(usuarioId) {
    const reservaData = {
        usuarioId: usuarioId,
        dataReserva: dataHoraInput.value
    };

    const mesaId = mesaIdInput.value;

    fetch(`${apiUrlMesas}/${mesaId}/reservas`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Erro ao reservar mesa');
        }
    })
    .then(data => {
        console.log("Reserva realizada:", data);
        alert("Reserva realizada com sucesso!");
        limparFormulario();
    })
    
}

// Função para limpar o formulário
function limparFormulario() {
    mesaIdInput.value = "";
    dataHoraInput.value = "";
    nomeInput.value = "";
    emailInput.value = "";
    telefoneInput.value = "";
}

// Função para cadastrar usuário e depois reservar mesa
function cadastrarUsuarioEReservar() {
    cadastrarUsuario()
    .then(usuario => {
        console.log("Usuário cadastrado:", usuario);
        return reservarMesa(usuario.id);  // Usa o ID do usuário cadastrado para fazer a reserva
    })
    .catch(error => {
        console.error("Erro ao cadastrar ou reservar:", error);
        alert("Erro ao cadastrar usuário ou realizar a reserva!");
    });
}

// Adicionar evento de submit ao formulário
reservaForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    cadastrarUsuarioEReservar(); // Chama a função para cadastrar e reservar
});
