import {createElement} from "../utils";

export const renderOffers = (event) => {
  return event.offers
    .map((offer) => {
      const checked = offer.checked === true ? `checked` : ``;
      return `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.label}-1" type="checkbox" name="event-offer-${offer.label}" ${checked}>
                        <label class="event__offer-label" for="event-offer-${offer.label}-1">
                          <span class="event__offer-title">${offer.name}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`;
    })
    .join(``);
};

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
