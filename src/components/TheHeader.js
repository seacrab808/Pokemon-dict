import { fetchPokemon } from "../api/pokeApi";
import { Component } from "../core/pokemon";

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: "header",
    });
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
  async render() {
    const data = await fetchPokemon();

    this.el.innerHTML = /*html*/ `
    <div class="sticky">
      <a href="/#">
        <h1>포켓몬 도감</h1>
      </a>
      <div class="align">
        <a href="#/like">
          <div class="like">
            ❤
          </div>
        </a>
        <div class="switch-mode">
          <div class="check"></div>
        </div>        
      </div>
    </div>
      `;
    const checkBox = document.querySelector(".switch-mode");
    const check = document.querySelector(".check");

    check.addEventListener("click", () => {
      checkBox.classList.toggle("dark-mode");
    });
  }
}
