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

import { ChromeGrimpan } from "./Grimpan.js";
import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
import { GrimpanMenu } from "./GrimpanMenu.js";

function main() {
  const factory = ChromeGrimpanFactory;
  const grimpan = factory.createGrimpan();

  // const menu = new GrimpanMenu()
  // const grimpan1= new ChromeGrimpan(menu)
  // const grimpan2= new ChromeGrimpan(menu)
  // const grimpan3= new ChromeGrimpan(menu)

  // const grimpanMenu = factory.createGrimpanMenu(
  //   grimpan,
  //   document.querySelector("#menu")!
  // );
  // const grimpanHistory = factory.createGrimpanHistory(grimpan);
  // grimpan.initialize();
  // grimpanMenu.initialize([
  // "back",
  // "forward",
  // "color",
  // "pipette",
  // "pen",
  // "circle",
  // "rectangle",
  // "eraser",
  // "save",
  // ]);
  // grimpanHistory.initialize();
  grimpan.initialize({
    menu: [
      "back",
      "forward",
      "color",
      "pipette",
      "pen",
      "circle",
      "rectangle",
      "eraser",
      "save",
    ],
  });
}

main();
