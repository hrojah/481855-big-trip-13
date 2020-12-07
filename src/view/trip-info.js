import {createElement} from "../utils";

const createTripInfoTemplate = (events, routeList) => {
  const startDate = events[0].startTime.format(`MMM DD`);
  const endDate = events[events.length - 1].startTime.format(`DD`);
  return `<section class="trip-main__trip-info  trip-info">
           <div class="trip-info__main">
             <h1 class="trip-info__title">${routeList}</h1>

             <p class="trip-info__dates">${startDate} &mdash;&nbsp;${endDate}</p>
           </div>`;
};

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
