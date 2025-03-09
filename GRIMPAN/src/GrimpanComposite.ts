interface Item {
  att: number;
  getAtt(): number;
}

interface Group extends Item {
  equipment: Item[];
  equip(item: Item): void;
}

class Character implements Group {
  att = 10;
  equipment: Item[] = [];
  getAtt(): number {
    const childrenAtt = this.equipment.reduce((a, c) => a + c.getAtt(), 0);
    return this.att + childrenAtt;
  }
  equip(item: Item): void {
    this.equipment.push(item);
  }
}

class Sword implements Item {
  att = 20;
  equipment: Item[] = [];
  getAtt(): number {
    const childrenAtt = this.equipment.reduce((a, c) => a + c.getAtt(), 0);
    return this.att + childrenAtt;
  }
  equip(item: Item) {
    this.equipment.push(item);
  }
}
class Jewel implements Item {
  att = 5;
  getAtt() {
    return this.att;
  }
}

class Jewel2 implements Item {
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
