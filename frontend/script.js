form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    try {
        const nome = nomeInput.value;
        const email = emailInput.value;
        const telefone = telefoneInput.value;
        const data = dataInput.value;
        const hora = horaInput.value;
        const mesa = mesaInput.value;

        // Validações básicas
        if (!nome || !email || !telefone || !data || !hora || !mesa) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Formata a data e hora da reserva
        const dataReserva = `${data}T${hora}:00`;

        // Logs para verificar o que está sendo enviado
        console.log("Criando usuário com:", { nome, email, telefone });
        const usuario = await criarUsuario(nome, email, telefone);

        console.log("Usuário criado:", usuario);
        console.log("Tentando reservar para mesa:", mesa, "com data e hora:", dataReserva);

        // Faz a reserva
        const reserva = await criarReserva(mesa, usuario.id, dataReserva);
        console.log("Reserva criada:", reserva);

        alert('Reserva realizada com sucesso!');
        window.location.href = 'concluido.html'; // Redireciona após sucesso
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar a reserva.');
    }
});
