(function(){var a=document.currentScript.src,b=document.createElement('template');if(b.innerHTML='\n    <style>\n         :host {\n            display: block;\n        }\n    </style>\n    <div id="chartTarget"></div>',!customElements.get('billboard-charts')){var c=function(c){function d(){babelHelpers.classCallCheck(this,d);var a=babelHelpers.possibleConstructorReturn(this,(d.__proto__||Object.getPrototypeOf(d)).call(this));return a._cssLoaded=!1,a.attachShadow({mode:'open'}),a.shadowRoot.appendChild(b.content.cloneNode(!0)),a}return babelHelpers.inherits(d,c),babelHelpers.createClass(d,[{key:'_upgradeProperty',value:function(a){if(this.hasOwnProperty(a)){var b=this[a];delete this[a],this[a]=b}}},{key:'attributeChangedCallback',value:function(a,b,c){'publish'===a?(this._publish=null!==c,this.onPropsChange()):this['_'+this.snakeToCamel(a)]=c}},{key:'absolute',value:function(a,b){var c=a.split('/'),d=b.split('/');c.pop();for(var e=0;e<d.length;e++)'.'!=d[e]&&('..'==d[e]?c.pop():c.push(d[e]));return c.join('/')}},{key:'downloadJSFilesInParallelButLoadInSequence',value:function(a){return new Promise(function(b){var c={},d=a.filter(function(a){return null!==a});d.forEach(function(a){c[a.src]=!0}),d.forEach(function(a){var d=document.createElement('script');d.src=a.src,d.async=!1,d.onload=function(){Object.keys(c).forEach(function(a){if(d.src.endsWith(a))return void delete c[a]}),0===Object.keys(c).length&&b()},document.head.appendChild(d)})})}},{key:'snakeToCamel',value:function(a){return a.replace(/(\-\w)/g,function(a){return a[1].toUpperCase()})}},{key:'connectedCallback',value:function(){var b=this;d.observedAttributes.forEach(function(a){b._upgradeProperty(b.snakeToCamel(a))}),this.cssPath||(this.cssPath=this.absolute(a,'billboard.min.css'));var c=[];'object'===('undefined'===typeof d3?'undefined':babelHelpers.typeof(d3))||this.d3Path||(this.d3Path=this.absolute(a,'d3.js'),c.push({src:this.d3Path})),'undefined'!==typeof bb||this.billboardLibPath||(this.billboardLibPath=this.absolute(a,'billboard.js'),c.push({src:this.billboardLibPath})),this.downloadJSFilesInParallelButLoadInSequence(c).then(function(){b.onPropsChange()});var e=document.createElement('link');e.setAttribute('rel','stylesheet'),e.setAttribute('type','text/css'),e.setAttribute('href',this._cssPath),e.addEventListener('load',function(){b._cssLoaded=!0,b.onPropsChange()}),this.shadowRoot.appendChild(e)}},{key:'loaded',value:function(){var a=this;this._cssLoaded=!0,setTimeout(function(){return a.onPropsChange()},100)}},{key:'onPropsChange',value:function(){var a=this;this._cssLoaded&&this.publish&&this.data&&this.data.data&&'undefined'!==typeof bb&&(this.data.bindto=this.shadowRoot.getElementById('chartTarget'),!this.data.data.onclick&&(this.data.data.onclick=function(b){a.selectedElement=b}),this._chart?this._chart=bb.generate(this.data):(this._chart=bb.generate(this.data),this.newData&&this.onNewData()))}},{key:'onNewData',value:function(){this.newData&&this._chart&&this._chart.load(this.newData)}},{key:'onStaleData',value:function(){this.staleData&&this._chart&&this._chart.unload(this.staleData)}},{key:'publish',get:function(){return this._publish},set:function(a){a?this.setAttribute('publish',''):this.removeAttribute('publish')}},{key:'cssPath',get:function(){return this._cssPath},set:function(a){this.setAttribute('css-path',a)}},{key:'d3Path',get:function(){return this._d3Path},set:function(a){this.setAttribute('d3-path',a)}},{key:'billboardLibPath',get:function(){return this._billboardLibPath},set:function(a){this.setAttribute('billboard-lib-path',a)}},{key:'data',get:function(){return this._data},set:function(a){this._data=a,this.onPropsChange()}},{key:'newData',get:function(){return this._newData},set:function(a){this._newData=a,this.onNewData()}},{key:'staleData',get:function(){return this._staleData},set:function(a){this._staleData=a,this.onStaleData()}},{key:'selectedElement',set:function(a){this._selectedElement=a;var b=new CustomEvent('selected-element-changed',{detail:{value:a},bubbles:!0,composed:!0});this.dispatchEvent(b)},get:function(){return this._selectedElement}},{key:'chart',get:function(){return this._chart}}],[{key:'observedAttributes',get:function(){return['publish','css-path','d3-path','billboard-lib-path','data','newData','staleData']}},{key:'is',get:function(){return'billboard-charts'}}]),d}(HTMLElement);customElements.define(c.is,c)}})();