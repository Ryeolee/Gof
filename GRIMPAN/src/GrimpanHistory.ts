import { ChromeGrimpan, Grimpan, IEGrimpan } from "./Grimpan.js";

interface Clonable {
  clone(): Clonable;
}
class HistoryStack extends Array {
  clone() {
    return this.slice() as HistoryStack;
  }
}

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;
  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
    // 인스턴스 생성 시 구독
    this.grimpan.saveCompleteObserver.subscribe({
      name: "history",
      publish: this.afterSaveComplete.bind(this),
    });
  }
  afterSaveComplete() {
    console.log("history: save complete");
  }

  cancelSaveCompleteAlarm() {
    this.grimpan.saveCompleteObserver.unsubscrive("history");
  }

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  abstract undo(): void;
  abstract redo(): void;
  abstract initialize(): void;
  static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;
  override initialize(): void {}

  static override getInstance(grimpan: IEGrimpan) {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }

  override undo(): void {}
  override redo(): void {}
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;
  override initialize(): void {}

  static override getInstance(grimpan: ChromeGrimpan) {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }

  // receiver
  override undo(): void {}
  override redo(): void {}
}
