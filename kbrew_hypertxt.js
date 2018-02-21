// author   : Kaden Griffith
// filename : kbrew_hypertxt.js
// version  : 1.0.2
module.exports = kbrew_hypertxt;

function kbrew_hypertxt(title) {
  if (!(this instanceof kbrew_hypertxt)) {
    return new kbrew_hypertxt(title);
  }

  kbrew_hypertxt.title = title;
  kbrew_hypertxt.html = '';
}
// Write HTML document
kbrew_hypertxt.prototype.getFile = (properties) => {
  kbrew_hypertxt.prototype.clear();
  kbrew_hypertxt.prototype.writeOpenElement({
    tag: '!DOCTYPE html'
  });
  kbrew_hypertxt.prototype.write({
    tag: 'html',
    lang: 'en',
    contains: kbrew_hypertxt.prototype.getElement({
      tag: 'head',
      contains: kbrew_hypertxt.prototype.getOpenElement({
        tag: 'meta',
        charset: 'UTF-8'
      }) + kbrew_hypertxt.prototype.getOpenElement({
        tag: 'meta',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }) + kbrew_hypertxt.prototype.getOpenElement({
        tag: 'meta',
        content: 'ie=edge'
      }) + kbrew_hypertxt.prototype.getElement({
        tag: 'title',
        contains: kbrew_hypertxt.title
      }) + kbrew_hypertxt.prototype.getOpenElement({
        tag: 'link',
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
        rel: 'stylesheet'
      }) + kbrew_hypertxt.prototype.processContent(properties.head)
    }) + kbrew_hypertxt.prototype.getElement({
      tag: 'body',
      contains: kbrew_hypertxt.prototype.processContent(properties.body)
    })
  });
  return kbrew_hypertxt.html;
}

// Write element with configurable tag type and properties
kbrew_hypertxt.prototype.write = properties => kbrew_hypertxt.html += kbrew_hypertxt.prototype.getElement(properties);

// Write an open ended element with configurable tag type and properties
kbrew_hypertxt.prototype.writeOpenElement = properties => kbrew_hypertxt.html += kbrew_hypertxt.prototype.getOpenElement(properties);

// Returns an element with configurable tag type and properties
kbrew_hypertxt.prototype.getElement = (properties) => {
  let str_element = '';
  if (properties.tag) {
    str_element += '<' + properties.tag;
  } else {
    str_element += '<div';
  }
  for (let property in properties) {
    if (property != 'tag' && property != 'contains' && property != 'icon') {
      str_element += ' ' + property + '="' + properties[property] + '"';
    }
  }
  str_element += '>';
  str_element += kbrew_hypertxt.prototype.processContent(properties.contains);
  if (properties.tag) {
    str_element += kbrew_hypertxt.prototype.closeElement(properties);
  } else {
    str_element += kbrew_hypertxt.prototype.closeElement({
      tag: 'div'
    });
  }
  return str_element;
}

// Returns an open ended element with configurable tag type and properties
kbrew_hypertxt.prototype.getOpenElement = (properties) => {
  let str_element = '<' + properties.tag;
  for (let property in properties) {
    if (property != 'tag' && property != 'contains') {
      str_element += ' ' + property + '="' + properties[property] + '"';
    }
  }
  str_element += '>';
  if (properties.contains) {
    str_element += kbrew_hypertxt.prototype.processContent(properties.contains);
  }
  return str_element;
}

// Close an element with configurable tag type
kbrew_hypertxt.prototype.closeElement = properties => '</' + properties.tag + '>';

// Return a line break
kbrew_hypertxt.prototype.ln = () => {
  return kbrew_hypertxt.prototype.getOpenElement({
    tag: 'br'
  });
}

// Return a bouble line break
kbrew_hypertxt.prototype.dln = () => {
  return kbrew_hypertxt.prototype.getOpenElement({
    tag: 'br'
  }) + kbrew_hypertxt.prototype.getOpenElement({
    tag: 'br'
  });
}

// Return a FontAwesome icon
kbrew_hypertxt.prototype.icon = (properties) => {
  properties.tag = 'i';
  let classes = properties.class;
  properties.class = 'fas fa-' + properties.icon + ' ' + kbrew_hypertxt.prototype.processContent(classes);
  return kbrew_hypertxt.prototype.getElement(properties);
}

// Return a FontAwesome icon of type 'far'
kbrew_hypertxt.prototype.outlineIcon = (properties) => {
  properties.tag = 'i';
  let classes = properties.class;
  properties.class = 'far fa-' + properties.icon + ' ' + kbrew_hypertxt.prototype.processContent(classes);
  return kbrew_hypertxt.prototype.getElement(properties);
}

// Filter undefined innerHTML
kbrew_hypertxt.prototype.processContent = (elementContent) => {
  if (!elementContent) {
    return '';
  } else {
    return elementContent;
  }
}

// Clears all written data
kbrew_hypertxt.prototype.clear = () => kbrew_hypertxt.html = '';