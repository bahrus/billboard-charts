(function () {
    let cs;
    function initBillboardCharts() {
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
        class BillboardCharts extends Polymer.Element {
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
            connectedCallback() {
                super.connectedCallback();
                if (!this.cssPath) {
                    if (cs) {
                        this.cssPath = this.absolute(cs.baseURI, '../billboard.js/dist/billboard.css');
                    }
                    else {
                        this.cssPath = '/bower_components/billboard.js/dist/billboard.css';
                    }
                }
            }
            static get is() { return 'billboard-charts'; }
            static get properties() {
                console.log({ currentScript: document.currentScript });
                return {
                    cssPath: {
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
                };
            }
            loaded() {
                this._cssLoaded = true;
                this.onPropsChange();
            }
            onPropsChange() {
                if (!this._cssLoaded)
                    return;
                if (!this.publish || !this.data || !this.data.data)
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
        }
        customElements.define(BillboardCharts.is, BillboardCharts);
    }
    function WaitForPolymer() {
        cs = document.currentScript;
        if ((typeof Polymer !== 'function') || (typeof Polymer.Element !== 'function')) {
            setTimeout(WaitForPolymer, 100);
            return;
        }
        initBillboardCharts();
    }
    WaitForPolymer();
})();
//# sourceMappingURL=billboard-charts.js.map