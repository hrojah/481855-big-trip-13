import TripPresenter from "@presenter/trip";
import {TRIP_EVENT} from "./const";
import {generateEvent} from "./mock/event";

const events = new Array(TRIP_EVENT).fill().map(generateEvent).sort((a, b) => a.startTime - b.startTime);

const route = new Set();
for (event of events) {
  route.add(event.destination);
}
export const routeList = Array.from(route).join(` &mdash; `);

const eventsContainer = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(eventsContainer);
tripPresenter.init(events);

