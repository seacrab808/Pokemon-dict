import { createRouter } from "../core/pokemon";
import Home from "./Home";
import Pokemon from "./Pokemon";
import SearchPokemon from "./Search";
import LikePokemon from "./Like";
// import NotFound from "./NotFound";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/pokemon", component: Pokemon },
  { path: "#/search", component: SearchPokemon },
  { path: "#/like", component: LikePokemon },
  // { path: ".*", component: NotFound },
]);
