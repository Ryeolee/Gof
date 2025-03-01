// 부모객체를 자식 객체로 대체했을 때 에러가 나면 안된다.
class Animal {
  isAnimal() {
    return true;
  }
}

class Bird extends Animal {
  fly() {
    return "파닥파닥";
  }
  isBird() {
    return true;
  }
}

class Penguin extends Bird {
  // 리스코프 치환의 원칙을 어김.
  override fly() {
    throw new Error("못 날아");
  }
}

console.log(new Animal().isAnimal());

// 부모 클래스 Bird에서 자식 클래스 Penguin으로 바꿨을 때, 에러가 남. -> 리스코프 치환 법칙을 어김.
console.log(new Bird().fly().at(1));
console.log(new Penguin().fly().at(1));

console.log(new Penguin().fly());
