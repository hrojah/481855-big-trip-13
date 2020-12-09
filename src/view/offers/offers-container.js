import {renderOffersContainerTemplate} from "@view/offers/offers-container-template";
import Abstract from "@view/abstract";

export default class OffersContainer extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return renderOffersContainerTemplate(this._event);
  }
}
