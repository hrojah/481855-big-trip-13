import {createAddPointFormTemplate} from "@view/add-point-form/add-point-form-template";
import Abstract from "@view/abstract";

export default class AddPoint extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createAddPointFormTemplate(this._event);
  }
}
