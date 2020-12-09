import {renderOffers} from "@view/offers/offers-template";
import Abstract from "@view/abstract";

export default class Offer extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return renderOffers(this._event);
  }
}
