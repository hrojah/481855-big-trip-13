import {createEventsListTemplate} from "@view/trip-event-list/trip-events-list-template";
import Abstract from "@view/abstract";

export default class EventList extends Abstract {
  getTemplate() {
    return createEventsListTemplate();
  }
}
