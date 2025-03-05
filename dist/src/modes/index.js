import { CircleSelectCommand, EraserSelectCommand, PenSelectCommand, PipetteSelectCommand, RectangleSelectCommand, } from "../commands/index.js";
const convertToHex = (color) => {
    if (color < 0) {
        return 0;
    }
    else if (color > 255) {
        return 255;
    }
    const hex = color.toString(16);
    return `0${hex}`.slice(-2); // 05 -> 05, 0ab -> ab
};
const rgb2hex = (r, g, b) => {
    return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
};
export class Mode {
    grimpan;
    constructor(grimpan) {
        this.grimpan = grimpan;
    }
}
export class PenMode extends Mode {
    // Grimpan이라는 객체와 연관이 있음. 이는 곧 Grimpan의 상태를 변환시킬 수 있다는 것이므로 상태패턴
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new PenSelectCommand(grimpan));
    }
    mousedown(e) {
        this.grimpan.active = true;
        this.grimpan.ctx.lineWidth = 1;
        this.grimpan.ctx.lineCap = "round";
        this.grimpan.ctx.strokeStyle = this.grimpan.color;
        this.grimpan.ctx.globalCompositeOperation = "source-over";
        this.grimpan.ctx.beginPath();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mousemove(e) {
        if (!this.grimpan.active) {
            return;
        }
        this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
        this.grimpan.ctx.stroke();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mouseup(e) {
        this.grimpan.active = false;
    }
}
export class EraserMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new EraserSelectCommand(grimpan));
    }
    mousedown(e) {
        this.grimpan.active = true;
        this.grimpan.ctx.lineWidth = 10;
        this.grimpan.ctx.lineCap = "round";
        this.grimpan.ctx.filter = "blur(4px)";
        this.grimpan.ctx.strokeStyle = "#000";
        this.grimpan.ctx.globalCompositeOperation = "destination-out";
        this.grimpan.ctx.beginPath();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mousemove(e) {
        if (!this.grimpan.active) {
            return;
        }
        this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
        this.grimpan.ctx.stroke();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    }
    mouseup(e) {
        this.grimpan.active = false;
    }
}
export class PipetteMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new PipetteSelectCommand(grimpan));
    }
    mousedown(e) { }
    mousemove(e) {
        const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
        if (data[3] === 0) {
            this.grimpan.changeColor("#ffffff");
        }
        else {
            this.grimpan.changeColor(rgb2hex(data[0], data[1], data[2]));
        }
    }
    mouseup(e) {
        // 함수를 통해 grimpan의 상태를 변화시킴.
        this.grimpan.setMode("pen");
    }
}
export class RectangleMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new RectangleSelectCommand(grimpan));
    }
    mousedown(e) { }
    mousemove(e) { }
    mouseup(e) { }
}
export class CircleMode extends Mode {
    constructor(grimpan) {
        super(grimpan);
        grimpan.menu.executeCommand(new CircleSelectCommand(grimpan));
    }
    mousedown(e) { }
    mousemove(e) { }
    mouseup(e) { }
}
