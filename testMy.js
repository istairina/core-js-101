const cssSelectorBuilder = {

  elem: '',
  idE: '',
  cl: '',
  att: '',
  pC: '',
  pE: '',
  lastOrder: 0,

  checkOrder(currOrder) {
    console.log(`${currOrder} > ${this.lastOrder}`);
    if (currOrder < this.lastOrder) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
      );
    } else {
      this.lastOrder = currOrder;
    }
  },

  stringify() {
    return this.elem + this.idE + this.cl + this.att + this.pC + this.pE;
  },

  element(el) {
    if (this.elem) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    const obj = Object.create(cssSelectorBuilder);
    Object.assign(obj, this);
    obj.checkOrder(0);
    obj.elem = el;
    return obj;
  },

  id(id) {
    if (this.idE) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    const obj = Object.create(cssSelectorBuilder);
    Object.assign(obj, this);
    obj.checkOrder(1);
    obj.idE = `#${id}`;
    return obj;
  },

  class(strClass) {
    const obj = Object.create(cssSelectorBuilder);
    Object.assign(obj, this);
    obj.checkOrder(2);
    if (obj.cl) {
      obj.cl += `.${strClass}`;
    } else {
      obj.cl = `.${strClass}`;
    }
    return obj;
  },

  attr(strAttr) {
    const obj = Object.create(cssSelectorBuilder);
    Object.assign(obj, this);
    obj.checkOrder(3);
    if (obj.att) {
      obj.att += `[${strAttr}]`;
    } else {
      obj.att = `[${strAttr}]`;
    }
    return obj;
  },

  pseudoClass(pC) {
    const obj = Object.create(cssSelectorBuilder);
    Object.assign(obj, this);
    obj.checkOrder(4);
    if (obj.pC) {
      obj.pC += `:${pC}`;
    } else {
      obj.pC = `:${pC}`;
    }
    return obj;
  },

  pseudoElement(pE) {
    if (this.pE) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
    const obj = Object.create(cssSelectorBuilder);
    Object.assign(obj, this);
    obj.checkOrder(5);
    obj.pE = `::${pE}`;
    return obj;
  },

  combine(selector1, combinator, selector2) {
    const obj = Object.create(cssSelectorBuilder);
    obj.selector1 = selector1.stringify();
    obj.selector2 = selector2.stringify();
    obj.stringify = () => `${obj.selector1} ${combinator} ${obj.selector2}`;
    return obj;
  },
};

const builder = cssSelectorBuilder;

console.log(builder.element('div').stringify());
console.log(builder.id('nav-bar').stringify());
console.log(builder.element('li').id('main').stringify());
// console.log(
//   builder.id('main').class('container').class('editable').stringify()
// );
// console.log(builder.element('input').pseudoClass('focus').pseudoClass('invalid').stringify());

// console.log(
//   builder
//     .combine(
//       builder.element('p').pseudoClass('focus'),
//       '>',
//       builder.element('a').attr('href$=".png"')
//     )
//     .stringify()
// );

console.log(builder.id('id').element('div').stringify());