import React from 'react'
import '../CSS/pokedex.css'
const Addpokemon = ({setSearchOn}) => {
    const clickHandle = ()=>{
        setSearchOn(true)
    }
    return (
        <div className = 'addPokemon'>
            <div onClick = {clickHandle} className = "addPokemon__plusSign">+</div>
        </div>
    )
}

export default Addpokemon
