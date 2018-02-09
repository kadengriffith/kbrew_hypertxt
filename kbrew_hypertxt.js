// author      : Kaden Griffith
// filename    : kbrew_hypertxt.js
const kbrew_hypertxt_config = require('./KBREW_hypertxt.json');
class kbrew_hypertxt {
  constructor(title) {
    this.title = title;
    this.html = '';
    this.live = '';
  }

  // Write Function: begin HTML document
  w_openHead() {
    this.clearFile();
    this.w_openElement({
      tag: '!DOCTYPE html'
    });
    this.w_openElement({
      tag: 'html lang="en"'
    });
    this.w_openElement({
      tag: 'head',
      contains: this.r_openElement({
        tag: 'meta',
        charset: 'UTF-8'
      }) + this.r_openElement({
        tag: 'meta',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }) + this.r_openElement({
        tag: 'meta',
        content: 'ie=edge'
      }) + this.r_element({
        tag: 'title',
        contains: this.title
      }) + this.r_openElement({
        tag: 'link',
        href: kbrew_hypertxt_config.hypertxt_style_url,
        rel: 'stylesheet'
      }) + this.r_openElement({
        tag: 'link',
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
        rel: 'stylesheet'
      })
    });
  }

  // Write Function: element with configurable tag type
  w_element(properties) {
    this.html += this.r_element(properties);
  }

  // Write Function: open an element with configurable tag type
  w_openElement(properties) {
    this.html += this.r_openElement(properties);
  }

  // Write Function: close an element with configurable tag type
  w_closeElement(properties) {
    this.html += this.r_closeElement(properties);
  }

  // Write Live Function: element with configurable tag type within live
  wl_element(properties) {
    this.clear();
    this.live += this.r_element(properties);
  }

  // Write Function: open an element with configurable tag type
  wl_openElement(properties) {
    this.live += this.r_openElement(properties);
  }

  // Write Function: close an element with configurable tag type
  wl_closeElement(properties) {
    this.live += this.r_closeElement(properties);
  }

  // Return Function: element with configurable tag type
  r_element(properties) {
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
    if (properties.contains) {
      str_element += this.p_contents(properties.contains);
    }
    if (properties.tag) {
      str_element += this.r_closeElement(properties);
    } else {
      str_element += this.r_closeElement({
        tag: 'div'
      });
    }
    return str_element;
  }

  // Return Function: open an element with configurable tag type
  r_openElement(properties) {
    let str_element = '<' + properties.tag;
    for (let property in properties) {
      if (property != 'tag' && property != 'contains') {
        str_element += ' ' + property + '="' + properties[property] + '"';
      }
    }
    str_element += '>';
    if (properties.contains) {
      str_element += this.p_contents(properties.contains);
    }
    return str_element;
  }

  // Return Function: close an element with configurable tag type
  r_closeElement(properties) {
    return '</' + properties.tag + '>';
  }

  // Return Function: KBREW_hypertxt line break
  r_ln() {
    return this.r_openElement({
      tag: 'br'
    });
  }

  // Return Function: KBREW_hypertxt bouble line break
  r_dln() {
    return this.r_openElement({
      tag: 'br'
    }) + this.r_openElement({
      tag: 'br'
    });
  }

  // Return Function: FontAwesome icon
  r_icon(choice, innerHTML) {
    return this.r_element({
      tag: 'i',
      class: 'fas fa-' + choice,
      contains: this.p_contents(innerHTML)
    })
  }

  // Component Function: KBREW_hypertxt menu
  c_menu(properties) {
    let str_KBREW_hypertxt = '';
    let str_KBREW_hypertxt_links = '';
    for (let link of properties.links_array) {
      str_KBREW_hypertxt_links += this.r_element({
        class: 'hyper_link hyper_menu_link hyper_' + properties.style,
        contains: link.text,
        onclick: link.onclick
      });
    }
    str_KBREW_hypertxt += this.r_element({
      class: 'hyper_menu ' + properties.location + ' hyper_top hyper_left',
      id: 'hyper_menu',
      contains: this.r_element({
        tag: 'i',
        class: 'fas fa-2x fa-times hyper_link',
        id: 'hyper_menu_close',
        onclick: "javascript:toggleMenu(false);"
      }) + this.r_element({
        class: 'hyper_spacer'
      }) + this.r_element({
        class: 'hyper_menu_links',
        contains: str_KBREW_hypertxt_links + this.r_element({
          class: 'hyper_grid hyper_centered',
          contains: this.r_element({
            class: 'hyper_profile_id hyper_align_right hyper_link hyper_normalized',
            onclick: "javascript:emit('/profile');"
          }) + this.r_element({
            class: 'hyper_link hyper_align_right hyper_normalized',
            id: 'hyper_menu_signin',
            contains: 'Sign In'
          }) + this.r_element({
            class: 'hyper_profile_ext_credits_img'
          }) + this.r_element({
            class: 'hyper_profile_ext_credits_text hyper_text hyper_normalized'
          }) + this.r_element({
            tag: 'i',
            class: 'fas fa-shopping-cart hyper_ext_cart hyper_link hyper_normalized',
            onclick: "javascript:emit('/cart');"
          })
        })
      })
    });
    this.html += str_KBREW_hypertxt;
  }

  // Component Function: KBREW_hypertxt navbar
  c_navbar(properties) {
    let str_KBREW_hypertxt = '';
    let str_KBREW_hypertxt_links = '';
    for (let link of properties.links_array) {
      str_KBREW_hypertxt_links += this.r_element({
        class: 'hyper_navbar_link hyper_navbar_' + properties.style,
        onclick: link.onclick,
        contains: link.text
      });
    }
    str_KBREW_hypertxt += this.r_element({
      class: 'hyper_navbar hyper_top hyper_left',
      id: 'hyper_navbar',
      contains: this.r_element({
        onclick: "javascript:emit('/start');",
        class: 'hyper_logo hyper_link',
        contains: this.r_element({
          tag: 'canvas',
          width: "128",
          height: "50",
          id: 'hyper_logo'
        })
      }) + this.r_element({
        tag: 'i',
        id: "hyper_menu_open",
        onclick: 'javascript:toggleMenu(true);',
        class: 'fa fa-bars fa-2x hyper_action'
      }) + str_KBREW_hypertxt_links + this.r_element({
        class: 'hyper_grid hyper_' + properties.style,
        contains: this.r_element({
          contains: this.r_element({
            class: 'hyper_profile_id hyper_align_right hyper_link hyper_normalized',
            onclick: "javascript:emit('/profile');"
          }) + this.r_element({
            class: 'hyper_link hyper_align_right hyper_normalized',
            id: 'hyper_navbar_signin',
            onclick: "javascript:emit('/signIn');",
            contains: 'Sign In'
          })
        }) + this.r_element({
          class: 'hyper_profile_ext_credits_img'
        }) + this.r_element({
          class: 'hyper_profile_ext_credits_text hyper_text hyper_normalized'
        }) + this.r_element({
          tag: 'i',
          class: 'fas fa-shopping-cart hyper_ext_cart hyper_link hyper_align_center hyper_normalized',
          style: 'display: none;',
          onclick: "javascript:emit('/cart');"
        })
      })
    });
    this.html += str_KBREW_hypertxt;
  }

  // Component Function: KBREW_hypertxt loading buffer screen
  c_loading() {
    this.html += this.r_element({
      class: 'hyper_loading'
    });
  }

  // Component Function: KBREW_hypertxt spacer
  c_spacer() {
    this.html += this.r_element({
      class: 'hyper_spacer'
    });
  }

  // Component Function: KBREW_hypertxt alert management
  c_alerts() {
    this.html += this.r_element({
      id: 'hyper_error'
    }) + this.r_element({
      tag: 'div',
      id: 'hyper_success'
    });
  }

  // Component Function: KBREW_hypertxt live server side render space
  c_live_render(additions) {
    this.html += this.r_element({
      class: 'hyper_live',
      contains: additions.contains
    });
  }

  // Process Function: filter for element containing undefined innerHTML
  p_contents(elementContents) {
    if (elementContents === undefined) {
      return '';
    } else {
      return elementContents;
    }
  }

  // Process Function: renders usable HTML
  p_document() {
    return this.html + '</html>';
  }

  // Process Function: renders usable HTML
  p_live() {
    return this.live;
  }

  // Utility Function: clears the live render
  clear() {
    this.live = '';
  }

  // Utility Function: clears all written data, preserving object
  clearFile() {
    this.html = '';
    this.live = '';
  }
};

if (kbrew_hypertxt_config.node) {
  module.exports = kbrew_hypertxt;
}