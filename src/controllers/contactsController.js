const axios = require("axios");

// Base de la URL de HubSpot API
const HUBSPOT_BASE_URL = "https://api.hubapi.com/crm/v3/objects/contacts";
const API_KEY = process.env.HUBSPOT_API_KEY;

// Crear contacto
const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;
    const response = await axios.post(`${HUBSPOT_BASE_URL}`, {
      properties: { firstname, lastname, email, phone },
    }, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    console.log(response.data);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los contactos
// const getContacts = async (req, res) => {
//   try {
//     const response = await axios.get(`${HUBSPOT_BASE_URL}`, {
//       headers: { Authorization: `Bearer ${API_KEY}` },
//     });
//     console.log(response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const getContacts = async (req, res) => {
    try {
      let after = req.query.after; // Recoge el cursor desde los parámetros de la solicitud
      let allContacts = []; // Array para almacenar todos los contactos
  
      do {
        // Construir la URL con el cursor y el límite
        let url = HUBSPOT_BASE_URL;
        if (after) {
          url += `?after=${after}`;
        }
  
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
  
        // Añade los contactos actuales a la lista
        allContacts = allContacts.concat(response.data.results);
  
        // Actualizar el cursor con la siguiente página (si existe)
        after = response.data.paging?.next?.after;
  
      } while (after); // Continuar mientras haya más páginas
  
      res.status(200).json({ results: allContacts }); // Devuelve todos los contactos en un solo objeto
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      res.status(500).json({ error: error.message });
    }
  };


// Obtener contacto por ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${HUBSPOT_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar contacto por correo electrónico
const getContactByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const response = await axios.get(`${HUBSPOT_BASE_URL}/${email}?idProperty=email`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { email },
      });
      console.log(response.data);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Actualizar contacto
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const properties = req.body;
    const response = await axios.patch(`${HUBSPOT_BASE_URL}/${id}`, {
      properties,
    }, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar contacto
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${HUBSPOT_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  getContactByEmail,
  updateContact,
  deleteContact,
};