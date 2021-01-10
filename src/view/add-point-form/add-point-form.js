import {createAddPointFormTemplate} from "@view/add-point-form/add-point-form-template";
import SmartView from "@view/smart";
import flatpickr from "flatpickr";

export default class AddPoint extends SmartView {
  constructor() {
    super();

    this._setStartTimePicker();
    this._setEndTimePicker();
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createAddPointFormTemplate();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _setStartTimePicker() {
    if (this._startTimePicker) {
      this._startTimePicker = null;
    }

    this._startTimePicker = flatpickr(
      this.getElement().querySelector(`#event-start-time-1`),
      {
        enableTime: true,
        dateFormat: `d/m/Y H:i`,
        defaultDate: new Date(),
        onChange: this._startTimeChangeHandler,
        onClose: this._startTimeChangeHandler
      }
    );
  }

  _setEndTimePicker() {
    if (this._endTimePicker) {
      this._endTimePicker = null;
    }

    this._endTimePicker = flatpickr(
      this.getElement().querySelector(`#event-end-time-1`),
      {
        enableTime: true,
        dateFormat: `d/m/Y H:i`,
        defaultDate: new Date(),
        onChange: this._endTimeChangeHandler,
        onClose: this._endTimeChangeHandler
      }
    );
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(AddPoint.parseDataToPoint(this._data));
  }
}
