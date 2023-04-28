const getGenres = require ("../Controllers/genreController")

const getGenreHandler = async(req,res) =>{
    try {
        const genres = await getGenres();
        if(genres) res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
// const getGenreHandler = (req,res)=>{
   
//     getGenres()
//     .then(response => res.status(200).json(response.data))
//     .catch(error => res.status(500).json({error: error.message}))
   
// }

module.exports = getGenreHandler;