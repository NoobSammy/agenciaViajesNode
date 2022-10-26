import express from "express";
import {
	paginaContacto,
	paginaInicio,
	paginaNosotros,
	paginaTestimoniales,
	paginaViajes,
	paginaDetalleViajes,
} from "../controllers/paginasController.js";
import { guardarTestimonial } from "../controllers/testimonialController.js";

const router = express.Router(); // Utilizar la misma instancia de ./index.js

router.get("/", paginaInicio); // / es la ruta

router.get("/nosotros", paginaNosotros);

router.get("/contacto", paginaContacto);

router.get("/viajes", paginaViajes);
router.get("/viajes/:slug", paginaDetalleViajes); //: es un comodín para crear dinamicamente rutas

router.get("/testimoniales", paginaTestimoniales);
router.post("/testimoniales", guardarTestimonial);

export default router;
