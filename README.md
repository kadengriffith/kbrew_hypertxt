## kbrew_hypertxt -- version 1.0.2

Hypertxt is an HTML generator written in JavaScript.

This package is meant to simplify web page generation to a single line, while managing dynamic data consistently.
* FontAwesome icon integration by default.

### Before You Go Further...

This package needs you to be okay with:
* [x] Node JS / Express Web Applications
* [x] Javascript Objects
* [x] ES6 Syntax

## Getting Started

```
npm install kbrew_hypertxt
```

## Basics

Let's go through the different types of methods available:

```
// Write a sendable HTML document
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

// Return a double line break
dln()

// Return a FontAwesome icon
icon(properties)

// Return a 'far' FontAwesome icon
outlineIcon(properties)

// Filter undefined innerHTML
processContent(elementContent)

// Clears all written data
clear()
```

## Creating HTML

PLEASE NOTE:
In the 'demo' folder of the installed package, you will find this example already written with a basic server ready to go if you wish to explore on your own. Please read the README.md file within the 'demo' folder for its operational instructions.

Now, let's take a look at how hypertxt can be used to write a virtual file and send the content back to our client using Express web app structures.

In this example, we will create a Node / Express server application and use simple routing to send the data hypertxt writes for us.

Create a new file that will contain our easily manageable collection of hypertxt page generators.

```
sudo nano Templates.js
```

Copy the following into the file you've just opened.

```
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
```

Save the file, noting its location relative to your server file.

Now, we will require Templates.js in your Node JS server file.

```
const Templates = require('./PATH/TO/Templates')();
```

Now, when the server receives a request, we can utilize our templated files that live inside Templates.js.

For example in the demo we use:

```
app.get('/', (res, req) => {
  res.send(Templates.index({
    body: Templates.example()
  }));
});
```

You may have noticed the 'body' key within our Templates.index({ }).

This tells hypertext that we want to generate as additional content in the body section of the returned Templates.index( ) file.

In Templates.index( ), we have written an entire recallable HTML file with body content consisting of what was returned from Templates.example( ). Using a structure similar to this allows for the use of static components that can be built on demand much like the content delivered in Templates.example( ). Please Note: There are general head meta tags inserted by default and more can be added much like a link tag.

Getting back to the demo, we can now test the server and see what HTML we get back when we make a request!

If you are following along and using the demo you can test the pre-made server by running:

```
npm start
```

Visit localhost:5000 to view the end result.

Right clicking and selecting 'view source' in Chrome, the response should look identical to:

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

This concludes the basics of writing HTML using kbrew_hypertxt templating techniques.

PLEASE NOTE:
This library is also very useful in client-side applications; however, the implementation is very similar to the example shown above so I will leave the experimentation to you. This package is more deliverable to Node server development but feel free to fork and clone the repo to use the collection outside of Node application development. If you have any questions, or need some use case help, please ask and I will create them and append them to this README.md! Thanks.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
