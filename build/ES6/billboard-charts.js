(function(){function a(a){if(!customElements.get("billboard-charts")){class b extends a(HTMLElement){constructor(){super(...arguments),this._cssLoaded=!1}get chart(){return this._chart}absolute(a,b){var c=a.split("/"),d=b.split("/");c.pop();for(var e=0;e<d.length;e++)"."!=d[e]&&(".."==d[e]?c.pop():c.push(d[e]));return c.join("/")}downloadJSFilesInParallelButLoadInSequence(a){return new Promise((b)=>{const c={},d=a.filter((a)=>null!==a);d.forEach((a)=>{c[a.src]=!0}),d.forEach((a)=>{const d=document.createElement("script");d.src=a.src,d.async=!1,d.onload=()=>{Object.keys(c).forEach((a)=>{if(d.src.endsWith(a))return void delete c[a]}),0===Object.keys(c).length&&b()},document.head.appendChild(d)})})}connectedCallback(){super.connectedCallback(),this.baseUrlPath||(this.baseUrlPath=""),this.cssPath||(c?this.cssPath=this.absolute(c.src,"billboard.min.css"):this.cssPath=this.baseUrlPath+"billboard.min.css");const a=[];"object"!==typeof d3&&(!this.d3Path&&(c?this.d3Path=this.absolute(c.src,"d3.js"):this.d3Path=this.baseUrlPath+"d3.js"),a.push({src:this.d3Path})),"undefined"===typeof bb&&(!this.billboardLibPath&&(c?this.billboardLibPath=this.absolute(c.src,"billboard.js"):this.billboardLibPath=this.baseUrlPath+"billboard.js"),a.push({src:this.billboardLibPath})),this.downloadJSFilesInParallelButLoadInSequence(a).then(()=>{this.onPropsChange()})}static get template(){return`
<link rel="stylesheet" on-load="loaded" type="text/css" href$="[[cssPath]]">
<style>
     :host {
        display: block;
    }
</style>
<div id="chartTarget"></div>`}static get is(){return"billboard-charts"}static get properties(){return{baseUrlPath:{type:String},cssPath:{type:String},d3Path:{type:String},billboardLibPath:{type:String},publish:{type:Boolean,observer:"onPropsChange"},data:{type:Object,observer:"onPropsChange"},newData:{type:Object,observer:"onNewData"},selectedElement:{type:Object,readOnly:!0,notify:!0},staleData:{type:Object,observer:"onStaleData"}}}loaded(){this._cssLoaded=!0,setTimeout(()=>this.onPropsChange(),100)}onPropsChange(){this._cssLoaded&&this.publish&&this.data&&this.data.data&&"undefined"!==typeof bb&&(this.data.bindto=this.$.chartTarget,!this.data.data.onclick&&(this.data.data.onclick=(a)=>{this._setSelectedElement(a)}),this._chart?this._chart=bb.generate(this.data):(this._chart=bb.generate(this.data),this.newData&&this.onNewData()))}onNewData(){this.newData&&this._chart&&this._chart.load(this.newData)}onStaleData(){this.staleData&&this._chart&&this._chart.unload(this.staleData)}}customElements.define(b.is,b)}}function b(){return"function"!==typeof Polymer||"function"!==typeof Polymer.ElementMixin?void setTimeout(b,100):void a(Polymer.ElementMixin)}let c;c=document.currentScript,b()})();