## kbrew_hypertxt v. 1.0.1

Hypertxt is an HTML generator written in JavaScript.

This package is meant to simplify generating web pages with dynamic data.

* Simplified dynamic HTML object writing solution.
* FontAwesome icons included.

### Prerequisites

* [x] Node JS Web Application
* [x] Familiar With Javascript Objects

## Getting Started

```
npm install --save kbrew_hypertxt
```

## Basics

Let's go through the different types of methods available:

```
// Write HTML document
getFile(properties)

// Write element with configurable tag type and properties
write(properties)

// Write an open ended element with configurable tag type and properties
writeOpenElement(properties)

// Returns an element with configurable tag type and properties
getElement(properties)

// Returns an open ended element with configurable tag type and properties
getOpenElement(properties)

// Close an element with configurable tag type
closeElement(properties)

// Return a line break
ln()

// Return a bouble line break
dln()

// Return a FontAwesome icon
icon(properties)

// Filter undefined innerHTML
processContent(elementContent)

// Clears all written data
clear()
```

## Creating HTML

PLEASE NOTE:
In the 'demo' folder of the installed package, you will find this example already written with a basic server ready to go if you wish to explore on your own.

Let's take a look at how hypertxt can be used to write a virtual file and send the content back to our client using Express.

In this example we will create a Node/Express server application and use simple routing to send the data hypertxt writes for us.

Create a new file that will contain our easily manageable class of hypertxt page generators.

```
sudo nano kbrew_hypertxt_templates.js
```

Copy the following into the file you've just made.

```
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
```

Save the file, noting its location relative to your server.

Now, we will require that file in your Node JS server application.

```
const hypertxt_templates = require('PATH/TO/kbrew_hypertxt_templates.js'),
      hypertxt = new hypertxt_templates();
```

Now, when the server receives a request, we can utilize our templated files that live inside our kbrew_hypertxt_templates.js file.

For example:

```
app.get('/', (res, req) => {
  res.send(hypertxt.index({
    body: hypertxt.liveExample()
  }));
});
```

You may have noticed the 'body' key within our hypertext.index({ }).

This tells hypertext that we want to generate additional content in the body section of the returned hypertext.index( ) file.

In hypertxt.index( ), we have written an entire recallable HTML file with body content consisting of what was returned from hypertxt.liveExample( ). Using a structure similar to this allows for the use of static components that can be built much like the content delivered in hypertxt.liveExample( ).

We can now test the server and see what html we get back when we make a request!

If you are using the demo you can test the server by running:

```
npm start
```

Visit localhost:5000 to view the end result.

Right clicking and selecting view source in Chrome, the response should look identical to:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="ie=edge">
    <title>Project Name</title>
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link src="./favicon.png" rel="icon" type="image/png">
    <link href="./somefile.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  </head>
  <body>
    <div class="center">
      <h1 class="title">Wow! HTML from this? <i class="fas fa-heart"></i></h1>
      <br>
      <a href="https://developer.mozilla.org/en-US/">Learn how to write JavaScript</a>
    </div>
    <script src="./somefile.js" type="text/javascript"></script>
  </body>
</html>
```

This concludes the basics of writing HTML using hypertxt templating techniques.

PLEASE NOTE:
This library is also very useful in client-side applications as well; however, the implementation is very similar to the example shown above so I will leave the experimentation to you. This package is more deliverable to Node server development but feel free to fork and clone this repo to use the class outside of Node applications. If you have any questions, or need some guided examples, please ask and I will create them and append them to this readme.md! Thanks.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
