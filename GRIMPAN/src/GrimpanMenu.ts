import { ChromeGrimpan, Grimpan, GrimpanMode, IEGrimpan } from "./Grimpan.js";
import {
  GrimpanMenuBtn,
  GrimpanMenuInput,
  GrimpanMenuSaveBtn,
} from "./GrimpanMenuBtn.js";
import { ChromeMenuDrawVisitor, MenuDrawVisitor } from "./MenuDrawVisitor.js";
import { SubscriptionManager } from "./Observer.js";
import {
  BackCommand,
  CircleSelectCommand,
  Command,
  EraserSelectCommand,
  ForwardCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
  SaveCommand,
  SaveHistoryCommand,
} from "./commands/index.js";

export type BtnType =
  | "pen"
  | "circle"
  | "rectangle"
  | "eraser"
  | "back"
  | "forward"
  | "save"
  | "pipette"
  | "color";

export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;
  colorBtn!: HTMLInputElement;
  menuDrawVisitor!: MenuDrawVisitor;
  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
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

  abstract initialize(types: BtnType[]): void;
  static getInstance(grimpan: Grimpan, dom: HTMLElement): GrimpanMenu {
    throw new Error("Method not implemented.");
  }

  setActiveBtn(type: GrimpanMode) {
    document.querySelector(".active")?.classList.remove("active");
    console.log(type);
    document.querySelector(`#${type}-btn`)?.classList.add("active");
  }

  executeCommand(command: Command) {
    command.execute();
  }
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;
  override initialize(types: BtnType[]): void {}

  static override getInstance(
    grimpan: IEGrimpan,
    dom: HTMLElement
  ): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;

  constructor(
    grimpan: Grimpan,
    dom: HTMLElement,
    menuDrawVisitor = new ChromeMenuDrawVisitor()
  ) {
    super(grimpan, dom);
    this.menuDrawVisitor = menuDrawVisitor;
  }

  override initialize(types: BtnType[]): void {
    types.forEach((type) => {
      const btn = this.drawButtonByType.bind(this)(type);
      btn.draw(this.menuDrawVisitor);
    });
    this.grimpan.setMode("pen");
    this.executeCommand(new SaveHistoryCommand(this.grimpan));
  }

  static override getInstance(
    grimpan: ChromeGrimpan,
    dom: HTMLElement
  ): ChromeGrimpanMenu {
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

  drawButtonByType(type: BtnType) {
    switch (type) {
      case "back": {
        const btn = new GrimpanMenuBtn.Builder(this, "뒤로", type)
          .setOnClick(this.onClickBack.bind(this))
          .build();
        return btn;
      }
      case "forward": {
        const btn = new GrimpanMenuBtn.Builder(this, "앞으로", type)
          .setOnClick(this.onClickForward.bind(this))
          .build();
        return btn;
      }
      case "color": {
        const btn = new GrimpanMenuInput.Builder(this, "컬러", type)
          .setOnChange((e: Event) => {
            if (e.target) {
              this.grimpan.setColor((e.target as HTMLInputElement).value);
            }
          })
          .build();
        return btn;
      }
      case "pipette": {
        const btn = new GrimpanMenuBtn.Builder(this, "스포이드", type)
          .setOnClick(this.onClickPipette.bind(this))
          .build();

        return btn;
      }
      case "eraser": {
        const btn = new GrimpanMenuBtn.Builder(this, "지우개", type)
          .setOnClick(this.onClickEraser.bind(this))
          .build();

        return btn;
      }
      case "pen": {
        const btn = new GrimpanMenuBtn.Builder(this, "펜", type)
          .setOnClick(this.onClickPen.bind(this))
          .build();

        return btn;
      }
      case "circle": {
        const btn = new GrimpanMenuBtn.Builder(this, "원", type)
          .setOnClick(this.onClickCircle.bind(this))
          .build();
        return btn;
      }
      case "rectangle": {
        const btn = new GrimpanMenuBtn.Builder(this, "사각형", type)
          .setOnClick(this.onClickRectangle.bind(this))
          .build();
        return btn;
      }
      case "save": {
        const btn = new GrimpanMenuSaveBtn.Builder(this, "저장", type)
          .setOnClick(this.onSave.bind(this))
          .setFilterListeners({
            blur: (e: Event) => {
              this.grimpan.saveSetting.blur =
                (e.target as HTMLInputElement)!.checked;
            },
            grayscale: (e: Event) => {
              this.grimpan.saveSetting.grayscale = (
                e.target as HTMLInputElement
              )?.checked;
            },
            invert: (e: Event) => {
              this.grimpan.saveSetting.invert = (
                e.target as HTMLInputElement
              )?.checked;
            },
          })
          .build();
        return btn;
      }
      default:
        throw new Error(`알 수 없는 타입 ${type}`);
    }
  }
}
