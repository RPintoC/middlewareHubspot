document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("errorMessage").innerText = result.message;
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      document.getElementById("errorMessage").innerText = "Error al conectar con el servidor.";
    }
  });