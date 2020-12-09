import {renderDescription} from "@view/description/description-template";
import Abstract from "@view/abstract";

export default class Description extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return renderDescription(this._event);
  }
}
