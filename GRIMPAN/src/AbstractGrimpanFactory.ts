import Grimpan from "./AbstractGrimpans.js";

abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    throw new Error("하위클래스에서 구현");
  }
}

export default AbstractGrimpanFactory;
