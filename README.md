[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/billboard-charts)

# \<billboard-charts\>

\<billboard-charts\> is a web component wrapper around the [billboard.js](https://naver.github.io/billboard.js/) hit library.

Data can be passed into the component via the data property, either via binding, or programatically.  The boolean "publish" will block rendering if it isn't present.  This allows one to apply sanity checks on displaying new data.

```html
<billboard-charts publish data="[[example1]]"></billboard-charts>
```

To achieve master / detail functionality, where clicking on an element should notify the parent of the selected item, use the selected-element attribute:

```html
<billboard-charts publish data="[[example1]]" selected-element ="{{selectedDataPoint}}"></billboard-charts>
```

If you are working with other Polymer elements, this will allow binding to take place amongst the peers within the containing Polymer component.

To work with other Web Component libraries, you will need to either add some event listening logic, or utilize Polymer mixins, as demonstrated [here](https://www.webcomponents.org/element/bahrus/xtal-fetch).


## Important note regarding stylesheet dependency, and how to reference the web component.

Given that this is a Polymer based component, and Polymer is heading into a bit of turbulence as it switches to npm / ES6 modules, a few accomodations were made.  You can reference the component the Polymer < 3 way:

```html
<link rel="import" href="../billboard-charts.html">
```

But if you don't want to be tied to using HTML Imports, you can instead provide your own reference to Polymer.Element independently, from wherever you choose, and just reference the javascript file directly:


```html
<script async src="../billboard-charts.js"></script>
```

The JavaScript will wait until Polymer.Element is loaded before trying to exteend it.


This component leverages an [alternative method for importing an external css file](https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/#link-relstylesheet-in-the-shadow-dom), that doesn't rely on the deprecated(?) HTML Imports.  The challenge with this approach is that, by default, the resolution of the url of the css file appears to be based on the hosting page, rather than the component.  If no css file is specified, this component attempts to calculate the default based the location of the component, using the document.currentScript object.  IE11 doesn't support that, so in that case, it uses a path relative to the root by default: /bower_components/billboard.js/dist/billboard.css.  

A similar approach is taken for resolving the other two depencies:  billboard.js and d3.js.  The code first checks to make sure that d3 and billboard aren't already loaded.  If they aren't, it will use document.currentScript.

In addition to being able to specify the location of each of these three resources individual via properties _d3Path_, _billboardLibPath_ and _cssPath_ you can, for purposes of IE11, specify the root url for the folder containing all three of these resources, using property _baseUrlPath_.  By default, _baseUrlPath_ = '/bower_components/'. 

You can override the default, either to achieve your own look and feel, or to allow for less guesswork as far as the location of the file.  You can do so by using the setting shown below:

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
