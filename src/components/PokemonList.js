import { fetchPokemon } from "../api/pokeApi";
import { Component } from "../core/pokemon";

export default class PokemonList extends Component {
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
      console.log(data[0]);

      let html = `<ul class="pokemonList">`;

      for (let i = 0; i < 30; i++) {
        this.el.setAttribute("href", `#/pokemon?id=${i}`);

        html += /*html*/ `
        <a href="#/pokemon?${data[i].id}">
          <li>
            <div class="content">
              <div class="name">
                ${data[i].name}
              </div>
              <div style="background-image: url(${data[i].gif});" class="gif"></div>
              <div class="types">
                ${data[i].type}
              </div>
            </div>
          </li>
        </a>
        `;
      }

      html += "</ul>";

      this.el.innerHTML = html;
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
}
