import {renderOffers} from "./offers-template";
import Abstract from "./abstract";

export default class Offer extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return renderOffers(this._event);
  }
}
