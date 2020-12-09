import {createTripInfoTemplate} from "@view/trip-info/trip-info-template";
import Abstract from "@view/abstract";

export default class TripInfo extends Abstract {
  constructor(events, routeList) {
    super();
    this._events = events;
    this._routeList = routeList;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events, this._routeList);
  }
}
