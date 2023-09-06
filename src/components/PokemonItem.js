import { fetchPokemon } from "../api/pokeApi";
import { Component } from "../core/pokemon";

export default class PokemonItem extends Component {
  constructor() {
    super({
      tagName: "section",
    });
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  async render() {
    try {
      const data = await fetchPokemon();
      const [hash, id] = location.hash.split("?");
      const pokeID = id - 1;
      console.log(data[pokeID]);

      const height = (data[pokeID].height * 0.1).toFixed(1);
      const weight = (data[pokeID].weight * 0.1).toFixed(1);

      this.el.innerHTML = /*html*/ `
        <div class="pokemon-container">
          <div class="id"># ${data[pokeID].id}</div>
          <div class="name">${data[pokeID].name}</div>
          <div class="gif" style="background-image: url(${data[pokeID].gif});"></div>
          <div class="genera">${data[pokeID].genera}</div>
          <div class="size">
            <div class="size-box">
              <div class="description">신장</div>
              <div>${height}m</div>

            </div>
            <div class="size-box">
              <div class="description">무게</div>
              <div>${weight}kg</div>
            </div>
          </div>
          <div class="text">${data[pokeID].text}</div>

          

        </div>
      `;
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
}
