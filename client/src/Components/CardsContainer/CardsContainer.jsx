import { useEffect, useState } from "react"
import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"

const CardsContainer = () => {

    const { videogamesAux, genresSelected } = useSelector(state => state)
    const buttons = [];
    const [page, setPage] = useState(1)


    useEffect(() => {
        setPage(1)
    }, [videogamesAux])


    //  Maximo de paginas
    for (let i = 1; i <= Math.ceil(videogamesAux.length / 15); i++) {
        buttons.push(i)
    }

    // seleccionar la pagina
    const handlePage = (pageNumber) => {
        setPage(pageNumber);
        document.getElementById("cardsContainer").scrollTo({top: 0});

    }
    // pagina anterior
    const handlePagePrev = () => {
        setPage(page - 1);
        document.getElementById("cardsContainer").scrollTo({top: 0});
    }
    // pagina siguiente
    const handlePageNext = () => {
        setPage(page + 1);
        document.getElementById("cardsContainer").scrollTo({top: 0});
    }


    return (
        <div id="cardsContainer" className={style.cardsContainer}>
            <div className={style.cards}>
                {
                    videogamesAux.length ?
                        (videogamesAux.slice((page - 1) * 15, (page - 1) * 15 + 15)
                            .map(game => {
                                return (
                                    <div key={game.id}>
                                        <Card
                                            key={game.id}
                                            id={game.id}
                                            name={game.name}
                                            genre={game.genre ? game.genre.join(", ") : ""}
                                            image={game.image}
                                            rating={game.rating}
                                        />

                                    </div>
                                )
                            })) : (
                            genresSelected.length ? <p>No results found</p> : <p>loading...</p>
                        )
                }
            </div>

            <div className={style.pagination}>
                {page > 1 && <button className={style.buttonPag} onClick={handlePagePrev}>&lArr;</button>}

                {buttons.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`${style.buttonPag} ${pageNumber === page ? style.active : ""}`}
                        onClick={() => handlePage(pageNumber)}
                    >
                        {pageNumber}
                    </button>))}

                {page < buttons.length && <button className={style.buttonPag} onClick={handlePageNext}>&rArr;</button>}
            </div>

        </div>
    )
}

export default CardsContainer;


