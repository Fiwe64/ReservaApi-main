// URL da API
const apiUrlMesas = "http://localhost:8080/mesas";
const apiUrlUsuarios = "http://localhost:8080/usuarios";

const formulario = document.querySelector("#form-cadastro");

const Inome = document.querySelector(".nome");
const Iemail = document.querySelector(".email");
const Itelefone = document.querySelector(".telefone");

// Função para cadastrar o usuário
async function cadastrar() {
  const usuarioData = {
    nome: Inome.value,
    email: Iemail.value,
    telefone: Itelefone.value,
  };

  try {
    const response = await fetch(apiUrlUsuarios, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(usuarioData)
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar');
    }

    const data = await response.json();
    console.log("Cadastro realizado:", data);
    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao realizar o cadastro: " + error.message);
  }
}

// Função para limpar o formulário
function limparFormulario() {
  Inome.value = "";
  Iemail.value = "";
  Itelefone.value = "";
}

// Função para validar o formulário
function validarFormulario() {
  if (Inome.value.trim() === "" || Iemail.value.trim() === "" || Itelefone.value.trim() === "") {
    alert("Todos os campos devem ser preenchidos!");
    return false;
  }
  return true;
}

// Evento de submissão do formulário
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Previne o comportamento padrão de recarregar a página

  if (validarFormulario()) {
    cadastrar(); // Chama a função para cadastrar o usuário
    limparFormulario(); // Limpa os campos do formulário após a submissão
  }




  
});
