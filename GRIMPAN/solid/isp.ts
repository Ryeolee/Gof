// import { StringLiteral } from "../../../node_modules/typescript/lib/typescript";

// // 부모객체를 자식 객체로 대체했을 때 에러가 나면 안된다.
// class Animal2 {
//   isAnimal() {
//     return true;
//   }
// }

// interface IBrid {
//   quack(): string;
//   fly(): string;
// }

// 각 인터페이스로 분리하여 가능한 것만 사용할 수 있게 한다.  --- > 인터페이스 분리 원칙 해결
// interface Flyable {
//   fly(): string;
// }

// interface Quackable {
//   quack(): string;
// }

// class Bird2 extends Animal implements Quackable {
//   quack() {
//     return "짹짹";
//   }
//   isBird() {
//     return true;
//   }
// }

// 위 클래스에서 펭귄 클래스 덕분에 fly()를 제거하게 된다. 하지만 IBird에서 fly()가 있으므로 또 다시 fly()를 구현해야한다. ----> 인터페이스 분리의 원칙 위반
// class Bird2 extends Animal implements IBrid {
//   fly() {
//     return "파닥파닥";
//   }
//   isBird() {
//     return true;
//   }
// }

// class Penguin extends Bird {
//   // 리스코프 치환의 원칙을 어김.
//   override fly() {
//     throw new Error("못 날아");
//   }
// }

// class Penguin extends Bird2 implements Quackable {
//   override quack() {
//     return "끠끠";
//   }
// }

// class Sparrow extends Bird2 implements Flyable {
//   fly(): string {
//     return "훨풜";
//   }
// }

// console.log(new Animal2().isAnimal());
// console.log(new Bird2().isBird());
// console.log(new Bird2().quack());
// console.log(new Penguin().quack());
// console.log(new Sparrow().fly());
