<template>
    <div v-if="chartData" v-cloak>
        <div style="position:relative;">
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
                    if (!isNaN(age) && !ages.includes(age)) {
                        ages.push(age)
                    }
                });

                ages.sort();


                let datasets = [];
                let ds = {
                    label: "Ages",
                    backgroundColor: ages.map(item => {
                        return vm.getRandomColor();
                    }),
                    data: Array(ages.length)
                };
                datasets.push(ds);

                // process data;
                data.forEach(item => {
                    //get the ds

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

                let labels = ages;

                if (vm.chart == null) {

                    vm.chart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: labels,
                            datasets: datasets

                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'Age'
                            },
                            legend: {
                                display: false,
                                position: 'right'
                            },
                            animation: {
                                animateScale: true,
                                animateRotate: true,
                            }
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