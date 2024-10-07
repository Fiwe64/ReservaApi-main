// URL da API para buscar os clientes
const apiUrlClientes = "http://localhost:8080/usuarios"; // Atualize conforme necessário

async function carregarClientes() {
    try {
        const response = await fetch(apiUrlClientes);
        if (!response.ok) {
            throw new Error('Erro ao buscar a lista de clientes');
        }

        const clientes = await response.json();
        const clientesContainer = document.querySelector("#clientes-container");
        
        // Limpar o container antes de preencher
        clientesContainer.innerHTML = '';

        // Preencher o container com dados dos clientes
        clientes.forEach(cliente => {
            // Criar uma nova tabela para cada cliente
            const clienteTable = document.createElement("table");
            clienteTable.className = "cliente-table";

            const tbody = document.createElement("tbody");
            tbody.innerHTML = `
                <tr>
                    <td><strong>Nome:</strong></td>
                    <td>${cliente.nome}</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td>${cliente.email}</td>
                </tr>
                <tr>
                    <td><strong>Telefone:</strong></td>
                    <td>${cliente.telefone}</td>
                </tr>
            `;

            clienteTable.appendChild(tbody);
            clientesContainer.appendChild(clienteTable);
        });
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao carregar a lista de clientes!");
    }
}

// Carregar os clientes ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarClientes);
