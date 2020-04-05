<template>
    <div v-if="chartData" v-cloak>
        <div style="position:relative;">
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
                        fill:false
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

                if (vm.chart == null) {

                    vm.chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: datasets
                        },
                        options: {
                            spanGaps: true,
                            responsive: true,
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'Cases'
                            },
                            scales: {
                                xAxes: [{
                                    //stacked: true,
                                }],
                                yAxes: [{
                                    //stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    }
                                }]
                            }
                        }
                    });
                }
                else {
                    vm.chart.data.labels = labels;
                    vm.chart.data.datasets = datasets;// vm.item.dsDraft;

                    //vm.chart.data.datasets[0].data = d1;// vm.item.dsDraft;
                    //vm.chart.data.datasets[1].data = vm.item.dsPaid;
                    //vm.chart.data.datasets[2].data = vm.item.dsDone;
                    //vm.chart.data.datasets[3].data = vm.item.dsCompleted;

                    vm.chart.update();
                }

                //vm.loaded = true;
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