import { IEGrimpanMenu, ChromeGrimpanMenu } from "./GrimpanMenu.js";
import { ChromeGrimpanHistory, IEGrimpanHistory } from "./GrimpanHistory.js";
import { ChromeGrimpan, IEGrimpan } from "./Grimpan.js";
export class AbstractGrimpanFactory {
    static createGrimpan() {
        throw new Error("하위클래스에서 구현");
    }
    static createGrimpanMenu(grimpan, dom) {
        throw new Error("하위클래스에서 구현");
    }
    static createGrimpanHistory(grimpan) {
        throw new Error("하위클래스에서 구현");
    }
}
export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return ChromeGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan, dom) {
        return ChromeGrimpanMenu.getInstance(grimpan, dom);
    }
    static createGrimpanHistory(grimpan) {
        return ChromeGrimpanHistory.getInstance(grimpan);
    }
}
export class IEGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return IEGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan, dom) {
        return IEGrimpanMenu.getInstance(grimpan, dom);
    }
    static createGrimpanHistory(grimpan) {
        return IEGrimpanHistory.getInstance(grimpan);
    }
}
