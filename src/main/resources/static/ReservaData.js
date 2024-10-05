// Função para salvar data e hora da reserva
document.querySelector("#form-reserva-data").addEventListener("submit", function(event) {
    event.preventDefault();

    const dataReserva = document.querySelector("#dataReserva").value;
    const horaReserva = document.querySelector("#horaReserva").value;

    if (!dataReserva || !horaReserva) {
        alert("Por favor, escolha a data e hora.");
        return;
    }

    // Salva a data e a hora no localStorage
    localStorage.setItem("dataReserva", dataReserva);
    localStorage.setItem("horaReserva", horaReserva);

    // Redireciona para a página de seleção de mesas
    window.location.href = 'reservaTeste.html';
});
