import ChromeGrimpan from "./ChromeGrimpan.js";
import IEGrimpan from "./IEGrimpan.js";

// 단일 책임 원칙을 어김.
function grimpanFactory(type: string) {
  if (type === "ie") {
    return IEGrimpan.getInstance();
  } else if (type === "chrome") {
    return ChromeGrimpan.getInstance();
  } else {
    throw new Error("에러");
  }
}
function main() {
  grimpanFactory("ie");
  grimpanFactory("chrome");
}

main();
