"use strict";
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
function main(type) {
    type.do();
}
class A {
    do() { }
}
class B {
    do() { }
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
