import {createNoPointTemplate} from "@view/no-point/no-point-template";
import Abstract from "@view/abstract";

export default class NoPoint extends Abstract {
  getTemplate() {
    return createNoPointTemplate();
  }
}
