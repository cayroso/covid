<template>
    <div v-if="chartData" v-cloak>
        <div class="d-flex flex-row justify-content-between">
            <div>
                <h5 class="ml-2 mb-0 text-primary font-weight-bold">Age</h5>
            </div>
        </div>
        <div style="position:relative;height:45vh;">
            <canvas :id="chartId"></canvas>
        </div>
    </div>
</template>
<script>
    import 'chart.js';

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

                let ages = [];

                data.forEach(item => {

                    const age = item.attributes.edad;
                    if (!isNaN(age) && age > 0 && !ages.includes(age)) {
                        ages.push(age)
                    }
                });

                ages.sort();

                let datasets = [];
                let ds1 = {
                    label: "Male",
                    borderColor: `rgba(0,0,255,1)`,
                    backgroundColor: `rgba(0,0,255,0.5)`,
                    data: Array(ages.length)
                };
                for (var i = 0; i < ds1.data.length; i++) {
                    ds1.data[i] = 0;
                }
                datasets.push(ds1);


                let ds2 = {
                    label: "Female",
                    borderColor: `rgba(200,0,0,1)`,
                    backgroundColor: `rgba(200,0,0,0.5)`,
                    data: Array(ages.length)
                };
                for (var i = 0; i < ds2.data.length; i++) {
                    ds2.data[i] = 0;
                }
                datasets.push(ds2);

                // process data;
                data.forEach(item => {
                    //get the ds
                    let ds = null;
                    const gender = item.attributes.kasarian;

                    if (gender.toLowerCase() == 'male')
                        ds = ds1;
                    else
                        ds = ds2;

                    const age = item.attributes.edad;

                    if (!isNaN(age)) {

                        var index = ages.indexOf(age);


                        if (isNaN(ds.data[index]))
                            ds.data[index] = 1;
                        else
                            ds.data[index]++;
                    }
                });
                let ctx = document.getElementById(vm.chartId);

                if (vm.chart == null) {

                    vm.chart = new Chart(ctx, {
                        type: 'horizontalBar',

                        data: {
                            datasets: datasets,
                            labels: ages
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            elements: {
                                rectangle: {
                                    borderWidth: 2
                                }
                            },
                            legend: {
                                position: 'right'
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        stepSize: 1
                                    }
                                }]
                            }
                        }
                    });
                }
                else {
                    vm.chart.data.labels = ages;
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