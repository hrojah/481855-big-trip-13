import {createMenuTemplate} from "@view/trip-menu/trip-menu-template";
import Abstract from "@view/abstract";

export default class TripMenu extends Abstract {
  getTemplate() {
    return createMenuTemplate();
  }
}
