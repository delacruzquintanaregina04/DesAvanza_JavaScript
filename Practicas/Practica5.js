const form = document.getElementById("registration-form");
const messageBox = document.getElementById("form-message");
const summaryBox = document.getElementById("form-summary");

function showMessage(message, type = "success") {
  messageBox.innerHTML = `<div class="message ${type}">${message}</div>`;
}

function clearMessage() {
  messageBox.innerHTML = "";
}

function validateForm(data) {
  const errors = [];

  if (!data.name) {
    errors.push("El nombre es obligatorio.");
  }

  if (!data.email) {
    errors.push("El correo electrónico es obligatorio.");
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push("Ingresa un correo electrónico válido.");
  }

  if (!data.phone) {
    errors.push("El teléfono es obligatorio.");
  } else if (!/^\d{7,15}$/.test(data.phone)) {
    errors.push(
      "Ingresa un teléfono válido (solo números, entre 7 y 15 dígitos).",
    );
  }

  if (!data.schedule) {
    errors.push("Selecciona un horario preferido.");
  }

  if (!data.eventDate) {
    errors.push("Selecciona una fecha para el evento.");
  }

  return errors;
}

function getFormData() {
  const formData = new FormData(form);
  const interests = formData.getAll("interests");

  return {
    name: formData.get("name")?.trim(),
    email: formData.get("email")?.trim(),
    phone: formData.get("phone")?.trim(),
    interests,
    schedule: formData.get("schedule"),
    eventDate: formData.get("eventDate"),
    idFile: formData.get("idFile"),
  };
}

function renderSummary(data) {
  const fileName =
    data.idFile && data.idFile.name ? data.idFile.name : "No se cargó archivo";
  summaryBox.style.display = "block";
  summaryBox.innerHTML = `
    <h2>Resumen del registro</h2>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Correo:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.phone}</p>
    <p><strong>Intereses:</strong> ${data.interests.length > 0 ? data.interests.join(", ") : "No especificados"}</p>
    <p><strong>Horario preferido:</strong> ${data.schedule}</p>
    <p><strong>Fecha del evento:</strong> ${data.eventDate}</p>
    <p><strong>Documento:</strong> ${fileName}</p>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();
  summaryBox.style.display = "none";

  const data = getFormData();
  const errors = validateForm(data);

  if (errors.length > 0) {
    showMessage(errors.join("<br>"), "error");
    return;
  }

  showMessage("Registro enviado correctamente.", "success");
  renderSummary(data);
  form.reset();
});
