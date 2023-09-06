import { fetchPokemon } from "../api/pokeApi";
import { Component } from "../core/pokemon";

export default class PokemonInfo extends Component {
  async render() {
    try {
      const data = await fetchPokemon();
      // 데이터가 로드된 후에 이 부분에서 데이터를 사용할 수 있음
      console.log(data[10]);
      console.log(data[10].type);

      // 데이터를 HTML에 출력
      this.el.innerHTML = `<div>${data[10].type}</div>`;
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
}
