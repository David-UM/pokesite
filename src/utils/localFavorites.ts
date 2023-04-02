
import { ShortPokemon } from "@/interfaces"



let comprobar = (barray:ShortPokemon[], exterior: ShortPokemon) =>{
    const check = (e:ShortPokemon)=> e.PokeId === exterior.PokeId
    let verdad = barray.findIndex(check)
    if(verdad !==-1) {
      return true
    }else {
      return false
    }
  }

const toggleFavorite = (obj: ShortPokemon) => {
    console.log("Toggle llamado p")
    let favorites: ShortPokemon[] = JSON.parse(localStorage.getItem('favorites') || "[]")

    if(comprobar(favorites, obj)){
        favorites = favorites.filter(e => e.PokeId !== obj.PokeId)
    }else {
        favorites.push(obj)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const isFavorite = (obj: ShortPokemon):boolean => {

    if(typeof window == "undefined") return false

    let favorites: ShortPokemon[] = JSON.parse(localStorage.getItem('favorites') || "[]")

    return comprobar(favorites, obj)
}

const pokemons = ():ShortPokemon[] => {
    return JSON.parse(localStorage.getItem('favorites') || "[]")
}


const paraexpo = {
    toggleFavorite,
    isFavorite,
    pokemons,
    comprobar
}
export default paraexpo