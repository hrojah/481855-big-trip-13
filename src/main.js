import TripInfoView from "./view/trip-info";
import TripCostView from "./view/trip-cost";
import TripMenuView from "./view/trip-menu";
import EventFilterView from "./view/trip-filter";
import TripSortView from "./view/trip-sort";
import EventListView from "./view/trip-events-list";
import PointView from "./view/event-item";
import EditPointView from "./view/edit-point-form";
import NoPointView from "./view/no-point";
import {render, RenderPosition} from "./utils";
import {generateEvent} from "./mock/event";
import {isEscPressed} from "./utils";
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
render(menuContainer, new TripMenuView().getElement(), RenderPosition.BEFOREEND);
render(menuContainer, new EventFilterView().getElement(), RenderPosition.BEFOREEND);

const eventsContainer = document.querySelector(`.trip-events`);

const renderTripInfo = (points) => {
  if (points.length === 0) {
    return;
  }
  render(tripInfoContainer, new TripInfoView(points, routeList).getElement(), RenderPosition.AFTERBEGIN);
  const costContainer = tripInfoContainer.querySelector(`.trip-info`);
  render(costContainer, new TripCostView(points).getElement(), RenderPosition.BEFOREEND);
}

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement())
  }

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement())
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

  render(pointListElement, pointEditComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (pointContainer, points) => {
  const pointList = new EventListView();
  if (!points.length) {
    render(pointContainer, new NoPointView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }
  renderTripInfo(points);
  render(pointContainer, new TripSortView().getElement(), RenderPosition.AFTERBEGIN);
  render(pointContainer, pointList.getElement(), RenderPosition.BEFOREEND)
  points.forEach((point) => renderPoint(pointList.getElement(), point));
}

renderBoard(eventsContainer, events);
