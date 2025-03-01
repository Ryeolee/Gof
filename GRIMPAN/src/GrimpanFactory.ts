import Grimpan from "./AbstractGrimpans.js";
import ChromeGrimpan from "./ChromeGrimpan.js";
import IEGrimpan from "./IEGrimpan.js";
import { IEGrimpanMenu, ChromeGrimpanMenu } from "./GrimpanMenu.js";
import { ChromeGrimpanHistory, IEGrimpanHistory } from "./GrimpanHistory.js";

export abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    throw new Error("하위클래스에서 구현");
  }
  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error("하위클래스에서 구현");
  }

  static createGrimpanHistory(grimpan: Grimpan) {
    throw new Error("하위클래스에서 구현");
  }
}

export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan);
  }
}
