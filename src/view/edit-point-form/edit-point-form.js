import {createEditPointFormTemplate} from "@view/edit-point-form/edit-point-form-template";
import Abstract from "@view/abstract";

export default class EditPoint extends Abstract {
  constructor(event) {
    super();
    this._event = event;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEditPointFormTemplate(this._event);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
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
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
