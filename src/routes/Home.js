import { Component } from "../core/pokemon";
import TheHeader from "../components/TheHeader";
import Search from "../components/Search";
import PokemonList from "../components/PokemonList";

export default class Home extends Component {
  render() {
    const theHeader = new TheHeader().el;
    const search = new Search().el;
    const pokemonList = new PokemonList().el;

    this.el.classList.add("container");
    this.el.append(theHeader, search, pokemonList);
  }
}
