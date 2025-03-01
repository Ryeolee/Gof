import Grimpan from "./AbstractGrimpans";
import ChromeGrimpan from "./ChromeGrimpan";
import IEGrimpan from "./IEGrimpan";

export abstract class GrimpanMenu {
  grimpan: Grimpan;
  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
  }

  abstract initialize(): void;
  static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;
  override initialize(): void {}

  static override getInstance(grimpan: IEGrimpan) {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan);
    }
    return this.instance;
  }
}

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;
  override initialize(): void {}

  static override getInstance(grimpan: ChromeGrimpan) {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan);
    }
    return this.instance;
  }
}
