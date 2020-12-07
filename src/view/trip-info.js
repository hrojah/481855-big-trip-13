import {createElement} from "../utils";
import {createTripInfoTemplate} from "./trip-info-template";

export default class TripInfo {
  constructor(events, routeList) {
    this._events = events;
    this._routeList = routeList;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events, this._routeList);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
