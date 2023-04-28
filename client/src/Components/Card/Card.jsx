// Este componente debe mostrar la info de cada videogame
import style from "./Card.module.css"
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <Link to={`/detail/${props.id}`} className={style.link}>
            <div className={style.card} 
            style={{ backgroundImage: `url(${props.image})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
                
                <h2>{props.name}</h2>
                <h3>Genre: {props.genre}</h3>

            </div>
        </Link>
    )
}

export default Card;