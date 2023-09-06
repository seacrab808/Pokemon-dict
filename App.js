import { Component } from "./src/core/pokemon";
import PokemonInfo from "./src/components/render";

export default class App extends Component {
  render() {
    const routerView = document.createElement("router-view");
    const pokemonInfo = new PokemonInfo().el;

    this.el.append(routerView, pokemonInfo);
  }
}
