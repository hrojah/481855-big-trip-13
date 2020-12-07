import {createEventsListTemplate} from "./trip-events-list-template";
import Abstract from "./abstract";

export default class EventList extends Abstract {
  getTemplate() {
    return createEventsListTemplate();
  }
}
