import EventListView from "@view/trip-event-list/trip-events-list";
import NoPointView from "@view/no-point/no-point";
import TripSortView from "@view/trip-sort/trip-sort";
import TripMenuView from "@view/trip-menu/trip-menu";
import TripInfoView from "@view/trip-info/trip-info";
import TripCostView from "@view/trip-cost/trip-cost";
import PointPresenter from "@presenter/point";
import PointNewPresenter from "@presenter/point-new";
import {render, RenderPosition} from "@utils/render";
import {FILTER_TYPE, SORT_TYPE, UPDATE_TYPE, USER_ACTION} from "../const";
import {sortPointPrice, sortPointTime} from "@utils/point";
import {filter} from "@utils/filter";

export default class Trip {
  constructor(pointsContainer, events, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointsContainer = pointsContainer;
    this._pointPresenter = {};
    this._currentSortType = SORT_TYPE.DEFAULT;
    this._noPointComponent = new NoPointView();
    this._sortComponent = new TripSortView();
    this._pointListComponent = new EventListView();
    this._tripMenuComponent = new TripMenuView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeEvent = this._handleModeEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointsModel.addObserver(this._handleModeEvent);
    this._filterModel.addObserver(this._handleModeEvent);

    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction);
    this.init();
  }

  init() {
    const points = this._getPoints();
    this._tripInfo = new TripInfoView(this._getPoints());

    if (!points.length) {
      render(this._pointsContainer, this._noPointComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    this._renderTripInfo(this._getPoints());
    this._renderSort();
    render(this._pointsContainer, this._pointListComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points);
  }

  _renderTripInfo(points) {
    this._tripCost = new TripCostView(points);
    const tripInfoContainer = document.querySelector(`.trip-main`);
    const menuContainer = tripInfoContainer.querySelector(`.trip-controls`);
    menuContainer.innerHTML = ``;
    render(menuContainer, this._tripMenuComponent, RenderPosition.BEFOREEND);
    if (!this._getPoints().length) {
      return;
    }
    render(tripInfoContainer, this._tripInfo, RenderPosition.AFTERBEGIN);
    const costContainer = tripInfoContainer.querySelector(`.trip-info`);
    render(costContainer, this._tripCost, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new TripSortView();
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._pointsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) =>
      this._renderPoint(point)
    );
  }

  _clearPointList() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._pointNewPresenter.destroy();
  }

  _handleModeEvent(updateType, data) {
    const points = this._getPoints();
    switch (updateType) {
      case UPDATE_TYPE.MINOR:
        if (this._pointPresenter[data.id]) {
          this._pointPresenter[data.id].destroy();
        }
        this._pointPresenter[data.id].init(data);
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearPointList(true);
        this._renderPoints(points);
        break;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    const points = this._getPoints().slice();
    this._clearPointList();
    this._renderPoints(points);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);
    switch (this._currentSortType) {
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortPointTime);
      default:
        return filteredPoints;
    }
  }

  _closeForms() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  createPoint() {
    this._currentSortType = SORT_TYPE.DEFAULT;
    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this._pointNewPresenter.init();
    this._closeForms();
  }
}
