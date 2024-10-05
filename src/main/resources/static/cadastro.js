// URL da API para usuários
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
    })
    .then(usuario => {
        console.log("Usuário cadastrado:", usuario);
        localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario)); // Armazena o usuário cadastrado
        window.location.href = 'reservaData.html'; // Redireciona para a página de seleção de mesa
    })
    .catch(error => {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário!");
    });
}

// Evento de submit do formulário para cadastrar o usuário
if (reservaForm) {
    reservaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        cadastrarUsuario(); // Chama a função de cadastro ao submeter o formulário
    });
}
