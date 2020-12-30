import {createEditPointFormTemplate} from "@view/edit-point-form/edit-point-form-template";
import SmartView from "@view/smart";
import flatpickr from "flatpickr";
import dayjs from "dayjs";

import "../../../node_modules/flatpickr/dist/flatpickr.min.css";

export default class EditPoint extends SmartView {
  constructor(point) {
    super();
    this._data = EditPoint.parsePointToData(point);
    this._point = point;
    this._starttimepicker = null;
    this._endtimepicker = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._setInnerHandler();
    this._setStartTimePicker();
    this._setEndTimePicker();
  }

  getTemplate() {
    return createEditPointFormTemplate(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseDataToPoint(this._data));
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
  }

  static parsePointToData(point) {
    const data = Object.assign({}, point);
    data.offers = point.offers.map(offer => Object.assign({}, offer));
    data.startTime = point.startTime.clone();
    data.endTime = point.endTime.clone();
    return data;
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    this.updateData({destination : evt.target.value}, true);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({price: evt.target.value}, true);
  }

  restoreHandlers() {
    this._setInnerHandler();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setStartTimePicker();
    this._setEndTimePicker();
  }

  _setInnerHandler() {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, this._destinationInputHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._priceInputHandler);
    this.getElement().querySelectorAll(`.event__type-input`).forEach((item) => {
      item.addEventListener(`change`, this._typeChangeHandler);
    });
    this.getElement().querySelectorAll(`.event__offer-checkbox`).forEach((item) => {
      item.addEventListener(`change`, this._offersChangeHandler);
    });
  }

  _typeChangeHandler(evt) {
    this.updateData({type: evt.target.value});
  }

  _offersChangeHandler(evt) {
    const index = parseInt(evt.target.value, 10);
    this._data.offers[index].checked = evt.target.checked;
    this.updateData({offers: this._data.offers});
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      startTime: dayjs(userDate)
    });
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      endTime: dayjs(userDate)
    });
  }

  _setStartTimePicker() {
    if (this._starttimepicker) {
      // this._starttimepicker.destroy();
      this._starttimepicker = null;
    }

    this._starttimepicker = flatpickr(
      this.getElement().querySelector(`#event-start-time-1`),
      {
        enableTime: true,
        dateFormat: `d/m/Y H:i`,
        defaultDate: this._data.startTime,
        onChange: this._startTimeChangeHandler,
      }
    );
  }

  _setEndTimePicker() {
    if (this._endtimepicker) {
      // this._endtimepicker.destroy();
      this._endtimepicker = null;
    }

    this._endtimepicker = flatpickr(
      this.getElement().querySelector(`#event-end-time-1`),
      {
        enableTime: true,
        dateFormat: `d/m/Y H:i`,
        defaultDate: this._data.endTime,
        onChange: this._endTimeChangeHandler,
      }
    );
  }

  reset(point) {
    this.updateData(EditPoint.parsePointToData(point));
  }
}
