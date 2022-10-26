// Sintaxis vieja Common JS
// const express = require("express"); // Importar express

// Sintaxis nueva Imports Exports
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express(); // Funcion para utilizar express
const port = process.env.PORT || 4000; // process.env.PORT = Variable de entorno

// Conectar la base de datos
db.authenticate()
	.then(() => console.log("BD conectada"))
	.catch((error) => console.error(error));

// Habilitar PUG
app.set("view engine", "pug");

// Obtener el año actual
app.use((req, res, next) => {
	const year = new Date();
	res.locals.actualYear = year.getFullYear();
	res.locals.nombreSitio = "Agencia de viajes";
	next(); // Ir al siguiente middleware
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta pública
app.use(express.static("public"));

// Agregar router
// use soporta todos los verbos
app.use("/", router); // Incluir /, /nosotros, /contacto... y todas las rutas

app.listen(port, () => {
	// Arrancar el servidor, recive un puerto y un callback
	console.log(`El servidor está funcionando en el puerto ${port}`);
});
