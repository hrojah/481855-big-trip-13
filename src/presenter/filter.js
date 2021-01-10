import FilterView from "@view/trip-filter/trip-filter";
import {render, RenderPosition, replace, remove} from "@utils/render";
import {FILTER_TYPE, UPDATE_TYPE} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, pointModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tasksModel = pointModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModeEvent = this._handleModeEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModeEvent);
    this._filterModel.addObserver(this._handleModeEvent);
    this.init();
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModeEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }

  _getFilters() {
    return [
      {
        type: FILTER_TYPE.EVERYTHING,
        name: `Everything`,
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: `Future`,
      },
      {
        type: FILTER_TYPE.PAST,
        name: `Past`,
      },
    ];
  }
}
