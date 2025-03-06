import {
  CircleSelectCommand,
  Command,
  EraserSelectCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
  SaveHistoryCommand,
} from "../commands/index.js";
import { Grimpan } from "../Grimpan.js";

const convertToHex = (color: number) => {
  if (color < 0) {
    return 0;
  } else if (color > 255) {
    return 255;
  }
  const hex = color.toString(16);
  return `0${hex}`.slice(-2); // 05 -> 05, 0ab -> ab
};
const rgb2hex = (r: number, g: number, b: number) => {
  return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
};

export abstract class Mode {
  constructor(protected grimpan: Grimpan) {}
  abstract mousedown(e: MouseEvent): void;
  abstract mousemove(e: MouseEvent): void;
  abstract mouseup(e: MouseEvent): void;
  invoke(command: Command) {
    command.execute();
  }
}

export class PenMode extends Mode {
  // Grimpan이라는 객체와 연관이 있음. 이는 곧 Grimpan의 상태를 변환시킬 수 있다는 것이므로 상태패턴
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PenSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = "round";
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = "source-over";
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }

  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }

  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      this.invoke(new SaveHistoryCommand(this.grimpan));
    }
    this.grimpan.active = false;
  }
}

export class EraserMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new EraserSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 10;
    this.grimpan.ctx.lineCap = "round";
    this.grimpan.ctx.filter = "blur(4px)";
    this.grimpan.ctx.strokeStyle = "#000";
    this.grimpan.ctx.globalCompositeOperation = "destination-out";
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }

  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }

  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      this.invoke(new SaveHistoryCommand(this.grimpan));
    }
    this.grimpan.active = false;
  }
}

export class PipetteMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new PipetteSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {}

  override mousemove(e: MouseEvent): void {
    const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    if (data[3] === 0) {
      this.grimpan.changeColor("#ffffff");
    } else {
      this.grimpan.changeColor(rgb2hex(data[0], data[1], data[2]));
    }
  }

  override mouseup(e: MouseEvent): void {
    // 함수를 통해 grimpan의 상태를 변화시킴.
    this.grimpan.setMode("pen");
  }
}

export class RectangleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new RectangleSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
  }

  override mousemove(e: MouseEvent): void {}

  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      this.invoke(new SaveHistoryCommand(this.grimpan));
    }
    this.grimpan.active = false;
  }
}

export class CircleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    grimpan.menu.executeCommand(new CircleSelectCommand(grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
  }

  override mousemove(e: MouseEvent): void {}

  override mouseup(e: MouseEvent): void {
    if (this.grimpan.active) {
      this.invoke(new SaveHistoryCommand(this.grimpan));
    }
    this.grimpan.active = false;
  }
}
