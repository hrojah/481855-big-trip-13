import {createTripCostTemplate} from "./trip-cost-template";
import Abstract from "./abstract";

export default class TripCost extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }
}
