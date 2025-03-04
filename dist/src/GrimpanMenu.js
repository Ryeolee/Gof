import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";
import { BackCommand, PenSelectCommand, PipetteSelectCommand, RectangleSelectCommand, SaveCommand, } from "./commands/index.js";
export class GrimpanMenu {
    grimpan;
    dom;
    colorBtn;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
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
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
    onSave() {
        this.executeCommand(new SaveCommand(this.grimpan));
    }
    onClickBack() {
        this.executeCommand(new BackCommand(this.grimpan.history));
    }
    onClickPen() {
        const command = new PenSelectCommand(this.grimpan);
        this.grimpan.history.stack.push(command);
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
                    .setOnClick(() => {
                    // 앞으로가기 작업
                })
                    .build();
                console.log(btn);
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
                const btn = new GrimpanMenuBtn.Builder(this, "저장", type)
                    .setOnClick(this.onSave.bind(this))
                    .build();
                btn.draw();
                return btn;
            }
            default:
                throw new Error(`알 수 없는 타입 ${type}`);
        }
    }
}
