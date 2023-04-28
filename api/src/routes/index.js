//! encargado de definir las rutas

const { Router } = require('express');
// Importar todos los routers:
const videogamesRoute = require ("./videogamesRoute");
const genresRoute = require("./genresRoute");



const router = Router();

// Configurar los routers
router.use("/videogames", videogamesRoute);

router.use("/genres", genresRoute);


module.exports = router;
