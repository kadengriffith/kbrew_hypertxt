module.exports = Templates;

function Templates() {
  if (!(this instanceof Templates)) {
    return new Templates();
  }

  Templates.hypertxt = require('kbrew_hypertxt')('Project Name');
}

Templates.prototype.index = (additions) => {
  return Templates.hypertxt.getFile({
    head: Templates.hypertxt.getOpenElement({
      tag: 'link',
      src: './favicon.png',
      rel: 'icon',
      type: 'image/png'
    }) + Templates.hypertxt.getOpenElement({
      tag: 'link',
      href: './somefile.css',
      rel: 'stylesheet'
    }) + Templates.hypertxt.getOpenElement({
      tag: 'link',
      href: 'https://fonts.googleapis.com/css?family=Ubuntu',
      rel: 'stylesheet'
    }),
    body: Templates.hypertxt.processContent(additions.body) + Templates.hypertxt.getElement({
      tag: 'script',
      src: './somefile.js',
      type: 'text/javascript'
    })
  });
}

Templates.prototype.example = () => {
  return Templates.hypertxt.getElement({
    class: 'center',
    contains: Templates.hypertxt.getElement({
      tag: 'h1',
      class: 'title',
      contains: "Wow! HTML from this? " + Templates.hypertxt.icon({
        // View icon list at: https://fontawesome.com/icons?d=gallery
        icon: 'heart'
      })
    }) + Templates.hypertxt.ln() + Templates.hypertxt.getElement({
      tag: 'a',
      href: 'https://developer.mozilla.org/en-US/',
      contains: 'Learn how to write JavaScript'
    })
  });
}