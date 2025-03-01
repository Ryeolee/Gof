import Grimpan from "./AbstractGrimpans.js";

class IEGrimpan extends Grimpan {
  protected static override instance: IEGrimpan;

  initialize() {}
  initializeMenu() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector("#canvas"));
    }
    return this.instance;
  }
}

export default IEGrimpan;
