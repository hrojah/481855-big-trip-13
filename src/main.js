import { createTripInfoTemplate } from "./view/trip-info";
import { createTripCostTemplate } from "./view/trip-cost";
import { createMenuTemplate } from "./view/trip-menu";
import { createFilterTemplate } from "./view/trip-filter";
import { createSortTemplate } from "./view/trip-sort";
import { createEventsListTemplate } from "./view/trip-events-list";
import { createEventItemTemplate } from "./view/event-item";
import { createEditPointFormTemplate } from "./view/edit-point-form";
import { createAddPointFormTemplate } from "./view/new-point-form";
import { generateEvent } from "./mock/event";

const TRIP_EVENT = 20;

export const events = new Array(TRIP_EVENT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startTime - b.startTime);

export const route = new Set();
export const routeDate = new Array(events);
for (event of events) {
  route.add(event.destination);
  routeDate.push(event.startTime);
}
const routeList = Array.from(route).join(` &mdash; `);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoContainer = document.querySelector(`.trip-main`);

render(
  tripInfoContainer,
  createTripInfoTemplate(events, routeList),
  `afterbegin`
);

const costContainer = tripInfoContainer.querySelector(`.trip-info`);

render(costContainer, createTripCostTemplate(events), `beforeend`);

const menuContainer = tripInfoContainer.querySelector(`.trip-controls`);

menuContainer.innerHTML = ``;
render(menuContainer, createMenuTemplate(), `beforeend`);
render(menuContainer, createFilterTemplate(), `beforeend`);

const eventsContainer = document.querySelector(`.trip-events`);

render(eventsContainer, createSortTemplate(), `beforeend`);
render(eventsContainer, createEventsListTemplate(), `beforeend`);

const eventList = eventsContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_EVENT; i++) {
  render(eventList, createEventItemTemplate(events[i]), `beforeend`);
}

const eventItem = eventList.querySelectorAll(`.trip-events__item`);

render(eventItem[0], createEditPointFormTemplate(events[0]), `beforeend`);
