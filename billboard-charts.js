(function () {
    let cs;
    const template = document.createElement('template');
    // <link rel="stylesheet" on-load="loaded" type="text/css" href$="[[cssPath]]">
    template.innerHTML = `
    <style>
         :host {
            display: block;
        }
    </style>
    <div id="chartTarget"></div>`;
    //function initBillboardCharts(polymerMixin : any){
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
    class BillboardCharts extends HTMLElement {
        constructor() {
            super();
            this._cssLoaded = false;
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
        get publish() {
            return this._publish;
        }
        set publish(val) {
            if (val) {
                this.setAttribute('publish', '');
            }
            else {
                this.removeAttribute('publish');
            }
        }
        get cssPath() {
            return this._cssPath;
        }
        set cssPath(val) {
            this.setAttribute('css-path', val);
        }
        get d3Path() {
            return this._d3Path;
        }
        set d3Path(val) {
            this.setAttribute('d3-path', val);
        }
        get billboardLibPath() {
            return this._billboardLibPath;
        }
        set billboardLibPath(val) {
            this.setAttribute('billboard-lib-path', val);
        }
        get data() {
            return this._data;
        }
        set data(val) {
            this._data = val;
            this.onPropsChange();
        }
        get newData() {
            return this._newData;
        }
        set newData(val) {
            this._newData = val;
            this.onPropsChange();
        }
        get staleData() {
            return this._staleData;
        }
        set staleData(val) {
            this._staleData = val;
            this.onPropsChange();
        }
        set selectedElement(val) {
            this._selectedElement = val;
            const newEvent = new CustomEvent('selected-element-changed', {
                detail: {
                    value: val
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(newEvent);
        }
        get selectedElement() {
            return this._selectedElement;
        }
        static get observedAttributes() {
            return ['publish', 'css-path', 'd3-path', 'billboard-lib-path', 'data', 'newData', 'staleData'];
        }
        static get is() { return 'billboard-charts'; }
        _upgradeProperty(prop) {
            if (this.hasOwnProperty(prop)) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            // console.log({
            //     name: name,
            //     newValue: newValue
            // })
            switch (name) {
                case 'publish':
                    this._publish = newValue !== null;
                    this.onPropsChange();
                    break;
                default:
                    this['_' + this.snakeToCamel(name)] = newValue;
            }
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
        snakeToCamel(s) {
            return s.replace(/(\-\w)/g, function (m) { return m[1].toUpperCase(); });
        }
        connectedCallback() {
            //super.connectedCallback();
            //if (!this.baseUrlPath) this.baseUrlPath = '';
            BillboardCharts.observedAttributes.forEach(attrib => {
                this._upgradeProperty(this.snakeToCamel(attrib));
            });
            if (!this.cssPath) {
                this.cssPath = this.absolute(cs.src, 'billboard.min.css');
            }
            const refs = [];
            if (typeof (d3) !== 'object' && !this.d3Path) {
                this.d3Path = this.absolute(cs.src, 'd3.js');
                refs.push({ src: this.d3Path });
            }
            if (typeof (bb) === 'undefined' && !this.billboardLibPath) {
                this.billboardLibPath = this.absolute(cs.src, 'billboard.js');
                refs.push({ src: this.billboardLibPath });
            }
            this.downloadJSFilesInParallelButLoadInSequence(refs).then(() => {
                this.onPropsChange();
            });
            //<link rel="stylesheet" on-load="loaded" type="text/css" href$="[[cssPath]]">
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', "text/css");
            link.setAttribute('href', this._cssPath);
            link.addEventListener('load', e => {
                this._cssLoaded = true;
                this.onPropsChange();
            });
            this.shadowRoot.appendChild(link);
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
            this.data.bindto = this.shadowRoot.getElementById('chartTarget');
            if (!this.data.data.onclick) {
                //debugger;
                this.data.data.onclick = (dataPoint, element) => {
                    //this['_setSelectedElement'](dataPoint);
                    this.selectedElement = dataPoint;
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
    //}
    cs = document.currentScript;
    // function WaitForPolymer()
    // {
    //     if ((typeof Polymer !== 'function') || (typeof Polymer.ElementMixin !== 'function')) {
    //        setTimeout( WaitForPolymer, 100);
    //        return;
    //     }
    //     initBillboardCharts(Polymer.ElementMixin);
    // }
    // WaitForPolymer();
})();
//# sourceMappingURL=billboard-charts.js.map