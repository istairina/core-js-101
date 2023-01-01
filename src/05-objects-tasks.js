/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function getAr() {
  return this.width * this.height;
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const got = JSON.parse(json);
  return Object.setPrototypeOf(got, proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {

  elem: '',
  idE: '',
  cl: '',
  att: '',
  pC: '',
  pE: '',
  lastOrder: 0,

  checkOrder(currOrder) {
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

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
