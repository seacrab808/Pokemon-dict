import { Component } from "../core/pokemon";
import Search from "../components/Search";
import SearchPokemon from "../components/SearchPokemon";

export default class SearchPokemon extends Component {
  render() {
    const search = new Search().el;
    const searchPokemon = new SearchPokemon().el;
    this.el.classList.add("container");
    this.el.append(search, searchPokemon);
  }
}
