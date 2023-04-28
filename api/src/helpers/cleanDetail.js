//! Clean details traido por id:
 
const cleanDetailApi = (detail) => ({

    id: detail.id,
    name: detail.name,
    image: detail.background_image,
    platforms: detail.platforms.map(el => el.platform.name),
    description: detail.description,
    released: detail.released,
    rating: detail.rating,
    genre: detail.genres.map(el => el.name),
    created: false
})

const cleanDetailDB = (detail) => ({

    id: detail.id,
    name: detail.name,
    image: detail.image,
    platforms: detail.platforms,
    description: detail.description,
    released: detail.released,
    rating: detail.rating,
    genre: detail.Genres.map(gen => gen.name),
    created: detail.created

})

module.exports = { cleanDetailApi, cleanDetailDB}