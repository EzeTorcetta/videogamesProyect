import {Link, useLocation} from "react-router-dom";
import style from "./NavBar.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getGamesByName, getAllVideogames, filterByGenre } from "../../Redux/actions";
import SearchBar from "../SearchBar/searchBar";



const NavBar = () => {
    
    const location = useLocation()

    const dispatch = useDispatch();
    const {allGenres} = useSelector(state => state)

    // pido todos los genres, para poder hacer los filtrados y para las opciones del form
    useEffect(()=>{
       if(!allGenres.length) dispatch(getGenres())
    },[])

    //? HANDLERS
    // handler para buscar por name
    const onSearch = (name) => {
        dispatch(getGamesByName(name))   
        dispatch(filterByGenre("cleanGenre"))
    }
    // resetGames me vuelve a traer los 100 juegos cuando toco el boton de home
    const resetGames = () => {
        dispatch(getAllVideogames());
        dispatch(filterByGenre("cleanGenre"))
    }


    return (
        <div className={style.Nav}>
            <Link to="/home" onClick={resetGames} className={style.Link}>Home</Link>
            <Link to="/form" className={style.Link}>Create a videogame</Link>
            {location.pathname === "/home" && <SearchBar onSearch = {onSearch}/>}

        </div>
    )
}

export default NavBar;