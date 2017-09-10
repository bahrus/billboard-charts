[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/billboard-charts)

# \<billboard-charts\>

\<billboard-charts\> is a web component wrapper around the [billboard.js](https://naver.github.io/billboard.js/) hit library.

Features include "master-detail" functionality -- clicking on a data element can post the element to peer componennts.

Important note regarding stylesheet dependency.

This component includes the default css file for the json editor:  /bower_components/billboard.js/dist/billboard.css.  You can override this default, for your own look and feel by setting:

```html
    <billboard-charts cssPath="...">
```

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
