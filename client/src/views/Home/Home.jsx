// vista que contiene los componentes CardsContainer, Card y Navbar
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { getAllVideogames, filterByGenre, originFilter, nameOrder, ratingOrder } from "../../Redux/actions"
import style from "./Home.module.css"


const Home = () => {

    //cuando se monta, que haga el dispatch (useEffect y useDispatch)
    const dispatch = useDispatch();
    const { videogamesAux, allGenres, genresSelected, videogamesAux2 } = useSelector(state => state)

    useEffect(() => {
        if (!videogamesAux.length && !genresSelected.length) {
            
            dispatch(getAllVideogames());
        };
    }, [videogamesAux])



    // Vacío los checkbox 
    if(!genresSelected.length){
        document.querySelectorAll('#genresCheckboxes input[type=checkbox]').forEach(checkbox => checkbox.checked = false);
    }



    // FILTER por genre
    const genFilterHandler = (event) => {
        let genre = event.target.value;
        dispatch(filterByGenre(genre))

        if (genre === "cleanGenre") {
            document.querySelectorAll('#genresCheckboxes input[type=checkbox]').forEach(checkbox => checkbox.checked = false);
        }
    }
    //FILTER por origen
    const originFilterHandler = (event) => {
        let origin = event.target.value;
        dispatch(originFilter(origin))
    }
    // ORDER por name 
    const nameOrderHandler = (event) => {
        let order = event.target.value;
        dispatch(nameOrder(order))
    }
    // ORDER por rating
    const ratingOrderHandler = (event) => {
        let order = event.target.value;
        dispatch(ratingOrder(order))
    }


    return (
        <div className={style.homeContainer}>
            <div >
                <div className={style.genresContainer} id="genresCheckboxes">
                    {allGenres.map(gen => {
                        return (
                            <div key={gen}>
                                {gen}
                                <input type="checkbox" name="genre" key={gen} value={gen} onChange={genFilterHandler}></input>
                            </div>
                        )
                    })}
                </div>


                <div className={style.buttonsContainer}>
                    <button className={style.cleanGenres} name="cleanGenre" value={"cleanGenre"} onClick={genFilterHandler}>Clean genres filter</button>

                    <select className={style.select} value="" name="" onChange={originFilterHandler}>
                        <option hidden>Origin</option>
                        <option value='all' > All Games </option>
                        <option value={false} > Site Games </option>
                        <option value={true} > Users Games </option>
                    </select>
                    <select className={style.select} value="" name="" onChange={nameOrderHandler}>
                        <option hidden>Alphabetical</option>
                        <option value='A-Z' >&uArr;&dArr; A-Z </option>
                        <option value='Z-A' >&uArr;&dArr; Z-A </option>
                    </select>
                    <select className={style.select} value="" name="" onChange={ratingOrderHandler}>
                        <option hidden>Rating</option>
                        <option value='Ascending' >&uArr; Raiting </option>
                        <option value='Descending' >&dArr; Raiting </option>
                    </select>
                </div>

            </div>
            <CardsContainer />
        </div>
    )
}

export default Home;