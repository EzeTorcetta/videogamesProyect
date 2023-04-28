const {Router} = require ("express");
const getGenreHandler = require ("../handlers/genreHandler")
const genresRoute = Router();

genresRoute.get("/", getGenreHandler)

module.exports = genresRoute;