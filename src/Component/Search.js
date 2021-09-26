import React,{useState,useEffect} from 'react'
import '../CSS/search.css'
import '../CSS/pokemoncard.css'
import PokemonCard from '../Component/PokemonCard'
const Search = ({searchOn,myPokedex,setMyPokedex,limit,setLimit}) => {
    const [search,setSearch] = useState('')
    const [pokemonFetch,setPokemonFetch] = useState([])
    const [loading,setLoading] = useState(false)
    const selectPoke = myPokedex.map(p => p.name)
    useEffect(()=>{
            const fetchData = async() => {
                setLoading(true)
                await fetch(`http://localhost:3030/api/cards?limit=${limit}`)
                .then(res => res.json())
                .then(
                result => {
                    setPokemonFetch(result.cards)
                    setLoading(false)
                },
                (error) => {
                    console.log(error)
                }
                )
            }
            fetchData()
        },[limit])
    console.log(pokemonFetch) 
    const handleChange = (e)=>{
        setSearch(e.target.value)
        document.location.reload(true)
    }
    const handleClick = ()=>{
        setLimit(limit+10)
        console.log(limit)
    }
    console.log(limit)
    /* search filter ให้โชว์เฉพาะแค่ pokemon ที่ยังไม่ได้เลือก หรือ pokemon ที่ name or type includes */
    const filteredPoke = pokemonFetch.filter( p => !selectPoke.includes(p.name) && 
                                                    ( 
                                                        (p.name.toLowerCase().includes(search.toLowerCase())) 
                                                        || 
                                                        (p.type.toLowerCase().includes(search.toLowerCase())) 
                                                    )
                                            )
    return (
        <div 
            className = 'search__container' 
            onClick = {e => e.stopPropagation()}
        >
            <form className = 'search'>
                <input 
                    className = 'search__input'
                    type="text" 
                    placeholder = 'Find-pokemon'    
                    value = {search}
                    onChange = {handleChange}
                />
            </form>
            {
                loading ? <p style = {{fontSize:'2rem',width:'100%',textAlign:'center'}} >Loading Data</p> 
                : filteredPoke.map( p => <PokemonCard 
                                            poke = {p} 
                                            searchOn = {searchOn} 
                                            myPokedex = {myPokedex}
                                            setMyPokedex = {setMyPokedex}
                                            key = {p.id}/>)
            }
            {/* fetch data เพิ่มทีละ 10 */}
            {(!loading && limit !== 100) && 
                <p onClick = {handleClick} style = {{fontSize:'2rem',width:'100%',textAlign:'center'}}>Load more pokemon</p>
            }
        </div>
    )
}
export default Search
