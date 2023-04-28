const { getVideogames, getDetailById, getVideogamesByName, createVideogame } = require("../Controllers/videogamesController")


// Esta ruta obtiene arreglo de 100 obj donde cada obj es un juego con su info
const getVideogamesHandler = async (req, res) => {
    try {
        const{name} = req.query;

        const videogames = name? await getVideogamesByName(name) : await getVideogames()
        res.status(200).json(videogames)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Esta ruta obtiene el detalle de un videojuego en un obj
const getDetailByIdHandler = async (req, res) => {
    try {
        const { idVideogame } = req.params;
        const source = isNaN(idVideogame)? "bdd" : "api";
        const detail = await getDetailById(idVideogame, source)
        res.status(200).json(detail)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados
const addVideogameHandler = async (req, res) => {
    try {
        const {name,image,platforms,description,released,rating,genre} = req.body;
        const newVideogame = await createVideogame({name,image,platforms,description,released,rating,genre});
        
        res.status(201).json(newVideogame.dataValues)
        
    } catch (error) {
        res.status(400).json({error: "Something went wrong please try again"})
    }

    
}


module.exports = {
    getVideogamesHandler,
    getDetailByIdHandler,
    addVideogameHandler
}