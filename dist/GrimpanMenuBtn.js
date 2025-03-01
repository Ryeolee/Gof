"use strict";
class GrimpanMenuBtn {
    name;
    type;
    onClick;
    onChange;
    active;
    value;
    constructor(name, type, onClick, onChange, active, value) {
        this.name = name;
        this.type = type;
        this.onClick = onClick;
        this.onChange = onChange;
        this.active = active;
        this.value = value;
    }
    static Builder = class GrimpanMenuBtnBuilder {
        btn;
        constructor(name, type) {
            this.btn = new GrimpanMenuBtn(name, type);
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setOnChange(onChange) {
            this.btn.onChange = onChange;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
        setValue(value) {
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
