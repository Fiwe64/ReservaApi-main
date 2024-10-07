document.getElementById('reservaForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const dataHora = document.getElementById('dataHora').value;
  const telefone = document.getElementById('telefone').value;
  const quantidadePessoas = document.getElementById('mesa').value;
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  // Criação do objeto usuário
  const usuarioData = {
      nome: nome,
      email: email,
      telefone: telefone
  };

  // Enviar o usuário para o backend
  fetch('http://localhost:8080/usuarios', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioData)
  })
  .then(response => {
      if (!response.ok) throw new Error('Erro ao criar usuário');
      return response.json();
  })
  .then(usuario => {
      // Buscar todas as mesas disponíveis
      return fetch(`http://localhost:8080/mesas?disponivel=true&dataHora=${encodeURIComponent(dataHora)}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) throw new Error('Erro ao buscar mesas disponíveis');
          return response.json();
      })
      .then(mesas => {
          if (mesas.length === 0) {
              throw new Error('Nenhuma mesa disponível para o horário solicitado');
          }

          const mesaId = mesas[0].id; // Pega o ID da primeira mesa disponível

          const reservaData = {
              usuarioId: usuario.id,  // ID do usuário recém-criado
              dataReserva: dataHora,  // Data e hora da reserva
              quantidadePessoas: quantidadePessoas  // Quantidade de pessoas
          };

          // Enviar a reserva para o backend
          return fetch(`http://localhost:8080/mesas/${mesaId}/reservas`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(reservaData)
          });
      });
  })
  .then(response => {
      if (!response.ok) {
          if (response.status === 422) {
              alert('Horário indisponível para reserva.');
          }
          throw new Error('Erro ao criar reserva');
      }

      return response.json();
  })
  .then(reserva => {
      alert('Reserva criada com sucesso!');
  })
  .catch(error => {
      console.error('Erro:', error);
  });
});
