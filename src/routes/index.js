import { createRouter } from "../core/pokemon";
import Home from "./Home";
// import Pokemon from "./Pokemon";
// import About from "./About";
// import NotFound from "./NotFound";

export default createRouter([
  { path: "#/", component: Home },
  // { path: "#/pokemon", component: Pokemon },
  // { path: "#/about", component: About },
  // { path: ".*", component: NotFound },
]);
