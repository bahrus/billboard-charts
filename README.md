[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/billboard-charts)

<a href="https://nodei.co/npm/billboard-charts/"><img src="https://nodei.co/npm/billboard-charts.png"></a>

<img src="http://img.badgesize.io/https://unpkg.com/billboard-charts@0.1.21/build/ES6/billboard-charts.js?compression=gzip">

# \<billboard-charts\>

Web component interface to billboard.js - the [hit charting library](https://naver.github.io/billboard.js/) forked from c3, which uses d3

<!--
```
<custom-element-demo>
  <template>
    <div>
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
        <script type="module" src="https://unpkg.com/xtal-json-editor@0.0.29/xtal-json-editor.js"></script>
        <script type="module" src="https://unpkg.com/xtal-json-merge@0.2.28/json-merge.js"></script>
        <script type="module" src="https://unpkg.com/p-d.p-u@0.0.94/dist/p-d.iife.js"></script>
        <script src="https://unpkg.com/billboard-charts@0.1.30/billboard-charts.js"></script>
        <h3>Basic billboard-charts demo</h3>
        Click on a data point to see the data element below.
        <xtal-insert-json delay="1000" pass-thru-on-init input="{}">
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
        </xtal-insert-json>
        <p-d on="merged-prop-changed" to="billboard-charts" prop="data" m="1"></p-d>
        <xtal-insert-json delay="2000" input="{}">
          <script type="application/json">
                [
                  {
                    "columns": [
                      ["Despacito", 230, 190, 300, 500, 300, 400]
                    ]
                  }
                ]
              </script>
        </xtal-insert-json>
        <p-d on="merged-prop-changed" to="billboard-charts"  prop="newData" m="1"></p-d>
        <xtal-insert-json delay="3500" input="{}">
          <script type="application/json">
                      [
                        {
                          "columns": [
                            ["Believer", 130, 150, 200, 300, 200, 100]
                          ]
                        }
                      ]
                    </script>
        </xtal-insert-json>
        <p-d on="merged-prop-changed" to="billboard-charts" prop="newData" m="1"></p-d>
        <xtal-insert-json delay="6500" input="{}">
          <script type="application/json">
                [
                  {
                    "ids": "Bodak Yellow (Money Moves)"
                  }
                ]
              </script>
        </xtal-insert-json>
        <p-d on="merged-prop-changed" prop="staleData" m="1"></p-d>
        <billboard-charts publish selected-element="{{selectedDataPoint}}"></billboard-charts>
        <p-d on="selected-element-changed" prop="input"></p-d>
        <xtal-json-editor options="{}" height="300px"></xtal-json-editor>
        <xtal-insert-json input="[]">
          <script type="application/json">
                [
                  {
                    "data": {
                      "columns": [
                        ["data", 91.4]
                      ],
                      "type": "gauge"
                    },
                    "gauge": {},
                    "color": {
                      "pattern": [
                        "#FF0000",
                        "#F97600",
                        "#F6C600",
                        "#60B044"
                      ],
                      "threshold": {
                        "values": [
                          30,
                          60,
                          90,
                          100
                        ]
                      }
                    },
                    "size": {
                      "height": 180
                    },
                    "bindto": "#GaugeChart"
                  }
                ]
              </script>
        </xtal-insert-json>
        <p-d on="merged-prop-changed" prop="data"></p-d>
        <billboard-charts  publish selected-element="{{selectedDataPoint}}"></billboard-charts>
        <br>
    
    
      </div>
  </template>
</custom-element-demo>
```
-->

<!--
```
<custom-element-demo>
<template>
    <div>
        <wc-info package-name="npm install billboard-charts" href="https://unpkg.com/billboard-charts@0.1.30/web-components.json"></wc-info>
        <script type="module" src="https://unpkg.com/wc-info@0.0.12/wc-info.js?module"></script>
    </div>
</template>
</custom-element-demo>
```
-->

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
