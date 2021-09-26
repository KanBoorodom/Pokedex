import React from 'react'
import '../CSS/pokemoncard.css'
import Cute from '../cute.png'
const PokemonCard = ({poke,searchOn,myPokedex,setMyPokedex}) => {
    const pokemon = {}
    /* Info Calculation **********************/
    pokemon.hp =    poke.hp <= 100 ? poke.hp 
                : poke.hp > 100 ? 100
                : 0

    /* str max ที่ 100 และโจทย์ไม่ได้บอก higher than 100  */
    /* check hp to prevent undefined */
    pokemon.str =   ( pokemon.hp > 0 && poke.attacks.length === 1 ) ? 50   
                : ( pokemon.hp > 0 && poke.attacks.length === 2 ) ? 100
                : 0

    /* weak max ที่ 100 และโจทย์ไม่ได้บอก higher than 100  */
    pokemon.weak =  ( pokemon.hp > 0 && poke.weaknesses.length === 1 ) ? 100   
                : 0

    const dmgCalculate = () => {
        let totalDamage = 0
        /* กรณีที่ไม่ใช่ pokemon */
        if(!poke.attacks){
            return 0
        }
        /* กรณี pokemon */
        for(let i = 0; i < poke.attacks.length; i++){
            /* ใช้ replace เพื่อในกรณีที่เจอตัวอักษรก่อนตัวเลข ถ้า parseInt เลยจะออกเป็น NaN*/
            const intDamage = parseInt(poke.attacks[i].damage.replace(/[^0-9]/g, ""))
            /* เช็ต NaN อีกครั้งกันกรณีที่เจอ parseInt('') */
            if(!isNaN(intDamage)){
                totalDamage += intDamage
            }  
        }
        return totalDamage
    }
    pokemon.dmg = dmgCalculate()

    /* 
        สูตรคํานวณ ((HP / 10) + (Damage /10 ) + 10 - (Weakness)) / 5
    */
    const happy =  ( (pokemon.hp/10) + (pokemon.dmg/10) + 10 - (pokemon.weak) ) / 5
    const cvtHappy = Math.abs(Math.round(happy)) 

    pokemon.happy = [...Array(cvtHappy)]
    /****************************************/

    const addHandle = ()=>{
        setMyPokedex([...myPokedex, poke])
    }
    const delHandle = ()=>{
        setMyPokedex(myPokedex.filter( p => p.name !== poke.name))
        
    }
    return (
        <div className = {searchOn ? "pokeCard--Search" : "pokeCard"}>
            <img style = {{width:'50%'}} className = "pokeCard__img" src={poke.imageUrl} alt="pokemon pic" />
            <div className = "pokeCard__infoContainer">
                <div style = {{display:'flex',justifyContent:'space-between'}}>
                    <h2 className = "pokeCard__name">{poke.name}</h2>  
                    {searchOn ? <p className = "pokeCard__add" onClick = {addHandle}>Add</p>:
                                <p className = "pokeCard__del" onClick = {delHandle}>X</p>}
                </div>
                <div className = "poke__info">
                    <p className = {searchOn ? "pokeInfo__name--Search" : "pokeInfo__name"}>HP</p> 
                    <div className = {searchOn ? "pokeInfo__bar--Search" : "pokeInfo__bar"}>
                        <span style = {{width:`${pokemon.hp}%`}} className = "pokeBar__percent"></span>
                    </div>
                </div>
                <div className = "poke__info">
                    <p className = {searchOn ? "pokeInfo__name--Search" : "pokeInfo__name"}>STR</p> 
                    <div className = {searchOn ? "pokeInfo__bar--Search" : "pokeInfo__bar"}> 
                        <span style = {{width:`${pokemon.str}%`}} className = "pokeBar__percent"></span>
                    </div>
                </div>
                <div className = "poke__info">
                    <p className = {searchOn ? "pokeInfo__name--Search" : "pokeInfo__name"}>WEAK</p> 
                    <div className = {searchOn ? "pokeInfo__bar--Search" : "pokeInfo__bar"}> 
                        <span style = {{width:`${pokemon.weak}%`}} className = "pokeBar__percent"></span>
                    </div>
                </div>
                <>
                    {
                        pokemon.happy.map((e,index) => <img key = {index} className = "cute" src = {Cute} alt = "happy level"/>)
                    }
                </>
            </div>
        </div>
    )
}

export default PokemonCard
