import {createElement} from "../utils";
import {renderOffers} from "./offers-template";

export default class Offer {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return renderOffers(this._event);
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
