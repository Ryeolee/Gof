import AbstractGrimpanFactory from "./AbstractGrimpanFactory.js";
import ChromeGrimpan from "./ChromeGrimpan.js";
import IEGrimpan from "./IEGrimpan.js";
// 단일 책임 원칙을 어김.
// 개방 폐쇄의 원칙을 어김.
function grimpanFactory(type) {
  if (type === "ie") {
    return IEGrimpan.getInstance();
  } else if (type === "chrome") {
    return ChromeGrimpan.getInstance();
  } else {
    throw new Error("에러");
  }
}
class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static createGrimpan() {
    return ChromeGrimpan.getInstance();
  }
}
class IEGrimpanFactory extends AbstractGrimpanFactory {
  static createGrimpan() {
    return IEGrimpan.getInstance();
  }
}
function main() {
  // grimpanFactory("ie");
  // grimpanFactory("chrome");
  const grimpan = ChromeGrimpanFactory.createGrimpan();
  grimpan.initialize();
  grimpan.initializeMenu();
}
main();
