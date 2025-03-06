import { GrimpanMenuBtn, GrimpanMenuInput, GrimpanMenuSaveBtn, } from "./GrimpanMenuBtn.js";
import { SubscriptionManager } from "./Observer.js";
import { BackCommand, ForwardCommand, PipetteSelectCommand, RectangleSelectCommand, SaveCommand, SaveHistoryCommand, } from "./commands/index.js";
export class GrimpanMenu {
    grimpan;
    dom;
    colorBtn;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
        // 인스턴스 생성 시 구독
        SubscriptionManager.getInstance().subscribe("saveComplete", {
            name: "menu",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    afterSaveComplete() {
        console.log("menu: save complete");
    }
    static getInstance(grimpan, dom) {
        throw new Error("Method not implemented.");
    }
    setActiveBtn(type) {
        document.querySelector(".active")?.classList.remove("active");
        document.querySelector(`#${type}-btn`)?.classList.add("active");
    }
    executeCommand(command) {
        command.execute();
    }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) { }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
        types.forEach(this.drawButtonByType.bind(this));
        this.grimpan.setMode("pen");
        this.executeCommand(new SaveHistoryCommand(this.grimpan));
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
    onClickForward() {
        this.executeCommand(new ForwardCommand(this.grimpan.history));
    }
    onSave() {
        this.executeCommand(new SaveCommand(this.grimpan));
    }
    onClickBack() {
        this.executeCommand(new BackCommand(this.grimpan.history));
    }
    onClickPen() {
        this.grimpan.setMode("pen");
    }
    onClickEraser() {
        //this.executeCommand(new EraserSelectCommand(this.grimpan));
        this.grimpan.setMode("eraser");
    }
    onClickCircle() {
        // this.executeCommand(new CircleSelectCommand(this.grimpan));
        this.grimpan.setMode("circle");
    }
    onClickRectangle() {
        this.executeCommand(new RectangleSelectCommand(this.grimpan));
        this.grimpan.setMode("rectangle");
    }
    onClickPipette() {
        this.executeCommand(new PipetteSelectCommand(this.grimpan));
        this.grimpan.setMode("pipette");
    }
    drawButtonByType(type) {
        switch (type) {
            case "back": {
                const btn = new GrimpanMenuBtn.Builder(this, "뒤로", type)
                    .setOnClick(this.onClickBack.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            case "forward": {
                const btn = new GrimpanMenuBtn.Builder(this, "앞으로", type)
                    .setOnClick(this.onClickForward.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            case "color": {
                const btn = new GrimpanMenuInput.Builder(this, "컬러", type)
                    .setOnChange((e) => {
                    if (e.target) {
                        this.grimpan.setColor(e.target.value);
                    }
                })
                    .build();
                btn.draw();
                return btn;
            }
            case "pipette": {
                const btn = new GrimpanMenuBtn.Builder(this, "스포이드", type)
                    .setOnClick(this.onClickPipette.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            case "eraser": {
                const btn = new GrimpanMenuBtn.Builder(this, "지우개", type)
                    .setOnClick(this.onClickEraser.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            case "pen": {
                const btn = new GrimpanMenuBtn.Builder(this, "펜", type)
                    .setOnClick(this.onClickPen.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            case "circle": {
                const btn = new GrimpanMenuBtn.Builder(this, "원", type)
                    .setOnClick(this.onClickCircle.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            case "rectangle": {
                const btn = new GrimpanMenuBtn.Builder(this, "사각형", type)
                    .setOnClick(this.onClickRectangle.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            case "save": {
                const btn = new GrimpanMenuSaveBtn.Builder(this, "저장", type)
                    .setOnClick(this.onSave.bind(this))
                    .setFilterListeners({
                    blur: (e) => {
                        this.grimpan.saveSetting.blur =
                            e.target.checked;
                    },
                    grayscale: (e) => {
                        this.grimpan.saveSetting.grayscale = e.target?.checked;
                    },
                    invert: (e) => {
                        this.grimpan.saveSetting.invert = e.target?.checked;
                    },
                })
                    .build();
                btn.draw();
                return btn;
            }
            default:
                throw new Error(`알 수 없는 타입 ${type}`);
        }
    }
}
