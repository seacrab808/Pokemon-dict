import { Component } from "../core/pokemon";
import Like from "../components/LikePokemon";

export default class LikePokemon extends Component {
  render() {
    const like = new Like().el;
    this.el.classList.add("container");
    this.el.append(like);
  }
}
