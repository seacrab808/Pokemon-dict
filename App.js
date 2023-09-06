import { Component } from "./src/core/pokemon";
import TheHeader from "./src/components/TheHeader";

export default class App extends Component {
  render() {
    const theHeader = new TheHeader().el;
    const routerView = document.createElement("router-view");

    this.el.append(theHeader, routerView);
  }
}
