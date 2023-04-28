const {Router} = require ("express");
const {getVideogamesHandler,getDetailByIdHandler,addVideogameHandler} = require ("../handlers/videogamesHandlers")
const videogamesRoute = Router();


videogamesRoute.get("/", getVideogamesHandler)

videogamesRoute.get("/:idVideogame", getDetailByIdHandler)

videogamesRoute.post("/", addVideogameHandler)


module.exports = videogamesRoute;