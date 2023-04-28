require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const { Genre } = require("../db");
const axios = require("axios");


const getGenres = async () => {

    const DBGenre = await Genre.findAll()

    if(DBGenre.length) return DBGenre
    else {
        let genresApi = await axios.get(`${URL_API}/genres?key=${API_KEY}`)
        // console.log(genresApi.data.results);
        if (genresApi.data){
           const allGenre = genresApi.data.results.map((el) => ({name: el.name}) )
            Genre.bulkCreate(allGenre);
            return allGenre;
        } 
        else { throw Error("no se pudo") }
    }

}

module.exports = getGenres;