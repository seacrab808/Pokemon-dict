import { Component } from "../core/pokemon";
import PokemonItem from "../components/PokemonItem";

export default class Home extends Component {
  render() {
    const pokemonItem = new PokemonItem().el;
    this.el.classList.add("container");
    this.el.append(pokemonItem);
  }
}
