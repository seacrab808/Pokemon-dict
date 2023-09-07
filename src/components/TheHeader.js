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

    const root = document.querySelector("#root");
    const checkBox = document.querySelector(".switch-mode");
    const check = document.querySelector(".check");

    // 다크 모드 토글 기능 추가
    check.addEventListener("click", () => {
      checkBox.classList.toggle("dark-mode");

      // 다크 모드 토글 상태를 sessionStorage에 저장
      const isDarkMode = checkBox.classList.contains("dark-mode");
      sessionStorage.setItem("darkMode", isDarkMode);

      // root 요소에도 다크 모드 클래스를 추가 또는 제거
      root.classList.toggle("dark-mode", isDarkMode);
    });

    // 페이지 로드 시 저장된 다크 모드 설정 불러오기
    const savedDarkMode = sessionStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      checkBox.classList.add("dark-mode");
      root.classList.add("dark-mode"); // 페이지 로드 시 root 요소에 다크 모드 클래스 추가
    }
  }
}
