const cleanVideogamesDB = (rawVideogamesDB) => {
    return rawVideogamesDB.map(game => {
        return ({
            id: game.id,
            name: game.name,
            genre: game.Genres.map((gen) => gen.name),
            image: game.image,
            rating: game.rating,
            created: true
        })
    })
} 
module.exports = cleanVideogamesDB;