import {createSortTemplate} from "./trip-sort-template";
import Abstract from "./abstract";

export default class TripSort extends Abstract {
  getTemplate() {
    return createSortTemplate();
  }
}
