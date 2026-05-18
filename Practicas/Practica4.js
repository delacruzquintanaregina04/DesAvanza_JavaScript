/*
  Instrucciones para resolver la práctica:
  1. Completa verificarDisponibilidad() para validar mesas solicitadas.
  2. Completa enviarConfirmacionReserva() para simular el envío de correo.
  3. En hacerReserva() utiliza await para controlar el flujo.
  4. Prueba con diferentes valores para verificar errores y confirmaciones.
*/

const reserveButton = document.getElementById("reserve-button");
const customerNameInput = document.getElementById("customer-name");
const reservationDateInput = document.getElementById("reservation-date");
const reservationTimeInput = document.getElementById("reservation-time");
const tablesRequestedInput = document.getElementById("tables-requested");
const messageContainer = document.getElementById("message-container");
const reservationsList = document.getElementById("reservations-list");

const MAX_TABLES_PER_SLOT = 5;
const reservations = [];

function showMessage(text, type = "success") {
  messageContainer.innerHTML = `
    <div class="message ${type}">${text}</div>
  `;
}

function clearMessage() {
  messageContainer.innerHTML = "";
}

function renderReservations() {
  reservationsList.innerHTML = "";

  if (reservations.length === 0) {
    reservationsList.innerHTML = "<p>No hay reservas confirmadas todavía.</p>";
    return;
  }

  reservations.forEach((reservation) => {
    const item = document.createElement("div");
    item.className = "reservation-item";
    item.innerHTML = `
      <span><strong>Cliente:</strong> ${reservation.customer}</span>
      <span><strong>Fecha:</strong> ${reservation.date}</span>
      <span><strong>Hora:</strong> ${reservation.time}</span>
      <span><strong>Mesas:</strong> ${reservation.tables}</span>
      <span><strong>Estado:</strong> ${reservation.status}</span>
    `;
    reservationsList.appendChild(item);
  });
}

function countReservationsForSlot(date, time) {
  return reservations
    .filter(
      (reservation) => reservation.date === date && reservation.time === time,
    )
    .reduce((total, reservation) => total + reservation.tables, 0);
}

function verificarDisponibilidad(mesasSolicitadas, date, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reservedTables = countReservationsForSlot(date, time);
      if (reservedTables + mesasSolicitadas <= MAX_TABLES_PER_SLOT) {
        resolve(true);
      } else {
        reject(
          new Error(
            "No hay mesas disponibles para la fecha y hora solicitadas.",
          ),
        );
      }
    }, 600);
  });
}

function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() >= 0.15;
      if (success) {
        resolve(`Correo de confirmación enviado a ${nombreCliente}`);
      } else {
        reject(new Error("Fallo al enviar el correo de confirmación."));
      }
    }, 800);
  });
}

async function hacerReserva(nombreCliente, mesasSolicitadas, date, time) {
  await verificarDisponibilidad(mesasSolicitadas, date, time);
  const emailResult = await enviarConfirmacionReserva(nombreCliente);
  return emailResult;
}

async function reserveTable() {
  clearMessage();

  const customer = customerNameInput.value.trim();
  const date = reservationDateInput.value;
  const time = reservationTimeInput.value;
  const tablesRequested = Number(tablesRequestedInput.value);

  if (!customer || !date || !time || tablesRequested < 1) {
    showMessage("Por favor completa todos los campos correctamente.", "error");
    return;
  }

  const reservation = {
    id: Date.now(),
    customer,
    date,
    time,
    tables: tablesRequested,
    status: "Pendiente",
  };

  try {
    const emailResult = await hacerReserva(
      customer,
      tablesRequested,
      date,
      time,
    );
    reservation.status = "Confirmada";
    reservations.push(reservation);
    renderReservations();
    showMessage(`Reserva confirmada. ${emailResult}`, "success");
  } catch (error) {
    if (error.message.includes("No hay mesas disponibles")) {
      showMessage(error.message, "error");
      return;
    }

    reservation.status = "Confirmada (sin correo)";
    reservations.push(reservation);
    renderReservations();
    showMessage(error.message, "error");
  }
}

reserveButton.addEventListener("click", reserveTable);
renderReservations();
