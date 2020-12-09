import {createSortTemplate} from "@view/trip-sort/trip-sort-template";
import Abstract from "@view/abstract";

export default class TripSort extends Abstract {
  getTemplate() {
    return createSortTemplate();
  }
}
