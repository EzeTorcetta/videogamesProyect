import { useState } from "react";
import style from "./searchBar.module.css"

const SearchBar = ({onSearch}) => {

    const [name, setName] = useState("");

    const inputHandler = (event) => {
        setName(event.target.value)        
    }
    // para buscar con el "enter"
    const handleKeyDown=(event)=> {
        if (event.key === "Enter") {
            onSearch(name);
            setName("");
        }
    }

    return (
        <div>
        <input className={style.inputSearch} type="text" value={name} placeholder="       Search by name .." onChange={inputHandler} onKeyDown={handleKeyDown}/>
        <button className={style.searchButton} onClick={() => {onSearch(name); setName("");}} > Search </button>
        </div>
    )
}

export default SearchBar;