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


## Important note regarding referencing the web component and managing dependencies.

Given that this is a Polymer based component, and Polymer is heading into a bit of turbulence as it switches to npm / ES6 modules, a few accomodations have made.  You can reference the component the Polymer < 3 way:

```html
<link rel="import" href="../billboard-charts.html">
```

But if you don't want to be tied to using HTML Imports, you can instead provide your own reference to Polymer.Element independently, from wherever you choose, and just reference the javascript file directly:


```html
<script async src="../billboard-charts.js"></script>
```

Or you can use ES6 modules:

```html
<script type="module" src="../billboard-charts.js"></script>
```

Regardless of how it is referenced, _billboard-chart's_ JavaScript will wait until Polymer.Element is loaded before trying to extend it.

Additionally, _billboard-chart_ depends on three external references:  d3, billboard.js, and a css file that comes with billboard.js, but which can obviously be modified by pointing to a different location where custom styles may be defined.


Focusing first on the css reference, this component leverages an [alternative method for importing an external css file](https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/#link-relstylesheet-in-the-shadow-dom), that doesn't rely on the deprecated(?) HTML Imports.  This alternative seems to  have long-lasting browser support.

The challenge with this approach is that, by default, the resolution of the url of the css file appears to be based relative to the hosting page, rather than the component location. Therefore we need to "think on our feet" a little.  The approach is:

-  If no css file is specified, this component attempts to calculate the default based the location of the component, using the document.currentScript object.  
    - Unfortunately, IE11 doesn't support document.currentScript, so for this browser, we must make due with education guessing -- it defaults to the path relative to the website root by default: /bower_components/billboard.js/dist/billboard.css. 

You can override the default, either to achieve your own look and feel, or to allow for less guesswork as far as the location of the file.  You can do so by using the setting shown below:

```html
    <billboard-charts cssPath="...">
``` 

A similar approach is taken for resolving the other two dependencies:  billboard.js and d3.js.  The code first checks to make sure that d3 and billboard.js aren't already loaded.  In the case of d3, this is a scenario likely to be encounted.  For each library that is found not to already be loaded,  _billboard-charts_ uses document.currentScript, combined with the values of properties d3Path and billboardLibPath to calculate the expected location of these resource\s.

In addition to being able to specify the location of each of these three resources individually via properties _d3Path_, _billboardLibPath_ and _cssPath_, you can, primarily for purposes of IE11, specify the root url for the folder containing all three of these resources, using property _baseUrlPath_.  By default, _baseUrlPath_ = '/bower_components/'. 

In the demo of this component, we chose to specify the path for all three files explictly.  This was necessated by the fact that the webcomponents.org site seems to produce unexpected results when loading resources dynamically.  The explicit references in the demo are as follows:

```html
<billboard-charts id="bc" publish data="[[example1]]" selected-element ="{{selectedDataPoint}}"
    d3-path="https://d3js.org/d3.v4.min.js" billboard-lib-path="https://naver.github.io/billboard.js/release/latest/dist/billboard.min.js"
    css-path="https://naver.github.io/billboard.js/release/latest/dist/billboard.min.css"
    >
</billboard-charts>
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
