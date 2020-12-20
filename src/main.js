import TripPresenter from "@presenter/trip";
import {TRIP_EVENT} from "./const";
import {generateEvent} from "./mock/event";

export const events = new Array(TRIP_EVENT).fill().map(generateEvent).sort((a, b) => a.startTime - b.startTime);

const eventsContainer = document.querySelector(`.trip-events`);

new TripPresenter(eventsContainer, events);
