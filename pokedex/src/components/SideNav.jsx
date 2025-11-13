import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {
    const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } = props
    const [searchValue, setSearchValue] = useState('')

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        //if full pokedex num = curr search num then true
        if (getFullPokedexNumber(eleIndex).includes(searchValue)) { return true }

        // if pokemon name includu curr search name then true
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) { return true }

        return false
    })
    return (
        <nav className={'' + (showSideMenu ? " open" : ' ')}>
            <div className={"header " + (showSideMenu ? " open" : ' ')}>
                <button className="open-nav-button" onClick={handleCloseMenu}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokedex</h1>
            </div>
            <input placeholder="E.g. 001 or Mewto..." type="text" value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)
            }} />
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                return (
                    <button key={pokemonIndex} className={"nav-card " + (pokemonIndex === selectedPokemon ? ' nav-card nav-card-selected' : ' ')}
                        onClick={() => {
                            setSelectedPokemon(truePokedexNumber)
                            handleCloseMenu()
                        }}>
                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}