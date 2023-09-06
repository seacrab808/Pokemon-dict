import { Component } from "../core/pokemon";
import Headline from "../components/Headline";

export default class Home extends Component {
  render() {
    const headline = new Headline().el;

    this.el.classList.add("container");
    this.el.append(headline);
    console.log("Home 컴포넌트 렌더링됨"); // 로그 추가
  }
}
