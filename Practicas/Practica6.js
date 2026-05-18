const form = document.getElementById("registration-form");
const errorsContainer = document.getElementById("form-errors");
const successContainer = document.getElementById("form-success");

const registrationSchema = Zod.object({
  name: Zod.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: Zod.string().email("Ingresa un correo electrónico válido."),
  password: Zod.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .regex(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula.")
    .regex(/[a-z]/, "La contraseña debe incluir al menos una letra minúscula.")
    .regex(/[0-9]/, "La contraseña debe incluir al menos un número.")
    .regex(
      /[^A-Za-z0-9]/,
      "La contraseña debe incluir al menos un carácter especial.",
    ),
});

function clearMessages() {
  errorsContainer.innerHTML = "";
  successContainer.innerHTML = "";
}

function renderErrors(errors) {
  if (!errors || errors.length === 0) {
    errorsContainer.innerHTML = "";
    return;
  }

  errorsContainer.innerHTML = `
    <div class="error-list">
      <strong>Errores de validación:</strong>
      <ul>
        ${errors.map((error) => `<li>${error}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderSuccess(message) {
  successContainer.innerHTML = `<div class="success">${message}</div>`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessages();

  const formData = new FormData(form);
  const data = {
    name: formData.get("name")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    password: formData.get("password")?.toString() || "",
  };

  const validationResult = registrationSchema.safeParse(data);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors.map(
      (issue) => issue.message,
    );
    renderErrors(errorMessages);
    return;
  }

  renderSuccess("Registro válido. Datos listos para enviar al servidor.");
  form.reset();
});
