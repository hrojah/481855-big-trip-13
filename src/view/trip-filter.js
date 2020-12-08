import {createFilterTemplate} from "./trip-filter-template";
import Abstract from "./abstract";

export default class EventFilter extends Abstract {
  getTemplate() {
    return createFilterTemplate();
  }
}
