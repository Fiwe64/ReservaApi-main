// URL da API
const apiUrl = "http://localhost:8080/usuarios";

// Seleção de elementos do formulário
const formulario = document.querySelector("#form-cadastro");
const Inome = document.querySelector(".nome");
const Iemail = document.querySelector(".email");
const Itelefone = document.querySelector(".telefone");

// Função para cadastrar uma nova pessoa
function cadastrar() {
  const pessoaData = {
    nome: Inome.value,
    email: Iemail.value,
    telefone: Itelefone.value
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pessoaData)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Erro ao cadastrar');
    }
  })
  .then(data => {
    console.log("Cadastro realizado:", data);
    alert("Cadastro realizado com sucesso!");
    listarPessoas(); // Atualiza a lista de pessoas
    limpar(); // Limpa os campos do formulário
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Erro ao realizar o cadastro!");
  });
}

// Função para limpar os campos do formulário
function limpar() {
  Inome.value = "";
  Iemail.value = "";
  Itelefone.value = "";
}

// Função para listar pessoas
function listarPessoas() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de pessoas');
      }
      return response.json();
    })
    .then(pessoas => {
      console.log("Lista de pessoas:", pessoas);
      // Gerar o HTML da lista de pessoas
      const listaHTML = pessoas.map(pessoa => `
        <ul>  
          <li>Nome: ${pessoa.nome}</li>
          <li>Email: ${pessoa.email}</li>
          <li>Telefone: ${pessoa.telefone}</li>
          <button onclick="editarPessoa(${pessoa.id})">Editar</button>
          <button onclick="deletarPessoa(${pessoa.id})">Deletar</button>
        </ul>`).join("");
      
      // Inserir a lista gerada no elemento HTML com o id "lista-pessoas"
      document.getElementById("lista-pessoas").innerHTML = listaHTML;
    })
    .catch(error => {
      console.error("Erro ao listar pessoas:", error);
    });
}

// Função para editar pessoa
function editarPessoa(id) {
  const nome = prompt("Informe o novo nome:");
  const email = prompt("Informe o novo email:");
  const telefone = prompt("Informe o novo telefone:");

  if (nome && email && telefone) {
    const apiUrlEdit = `${apiUrl}/${id}`; // URL específica da pessoa a ser editada

    fetch(apiUrlEdit, {
      method: 'PUT', // Ou 'PATCH' dependendo de como a API está configurada
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        telefone: telefone,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao editar pessoa');
      }
      console.log(`Pessoa com ID ${id} editada com sucesso.`);
      listarPessoas(); // Atualiza a lista de pessoas após a edição
    })
    .catch(error => console.error("Erro ao editar pessoa:", error));
  } else {
    console.log("Edição cancelada ou dados inválidos.");
  }
}

// Função para deletar pessoa
function deletarPessoa(id) {
  const apiUrlDelete = `${apiUrl}/${id}`; // URL específica da pessoa a ser deletada

  fetch(apiUrlDelete, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao deletar pessoa');
    }
    console.log(`Pessoa com ID ${id} deletada com sucesso.`);
    listarPessoas(); // Atualiza a lista de pessoas após a exclusão
  })
  .catch(error => console.error("Erro ao deletar pessoa:", error));
}

// Chamar a função listarPessoas ao carregar a página
window.onload = listarPessoas;

// Adicionar evento de submit ao formulário
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  cadastrar(); // Chama a função de cadastro
});
