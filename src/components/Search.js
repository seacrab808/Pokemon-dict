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

      const inputEl = this.el.querySelector("input");

      let dataFound = false;
      inputEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          dataFound = false;

          for (let i = 0; i < data.length; i++) {
            this.el.setAttribute("href", `#/search?id=${i}`);
            if (data[i] && inputEl.value === data[i].name) {
              window.location.hash = `#/search?${data[i].id}`;
              dataFound = true;
              break;
            }
          }

          if (!dataFound) {
            console.log("데이터가 없습니다");
            window.location.hash = `#/search?notfound`;
          }
        }
      });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
}
