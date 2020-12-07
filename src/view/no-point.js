import {createNoPointTemplate} from "./no-point-template";
import Abstract from "./abstract";

export default class NoPoint extends Abstract {
  getTemplate() {
    return createNoPointTemplate();
  }
}
