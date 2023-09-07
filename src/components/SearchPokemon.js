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
      if (id === "notfound") {
        this.el.innerHTML = /*html*/ `
          <div class="no-pokemon">검색한 포켓몬이 없습니다 ! <br /> 다시 검색해주세요.</div>
          <a href="#/" class="go-back">
            <div>돌아가기</div>
          </a>
        `;
      } else {
        const pokeID = id - 1;
        console.log(data[pokeID]);

        const height = (data[pokeID].height * 0.1).toFixed(1);
        const weight = (data[pokeID].weight * 0.1).toFixed(1);

        this.el.innerHTML = /*html*/ `
        <div class="pokemon-container">
          <div class="like-btn no-heart">❤</div>
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

        // 이벤트 위임을 사용하여 좋아요 및 싫어요 버튼 이벤트 처리
        document.addEventListener("click", (event) => {
          const target = event.target;

          if (target.classList.contains("like-btn")) {
            if (target.classList.contains("no-heart")) {
              localStorage.setItem(data[pokeID].id, data[pokeID].id);
              console.log("하트");
              target.classList.remove("no-heart");
              target.classList.add("heart");
            } else if (target.classList.contains("heart")) {
              localStorage.removeItem(data[pokeID].id);
              console.log("지워");
              target.classList.remove("heart");
              target.classList.add("no-heart");
            }
          }
        });

        let likeIds = [];

        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          likeIds.push(key * 1);
        }

        const likeBtn = document.querySelector(".like-btn");

        if (likeIds.includes(data[pokeID].id)) {
          likeBtn.classList.add("heart");
          likeBtn.classList.remove("no-heart");
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
}
