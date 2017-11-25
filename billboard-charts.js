(function () {
    let cs;
    function initBillboardCharts(polymerMixin) {
        if (customElements.get('billboard-charts'))
            return;
        /**
         * `billboard-charts`
         * Polymer wrapper around billboard.js charting library
         *
         * @customElement
         * @polymer
         * @demo demo/index.html
         */
        class BillboardCharts extends polymerMixin(HTMLElement) {
            constructor() {
                super(...arguments);
                this._cssLoaded = false;
            }
            get chart() {
                return this._chart;
            }
            //from https://stackoverflow.com/questions/14780350/convert-relative-path-to-absolute-using-javascript
            absolute(base, relative) {
                var stack = base.split("/"), parts = relative.split("/");
                stack.pop(); // remove current file name (or empty string)
                // (omit if "base" is the current folder without trailing slash)
                for (var i = 0; i < parts.length; i++) {
                    if (parts[i] == ".")
                        continue;
                    if (parts[i] == "..")
                        stack.pop();
                    else
                        stack.push(parts[i]);
                }
                return stack.join("/");
            }
            downloadJSFilesInParallelButLoadInSequence(refs) {
                //see https://www.html5rocks.com/en/tutorials/speed/script-loading/
                return new Promise((resolve, reject) => {
                    const notLoadedYet = {};
                    const nonNullRefs = refs.filter(ref => ref !== null);
                    nonNullRefs.forEach(ref => {
                        notLoadedYet[ref.src] = true;
                    });
                    nonNullRefs.forEach(ref => {
                        const script = document.createElement('script');
                        script.src = ref.src;
                        script.async = false;
                        script.onload = () => {
                            //delete notLoadedYet[script.src];
                            Object.keys(notLoadedYet).forEach(key => {
                                if (script.src.endsWith(key)) {
                                    delete notLoadedYet[key];
                                    return;
                                }
                            });
                            if (Object.keys(notLoadedYet).length === 0) {
                                resolve();
                            }
                        };
                        document.head.appendChild(script);
                    });
                });
            }
            connectedCallback() {
                super.connectedCallback();
                if (!this.baseUrlPath)
                    this.baseUrlPath = '';
                if (!this.cssPath) {
                    if (cs) {
                        this.cssPath = this.absolute(cs.src, 'billboard.min.css');
                    }
                    else {
                        this.cssPath = this.baseUrlPath + 'billboard.min.css';
                    }
                }
                const refs = [];
                if (typeof (d3) !== 'object') {
                    if (!this.d3Path) {
                        if (cs) {
                            this.d3Path = this.absolute(cs.src, 'd3.js');
                        }
                        else {
                            this.d3Path = this.baseUrlPath + 'd3.js';
                        }
                        //this.d3Path = 'https://d3js.org/d3.v4.min.js';
                    }
                    refs.push({ src: this.d3Path });
                }
                if (typeof (bb) === 'undefined') {
                    if (!this.billboardLibPath) {
                        if (cs) {
                            this.billboardLibPath = this.absolute(cs.src, 'billboard.js');
                        }
                        else {
                            this.billboardLibPath = this.baseUrlPath + 'billboard.js';
                        }
                    }
                    refs.push({ src: this.billboardLibPath });
                }
                this.downloadJSFilesInParallelButLoadInSequence(refs).then(() => {
                    this.onPropsChange();
                });
            }
            static get template() {
                return `
<link rel="stylesheet" on-load="loaded" type="text/css" href$="[[cssPath]]">
<style>
     :host {
        display: block;
    }
</style>
<div id="chartTarget"></div>`;
            }
            static get is() { return 'billboard-charts'; }
            static get properties() {
                return {
                    baseUrlPath: {
                        type: String,
                    },
                    cssPath: {
                        type: String
                    },
                    d3Path: {
                        type: String
                    },
                    billboardLibPath: {
                        type: String
                    },
                    publish: {
                        type: Boolean,
                        observer: 'onPropsChange'
                    },
                    data: {
                        type: Object,
                        observer: 'onPropsChange'
                    },
                    newData: {
                        type: Object,
                        observer: 'onNewData'
                    },
                    selectedElement: {
                        type: Object,
                        readOnly: true,
                        notify: true,
                    },
                    staleData: {
                        type: Object,
                        observer: 'onStaleData'
                    }
                };
            }
            loaded() {
                this._cssLoaded = true;
                setTimeout(() => this.onPropsChange(), 100);
                //this.onPropsChange();
            }
            onPropsChange() {
                if (!this._cssLoaded)
                    return;
                if (!this.publish || !this.data || !this.data.data)
                    return;
                if (typeof (bb) === 'undefined')
                    return;
                this.data.bindto = this.$.chartTarget;
                if (!this.data.data.onclick) {
                    //debugger;
                    this.data.data.onclick = (dataPoint, element) => {
                        this['_setSelectedElement'](dataPoint);
                    };
                }
                if (!this._chart) {
                    this._chart = bb.generate(this.data);
                    if (this.newData)
                        this.onNewData();
                }
                else {
                    this._chart = bb.generate(this.data);
                }
            }
            onNewData() {
                if (this.newData && this._chart) {
                    this._chart.load(this.newData);
                }
            }
            onStaleData() {
                if (this.staleData && this._chart) {
                    this._chart.unload(this.staleData);
                }
            }
        }
        customElements.define(BillboardCharts.is, BillboardCharts);
    }
    cs = document.currentScript;
    function WaitForPolymer() {
        if ((typeof Polymer !== 'function') || (typeof Polymer.ElementMixin !== 'function')) {
            setTimeout(WaitForPolymer, 100);
            return;
        }
        initBillboardCharts(Polymer.ElementMixin);
    }
    WaitForPolymer();
})();
//# sourceMappingURL=billboard-charts.js.map