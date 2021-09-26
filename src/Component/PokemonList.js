import React from 'react'
import PokemonCard from '../Component/PokemonCard'
import '../CSS/pokemoncard.css'
const PokemonList = ({searchOn,myPokedex,setMyPokedex}) => {
    return (
        <section className = "pokeList">
            {myPokedex.length > 0 && 
                <p 
                    style = {{fontSize:'1.25rem',width:'100%',textAlign:'center',cursor:'pointer',color:'#ec5656'}}
                    onClick = {()=>{setMyPokedex([])}}
                >
                    Clear pokedex
                </p>}
            {
                myPokedex.length > 0 ? myPokedex.map( p => <PokemonCard 
                                            poke = {p} 
                                            searchOn = {searchOn} 
                                            myPokedex = {myPokedex}
                                            setMyPokedex = {setMyPokedex}
                                            key = {p.id}
                                            />)
                :   <p style = {{fontSize:'2rem',width:'100%',textAlign:'center'}}>
                        No pokemon in Pokedex <br />Let's add some pokemon.
                    </p>
            }
        </section>
    )
}

export default PokemonList
