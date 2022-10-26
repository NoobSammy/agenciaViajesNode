import { Viaje } from "../models/Viaje.js";
import { Testimoniales } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
	const promiseDB = [];
	promiseDB.push(Viaje.findAll({ limit: 3 }));
	promiseDB.push(Testimoniales.findAll({ limit: 3 }));

	// Consultar 3 viajes y 3 testimoniales
	try {
		// Realizar ambas consultas al mismo tiempo
		// en lugar de una tras otra
		const resultado = await Promise.all(promiseDB);

		// request es nuestra petición, response es lo que express devuelve
		res.render("inicio", {
			//res.send("Inicio"); // Imprimir en el body Hola Mundo
			// Renderizar la vista inicio.pug
			pagina: "Inicio",
			clase: "home",
			viajes: resultado[0],
			testimoniales: resultado[1],
		});
	} catch (error) {
		console.error(error);
	}
};

const paginaNosotros = (req, res) => {
	res.render("nosotros", {
		pagina: "Nosotros", // Pasar una variable a la vista
	});
};

const paginaContacto = (req, res) => {
	res.render("contacto");
};

const paginaViajes = async (req, res) => {
	// Consultar Base de Datos
	const viajes = await Viaje.findAll();

	// console.log(viajes);

	res.render("viajes", {
		pagina: "Próximos viajes",
		viajes,
	});
};

const paginaTestimoniales = async (req, res) => {
	try {
		const testimoniales = await Testimoniales.findAll();
		res.render("testimoniales", {
			pagina: "Testimoniales",
			testimoniales,
		});
	} catch (error) {
		console.error(error);
	}
};

// Muestra un viaje por su slug
const paginaDetalleViajes = async (req, res) => {
	const { slug } = req.params;

	try {
		const viaje = await Viaje.findOne({ where: { slug } });

		res.render("viaje", {
			pagina: "Información viaje",
			viaje,
		});
	} catch (error) {
		console.error(error);
	}
};

export {
	paginaInicio,
	paginaNosotros,
	paginaContacto,
	paginaViajes,
	paginaTestimoniales,
	paginaDetalleViajes,
};
