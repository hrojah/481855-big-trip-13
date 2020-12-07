import {createAddPointFormTemplate} from "./add-point-form-template";
import Abstract from "./abstract";

export default class AddPoint extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createAddPointFormTemplate(this._event);
  }
}
