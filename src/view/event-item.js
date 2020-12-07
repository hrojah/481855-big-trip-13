import {createElement} from "../utils";
import {createPointTemplate} from "./event-item-template";

export default class Point {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createPointTemplate(this._event);
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
