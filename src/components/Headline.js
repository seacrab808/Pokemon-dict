import { fetchPokemon } from "../api/pokeApi";
import { Component } from "../core/pokemon";

export default class Headline extends Component {
  async render() {
    try {
      const data = await fetchPokemon();
      console.log(data[10]);
      console.log(data[10].type);

      this.el.innerHTML = `<div>${data[10].type}</div>`;
      console.log("Headline 컴포넌트 렌더링됨"); // 로그 추가
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
}
