// Importar las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Configuración de tu aplicación web Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbYNLEW0hpCDoEujBKjXQ_UNx6YH0c9Dc",
  authDomain: "bdbritny.firebaseapp.com",
  databaseURL: "https://bdbritny-default-rtdb.firebaseio.com",
  projectId: "bdbritny",
  storageBucket: "bdbritny.appspot.com",
  messagingSenderId: "771066119238",
  appId: "1:771066119238:web:a134aa6cc636602fa13647",
  measurementId: "G-PW5F8ECRHV"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencia al formulario
const formulario = document.getElementById('formulario');

// Manejador de eventos para el envío del formulario
formulario.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar que se envíe el formulario

  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const colorFavorito = document.getElementById('colorFavorito').value;
  const deporte = document.getElementById('deporte').value;
  const apodo = document.getElementById('apodo').value;

  // Crear una nueva referencia en la base de datos
  const usuariosRef = ref(database, 'usuarios');
  const newUsuarioRef = push(usuariosRef);

  // Guardar los datos en la base de datos
  set(newUsuarioRef, {
    nombre: nombre,
    apellido: apellido,
    colorFavorito: colorFavorito,
    deporte: deporte,
    apodo: apodo
  });

// Leer datos y mostrarlos
const datosDiv = document.getElementById('datos');
database.ref('usuarios').on('value', (snapshot) => {
    datosDiv.innerHTML = ""; // Limpiar el contenido previo
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const elemento = document.createElement('div');
        elemento.innerText = `Nombre: ${data.nombre}, Apellido: ${data.apellido}, Color Favorito: ${data.colorFavorito}, Deporte: ${data.deporte}, Apodo: ${data.apodo}`;
        datosDiv.appendChild(elemento);
    });
});

  // Limpiar el formulario
  formulario.reset();
});

