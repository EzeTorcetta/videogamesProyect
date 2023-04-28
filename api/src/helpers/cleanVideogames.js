const cleanVideogames = (rawVideogames) => {

    //? Mapeo el array de las promesas resueltas y obtengo un array añidado con otros array de objetos

    const cleanData = rawVideogames.map(page => page.data.  
    results.map(game => {
        return ({
            id: game.id,
            name: game.name,
            genre: game.genres? game.genres.map((gen) => gen.name) : "sin definir",
            image: game.background_image,
            rating: game.rating === 0? 1 : game.rating,
            created: false
        })
    })
    )
    //como cada promesa se resuelve a un array de objetos, obtenemos en videogames un array con varios arrays de objetos,
    // los sacamos de la siguiente manera:
    return cleanData.flat()
}

module.exports = cleanVideogames;