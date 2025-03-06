import { SubscriptionManager } from "./Observer.js";
class StackIterator {
    stack;
    index = 0;
    constructor(stack) {
        this.stack = stack;
    }
    next() {
        if (!this.done) {
            return this.stack[this.index++];
        }
    }
    get done() {
        return this.stack.length === this.index;
    }
}
class HistoryStack extends Array {
    clone() {
        return this.slice();
    }
    slice(start, end) {
        return super.slice(start, end);
    }
}
export class GrimpanHistory {
    grimpan;
    stack;
    index = -1;
    constructor(grimpan) {
        this.grimpan = grimpan;
        this.stack = new HistoryStack();
        // 인스턴스 생성 시 구독
        SubscriptionManager.getInstance().subscribe("saveComplete", {
            name: "history",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    saveHistory() {
        const snapshot = this.grimpan.makeSnapshot();
        if (this.index === this.stack.length - 1) {
            this.stack.push(snapshot);
            this.index++;
        }
        else {
            this.stack = this.stack.slice(0, this.index + 1);
            this.stack.push(snapshot);
            this.index++;
        }
        document.querySelector("#back-btn").disabled = false;
        document.querySelector("#forward-btn").disabled =
            true;
        console.log("save", this.index, this.stack);
    }
    afterSaveComplete() {
        console.log("history: save complete");
    }
    cancelSaveCompleteAlarm() {
        SubscriptionManager.getInstance().unsubscrive("saveComplete", "history");
    }
    getStack() {
        return this.stack.clone();
    }
    setStack(stack) {
        this.stack = stack.clone();
    }
    undoable() {
        return this.index > 0;
    }
    redoable() {
        return this.index < this.stack.length - 1;
    }
    undo() {
        console.log("undo", this.index, this.stack);
        if (this.undoable()) {
            this.index--;
            document.querySelector("#forward-btn").disabled =
                false;
        }
        else {
            return;
        }
        if (!this.undoable()) {
            document.querySelector("#back-btn").disabled =
                true;
        }
        this.grimpan.restore(this.stack[this.index]);
    }
    redo() {
        console.log("redo", this.index, this.stack);
        if (this.redoable()) {
            this.index++;
            document.querySelector("#back-btn").disabled =
                false;
        }
        else {
            return;
        }
        if (!this.redoable()) {
            document.querySelector("#forward-btn").disabled =
                true;
        }
        this.grimpan.restore(this.stack[this.index]);
    }
    initialize() {
        document.querySelector("#back-btn").disabled = true;
        document.querySelector("#forward-btn").disabled =
            true;
    }
    static getInstance(grimpan) { }
}
export class IEGrimpanHistory extends GrimpanHistory {
    static instance;
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new IEGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
export class ChromeGrimpanHistory extends GrimpanHistory {
    static instance;
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
