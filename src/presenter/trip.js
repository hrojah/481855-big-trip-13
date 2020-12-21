import EventListView from "@view/trip-event-list/trip-events-list";
import NoPointView from "@view/no-point/no-point";
import TripSortView from "@view/trip-sort/trip-sort";
import TripMenuView from "@view/trip-menu/trip-menu";
import EventFilterView from "@view/trip-filter/trip-filter";
import TripInfoView from "@view/trip-info/trip-info";
import TripCostView from "@view/trip-cost/trip-cost";
import PointPresenter from "@presenter/point";
import {render, RenderPosition} from "@utils/render";
import {updateItem} from "@utils/common";
import {SORT_TYPE} from "../const";
import {sortPointPrice, sortPointTime} from "@utils/point";

export default class Trip {
  constructor(pointsContainer, events) {
    this._pointsContainer = pointsContainer;
    this._pointPresenter = {};
    this._currentSortType = SORT_TYPE.DEFAULT;

    this._noPointComponent = new NoPointView();
    this._sortComponent = new TripSortView();
    this._pointListComponent = new EventListView();
    this._tripMenuComponent = new TripMenuView();
    this._eventFilterComponent = new EventFilterView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this.init(events);
  }

  init(points) {
    this._points = points.slice();

    this._sourcedPoints =  points.slice();

    this._tripInfo = new TripInfoView(points);

    if (!this._points.length) {
      render(this._pointsContainer, this._noPointComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    this._renderTripInfo(points);
    this._renderSort();
    render(this._pointsContainer, this._pointListComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  _renderTripInfo(points) {
    this._tripCost = new TripCostView(points);
    const tripInfoContainer = document.querySelector(`.trip-main`);
    const menuContainer = tripInfoContainer.querySelector(`.trip-controls`);
    menuContainer.innerHTML = ``;
    render(menuContainer, this._tripMenuComponent, RenderPosition.BEFOREEND);
    render(menuContainer, this._eventFilterComponent, RenderPosition.BEFOREEND);
    if (this._points.length === 0) {
      return;
    }
    render(tripInfoContainer, this._tripInfo, RenderPosition.AFTERBEGIN);
    const costContainer = tripInfoContainer.querySelector(`.trip-info`);
    render(costContainer, this._tripCost, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._pointsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange)
  }

  _renderPoint(point, isOpen) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModelChange);
    pointPresenter.init(point, isOpen);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._points.forEach((point, index) =>
      this._renderPoint(point, index === 0)
    );
  }

  _clearPointList() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModelChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPE.PRICE:
        this._points.sort(sortPointPrice);
        break;
      case SORT_TYPE.TIME:
        this._points.sort(sortPointTime);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }
}
