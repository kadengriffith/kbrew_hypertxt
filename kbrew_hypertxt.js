// author   : Kaden Griffith
// filename : kbrew_hypertxt.js
// version  : 1.0.1

class kbrew_hypertxt {
  constructor(title) {
    this.title = title;
    this.html = '';
  }

  // Write HTML document
  getFile(properties) {
    this.clear();
    this.writeOpenElement({
      tag: '!DOCTYPE html'
    });
    this.write({
      tag: 'html',
      lang: 'en',
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
        }) + this.getOpenElement({
          tag: 'link',
          href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
          rel: 'stylesheet'
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
    let str_element = '';
    if (properties.tag) {
      str_element += '<' + properties.tag;
    } else {
      str_element += '<div';
    }
    for (let property in properties) {
      if (property != 'tag' && property != 'contains') {
        str_element += ' ' + property + '="' + properties[property] + '"';
      }
    }
    str_element += '>';
    str_element += this.processContent(properties.contains);
    if (properties.tag) {
      str_element += this.closeElement(properties);
    } else {
      str_element += this.closeElement({
        tag: 'div'
      });
    }
    return str_element;
  }

  // Returns an open ended element with configurable tag type and properties
  getOpenElement(properties) {
    let str_element = '<' + properties.tag;
    for (let property in properties) {
      if (property != 'tag' && property != 'contains') {
        str_element += ' ' + property + '="' + properties[property] + '"';
      }
    }
    str_element += '>';
    if (properties.contains) {
      str_element += this.processContent(properties.contains);
    }
    return str_element;
  }

  // Close an element with configurable tag type
  closeElement(properties) {
    return '</' + properties.tag + '>';
  }

  // Return a line break
  ln() {
    return this.getOpenElement({
      tag: 'br'
    });
  }

  // Return a bouble line break
  dln() {
    return this.getOpenElement({
      tag: 'br'
    }) + this.getOpenElement({
      tag: 'br'
    });
  }

  // Return a FontAwesome icon
  icon(properties) {
    return this.getElement({
      tag: 'i',
      class: 'fas fa-' + properties.icon,
      contains: this.processContent(properties.contains)
    });
  }

  // Filter undefined innerHTML
  processContent(elementContent) {
    if (elementContent === undefined) {
      return '';
    } else {
      return elementContent;
    }
  }

  // Clears all written data
  clear() {
    this.html = '';
  }
};

module.exports = kbrew_hypertxt;