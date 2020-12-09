import {createTripCostTemplate} from "@view/trip-cost/trip-cost-template";
import Abstract from "@view/abstract";

export default class TripCost extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }
}
