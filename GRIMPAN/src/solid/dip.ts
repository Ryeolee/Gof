import Grimpan from "../ChromeGrimpan.js";

// 위처럼 매개변수를 통한 약결합을 사용하는 것이 DIP 해결 방법 중 하나이다.  --> 함수내나 클래스 안에서 외부 함수, 클래스를 가져올 때 매개변수 , 생성자로 받기
function main(instance: any) {
  instance.initialize();
}

main(Grimpan.getInstance());

class IObj {}
class Obj implements IObj {}

// 인터페이스를 타입으로 지정.
class A {
  constructor(obj?: IObj) {}
  setObj(obj: IObj) {}
}

// 생성자 의존성 주입
new A(new Obj());

// 함수 의존성 주입
new A().setObj(new Obj());
