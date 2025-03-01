// 문제
//  type의 알파벳이 늘어날 수록 else if문을 계속해서 추가한다. --> 개방-폐쇄의 원칙을 어김.
// function main(type) {
//   if (type === "a") {
//     doA();
//   } else if (type === "b") {
//     doB();
//   } else if (type === "c") {
//     doC();
//   } else if (type === "d") {
//     doD();
//   } else if (type === "e") {
//     doE();
//   }
// }

// 인터페이스 선언 후 리터럴이나 클래스를 추가하여 기능을 추가 가능
interface Doable {
  do(): void;
}

function main(type: Doable) {
  type.do();
}

class A implements Doable {
  do() {}
}

class B implements Doable {
  do() {}
}

const C = {
  do() {
    console.log("C");
  },
};
const D = {
  do() {
    console.log("D");
  },
};

main(C);
