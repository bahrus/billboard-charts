module xtal.elements{
    declare var bb;
    export interface IBillboardChartsProperties{
        cssPath: string | polymer.PropObjectType,
        publish: boolean | polymer.PropObjectType,
        data: any | polymer.PropObjectType,
        newData: object | polymer.PropObjectType,
        selectedElement: object | polymer.PropObjectType,
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
            publish: boolean; data: any; newData: object; selectedElement: object; cssPath;
            private _chart: any;
            private _cssLoaded = false;
            get chart(){
                return this._chart;
            }
            static get is(){return 'billboard-charts';}
            static get properties() : IBillboardChartsProperties{
                return{
                    cssPath:{
                        type: String,
                        value: '../../billboard.js/dist/billboard.css'
                    },
                    publish: {
                        type: Boolean,
                        observer: 'onPropsChange'
                    },
                    data: {
                        type: Object,
                        observer: 'onPropsChange'
                    },
                    newData:{
                        type: Object,
                        observer: 'onNewData'
                    },
                    selectedElement:{
                        type: Object,
                        readOnly: true,
                        notify: true,
                    }
                }
            }
            loaded(){
                this._cssLoaded = true;
                this.onPropsChange();
            }
            onPropsChange(){
                if(!this._cssLoaded) return;
                if(!this.publish || !this.data || !this.data.data) return;
                this.data.bindto = this.$.chartTarget;
                if(!this.data.data.onclick){
                    //debugger;
                    this.data.data.onclick = (dataPoint, element) =>{
                        this['_setSelectedElement'](dataPoint);
                    }
                }
                if(!this._chart){
                    this._chart = bb.generate(this.data);
                    if(this.newData) this.onNewData();
                }else{
                    this._chart = bb.generate(this.data);
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

    const syncFlag = 'billboard_charts_sync';
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