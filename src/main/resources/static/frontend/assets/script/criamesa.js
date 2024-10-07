// URL da API para criar mesas
const apiUrlMesas = "http://localhost:8080/mesas"; // Atualize conforme necessário

const formularioMesa = document.querySelector("#form-criar-mesa");

async function criarMesa() {
  const mesaData = {
    quantidadeDeLugares: 8, // Definido como 8 por padrão
    data: document.querySelector("#data").value,
    horario: document.querySelector("#horario").value,
    disponivel: true // Definido como true por padrão
};

    try {
        const response = await fetch(apiUrlMesas, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mesaData)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar mesa');
        }

        const data = await response.json();
        console.log("Mesa criada:", data);
        alert("Mesa criada com sucesso!");
        formularioMesa.reset(); // Limpa o formulário após o envio
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao criar a mesa!");
    }
}

formularioMesa.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    criarMesa();
});
