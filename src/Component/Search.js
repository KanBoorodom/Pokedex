import React,{useState,useEffect,useRef} from 'react'
import '../CSS/search.css'
import '../CSS/pokemoncard.css'
import magnify from '../search.png'
import PokemonCard from '../Component/PokemonCard'
const Search = ({searchOn,myPokedex,setMyPokedex,limit,setLimit}) => {
    const [search,setSearch] = useState('')
    const [specificSearch,setSpecificSearch] = useState('')
    const [specificResult,setSpecificResult] = useState([])
    const [pokemonFetch,setPokemonFetch] = useState([])
    const [selectPoke,setSelectpoke] = useState([])
    const [loading,setLoading] = useState(false)

    const firstRender = useRef(true)



    useEffect(()=>{
        let unmount = false
        if(!unmount){
            const fetchData = async () => {
                setLoading(true)
                const res = await fetch(`http://localhost:3030/api/cards?limit=${limit}`)
                const resData = await res.json()
                setPokemonFetch(resData.cards)
                setLoading(false)
            }
            fetchData()    
        }
        return () => {
            unmount = true
        }
        },[limit])

    useEffect(()=>{
        /* search แบบกด enter เพื่อเจาะจง name or type */
        let unmount = false
        if(! unmount && !firstRender.current){
            const fetchSpecific = async (queryName) => {
                setLoading(true)
                const res = await fetch(`http://localhost:3030/api/cards?limit=1xxadsad00&${queryName}=${specificSearch}`)
                const resData = await res.json()
                if(resData.cards.length !== 0){
                    setSpecificResult(resData.cards)
                }
                else{
                    fetchSpecific('type')
                }
                setLoading(false)
            }
            fetchSpecific('name')
        }
        return () => {
            unmount = true
        }
    }, [specificSearch])
    
    /* สร้าง array pokemon name for search filter */
    useEffect(()=>{
        setSelectpoke(myPokedex.map(p => p.name))
    },[myPokedex])

    useEffect(()=>{
        firstRender.current = false
    },[])

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }
    const handleClick = ()=>{
        setLimit(limit+10)
    }
    const submitHandle = (e)=>{
        e.preventDefault()
        setSpecificSearch(search)
    }
    const keyDownHandle = (e) => {
        if( (e.key === "Backspace" || e.key === "Delete") && search.length === 1 ){
            setSpecificResult([])
        }
    }
    /* search filter ให้โชว์เฉพาะแค่ pokemon ที่ยังไม่ได้เลือก หรือ pokemon ที่ name or type includes */
    const filteredPoke = (poke,spec) => { 
                                            if(spec){   /* กรณีมีการ search specific ร่วมด้วย*/
                                                return (poke.filter( p => !selectPoke.includes(p.name)))
                                            }
                                            return poke.filter( p => !selectPoke.includes(p.name) && 
                                                ( 
                                                    (p.name.toLowerCase().includes(search.toLowerCase())) 
                                                    || 
                                                    (p.type.toLowerCase().includes(search.toLowerCase())) 
                                                )
                                            )
                                        }
    
    /* ใช้ชื่อ pokemon ในการ filter ทำให้บางครั้งยังมี bug กรณีชื่อซ้ำกัน */
    let filterResult = []
    if(specificResult.length !== 0){
        filterResult = filteredPoke(specificResult,true)
    }
    else{
        filterResult = filteredPoke(pokemonFetch,false)
    }

    return (
        <div 
            className = 'search__container' 
            onClick = {e => e.stopPropagation()}
        >
            {
                search !== '' && <p className = "searchContainer__p">
                    Type for filter search or Enter for specific search</p>
            }
            <form onSubmit = {submitHandle} className = 'search'>
                <input 
                    className = 'search__input'
                    type="text" 
                    placeholder = 'Find pokemon'    
                    required
                    maxLength = '20'
                    value = {search}
                    onChange = {handleChange}
                    onKeyDown = {keyDownHandle}
                />
                <img src={magnify} onClick = {submitHandle} alt="magnify" className = "search__magnify"/>
            </form>
            {
                loading ? <p  className = "searchContainer__p" style = {{fontSize:'2rem'}} >Loading Data</p> 
                : filterResult.length > 0 ? filterResult.map( p => <PokemonCard 
                                                    poke = {p} 
                                                    searchOn = {searchOn} 
                                                    myPokedex = {myPokedex}
                                                    setMyPokedex = {setMyPokedex}
                                                    key = {p.id}/>)
                :   <p className = "searchContainer__p" style = {{fontSize:'2rem',marginBottom:'5em'}}>
                        Nothing found try enter specific name,type <br /> or maybe there is a typo mistake
                    </p>

            }
            {/* fetch data เพิ่มทีละ 10 */}
            {(!loading && limit !== 100 && search === '') && 
                <p onClick = {handleClick} className = "searchContainer__p" style = {{fontSize:'2rem',cursor:'pointer',color:'#ff1414'}}>
                    Load more pokemon
                </p>
            }
        </div>
    )
}
export default Search
