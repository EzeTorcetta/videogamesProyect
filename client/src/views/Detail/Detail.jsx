import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getDetail, cleanDetail } from "../../Redux/actions";
import style from "./Detail.module.css"



const Detail = () => {

    const detail = useSelector(state => state.detail)

    const dispatch = useDispatch();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(cleanDetail())
        }
    }, [id])

    // console.log(detail)

    return (
        <div className={style.detailContainer}>
            {
                detail.name? (
                    <div className={style.detail}>
                        <p>{detail.name}</p>
                        <p>ID: {detail.id}</p>
                        <img src= {detail.image}alt="Loading..." />
                        <h4>Platforms:</h4>
                        <p>{detail.platforms ? detail.platforms.join(", ") : ""}</p>
                        <h4>Description:</h4>
                        <p>{detail.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                        <p>Released: {detail.released}</p>
                        <p>Rating: {detail.rating === 0? 1 : detail.rating}</p>
                        <p>Genres: {detail.genre ? detail.genre.join(", ") : ""}</p>
                    </div >
                ) : (
                    <p>Loading... </p>
                )
            }
        </div>
    )
}

export default Detail;