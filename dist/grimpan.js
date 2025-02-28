/**
 * 하나의 인스턴스를 사용함. 메모리 낭비를 줄일 수 있음.
 * 단점
 * 1. 강한 결합을 하게 됨.
 * 2. 생성자가 private이라서 단위 테스트가 힘듦
 * 3. getInstance()함수가 단일 책임의 원칙을 어김. -> 바뀜 이유가 한가지여야한다. ex) 다른 형식의 그림판을 만들고 싶을 경우 #canvas가 다른 형식으로 만들어질 수 있음.
 *
 */
class Grimpan {
  static instance;
  constructor(canvas) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("canvas 엘리먼트를 입력하세요");
    }
  }
  initialize() {}
  initializeMenu() {}

  // 인스턴스 생성, 인스턴스 한 개 유지 ---> 역할이 두 개 있음  --> 단일 책임 원칙 x
  static getInstance() {
    if (!this.instance) {
      this.instance = new Grimpan(document.querySelector("#canvas"));
    }
    return this.instance;
  }
}
export default Grimpan;
