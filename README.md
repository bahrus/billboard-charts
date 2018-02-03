[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/billboard-charts)

# \<billboard-charts\>


\<billboard-charts\> is a dependency-free web component wrapper around the [billboard.js](https://naver.github.io/billboard.js/) hit library. 

<!--
```
<custom-element-demo>
  <template>
    
    <script src="billboard-charts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/xtal-json-merge/build/ES6/json-merge.js"></script>
    <link rel="import" href="../polymer/polymer-element.html">
    <link rel="import" href="../polymer/lib/elements/dom-bind.html">

    <dom-bind>
          <template>
            <json-merge pass-thru-on-init 
                watch="{}" 
                result="{{example1}}" 
                delay="1000">
              <script type="application/json">
                [
                  {
                    "data": {
                      "columns": [
                        [
                          "Bodak Yellow (Money Moves)",
                          30,
                          200,
                          100,
                          400,
                          150,
                          250
                        ],
                        [
                          "Wild Thoughts",
                          50,
                          20,
                          10,
                          40,
                          15,
                          25
                        ]
                      ]
                    }
                  }
                ]
              </script>              
            </json-merge>
            <json-merge 
                watch="{}" 
                result="{{newData}}" 
                delay="2000">
              <script type="application/json">
                [
                  {
                    "columns": [
                      ["Despacito", 230, 190, 300, 500, 300, 400]
                    ]
                  }
                ]
              </script>
            </json-merge>
            <json-merge watch="{}" result="{{newData}}" delay="3500">
              <script type="application/json">
                [
                  {
                    "columns": [
                      ["Believer", 130, 150, 200, 300, 200, 100]
                    ]
                  }
                ]
              </script>
            </json-merge>
            <json-merge watch="{}" result="{{staleData}}" delay="6500">
              <script type="application/json">
                [
                  {
                    "ids": "Bodak Yellow (Money Moves)"
                  }
                ]
              </script>
            </json-merge>
            
              <billboard-charts 
                publish data="[[example1]]" 
                new-data="[[newData]]" 
                stale-data="[[staleData]]" >
            </billboard-charts>
          </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->

Data can be passed into the component via the data property, either via binding, or programatically.  The boolean "publish" will block rendering if it isn't present.  This allows one to apply sanity checks on displaying new data.

```html
<billboard-charts publish data="[[example1]]"></billboard-charts>
```

To achieve master / detail functionality, where clicking on an element should notify the parent of the selected item, use the selected-element attribute:

```html
<billboard-charts publish data="[[example1]]" selected-element ="{{selectedDataPoint}}"></billboard-charts>
```

If you are working within a Polymer web component container, this will allow binding to take place amongst the peers within the containing Polymer component.

To work with other Web Component libraries, you will need to either add some event listening logic (for "selected-element-changed"), or utilize Polymer mixins, as demonstrated [here](https://www.webcomponents.org/element/bahrus/xtal-fetch).

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


## Important note regarding referencing the web component and managing dependencies.

You can reference the component via a script tag:


```html
<script async src="../billboard-charts.js"></script>
```

Or you can use ES6 modules:

```html
<script type="module" src="../billboard-charts.js"></script>
```


By default, \<billboard-charts\> loads its dependencies from the same directory as billboard-charts.js.  However, the custom element depends on  d3.js and billboard.js, which your website may already be loading from a different location due to other components.  To override where billboard-charts.js loads these dependencies from (and to get a headstart on loading them), add two link preload/prefetch tag to the head of your opening web page (index.html):

```html
  <link id="_d3"     rel="preload" as="script" href="https://d3js.org/d3.v4.min.js"> 
  <link id="_bb"     rel="preload" as="script" href="https://naver.github.io/billboard.js/release/latest/dist/billboard.min.js">
```

The id's are important.


billboard-charts.js also loads a default billboard.css file from its directory.  You can override this default path for the css file that "ships" with the web component, to achieve your own look and feel by referencing your customized css file.  You can do so by using the setting shown below:

```html
    <billboard-charts css-path="...">
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
