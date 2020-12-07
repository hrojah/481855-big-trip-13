import {createElement} from "../utils";
import {createEditPointFormTemplate} from "./edit-point-form-template";

export default class EditPoint {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEditPointFormTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
