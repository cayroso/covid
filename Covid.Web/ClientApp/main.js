
import './main.css';
import 'bootstrap';

import Vue from 'vue';
import VueChartJs from 'vue-chartjs'

import App from './app.vue';
//import MomentVue from 'vue-moment';
import { FormSelectPlugin, OverlayPlugin, CollapsePlugin, ModalPlugin  } from 'bootstrap-vue';

//Vue.use(MomentVue);
Vue.use(FormSelectPlugin);
Vue.use(OverlayPlugin);
Vue.use(CollapsePlugin);
Vue.use(ModalPlugin);

//window.moment = require('moment');

Vue.component('line-chart', {
    extends: VueChartJs.Line,
    mounted() {
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 39, 10, 40, 39, 80, 40]
                }
            ]
        }, { responsive: true, maintainAspectRatio: false })
    }
})

new Vue({
    el: '#app',
    components: {
        App
    }
});