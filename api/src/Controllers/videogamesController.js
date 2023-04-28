require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const {Op} = require ("sequelize");
const axios = require("axios");
const {cleanDetailApi, cleanDetailDB} = require ("../helpers/cleanDetail");
const cleanVideogames = require("../helpers/cleanVideogames");
const getGenres = require("./genreController");
const cleanVideogamesDB = require("../helpers/cleanDBvideogames");



//! getVideogames --> trae 100 juegos de la API, concatena los de la BDD y los retorna en un array de objetos:
const getVideogames = async () => {

    // traigo de la API los datos de 100 juegos:
    let i = 1;
    let videogamesPromises = []

    while(i<6){
        let apiData = axios.get(`${URL_API}/games?key=${API_KEY}&page=${i}`)
        videogamesPromises.push(apiData)
        i++
    }
    const rawVideogamesApi = await Promise.all(videogamesPromises)
    console.log('hola')
    const videogamesApi = cleanVideogames(rawVideogamesApi) 

    // traigo de la bdd los videogames creados (con sus genre)
    const rawVideogamesDB = await Videogame.findAll({
        include: {
            model: Genre,
            through: {attributes: []}
        } 
    });
    const cleanedVideogamesDB = rawVideogamesDB? cleanVideogamesDB(rawVideogamesDB) : [];

    return [...cleanedVideogamesDB, ...videogamesApi ]
}



//! getDetailById --> trae el detalle de un juego usando su id (busca en la api o en la bdd) 
const getDetailById = async (id, source) => {
    
    if(!id) throw new Error(`El id:${id} es inválido`)

    if(source === "api"){
        //traigo el detalle desde la api:
       const detailRaw = (await axios.get(`${URL_API}/games/${id}?key=${API_KEY}`)).data
       return cleanDetailApi(detailRaw);
    }
    else{
        // Traigo el detalle desde la bdd:
        const detailRaw = await Videogame.findOne({
            where : {id: id},
            include: {
                model: Genre,
                through: {attributes: []}
            } 
        })
        
        // guardo de detail solo lo que me interesa: 
        return cleanDetailDB(detailRaw.dataValues);
    }
}


//! getVideogamesByName --> trae 15 juegos que pueden ser de la bdd o de la api (buscando por query)
const getVideogamesByName = async (name) => {
    const videogamesDBraw = await Videogame.findAll({
        include: {
            model: Genre,
            through: {attributes: []}
        } ,
        where: {
            name: {
                [Op.iLike]:`%${name}%`
            }
        }
    })
    
    // Guardo de videogamesDBraw solo lo que necesito:
    //?  const videogamesDB = cleanVideogamesDB(videogamesDBraw) POR QUE NO FUNCIONA ASI Y SI CON TODO ESCRITO COMO ARRIBA??
    const videogamesDB = cleanVideogamesDB(videogamesDBraw)

    const videogamesApiRaw = (await axios.get(`${URL_API}/games?search=${name}&key=${API_KEY}`)).data.results
    // Guardo de videogamesApiRaw solo lo que necesito:
    let videogamesApi = videogamesApiRaw.map(game => {
        if(game.name.toUpperCase().includes(name.toUpperCase())){
            return ({
                id: game.id,
                name: game.name,
                genre: game.genres? game.genres.map((gen) => gen.name) : "sin definir",
                image: game.background_image,
                rating: game.rating === 0? 1 : game.rating,
                created: false
            })
        }
    })   
    return [...videogamesDB, ...videogamesApi].slice(0,15).filter(Boolean)
}


//! createVideogame --> crea y agrega un nuevo juego a la bdd
const createVideogame = async ({name,image,platforms,description,released,rating,genre}) => {
    rating = Number(rating)
    
    const newVideogame = await Videogame.create({
        name,
        image,
        platforms,                
        description,
        released,
        rating,
    })
    
    // Envío todos los genres a la bdd si es que Genres está vacio
    const genresCount = await Genre.count()
    if(genresCount === 0) await getGenres()
    
    // Busco coincidencias entre el array gender recibido por body y los genres que existen en Genres
    const genresFounded = await Promise.all(
        genre.map(async(gen) => {
            const genreFounded = await Genre.findOne({where:{name: gen}})
            if(!genreFounded) {throw new Error(`El género ${gen} es inválido `)}
            
            return genreFounded
        })
        
        )
        await newVideogame.addGenre(genresFounded);
    return newVideogame;
}


module.exports = {
    getVideogames,
    getDetailById,
    getVideogamesByName,
    createVideogame
}