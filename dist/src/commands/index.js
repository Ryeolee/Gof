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
export class Command {
}
export const counter = {};
// function countMixin(value: typeof BackCommand, context: ClassDecoratorContext) {
//   return class extends value {
//     override execute(): void {
//       super.execute();
//       if (counter[this.name]) {
//         counter[this.name]++;
//       } else {
//         counter[this.name] = 1;
//       }
//     }
//     addtional() {}
//   };
// }
// function loggerMixin(
//   value: typeof BackCommand,
//   context: ClassDecoratorContext
// ) {
//   return class extends value {
//     override execute() {
//       super.execute();
//     }
//     showLogger() {}
//   };
// }
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
// @countMixin
// @loggerMixin
export class BackCommand extends Command {
    history;
    name = "back";
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
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
    history;
    name = "forward";
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
        this.history.redo(); // receiver에게 로직 전송
    }
}
export class PenSelectCommand extends Command {
    grimpan;
    name = "penSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 펜 구현
        this.grimpan.menu.setActiveBtn("pen");
    }
}
export class SaveHistoryCommand extends Command {
    grimpan;
    name = "saveHistory";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.history.saveHistory();
    }
}
export class EraserSelectCommand extends Command {
    grimpan;
    name = "eraserSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 지우개 구현
        this.grimpan.menu.setActiveBtn("eraser");
    }
}
export class PremiumCommandProxy {
    command;
    name;
    constructor(command) {
        this.command = command;
        this.name = command.name;
    }
    execute() {
        if (this.command.grimpan.isPremium) {
            this.command.execute();
        }
        else {
            alert("프리미엄 이용자만 가능합니다.");
        }
    }
}
export class CircleSelectCommand extends Command {
    grimpan;
    name = "circleSelect";
    loaded = false;
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    load() {
        this.loaded = true;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("circle");
    }
}
export class RectangleSelectCommand extends Command {
    grimpan;
    name = "rectangleSelect";
    loaded = false;
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("rectangle");
    }
    load() {
        this.loaded = true;
    }
}
export class PipetteSelectCommand extends Command {
    grimpan;
    name = "pipetteSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("pipette");
    }
}
export class SaveCommand extends Command {
    grimpan;
    name = "save";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.saveStrategy();
    }
}
