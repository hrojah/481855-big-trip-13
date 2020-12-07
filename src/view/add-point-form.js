import {createElement} from "../utils";
import {createAddPointFormTemplate} from "./add-point-form-template";

export default class AddPoint {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createAddPointFormTemplate(this._event);
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
