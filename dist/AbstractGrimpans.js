class Grimpan {
    static instance;
    constructor(canvas) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요");
        }
    }
    static getInstance() { }
}
export default Grimpan;
