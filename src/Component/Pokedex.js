import React,{useState} from 'react'
import '../CSS/pokedex.css'
import Addpokemon from './Addpokemon'
import PokemonList from './PokemonList'
import Search from './Search'
const Pokedex = () => {     
    const [searchOn,setSearchOn] = useState(false)
    const [myPokedex,setMyPokedex] = useState([])
    const [limit,setLimit] = useState(20)
    const clickHandle = ()=>{
        if(searchOn){
            setSearchOn(false)
        } 
    }
    return (
        <section 
            className = {searchOn ? 'pokedex--searchOn' : 'pokedex'}
            onClick = {clickHandle}
        >
            {searchOn && <Search 
                            searchOn = {searchOn} 
                            myPokedex = {myPokedex}
                            setMyPokedex = {setMyPokedex}    
                            limit = {limit} setLimit = {setLimit} 
                        />}
            <h1 className = 'pokedex__header'>my pokedex</h1>
            <PokemonList myPokedex = {myPokedex} setMyPokedex = {setMyPokedex} searchOn = {searchOn}/>
            <Addpokemon setSearchOn = {setSearchOn}/>
        </section>
    )
}

export default Pokedex
