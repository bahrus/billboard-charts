module xtal.elements{
    declare var bb;
    export interface IBillboardChartsProperties{
        publish: boolean | polymer.PropObjectType,
        results: any | polymer.PropObjectType,
        newData: object | polymer.PropObjectType,
    }
    function initBillboardCharts(){
        if(customElements.get('billboard-charts')) return;
        /**
         * `billboard-charts`
         * Polymer wrapper around billboard.js charting library
         *
         * @customElement
         * @polymer
         * @demo demo/index.html
         */        
        class BillboardCharts extends Polymer.Element implements IBillboardChartsProperties{
            publish: boolean; results: any; newData: object;
            private _chart: any;
            get chart(){
                return this._chart;
            }
            static get is(){return 'billboard-charts';}
            static get properties() : IBillboardChartsProperties{
                return{
                    publish: {
                        type: Boolean,
                        observer: 'onPropsChange'
                    },
                    results: {
                        type: Object,
                        observer: 'onPropsChange'
                    },
                    newData:{
                        type: Object,
                        observer: 'onNewData'
                    }
                }
            }
            onPropsChange(){
                if(!this.publish || !this.results) return;
                this.results.bindto = this.$.chartTarget;
                if(!this._chart){
                    this._chart = bb.generate(this.results);
                    if(this.newData) this.onNewData();
                }else{
                    this._chart = bb.generate(this.results);
                }
                
            }
            onNewData(){
                if(this.newData && this._chart){
                    this._chart.load(this.newData);
                }
            }
        }
        customElements.define(BillboardCharts.is, BillboardCharts);
    }

    const syncFlag = 'billboard-charts_sync';
    if(window[syncFlag]){
        customElements.whenDefined('poly-prep-sync').then(() => initBillboardCharts());
        delete window[syncFlag];
    }else{
        if(customElements.get('poly-prep') || customElements.get('full-poly-prep')){
            initBillboardCharts();
        }else{
            customElements.whenDefined('poly-prep').then(() => initBillboardCharts());
            customElements.whenDefined('full-poly-prep').then(() => initBillboardCharts());
        }
    
    }
}