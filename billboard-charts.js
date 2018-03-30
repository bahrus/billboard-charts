(function () {
    if (customElements.get('billboard-charts'))
        return;
    const cs_src = self['billboard_charts'] ? billboard_charts.href : document.currentScript.src;
    function downloadJSFilesInParallelButLoadInSequence(refs) {
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
    const template = document.createElement('template');
    // <link rel="stylesheet" on-load="loaded" type="text/css" href$="[[cssPath]]">
    const base = cs_src.split('/').slice(0, -1).join('/');
    const refs = [];
    if (typeof (d3) !== 'object') {
        const d3Path = self['_d3'] ? _d3.href : base + '/d3.min.js';
        refs.push({ src: d3Path });
    }
    if (typeof (bb) === 'undefined') {
        const bbPath = self['_bb'] ? _bb.href : base + '/billboard.min.js';
        refs.push({ src: bbPath });
    }
    function loadCssPaths(links, css) {
        if (links.length === 0) {
            template.innerHTML = `
            <style>
                 :host {
                    display: block;
                }
                ${css.join('')}
            </style>
            <div id="chartTarget"></div>`;
            downloadJSFiles();
            return;
        }
        const link = links.pop();
        fetch(link.href).then(resp => {
            resp.text().then(txt => {
                css.push(txt);
                loadCssPaths(links, css);
            });
        });
    }
    function loadCss() {
        loadCssPaths([].slice.call(document.head.querySelectorAll('.billboard.css')), []);
    }
    if (document.readyState !== "loading") {
        loadCss();
    }
    else {
        document.addEventListener("DOMContentLoaded", e => {
            loadCss();
        });
    }
    function downloadJSFiles() {
        downloadJSFilesInParallelButLoadInSequence(refs).then(() => {
            initBillboardCharts();
        });
    }
    function initBillboardCharts() {
        /**
         * `billboard-charts`
         *  Web component wrapper around billboard.js charting library
         *
         * @customElement
         * @polymer
         * @demo demo/index.html
         */
        class BillboardCharts extends HTMLElement {
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
            get data() {
                return this._data;
            }
            set data(val) {
                //debugger;
                this._data = val;
                this.onPropsChange();
            }
            get newData() {
                return this._newData;
            }
            set newData(val) {
                this._newData = val;
                //this.onPropsChange();
                this.onNewData();
            }
            get staleData() {
                return this._staleData;
            }
            set staleData(val) {
                this._staleData = val;
                //this.onPropsChange();
                this.onStaleData();
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
                return ['publish', 'data', 'newData', 'staleData'];
            }
            static get is() { return 'billboard-charts'; }
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            }
            _upgradeProperty(prop) {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            }
            attributeChangedCallback(name, oldValue, newValue) {
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
            snakeToCamel(s) {
                return s.replace(/(\-\w)/g, function (m) { return m[1].toUpperCase(); });
            }
            connectedCallback() {
                BillboardCharts.observedAttributes.forEach(attrib => {
                    this._upgradeProperty(this.snakeToCamel(attrib));
                });
                // if (!this.cssPath) {
                //     this.cssPath = base +  '/billboard.min.css';
                // }
                // //<link rel="stylesheet" on-load="loaded" type="text/css" href$="[[cssPath]]">
                // const link = document.createElement('link');
                // link.setAttribute('rel', 'stylesheet');
                // link.setAttribute('type', "text/css");
                // link.setAttribute('href', this._cssPath);
                // link.addEventListener('load', e => {
                //     this.shadowRoot.getElementById('chartTarget').style.visibility = 'visible';
                //     if(this._chart) this._chart.resize();
                // });
                // this.shadowRoot.appendChild(link);
            }
            // loaded() {
            //     this._cssLoaded = true;
            //     setTimeout(() => this.onPropsChange(), 100);
            //     //this.onPropsChange();
            // }
            onPropsChange() {
                //if (!this._cssLoaded) return;
                if (!this.publish || !this.data || !this.data.data)
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
    }
})();
//# sourceMappingURL=billboard-charts.js.map