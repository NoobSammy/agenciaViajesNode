import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
	// Validar
	const { nombre, correo, mensaje } = req.body;
	const errores = [];

	if (nombre.trim() === "") {
		errores.push({ mensaje: "El nombre está vacio" });
	}
	if (correo.trim() === "") {
		errores.push({ mensaje: "El correo está vacio" });
	}
	if (mensaje.trim() === "") {
		errores.push({ mensaje: "El mensaje está vacio" });
	}

	if (errores.length > 0) {
		// Consultar testimoniales existentes
		const testimoniales = await Testimoniales.findAll();

		// Mostrar la vista con errores
		res.render("testimoniales", {
			pagina: "Testimoniales",
			errores,
			nombre,
			correo,
			mensaje,
			testimoniales,
		});
	} else {
		// Almacenar en la BD
		try {
			await Testimoniales.create({
				nombre,
				correo,
				mensaje,
			});
			res.redirect("testimoniales");
		} catch (error) {
			console.error(error);
		}
	}
};

export { guardarTestimonial };
