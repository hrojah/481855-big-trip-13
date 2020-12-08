import TripInfoView from "./view/trip-info";
import TripCostView from "./view/trip-cost";
import TripMenuView from "./view/trip-menu";
import EventFilterView from "./view/trip-filter";
import TripSortView from "./view/trip-sort";
import EventListView from "./view/trip-events-list";
import PointView from "./view/event-item";
import EditPointView from "./view/edit-point-form";
import NoPointView from "./view/no-point";
import {render, RenderPosition, replace} from "./utils/render";
import {generateEvent} from "./mock/event";
import {isEscPressed} from "./utils/common";
import {TRIP_EVENT} from "./const";

const events = new Array(TRIP_EVENT).fill().map(generateEvent).sort((a, b) => a.startTime - b.startTime);

export const route = new Set();
export const routeDate = new Array(events);
for (event of events) {
  route.add(event.destination);
  routeDate.push(event.startTime);
}
const routeList = Array.from(route).join(` &mdash; `);

const tripInfoContainer = document.querySelector(`.trip-main`);
const menuContainer = tripInfoContainer.querySelector(`.trip-controls`);

menuContainer.innerHTML = ``;
render(menuContainer, new TripMenuView(), RenderPosition.BEFOREEND);
render(menuContainer, new EventFilterView(), RenderPosition.BEFOREEND);

const eventsContainer = document.querySelector(`.trip-events`);

const renderTripInfo = (points) => {
  if (points.length === 0) {
    return;
  }
  render(tripInfoContainer, new TripInfoView(points, routeList), RenderPosition.AFTERBEGIN);
  const costContainer = tripInfoContainer.querySelector(`.trip-info`);
  render(costContainer, new TripCostView(points), RenderPosition.BEFOREEND);
}

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent)
  }

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent)
  }

  const onEscKeyDown = (evt) => {
    if (isEscPressed) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  })

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  })

  pointEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointEditComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (pointContainer, points) => {
  const pointList = new EventListView();
  if (!points.length) {
    render(pointContainer, new NoPointView(), RenderPosition.AFTERBEGIN);
    return;
  }
  renderTripInfo(points);
  render(pointContainer, new TripSortView(), RenderPosition.AFTERBEGIN);
  render(pointContainer, pointList, RenderPosition.BEFOREEND)
  points.forEach((point) => renderPoint(pointList, point));
}

renderBoard(eventsContainer, events);
