const hypertxt = require('kbrew_hypertxt');

class hypertxt_templates {
  constructor() {
    this.hypertxt = new hypertxt('Project Name');
  }

  index(additions) {
    return this.hypertxt.getFile({
      head: this.hypertxt.getOpenElement({
        tag: 'link',
        src: './favicon.png',
        rel: 'icon',
        type: 'image/png'
      }) + this.hypertxt.getOpenElement({
        tag: 'link',
        href: './somefile.css',
        rel: 'stylesheet'
      }) + this.hypertxt.getOpenElement({
        tag: 'link',
        href: 'https://fonts.googleapis.com/css?family=Ubuntu',
        rel: 'stylesheet'
      }),
      body: this.hypertxt.processContent(additions.body) + this.hypertxt.getElement({
        tag: 'script',
        src: './somefile.js',
        type: 'text/javascript'
      })
    });
  }

  liveExample() {
    return this.hypertxt.getElement({
      class: 'center',
      contains: this.hypertxt.getElement({
        tag: 'h1',
        class: 'title',
        contains: "Wow! HTML from this? " + this.hypertxt.icon({
          // View icon list at: https://fontawesome.com/icons?d=gallery
          icon: 'heart'
        })
      }) + this.hypertxt.ln() + this.hypertxt.getElement({
        tag: 'a',
        href: 'https://developer.mozilla.org/en-US/',
        contains: 'Learn how to write JavaScript'
      })
    });
  }
};

module.exports = hypertxt_templates;