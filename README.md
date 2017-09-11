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


## Important note regarding stylesheet dependency.

This component leverages an [alternative method for importing an external css file](https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/#link-relstylesheet-in-the-shadow-dom), that doesn't rely on the deprecated(?) HTML Imports.  The challenge with this approach is that, by default, the resolution of the url of the css file appears to be based on the hosting page, rather than the component.  If no css file is specified, this component attempts to calculate the default based the location of the component, using the document.currentScript object.  IE11 doesn't support that, so in that case, it uses a path relative to the root by default: /bower_components/billboard.js/dist/billboard.css.  

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
