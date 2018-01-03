[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/billboard-charts)

# \<billboard-charts\>



\<billboard-charts\> is a dependency-free web component wrapper around the [billboard.js](https://naver.github.io/billboard.js/) hit library. 

Data can be passed into the component via the data property, either via binding, or programatically.  The boolean "publish" will block rendering if it isn't present.  This allows one to apply sanity checks on displaying new data.

```html
<billboard-charts publish data="[[example1]]"></billboard-charts>
```

To achieve master / detail functionality, where clicking on an element should notify the parent of the selected item, use the selected-element attribute:

```html
<billboard-charts publish data="[[example1]]" selected-element ="{{selectedDataPoint}}"></billboard-charts>
```

To add/update data, use the new-data attribute / property.  Assuming the id of the billboard chart is "bc", then this adds data imperatively:

```JavaScript
    this.$.bc.newData = {
        columns: [
            ['Believer', 130, 150, 200, 300, 200, 100]
        ]
    };
```

Likewise, this removes data:

```JavaScript
    this.$.bc.staleData = {
        ids: 'Bodak Yellow (Money Moves)'
    };
```

If you are working with other Polymer web component container, this will allow binding to take place amongst the peers within the containing Polymer component.

To work with other Web Component libraries, you will need to either add some event listening logic (for "selected-element-changed"), or utilize Polymer mixins, as demonstrated [here](https://www.webcomponents.org/element/bahrus/xtal-fetch).


## Important note regarding referencing the web component and managing dependencies.

You can reference the component the Polymer <3 way:

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


Additionally, _billboard-chart_ depends on three external references:  d3, billboard.js, and a css file that comes with billboard.js, but which we would like the ability to customize.


You can override this default path for the css file that "ships" with the web component, to achieve your own look and feel by referencing your customized css file.  You can do so by using the setting shown below:

```html
    <billboard-charts css-path="...">
``` 

A similar approach is taken for resolving the other two dependencies:  billboard.js and d3.js.  The code first checks to make sure that d3 and billboard.js aren't already loaded.  In the case of d3, this is a scenario likely to be encountered.  For each library that is found not to already be loaded,  _billboard-charts_ loads them from the same directory as the component itself.  But, mostly for the benefit of d3 possibly being referenced from a different location for other libraries, you can set both of these paths to whever you'd like.


In the demo of this component, we chose to specify the path for all three files explictly for demonstrating purposes.  The explicit references in the demo are as follows:

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
