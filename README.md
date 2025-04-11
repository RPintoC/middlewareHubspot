# Middleware de Integración con API de Contactos de HubSpot

Este proyecto implementa un middleware en Node.js que se conecta a la API de HubSpot para gestionar contactos (crear, leer, actualizar, eliminar) a través de una API REST y una interfaz web básica.

---

## 🚀 Instrucciones para levantar el proyecto localmente

### 1. Clona el repositorio

```bash
git clone https://github.com/RPintoC/middlewareHubspot.git
cd middlewareHubspot
```

### 2. Instala las dependencias

```bash
npm install express axios dotenv express-validator cors helmet
npm install --save-dev nodemon jest supertest
```

### 3. Configura las variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```


### 4. Inicia el servidor en modo desarrollo

```bash
npm run dev
```

Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Cómo ejecutar las pruebas unitarias

El proyecto utiliza **Jest** y **Supertest** para probar la API REST.

Para ejecutar las pruebas:

```bash
npm test
```

Las pruebas se encuentran en el directorio `tests/`.

---

## 📌 Requerimientos adicionales y consideraciones

- Node.js 21.5.0
- npm 10.2.4
- La API de HubSpot debe tener permisos para usar el endpoint de contactos.
- Las credenciales y claves sensibles se manejan con variables de entorno (.env).
- El frontend básico se encuentra en `frontend/login.html`.

---

## 📁 Estructura del Proyecto

```
middlewareHubspot/
├── src/
│   ├── frontend/           # Componentes del frontend
│      ├── login.html
│      ├── login.js
│      ├── dashboard.html
│      ├── dashboard.js
│      └── styles.css
│   ├── controllers/
│      └── contactsController.js
│   ├── routes/
│      └── contacts.js
│   ├── services/
│   └── app.js           # Código fuente de la app
├── tests/                 # Pruebas unitarias
├── .env.example
├── .env
├── package.json
└── README.md
```

