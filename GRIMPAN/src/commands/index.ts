import { Grimpan } from "../Grimpan.js";
import { GrimpanHistory } from "../GrimpanHistory.js";

// export class Invoker {
//   constructor(private readonly command: { run(): void }) {}

//   invoker() {
//     this.command.run();
//   }
// }

// export class Adaptor {
//   constructor(private readonly command: Command) {}

//   run() {
//     this.command.execute();
//   }
// }

export abstract class Command {
  abstract name: string;
  abstract execute(): void;
}

export const counter: { [key: string]: number } = {};

function countMixin(value: typeof BackCommand, context: ClassDecoratorContext) {
  return class extends value {
    override execute() {
      super.execute();
      if (counter[this.name]) {
        counter[this.name]++;
      } else {
        counter[this.name] = 1;
      }
    }
    additional() {}
  };
}
function loggerMixin(
  value: typeof BackCommand,
  context: ClassDecoratorContext
) {
  return class extends value {
    override execute() {
      super.execute();
    }
    showLogger() {}
  };
}

// abstract class CommandDecorator {
//   name: string;
//   constructor(protected readonly command: Command) {
//     this.name = this.command.name;
//   }
//   abstract execute(): void;
// }

// class ExecuteLogger extends CommandDecorator {
//   override execute(): void {
//     console.log(this.command.name + "명령을 실행");
//     this.command.execute();
//   }
//   showLogger() {}
// }

// class ExecuteCounter extends CommandDecorator {
//   override execute(): void {
//     this.command.execute();
//     if (counter[this.command.name]) {
//       counter[this.command.name]++;
//     } else {
//       counter[this.command.name] = 1;
//     }
//   }
// }

@countMixin
@loggerMixin
export class BackCommand extends Command {
  name = "back";

  constructor(private history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.undo(); // receiver에게 로직 전송
  }
}
// 어댑터  패턴
//new Invoker(new BackCommand({} as any).execute()).invoker();
//new Invoker(new Adaptor(new BackCommand({} as any))).invoker();

// 데코레이터 패턴
// new ExecuteCounter(new ExecuteLogger(new BackCommand({} as any))).execute();
// new ExecuteLogger(new ExecuteCounter(new BackCommand({} as any))).execute();

export class ForwardCommand extends Command {
  name = "forward";

  constructor(private history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.redo(); // receiver에게 로직 전송
  }
}
export class PenSelectCommand extends Command {
  name = "penSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    // 펜 구현
    this.grimpan.menu.setActiveBtn("pen");
  }
}

export class SaveHistoryCommand extends Command {
  name = "saveHistory";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.history.saveHistory();
  }
}
export class EraserSelectCommand extends Command {
  name = "eraserSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    // 지우개 구현
    this.grimpan.menu.setActiveBtn("eraser");
  }
}

interface SelectCommand {
  grimpan: Grimpan;
  name: string;
  execute(): void;
}

export class PremiumCommandProxy {
  name: string;
  constructor(private readonly command: SelectCommand) {
    this.name = command.name;
  }

  execute(): void {
    if (this.command.grimpan.isPremium) {
      this.command.execute();
    } else {
      alert("프리미엄 이용자만 가능합니다.");
    }
  }
}

export class CircleSelectCommand extends Command {
  name = "circleSelect";
  loaded = false;

  constructor(public grimpan: Grimpan) {
    super();
  }

  load() {
    this.loaded = true;
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("circle");
  }
}

export class RectangleSelectCommand extends Command {
  name = "rectangleSelect";
  loaded = false;

  constructor(public grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("rectangle");
  }

  load() {
    this.loaded = true;
  }
}

export class PipetteSelectCommand extends Command {
  name = "pipetteSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.menu.setActiveBtn("pipette");
  }
}

export class SaveCommand extends Command {
  name = "save";
  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.saveStrategy();
  }
}
