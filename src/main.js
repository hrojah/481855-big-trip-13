import TripPresenter from "@presenter/trip";
import {TRIP_EVENT} from "./const";
import {generateEvent} from "./mock/event";
import PointModel from "./model/point";
import FilterModel from "./model/filter";
import FilterPresenter from "@presenter/filter";
export const events = new Array(TRIP_EVENT).fill().map(generateEvent).sort((a, b) => a.startTime - b.startTime);

const pointsModel = new PointModel();
pointsModel.setPoints(events);

const eventsContainer = document.querySelector(`.trip-events`);
const menuContainer = document.querySelector(`.trip-controls`);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(eventsContainer, events, pointsModel, filterModel);
new FilterPresenter(menuContainer, filterModel, pointsModel);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
})
