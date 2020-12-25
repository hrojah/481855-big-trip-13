import {createTripInfoTemplate} from "@view/trip-info/trip-info-template";
import Abstract from "@view/abstract";

export default class TripInfo extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
