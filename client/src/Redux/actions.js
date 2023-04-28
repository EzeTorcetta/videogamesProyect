import axios from "axios";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";


// para guardar los juegos que traigo de la bdd, getAllVideogames es una action creator
export const getAllVideogames = () => {
    return async function (dispatch) {
        const gamesData = await axios.get("http://localhost:3001/videogames")
        const videogames = gamesData.data;

        dispatch({ type: GET_ALL_VIDEOGAMES, payload: videogames })

    }
}

//  DETAIL -------------------------------------------------------------------------------------------------

export const getDetail = (id) => {
    return async function (dispatch) {
        const detailData = await axios.get(`http://localhost:3001/videogames/${id}`)
        const detail = detailData.data
       
        dispatch({ type: GET_DETAIL, payload: detail })
    }
}


export const cleanDetail = () => {
    return function (dispatch) {
        dispatch({ type: CLEAN_DETAIL })
    }
}
// GET GENRES-------------------------------------------------------------------------------------------------

export const getGenres = () => {
    return async function (dispatch) {
        const genresData = await axios.get("http://localhost:3001/genres")
        const genres = genresData.data.map((gen) => gen.name)
        
        dispatch({ type: GET_GENRES, payload: genres })
    }
}
// SEARCH BY NAME -------------------------------------------------------------------------------------------------

export const getGamesByName = (name) => {
    return async function(dispatch){
        const gamesData = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        const videogames = gamesData.data;
        
        dispatch({type: GET_GAMES_BY_NAME, payload: videogames })
    }
}
// FILTERS -------------------------------------------------------------------------------------------------

export const filterByGenre = (genres) => {
    return async function(dispatch){
        dispatch({type: FILTER_BY_GENRE, payload: genres})
    }
}

export const originFilter = (origin) =>{
    return {type: FILTER_BY_ORIGIN, payload: origin }
}

// ORDER BY -------------------------------------------------------------------------------------------------

export const nameOrder =(order) =>{
    return {type: ORDER_BY_NAME, payload: order }
}
export const ratingOrder =(order) =>{
    return {type: ORDER_BY_RATING, payload: order }
}