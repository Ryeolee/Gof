"use strict";
class Grimpan {
    constructor(canvas) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요");
        }
    }
    initialize() { }
    initializeMenu() { }
}
new Grimpan(document.querySelector("#canvas"));
