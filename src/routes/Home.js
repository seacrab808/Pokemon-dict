import { Component } from "../core/pokemon";
import Search from "../components/Search";
import PokemonList from "../components/PokemonList";

export default class Home extends Component {
  render() {
    const search = new Search().el;
    const pokemonList = new PokemonList().el;

    this.el.classList.add("container");
    this.el.append(search, pokemonList);
  }
}
