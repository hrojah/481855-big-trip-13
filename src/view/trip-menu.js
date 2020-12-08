import {createMenuTemplate} from "./trip-menu-template";
import Abstract from "./abstract";

export default class TripMenu extends Abstract {
  getTemplate() {
    return createMenuTemplate();
  }
}
