import Grimpan from "./AbstractGrimpans.js";

class ChromeGrimpan extends Grimpan {
  protected static override instance: ChromeGrimpan;

  initialize() {}
  initializeMenu() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector("#canvas"));
    }
    return this.instance;
  }
}

export default ChromeGrimpan;
