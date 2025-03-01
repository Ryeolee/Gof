class GrimpanMenuBtn {
  private name: string;
  private type: string;
  private onClick?: () => void;
  private onChange?: () => void;
  private active?: boolean;
  private value?: string | number;

  constructor(
    name: string,
    type: string,
    onClick?: () => void,
    onChange?: () => void,
    active?: boolean,
    value?: string | number
  ) {
    this.name = name;
    this.type = type;
    this.onClick = onClick;
    this.onChange = onChange;
    this.active = active;
    this.value = value;
  }

  static Builder = class GrimpanMenuBtnBuilder {
    btn: GrimpanMenuBtn;
    constructor(name: string, type: string) {
      this.btn = new GrimpanMenuBtn(name, type);
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setOnChange(onChange: () => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }
    build() {
      return this.btn;
    }
  };
}

// 필수 변수, 미필수를 구분할 수 있고, build()를 통해 객체 완성을 알 수 있다.
const backBtn = new GrimpanMenuBtn.Builder("뒤로", "back")
  .setActive(true)
  .build();
