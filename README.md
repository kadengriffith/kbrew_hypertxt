### kbrew_hypertxt

Hypertxt is an HTML generator written in JavaScript. 

This package is meant to simplify generating web pages with dynamic data.

* FontAwesome icons included. 

### Prerequisites

* [x] Node JS Web Application
* [x] Server-side File Serving
* [x] Familiar With Javascript Objects

## Getting Started

```
npm install --save kbrew_hypertxt
```

or to use without Node JS ( No Tutorial )

```
git clone https://yourforkedrepo/kbrew_hypertxt.git
```

### Basics

Let's go through the different types of methods available:

'w' Prefixed => Write functions. These write to the html within the template hypertxt class object.

Example:
```
this.hypertxt.w_element();
```

'wl' Prefixed => Write Live functions. These write to the live within the template hypertxt class object.

Example:
```
this.hypertxt.wl_element();
```

'r' Prefixed => Return functions. These return direct elements to be used in construction of Html chunks.

Example:
```
this.hypertxt.r_element();
```

'c' Prefixed => Component functions. Very unusable and un-customizable components ( Not Recommended )
Example:
```
this.hypertxt.c_loading();
```

Now let's see what is built in:

'w' Prefixed:
```
w_openHead() -- Writes a basic HTML start
w_element() -- Writes a fully customizable DOM object
```

'wl' Prefixed:
```
wl_openElement(properties) -- Writes to live, a fully customizable DOM object without </tag>
wl_closeElement(properties) -- Writes to live, </tag>
wl_element(properties) -- Writes to live, a fully customizable DOM object
```

'r' Prefixed:
```
r_openElement(properties) -- Returns a fully customizable DOM object without </tag>
r_closeElement(properties) -- Returns </tag>
r_element(properties) -- Returns a fully customizable DOM object
r_ln() -- Line break
r_dln() -- Double line break
r_icon(choice, innerHTML) -- Returns a Font-Awesome icon
```

'p' Prefixed: [ Process functions ]
```
p_contents(elementContents) -- replaces undefined content with air
p_document() -- process full document
p_live() -- process sectioned HTML intended to be sent as data and displayed in hyper_live
```

'c' Prefixed: [ Component Functions ] > See kbrew_hypertxt.js to manipulate these if you dare.

## Add hypertxt To Your Project

Create a new file that will contain our template class of hypertxt page generators.

```
sudo nano kbrew_hypertxt_templates.js
```

Copy this into the file you've just made.

```
const hypertxt = require('kbrew_hypertxt');

class hypertxt_templates {
  constructor(title) {
    this.hypertxt = new hypertxt(title);
  }
  
  index(additions) {
    
  }
  
  screen1() {

  }
};  

module.exports = hypertxt_templates;
```
Save that file, noting its location relative to your server.

Now we will require that file in your Node JS server application.

```
const hypertxt_templates = require('PATH/TO/kbrew_hypertxt_templates.js'),
      hypertxt = new hyprtxt_texmplates('Title of client HTML');
```

Now when the server receives a request we can utilize our templated files that we will create.

For example:

```
app.get('/', (res, req) => {
  res.send(hypertxt.index({
    hyper_live: hypertxt.screen1()
  }));
});
```

You may have noticed the 'hyper_live' key within our hypertext.index({ }).

This tells hypertext that we want to generate additional screen HTML and were specifying that we want the the screen we chose to be the content within the div tag containing the 'hyper_live' class. In this case screen1( ) has been chosen.

But you may have also noticed that we haven't seen what any of these cool generating functions do, and how they make the files appear just like a typed document.

## Creating HTML

Hopping back to kbrew_hypertxt_templates.js, we want to make something that resembles an HTML file. To do this we can copy this starting structure to see how the basic functionality is laid out.

```
index(additions) {
  let links = [{
    text: 'Google',
    href: "https://google.com"
  }, {
    text: 'Mozilla',
    href: "https://developer.mozilla.org/en-US/"
  }];
  this.hypertxt.w_openHead();
  this.hypertxt.w_openElement({
    tag: 'link',
    src: './favicon.png',
    rel: 'icon',
    type: 'image/png'
  });
  this.hypertxt.w_openElement({
    tag: 'link',
    href: './style.css',
    rel: 'stylesheet'
  });
  this.hypertxt.w_openElement({
    tag: 'link',
    href: 'https://fonts.googleapis.com/css?family=Ubuntu',
    rel: 'stylesheet'
  });
  this.hypertxt.w_closeElement({
    tag: 'head'
  });
  this.hypertxt.w_openElement({
    tag: 'body'
  });
  this.hypertxt.c_menu({
    links_array: links,
    style: 'centered',
    location: 'hyper_offscreen_top'
  });
  this.hypertxt.c_navbar({
    links_array: links,
    style: 'centered'
  });
  this.hypertxt.c_loading();
  this.hypertxt.c_spacer();
  this.hypertxt.c_alerts();
  if (additions.hyper_live) {
    this.hypertxt.c_live_render({
      contains: additions.hyper_live
    });
  } else {
    this.hypertxt.c_live_render();
  }
  this.hypertxt.w_element({
    tag: 'script',
    src: './kbrew_hypertxt_driver.js',
    type: 'text/javascript'
  });
  this.hypertxt.w_closeElement({
    tag: 'body'
  });
  return this.hypertxt.p_document();
}

screen1() {
  this.hypertxt.wl_element({
    class: 'hyper_align_center',
    contains: this.hypertxt.r_element({
      tag: 'h1',
      class: 'hyper_title',
      contains: "Wow! HTML from this?" + this.hypertxt.r_icon('heart')
    })
  });
  return this.hypertxt.p_live();
}
```


In index(additions) we have written an entire HTML file and we inserted our additions, which in this case is what screen1( ) returns. Note that the entire file could be constructed without the use of the components (the unspoken 'c' prefixed prototypes).


Save kbrew_hypertxt_templates.js, and we can now test the server and see what html we get back when we make a request!


The response should look identical to: 

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="ie=edge">
    <title>Title of client HTML</title>
    <link href="./kbrew_hypertxt_style.css" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link src="./favicon.png" rel="icon" type="image/png">
    <link href="./style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  </head>
  <body>
    <div class="hyper_menu hyper_offscreen_top hyper_top hyper_left" id="hyper_menu">
      <i class="fas fa-2x fa-times hyper_link" id="hyper_menu_close" onclick="javascript:toggleMenu(false);"></i>
      <div class="hyper_spacer"></div>
      <div class="hyper_menu_links">
        <div class="hyper_link hyper_menu_link hyper_centered" onclick="undefined">Google</div>
        <div class="hyper_link hyper_menu_link hyper_centered" onclick="undefined">Mozilla</div>
        <div class="hyper_grid hyper_centered">
          <div class="hyper_profile_id hyper_align_right hyper_link hyper_normalized" onclick="javascript:emit('/profile');"></div>
          <div class="hyper_link hyper_align_right hyper_normalized" id="hyper_menu_signin">Sign In</div>
          <div class="hyper_profile_ext_credits_img"></div>
          <div class="hyper_profile_ext_credits_text hyper_text hyper_normalized"></div>
          <i class="fas fa-shopping-cart hyper_ext_cart hyper_link hyper_normalized" onclick="javascript:emit('/cart');"></i>
        </div>
       </div>
    </div>
    <div class="hyper_navbar hyper_top hyper_left" id="hyper_navbar">
      <div onclick="javascript:emit('/start');" class="hyper_logo hyper_link">
       <canvas width="128" height="50" id="hyper_logo"></canvas>
      </div>
      <i id="hyper_menu_open" onclick="javascript:toggleMenu(true);" class="fa fa-bars fa-2x hyper_action"></i>
      <div class="hyper_navbar_link hyper_navbar_centered" onclick="undefined">Google</div>
      <div class="hyper_navbar_link hyper_navbar_centered" onclick="undefined">Mozilla</div>
      <div class="hyper_grid hyper_centered">
        <div>
          <div class="hyper_profile_id hyper_align_right hyper_link hyper_normalized" onclick="javascript:emit('/profile');"></div>
          <div class="hyper_link hyper_align_right hyper_normalized" id="hyper_navbar_signin" onclick="javascript:emit('/signIn');">Sign In</div>
        </div>
        <div class="hyper_profile_ext_credits_img"></div>
        <div class="hyper_profile_ext_credits_text hyper_text hyper_normalized"></div>
        <i class="fas fa-shopping-cart hyper_ext_cart hyper_link hyper_align_center hyper_normalized" style="display: none;" onclick="javascript:emit('/cart');"></i>
      </div>
    </div>
    <div class="hyper_loading"></div>
    <div class="hyper_spacer"></div>
    <div id="hyper_error"></div>
    <div id="hyper_success"></div>
    <div class="hyper_live">
      <div class="hyper_align_center">
        <h1 class="hyper_title">Wow! HTML from this?<i class="fas fa-heart"></i></h1>
      </div>
    </div>
    <script src="./hypertxt_driver.js" type="text/javascript"></script>
  </body>
</html>
```

PLEASE NOTE: 
As of this moment the components used are meant for a project I'm working on but they are using the same structuring techniques seen in the kbrew_hypertxt_templates.js example. Please bend those to your needs and don't rely on the current limited customization.

The main takeaway is that asking JavaScript to write your served files just became a lot more manageable.

Hypertxt comes with a fully customizable stylesheet to include in your project files if you wish to use components and hypertxt styling. Hypertxt also includes a kbrew_hypertxt_driver.js file that should be included if you intend to try out the components (Don't).

Thanks

## TODO :

This is a list of the project intentions

* Navbar and Menu need to be less constrained
* More components
* Component configurations and more complete styles
* Shorten syntax
* More thoughtful way of detecting when to close tags
* Fix links to accept href as well as onclick (Don't think I didn't see my mistakes).
