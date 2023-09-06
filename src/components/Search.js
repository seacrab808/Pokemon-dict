import { fetchPokemon } from "../api/pokeApi";
import { Component } from "../core/pokemon";

export default class Search extends Component {
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

      this.el.innerHTML = /*html*/ `
        <div class="search-box">
          <input placeholder="포켓몬 이름으로 검색하세요"></input>
        </div>
      `;
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
}
