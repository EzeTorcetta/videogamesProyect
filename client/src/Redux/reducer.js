import { GET_ALL_VIDEOGAMES, GET_DETAIL, CLEAN_DETAIL, GET_GENRES, GET_GAMES_BY_NAME, FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING } from "./actions";

const initialState = {
    videogames: [],
    detail: {},
    allGenres: [],
    genresSelected: [],
    videogamesAux: [],
    videogamesAux2: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_VIDEOGAMES:

            return {
                ...state,
                videogames: action.payload,
                videogamesAux: action.payload,
                videogamesAux2: action.payload

            }

        //-------------------------------------------------------------

        case GET_DETAIL:
            return { ...state, detail: action.payload }

        case CLEAN_DETAIL:
            return { ...state, detail: {} }

        //-------------------------------------------------------------
        case GET_GENRES:
            return { ...state, allGenres: action.payload }

        //-------------------------------------------------------------
        case GET_GAMES_BY_NAME:
            return {
                ...state,
                videogames: [...action.payload],
                videogamesAux: [...action.payload],
                videogamesAux2: [...action.payload]
            }
        //----------------------------------------------------------------------------------------
        case FILTER_BY_GENRE:
            const { videogames, genresSelected } = state;
            let genre = action.payload;
            let genresAux = []

            if (genre !== "cleanGenre") {
                genresAux = genresSelected.includes(genre) ? genresSelected.filter(gen => gen !== genre) : [...genresSelected, genre]// guardo en un array los generos que voy a buscar 
                const selectedByGenre = videogames.filter(game => genresAux.every(gen => game.genre.includes(gen)) ? true : false)//filtro los juegos

                return {                            // actualizo el estado global con los nuevos juegos y generos
                    ...state,
                    videogamesAux: [...selectedByGenre],
                    genresSelected: [...genresAux],
                    videogamesAux2: [...selectedByGenre]
                }
            } else {
                return {                             // actualizo el estado global con todos los juegos
                    ...state,
                    videogamesAux: [...videogames],
                    videogamesAux2: [...videogames],
                    genresSelected: []
                }
            }

        //----------------------------------------------------------------------------------------------------- 
        case FILTER_BY_ORIGIN:
            let origin = action.payload;

            const { videogamesAux2 } = state

            if (origin !== "all") {
                let gamesFiltered = state.videogames.filter(game => game.created.toString() === origin)  // guardo todos los juegos que coinciden con el origin                

                let concatenated = gamesFiltered.filter(game => videogamesAux2.includes(game))

                return {
                    ...state,
                    videogamesAux: [...concatenated]
                }
            } else {
                console.log(videogamesAux2);
                return {
                    ...state,
                    videogamesAux: [...videogamesAux2]
                }
            }

        //-------------------------------------------------------------
        case ORDER_BY_NAME:

            let order = action.payload;
            let videogamesOrdered = []

            if (order === 'A-Z') {
                videogamesOrdered = state.videogamesAux.sort((x, y) => {
                    if (x.name < y.name) return -1;
                    if (x.name > y.name) return 1;
                    return 0;
                })
            }
            if (order === 'Z-A') {
                videogamesOrdered = state.videogamesAux.sort((x, y) => {
                    if (x.name < y.name) return 1;
                    if (x.name > y.name) return -1;
                    return 0;
                })
            }

            return {
                ...state,
                videogamesAux: [...videogamesOrdered]
            }

        //-------------------------------------------------------------    

        case ORDER_BY_RATING:

            let orderRating = action.payload;
            let videogamesOrderRating = []

            if (orderRating === 'Ascending') {
                videogamesOrderRating = state.videogamesAux.sort((x, y) => x.rating - y.rating)
            }
            if (orderRating === 'Descending') {
                videogamesOrderRating = state.videogamesAux.sort((x, y) => y.rating - x.rating)
            }

            return {
                ...state,
                videogamesAux: [...videogamesOrderRating]
            }

        default:
            return { ...state };
    }
}

export default rootReducer;