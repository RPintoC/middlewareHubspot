require('dotenv').config({path: '.env.example'});

const express = require('express');
//const cors = require('cors');
//const helmet = require('helmet');
const contactRoutes = require('./routes/contacts');
const path = require('path');


const app = express();

//app.use(helmet());
//app.use(cors());
app.use(express.json());

console.log(__dirname);

// Renderizar html
app.use(express.static(path.join(__dirname,'/frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/frontend/login.html'));
});

// Ruta para login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
      res.status(200).json({ message: "Login exitoso", authenticated: true });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  });
  

// Rutas para contacts
app.use('/contacts', contactRoutes);

// Errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno', detail: err.message });
});

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(process.env.PORT);
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
