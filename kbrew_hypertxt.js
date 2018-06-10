// author   : Kaden Griffith
// filename : kbrew_hypertxt.js
// version  : 1.0.3

'use strict';

class kbrew_hypertxt {
  // Hypertxt constructor
  constructor(title = '') {
    this.title = title;
    this.html = '';
  }

  /*
   *  -- Prototypes
   */

  // Write HTML document
  getFile(properties) {
    this.clear();
    this.writeOpenElement({
      tag: '!DOCTYPE html'
    });
    this.write({
      tag: 'html',
      contains: this.getElement({
        tag: 'head',
        contains: this.getOpenElement({
          tag: 'meta',
          charset: 'UTF-8'
        }) + this.getOpenElement({
          tag: 'meta',
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        }) + this.getOpenElement({
          tag: 'meta',
          content: 'ie=edge'
        }) + this.getElement({
          tag: 'title',
          contains: this.title
        }) + this.processContent(properties.head)
      }) + this.getElement({
        tag: 'body',
        contains: this.processContent(properties.body)
      })
    });
    return this.html;
  }

  // Write element with configurable tag type and properties
  write(properties) {
    this.html += this.getElement(properties);
  }

  // Write an open ended element with configurable tag type and properties
  writeOpenElement(properties) {
    this.html += this.getOpenElement(properties);
  }

  // Returns an element with configurable tag type and properties
  getElement(properties) {
    let str_element = properties.tag ? `<${properties.tag}` : '<div';
    for (let property in properties) {
      if (!/(tag|contains|icon)/.test(property)) str_element += ` ${property}="${properties[property]}"`;
    }
    str_element += `>${this.processContent(properties.contains)}`;
    str_element += properties.tag ? this.closeElement(properties) : this.closeElement({
      tag: 'div'
    });
    return str_element;
  }


  // Returns an open ended element with configurable tag type and properties
  getOpenElement(properties) {
    let str_element = `<${properties.tag}`;
    for (let property in properties) {
      if (!/(tag|contains|icon)/.test(property)) str_element += ` ${property}="${properties[property]}"`;
    }
    str_element += '>';
    return str_element;
  }

  // Close an element with configurable tag type
  closeElement(properties) {
    return `</${properties.tag}>`;
  }

  // Return a line break
  ln() {
    return this.getOpenElement({
      tag: 'br'
    });
  }

  // Return a double line break
  dln() {
    return this.ln().repeat(2);
  }

  // Return a FontAwesome icon if Library is present in build
  icon(properties) {
    properties.tag = 'i';
    properties.class = `fas fa-${properties.icon} ${this.processContent(properties.class)}`;
    return this.getElement(properties);
  }

  // Return a FontAwesome icon of type 'far'
  oIcon(properties) {
    properties.tag = 'i';
    properties.class = `far fa-${properties.icon} ${this.processContent(properties.class)}`;
    return this.getElement(properties);
  }

  // Return a FontAwesome icon of type 'fab'
  bIcon(properties) {
    properties.tag = 'i';
    properties.class = `fab fa-${properties.icon} ${this.processContent(properties.class)}`;
    return this.getElement(properties);
  }

  // Filter undefined innerHTML
  processContent(elementContent) {
    return elementContent ? elementContent : '';
  }

  // Get HTML document element
  get(e, index) {
    if (!e) return this.query('body');
    if (e.includes('#')) {
      return document.getElementById(el.replace(/#/, ''));
    } else if (e.includes('.')) {
      return index ? document.getElementsByClassName(el.replace(/./, ''))[index] : document.getElementsByClassName(el.replace(/./, ''))[0];
    }
  }

  // Adds incoming string to a target HTML document element
  add(ref, what = '') {
    ref.innerHTML += what;
  }

  // Removes
  subtract(classOrID) {
    get(classOrID) ? this.get(classOrID).remove() : console.error(`Class or Id ${classOrID} could not be selected.`);
  }

  // Returns querySelector targeting the incoming string
  query(target) {
    return document.querySelector(target);
  }

  // Returns querySelectorAll targeting the incoming string
  queryAll(target) {
    return document.querySelectorAll(target.replace(/(#|.)/, ''));
  }

  // Find key value in JSON file
  jsonParseGrab(OBJ, key) {
    return JSON.parse(JSON.stringify(OBJ))[key];
  }

  // Clears all internally written data
  clear() {
    this.html = '';
  }
}

module.exports = (title) => new kbrew_hypertxt(title);