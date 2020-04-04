
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

import Vue from 'vue';
import VueChartJs from 'vue-chartjs'

import App from './app.vue';
import MomentVue from 'vue-moment';

Vue.use(MomentVue);

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