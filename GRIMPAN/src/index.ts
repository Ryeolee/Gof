import ChromeGrimpan from "./ChromeGrimpan.js";
import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
import IEGrimpan from "./IEGrimpan.js";

// 단일 책임 원칙을 어김.
// function grimpanFactory(type: string) {
//   if (type === "ie") {
//     return IEGrimpan.getInstance();
//   } else if (type === "chrome") {
//     return ChromeGrimpan.getInstance();
//   } else {
//     throw new Error("에러");
//   }
// }

function main() {
  const factory = ChromeGrimpanFactory;
  const grimpan = factory.createGrimpan();
  const grimpanMenu = factory.createGrimpanMenu(grimpan);
  const grimpanHistory = factory.createGrimpanHistory(grimpan);
  grimpan.initialize();
  grimpanMenu.initialize();
  grimpanHistory.initialize();
}

main();
