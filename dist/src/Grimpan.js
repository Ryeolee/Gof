import { BackCommand, ForwardCommand } from "./commands/index.js";
import { BlurFilter, DefaultFilter, GrayscaleFilter, InvertFilter, } from "./filter/index.js";
import { ChromeGrimpanFactory, IEGrimpanFactory, } from "./GrimpanFactory.js";
import { CircleMode, EraserMode, PenMode, PipetteMode, RectangleMode, } from "./modes/index.js";
export class Grimpan {
    canvas;
    ctx;
    history;
    menu;
    mode;
    color;
    active;
    saveStrategy;
    saveSetting = {
        blur: false,
        grayscale: false,
        invert: false,
    };
    constructor(canvas, factory) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요");
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.color = "#000";
        this.active = false;
        this.setSaveStrategy("png");
    }
    setSaveStrategy(imageType) {
        switch (imageType) {
            case "png":
                // 인자가 없으므로 상태 변화를 할 수 없음. 스트레티지 전략
                this.saveStrategy = async () => {
                    let imageData = this.ctx.getImageData(0, 0, 300, 300);
                    const offscreenCanvas = new OffscreenCanvas(300, 300);
                    const offscreenContext = offscreenCanvas.getContext("2d");
                    offscreenContext.putImageData(imageData, 0, 0);
                    // 아래 코드 ==> 각 역할별로 클래스를 나누어. 조건이 할당될 경우 연쇄를 위해 filter에 값을 넣는다.
                    const df = new DefaultFilter();
                    let filter = df;
                    if (this.saveSetting.blur) {
                        const bf = new BlurFilter();
                        filter = filter.setNext(bf);
                    }
                    if (this.saveSetting.grayscale) {
                        const gf = new GrayscaleFilter();
                        filter = filter.setNext(gf);
                    }
                    if (this.saveSetting.invert) {
                        const ivf = new InvertFilter();
                        filter = filter.setNext(ivf);
                    }
                    await df.handle(offscreenCanvas);
                    const a = document.createElement("a");
                    a.download = "canvas.png";
                    const blob = await offscreenCanvas.convertToBlob();
                    const dataURL = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                            resolve(reader.result);
                        });
                        reader.addEventListener("error", reject);
                        reader.readAsDataURL(blob);
                    });
                    //  console.log("dataURL", dataURL);
                    let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
                    a.href = url;
                    a.click();
                    // .then(() => {
                    //   const a = document.createElement("a");
                    //   a.download = "canvas.png";
                    //   offscreenCanvas
                    //     .convertToBlob()
                    //     .then((blob) => {
                    //       const reader = new FileReader();
                    //       reader.addEventListener("load", () => {
                    //         const dataURL = reader.result as string;
                    //         console.log("dataURL", dataURL);
                    //         let url = dataURL.replace(
                    //           /^data:image\/png/,
                    //           "data:application/octet-stream"
                    //         );
                    //         a.href = url;
                    //         a.click();
                    //       });
                    //       reader.readAsDataURL(blob);
                    //     });
                    // });
                };
                break;
            case "jpg":
                this.saveStrategy = () => {
                    if (this.saveSetting.blur) {
                    }
                    if (this.saveSetting.grayscale) {
                    }
                    if (this.saveSetting.invert) {
                    }
                    const a = document.createElement("a");
                    a.download = "canvas.jpg";
                    const dataURL = this.canvas.toDataURL("image/jpeg");
                    let url = dataURL.replace(/^data:image\/jpeg/, "data:application/octet-stream");
                    a.href = url;
                    a.click();
                };
                break;
            case "webp":
                this.saveStrategy = () => {
                    if (this.saveSetting.blur) {
                    }
                    if (this.saveSetting.grayscale) {
                    }
                    if (this.saveSetting.invert) {
                    }
                    const a = document.createElement("a");
                    a.download = "canvas.webp";
                    const dataURL = this.canvas.toDataURL("image/webp");
                    let url = dataURL.replace(/^data:image\/webp/, "data:application/octet-stream");
                    a.href = url;
                    a.click();
                };
                break;
            case "avif":
                this.saveStrategy = () => { };
                break;
            case "gif":
                this.saveStrategy = () => { };
                break;
            case "pdf":
                this.saveStrategy = () => { };
                break;
        }
    }
    setMode(mode) {
        console.log("mode change", mode);
        switch (mode) {
            case "pen":
                this.mode = new PenMode(this);
                break;
            case "eraser":
                this.mode = new EraserMode(this);
                break;
            case "pipette":
                this.mode = new PipetteMode(this);
                break;
            case "rectangle":
                this.mode = new RectangleMode(this);
                break;
            case "circle":
                this.mode = new CircleMode(this);
                break;
        }
    }
    setColor(color) {
        this.color = color;
    }
    changeColor(color) {
        this.setColor(color);
        if (this.menu.colorBtn) {
            this.menu.colorBtn.value = color;
        }
    }
    static getInstance() { }
}
export class ChromeGrimpan extends Grimpan {
    static instance;
    menu;
    history;
    constructor(canvas, factory) {
        super(canvas, factory);
        this.menu = factory.createGrimpanMenu(this, document.querySelector("#menu"));
        this.history = factory.createGrimpanHistory(this);
    }
    initialize(option) {
        this.menu.initialize(option.menu);
        this.history.initialize();
        window.addEventListener("keyup", (e) => {
            console.log(e);
            if (e.code === "KeyZ" && e.ctrlKey && e.shiftKey) {
                this.menu.executeCommand(new ForwardCommand(this.history));
                return;
            }
            if (e.code === "KeyZ" && e.ctrlKey) {
                this.menu.executeCommand(new BackCommand(this.history));
                return;
            }
        });
        console.log(this);
        this.canvas.addEventListener("mousedown", this.onMousedown.bind(this));
        this.canvas.addEventListener("mousemove", this.onMousemove.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseup.bind(this));
        this.canvas.addEventListener("mouseleave", this.onMouseup.bind(this));
    }
    onMousedown(e) {
        this.mode.mousedown(e);
    }
    onMousemove(e) {
        this.mode.mousemove(e);
    }
    onMouseup(e) {
        this.mode.mouseup(e);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector("canvas"), ChromeGrimpanFactory);
        }
        return this.instance;
    }
}
export class IEGrimpan extends Grimpan {
    static instance;
    initialize() { }
    onMousedown(e) { }
    onMousemove(e) { }
    onMouseup(e) { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector("canvas"), IEGrimpanFactory);
        }
        return this.instance;
    }
}
