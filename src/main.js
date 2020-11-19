import {createTripInfoTemplate} from "./view/trip-info";
import {createTripCostTemplate} from "./view/trip-cost";
import {createMenuTemplate} from "./view/trip-menu";
import {createFilterTemplate} from "./view/trip-filter";
import {createSortTemplate} from "./view/trip-sort";
import {createEventsListTemplate} from "./view/trip-events-list";
import {createEventItemTemplate} from "./view/event-item";
import {createEditPointFormTemplate} from "./view/edit-point-form";
import {createAddPointFormTemplate} from "./view/new-point-form";

const TRIP_EVENT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

const tripInfoContainer = document.querySelector(`.trip-main`);

render(tripInfoContainer, createTripInfoTemplate(), `afterbegin`);

const costContainer = tripInfoContainer.querySelector(`.trip-info`);

render(costContainer, createTripCostTemplate(), `beforeend`);

const menuContainer = tripInfoContainer.querySelector(`.trip-controls`);

menuContainer.innerHTML = ``;
render(menuContainer, createMenuTemplate(), `beforeend`);
render(menuContainer, createFilterTemplate(), `beforeend`);

const eventsContainer = document.querySelector(`.trip-events`);

render(eventsContainer, createSortTemplate(), `beforeend`);
render(eventsContainer, createEventsListTemplate(), `beforeend`);

const eventList = eventsContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_EVENT; i++) {
  render(eventList, createEventItemTemplate(), `beforeend`);
}

const eventItem = eventList.querySelectorAll(`.trip-events__item`);

render(eventItem[0], createEditPointFormTemplate(), `beforeend`);
render(eventItem[2], createAddPointFormTemplate(), `beforeend`);
