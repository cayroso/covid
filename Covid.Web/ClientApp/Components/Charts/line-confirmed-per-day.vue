<template>
    <div v-if="chartData" v-cloak>
        <div class="d-flex flex-row justify-content-between">
            <div>
                <h5 class="ml-2 mb-0 text-primary font-weight-bold">Cases</h5>
            </div>
            <div>
                <button @click="setChart('line')" class="btn btn-sm btn-outline-info">
                    <span class="fas fa-fw fa-chart-line"></span>
                </button>
                <button @click="setChart('bar')" class="btn btn-sm btn-outline-info ml-">
                    <span class="fas fa-fw fa-chart-bar"></span>
                </button>
            </div>
        </div>
        <div style="position:relative;height:45vh;">
            <canvas :id="chartId"></canvas>
        </div>
    </div>
</template>
<script>
    import 'chart.js';
    import moment from 'moment';

    export default {
        props: {
            chartId: String,
            chartData: Array,
            provinces: Array,
        },
        data() {
            return {
                chart: null
            }
        },
        async mounted() {

            this.get();
        },
        beforeUpdate: function () {
            const vm = this;

            vm.$nextTick(function () {
                // Code that will run only after the
                // entire view has been re-rendered
                if (vm.chartData && vm.chartData.length) {
                    vm.get();
                }
            })
        },
        methods: {
            getScales(chartType) {
                const vm = this;

                if (chartType == 'bar') {
                    return {
                        xAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Count'
                            }
                        }]
                    };
                }
                if (chartType == 'line') {
                    return {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Count'
                            }
                        }]
                    };
                }
            },
            setChart(chartType) {
                const vm = this;

                vm.chart.config.type = chartType;

                vm.chart.config.options.scales = vm.getScales(chartType);

                vm.chart.update();

                localStorage.setItem('per-day-chart-type', chartType);
            },
            async get() {
                const vm = this;
                let data = vm.chartData;

                let dates = [];

                data.map(item => {

                    const dt = item.attributes.confirmed;
                    const m = moment(dt);

                    if (m.isValid()) {
                        const strDt = m.format('MM-DD');

                        if (!dates.includes(strDt)) {
                            dates.push(strDt)
                        }
                    }
                });
                dates.sort();

                let datasets = [];
                vm.provinces.forEach((p, index) => {
                    const bgColor = vm.getRandomColor();
                    let ds = {
                        label: p,
                        borderColor: bgColor,
                        backgroundColor: bgColor,// `rgba(${(index + 1) * 5},${(index + 1) * 10},${(index + 1) * 15},1)`,// 'Green',
                        data: [dates.length],
                        fill: false
                    }

                    datasets.push(ds);
                });

                // process data;
                data.forEach(item => {
                    //get the ds
                    let ds = datasets.find(e => {
                        var f = e.label == item.province;

                        return f;
                    });

                    if (ds == null)
                        return;

                    const dt = item.attributes.confirmed;
                    const m = moment(dt);

                    if (m.isValid()) {
                        const strDt = m.format('MM-DD');

                        var index = dates.indexOf(strDt);

                        if (isNaN(ds.data[index]))
                            ds.data[index] = 1;
                        else
                            ds.data[index]++;
                    }
                });

                let ctx = document.getElementById(vm.chartId);

                let labels = dates;

                var chartType = localStorage.getItem('per-day-chart-type') || 'line';

                if (vm.chart == null) {
                    vm.chart = new Chart(ctx, {
                        type: chartType,
                        data: {
                            labels: labels,
                            datasets: datasets
                        },
                        options: {
                            spanGaps: true,
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: vm.getScales(chartType)
                        }
                    });
                }
                else {
                    vm.chart.data.labels = labels;
                    vm.chart.data.datasets = datasets;

                    vm.chart.update();
                }

            },
            getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        },


    }
</script>