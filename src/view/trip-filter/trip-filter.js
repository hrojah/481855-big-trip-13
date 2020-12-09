import {createFilterTemplate} from "@view/trip-filter/trip-filter-template";
import Abstract from "@view/abstract";

export default class EventFilter extends Abstract {
  getTemplate() {
    return createFilterTemplate();
  }
}
