import { fetchPokemon } from "../api/pokeApi";
import { Component } from "../core/pokemon";

export default class Like extends Component {
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

      let likeIds = [];

      // 로컬 스토리지에서 ID를 가져오기
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        likeIds.push(key);
      }

      let html = `<ul class="pokemonList">`;

      for (let i = 0; i < likeIds.length; i++) {
        const pokeID = likeIds[i] - 1;
        html += /*html*/ `
        <a href="#/pokemon?${data[pokeID].id}">
          <li>
            <div class="content">
              <div class="name">
                ${data[pokeID].name}
              </div>
              <div style="background-image: url(${data[pokeID].gif});" class="gif"></div>
              <div class="genera">
                ${data[pokeID].genera}
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
