// Verificar autenticación
if (!sessionStorage.getItem("loggedIn")) {
  window.location.href = "login.html"; // Redirigir al login si no está autenticado
}
const API_URL = `http://localhost:${window.location.port || 3000}/contacts`;


// Cerrar sesión
document.getElementById("logoutButton").addEventListener("click", function () {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "login.html";
});

// Cargar contactos y generar filas dinámicas
async function loadContacts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const tbody = document.getElementById("contactsTableBody");
    tbody.innerHTML = ""; // Limpiar filas previas

    data.results.forEach((contact) => {
      console.log(contact.properties);
      const row = document.createElement("tr");

      row.innerHTML = 
      `<td>${contact.id}</td>
        <td>${contact.properties.firstname || "Sin Nombre"}</td>
        <td>${contact.properties.lastname || "Sin Apellido"}</td>
        <td>${contact.properties.email || "Sin Correo"}</td>
        <td>${contact.properties.phone || "Sin Teléfono"}</td>`;

      tbody.appendChild(row);
    });

    if (data.results.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="6">No hay contactos registrados</td>`;
      tbody.appendChild(emptyRow);
    }
  } catch (error) {
    console.error("Error al cargar contactos:", error);
    document.getElementById("messageBox").innerText = "Error al cargar contactos.";
  }
}

// Guardar un nuevo contacto
document.getElementById("contactForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const contactData = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    if (response.ok) {
      alert("Contacto guardado exitosamente");
      loadContacts(); // Recargar lista
    } else {
      document.getElementById("errorMessagePost").innerText = "Error al guardar contacto.";
      //      alert("Error al guardar el contacto");
    }
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    document.getElementById("errorMessagePost").innerText = "Error al guardar contacto.";
  }
});

// Buscar contacto por email
document.getElementById("searchButton").addEventListener("click", async function () {
  document.getElementById("errorMessageSearch").innerText = "";
  const email = document.getElementById("searchEmail").value;
  const searchedTable = document.getElementById("emailSearchedTable");
  const searchedTableBody = document.getElementById("emailSearchedTableBody");
  const askUpdateButton = document.getElementById("wantToUpdate");
  searchedTableBody.innerHTML ="";
  searchedTable.classList="hidden";
  askUpdateButton.classList="hidden";

  try {
    const response = await fetch(`${API_URL}/email/${email}`);
    const contact = await response.json();


    if (contact && contact.properties!=undefined) {
      searchedTable.classList.remove("hidden");
      askUpdateButton.classList.remove("hidden");
      searchedTableBody.innerHTML = 
      `<td>${contact.id}</td>
          <td>${contact.properties.firstname}</td>
          <td>${contact.properties.lastname || "Sin Apellido"}</td>
          <td>${contact.properties.email || "Sin Correo"}</td>
          <td>${contact.properties.phone || "Sin Teléfono"}</td>
                  <td>
          <button onclick="deleteContact('${contact.id}')">Eliminar</button>
        </td>`;
    } else {
      document.getElementById("errorMessageSearch").innerText = "Contacto no encontrado.";
//      alert("Contacto no encontrado");
    }
  } catch (error) {
    console.error("Error al buscar el contacto:", error);
    document.getElementById("errorMessageSearch").innerText = "Error al buscar el contacto.";
  }
});

var selectedContactId = null;
//Generar formulario para actualizar contacto
document.getElementById("wantToUpdate").addEventListener("click", async function () {
  const updateForm = document.getElementById("updateForm");
  updateForm.classList="hiddenUpdate";
  const email = document.getElementById("searchEmail").value;
  
  try {
    const response = await fetch(`${API_URL}/email/${email}`);
    const contact = await response.json();
    
    if (contact && contact.properties!=undefined) {
      selectedContactId = contact.id;
      console.log(selectedContactId);
      updateForm.classList.remove("hiddenUpdate");
      document.getElementById("firstnameU").value=contact.properties.firstname;
      document.getElementById("lastnameU").value=contact.properties.lastname|| "Sin Apellido";
      document.getElementById("emailU").value=contact.properties.email|| "Sin Correo";
      document.getElementById("phoneU").value=contact.properties.phone|| "Sin Teléfono";
    }
  } catch (error) {
    console.error("Error al buscar el contacto:", error);
  }
});

// Actuaizar un nuevo contacto
document.getElementById("updateForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const contactData = {
    firstname: document.getElementById("firstnameU").value,
    lastname: document.getElementById("lastnameU").value,
    email: document.getElementById("emailU").value,
    phone: document.getElementById("phoneU").value,
  };

  try {
    const response = await fetch(`${API_URL}/${selectedContactId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    if (response.ok) {
      alert("Contacto actualizado exitosamente");
      document.getElementById("updateForm").classList="hiddenUpdate";
      document.getElementById("wantToUpdate").classList="hidden";
      document.getElementById("emailSearchedTableBody").innerHTML="";
      document.getElementById("emailSearchedTable").classList="hidden";
      loadContacts(); // Recargar lista
    } else {
      document.getElementById("errorMessagePost").innerText = "Error al actualizar contacto.";
      //      alert("Error al guardar el contacto");
    }
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
//    document.getElementById("errorMessagePost").innerText = "Error al actualizar contacto.";
  }
});

// Eliminar contacto
async function deleteContact(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Contacto eliminado exitosamente");
      loadContacts(); // Recargar lista
    } else {
      alert("No se pudo eliminar el contacto");
    }
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
  }
}

// Cargar contactos al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  loadContacts();
});