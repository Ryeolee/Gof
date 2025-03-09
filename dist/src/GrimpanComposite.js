"use strict";
class Character {
    att = 10;
    equipment = [];
    getAtt() {
        const childrenAtt = this.equipment.reduce((a, c) => a + c.getAtt(), 0);
        return this.att + childrenAtt;
    }
    equip(item) {
        this.equipment.push(item);
    }
}
class Sword {
    att = 20;
    equipment = [];
    getAtt() {
        const childrenAtt = this.equipment.reduce((a, c) => a + c.getAtt(), 0);
        return this.att + childrenAtt;
    }
    equip(item) {
        this.equipment.push(item);
    }
}
class Jewel {
    att = 5;
    getAtt() {
        return this.att;
    }
}
class Jewel2 {
    att = 3;
    getAtt() {
        return this.att;
    }
}
const sword = new Sword();
sword.equip(new Jewel());
sword.equip(new Jewel2());
const lee = new Character();
lee.equip(sword);
console.log(lee.getAtt());
