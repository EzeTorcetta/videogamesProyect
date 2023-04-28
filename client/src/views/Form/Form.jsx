import { useState } from "react";
import style from "./Form.module.css"
import { useSelector } from "react-redux";
import validations from "./validation";
import axios from "axios";
import platforms from "./platforms"
import { useNavigate } from "react-router-dom";

const Form = () => {

    const { allGenres } = useSelector(state => state)
    const navigate = useNavigate()
    // Estado interno de Form
    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        platforms: [],
        released: "",
        rating: "",
        genre: [],
    })
    const [errors, setErrors] = useState({
        name: "",
        image: "",
        description: "",
        platforms: "",
        released: "",
        rating: "",
        genre: "",
    })

    // Cambio el estado cada vez que se escribe algo en los input:
    const changeInputHandler = (event) => {
        const property = event.target.name;
        let value = event.target.value;

        setErrors(validations({ ...form, [property]: value }))
        setForm({ ...form, [property]: value })

    }

    // onChange de los CHECKBOX:
    const changeCheckboxHandler = (event) => {

        const property = event.target.name;
        let value = event.target.value;

        value = [value];

        if (!form[property].includes(value[0])) {
            // Si el elemento seleccionado no existe en el estado
            setErrors(validations({ ...form, [property]: [...form[property], ...value] }))
            setForm({ ...form, [property]: [...form[property], ...value] })
        }
        else {
            // si el elemento seleccionado existe, lo saco del estado
            setErrors(validations({ ...form, [property]: form[property].filter(el => el !== value[0]) }))
            setForm({ ...form, [property]: form[property].filter(el => el !== value[0]) })
        }
    }
    // SUBMIT
    const submitHandler = (event) => {
        event.preventDefault()
        if(!form.name) alert("error al crear el juego")
        else{
            axios.post(`http://localhost:3001/videogames`, form)
            .then(res => navigate(`/detail/${res.data.id}`)) // que me lleve al detail del juego creado
            .catch(error => alert(error))
        }
        
        // document.forms["formTag"].reset(); // para vaciar el form

    }

    return (
        <div className={style.formContainer}>
            <form name="formTag" onSubmit={submitHandler} className={style.form}>

                <div className={style.field}>
                    <label htmlFor="name"> Name: </label>
                    <input type="text" value={form.name} onChange={changeInputHandler} name="name" maxLength={40} />
                </div>
                {errors.name && <span style={{ color: "red" }} >{errors.name}</span>}

                <div className={style.field}>
                    <label htmlFor="image"> Image URL:</label>
                    <input type="text" value={form.image} onChange={changeInputHandler} name="image" />
                </div>
                {errors.image && <span style={{ color: "red" }} >{errors.image}</span>}

                <div className={style.field}>
                    <label htmlFor="description"> Description: </label>
                    <textarea value={form.description} onChange={changeInputHandler} name="description" maxLength={300} />
                </div>
                {errors.description && <span style={{ color: "red" }} >{errors.description}</span>}

                <div className={style.field}>
                    <label htmlFor="released"> Released: </label>
                    <input type="date" value={form.released} onChange={changeInputHandler} name="released" />
                </div>
                {errors.released && <span style={{ color: "red" }} >{errors.released}</span>}

                <div className={style.field}>
                    <label htmlFor="rating"> Rating: </label>
                    <input type="number" value={form.rating} onChange={changeInputHandler} name="rating" min={1} max={5} step={0.1} />
                </div>
                {errors.rating && <span style={{ color: "red" }} >{errors.rating}</span>}


                <div className={style.checkboxContainer}>
                    <label htmlFor="platforms" > PLATFORMS: </label>
                    {platforms.map((plat) => {

                        return (
                            <label htmlFor={plat} key={plat} >
                                <input type="checkbox" name="platforms" key={plat} value={plat} onChange={changeCheckboxHandler}></input>
                                {plat}
                            </label>
                        )
                    })}
                </div>
                {errors.platforms && <span style={{ color: "red" }} >{errors.platforms}</span>}


                <div className={style.checkboxContainer}>
                    <label htmlFor="genres"> GENRES:   </label>
                    {allGenres.map((gen) => {

                        return (
                            <label htmlFor={gen} key={gen} >
                                <input type="checkbox" name="genre" key={gen} value={gen} onChange={changeCheckboxHandler}></input>
                                {gen}
                            </label>
                        )
                    })}
                </div>
                {errors.genre && <span style={{ color: "red" }} >{errors.genre}</span>}

                <button className={style.submitButton} type="submit" disabled={Object.values(errors).length ? true : false}>Create videogame!</button>

            </form>

        </div>
    )
}

export default Form;