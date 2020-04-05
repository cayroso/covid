<template>
    <div v-cloak>
        <div class="card shadow-sm p-2">
            <div class="row flex-column-reverse flex-md-row">
                <div class="col-md-8">
                    <div class="mr-auto">
                        <div class="form-group align-self-end">
                            <label class="font-weight-bold text-primary">
                                Selected Province(s)
                                <span @click="selectedProvinces = []" class="px-1 rounded border border-danger text-danger">
                                    <span class="fas fa-fw fa-eraser mr-1"></span>Clear
                                </span>
                            </label>

                            <div class="d-flex align-content-start flex-wrap">
                                <span v-for="(p,index) in selectedProvinces" @click="removeProvince(index)" class="px-1 mr-1 mb-1 rounded border border-success" style="cursor: pointer">
                                    <span>
                                        {{p}}
                                    </span>
                                    <span class="fas fa-fw text-danger fa-eraser"></span>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex flex-lg-row">
                        <div class="form-group mb-0 ml-md-auto">
                            <label class="font-weight-bold text-primary">Available Provinces</label>
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <button @click="addProvince" class="btn btn-primary">
                                            <span class="fas fa-fw fa-plus"></span>
                                        </button>
                                    </div>
                                    <b-select v-model="selectedProvince" :options="filteredProvinces">
                                        <template v-slot:first>
                                        </template>
                                    </b-select>
                                    <div class="input-group-append">
                                        <button @click="get" class="btn btn-primary">
                                            <span class="fas fa-fw fa-sync"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card shadow-sm mt-2 p-1">
            <b-overlay :show="busy">
                <line-confirmed-per-day v-if="items" :chart-id="`c1`" :chart-data="items" :provinces="selectedProvinces"></line-confirmed-per-day>
            </b-overlay>
        </div>
        <div class="card shadow-sm mt-2 p-1">
            <b-overlay :show="busy">
                <pie-age v-if="items" :chart-id="`c2`" :chart-data="items" :provinces="selectedProvinces"></pie-age>
            </b-overlay>
        </div>

        <!--<div class="row mt-2">
            <div class="col-lg-8">
                <div class="card shadow-sm p-1">
                    <b-overlay :show="busy">
                        <line-confirmed-per-day v-if="items" :chart-id="`c1`" :chart-data="items" :provinces="selectedProvinces"></line-confirmed-per-day>
                    </b-overlay>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm p-1 mt-2 mt-lg-0">
                    <b-overlay :show="busy">
                        <pie-age v-if="items" :chart-id="`c2`" :chart-data="items" :provinces="selectedProvinces"></pie-age>
                    </b-overlay>
                </div>
            </div>
        </div>-->
        <div class="card shadow mt-2">
            <div class="card-header d-flex flex-row justify-content-between">
                <h6 class="font-weight-bold mb-0 text-primary"> Confirmed Cases</h6>
                <h6 class="font-weight-bold mb-0 text-primary"> Total: {{items.length}}</h6>

            </div><b-overlay :show="busy">
                <div class="table-responsive mb-0">

                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>PH</th>
                                <th>Age</th>
                                <th>Nationality</th>
                                <th>Residence</th>
                                <th>Date Confirmed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(feat,index) in paginated">
                                <td>{{((pageIndex-1)*pageSize) + (index+1)}}</td>
                                <td>
                                    <span @click="viewPatient(feat.attributes)" class="text-primary" style="cursor:pointer">
                                        {{feat.attributes.PH_masterl}}
                                    </span>
                                </td>
                                <td>{{feat.attributes.edad}}</td>
                                <td>{{feat.attributes.nationalit}}</td>
                                <td>{{feat.attributes.residence}}</td>
                                <td>{{feat.attributes.confirmed}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </b-overlay>
            <div class="card-footer">
                <b-overlay :show="busy">
                    <div class="d-flex flex-row justify-content-between">
                        <div>
                            <button @click="pageIndex = 1" class="btn btn-outline-primary">
                                <span class="fas fa-fw fa-angle-double-left"></span>
                            </button>
                            <button @click="movePrevious" class="btn btn-outline-primary">
                                <span class="fas fa-fw fa-angle-left"></span>
                            </button>
                        </div>
                        <div>
                            <input v-model="pageIndex" type="number" class="col-3 text-center  form-control-sm" /> of {{totalPages}} Page(s)
                        </div>
                        <div>
                            <button @click="moveNext" class="btn btn-outline-primary">
                                <span class="fas fa-fw fa-angle-right"></span>
                            </button>
                            <button @click="pageIndex = totalPages" class="btn btn-outline-primary">
                                <span class="fas fa-fw fa-angle-double-right"></span>
                            </button>
                        </div>
                    </div>
                </b-overlay>
            </div>
        </div>


        <b-modal id="modal"
                 :class="`rounded-0`"
                 :header-class="`bg-gradient-dark rounded-0 p-3`"
                 :footer-class="`bg-secondary rounded-0 p-2`">
            <template v-slot:modal-header>
                <h3 class="font-weight-bold mb-0 text-white">
                    {{selectedItem.PH_masterl}}
                </h3>
            </template>
            <template v-slot:modal-footer>
                <button @click="$bvModal.hide('modal')" class="btn btn-warning">Close</button>
            </template>
            <template v-slot:default>
                <div class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Age</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.edad}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Gender</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.kasarian}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Nationality</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.nationalit}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Residence</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.residence}}
                        </span>
                    </div>
                </div>
                <div v-if="selectedItem.travel_hx" class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Travel History</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.travel_hx}}
                        </span>
                    </div>
                </div>
                <div v-if="selectedItem.symptoms" class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Symptoms</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.symptoms}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Date Confirmed</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.confirmed}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-4 text-right text-black-50 col-form-label">Facility</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            {{selectedItem.facility}}
                        </span>
                    </div>
                </div>
            </template>
        </b-modal>
    </div>


</template>


<script>
    import NProgress from 'nprogress';
    import axios from 'axios';

    const instance = axios.create();

    instance.interceptors.request.use(config => {
        NProgress.start();
        return config;
    });
    instance.interceptors.response.use(response => {
        NProgress.done();
        return response;
    }, error => {
        NProgress.done();
        throw error;
    });

    import LineConfirmedPerDay from './Components/Charts/line-confirmed-per-day.vue';
    import PieAge from './Components/Charts/pie-age.vue';

    export default {
        components: {
            LineConfirmedPerDay,
            PieAge
        },
        data() {
            return {
                busy: false,
                hasNextRows: false,
                items: [],
                selectedItem: null,
                selectedProvince: '',
                selectedProvinces: [],//, 'Cavite', 'Laguna'],//, 'Quezon City', 'San Juan City'],
                provinces: [],
                confirmedPerDay: {
                    options: { responsive: true, maintainAspectRatio: false }
                },
                pageIndex: 1,
                pageSize: 10,

            }
        },
        computed: {
            filteredProvinces() {
                const vm = this;

                var filtered = vm.provinces.filter(item => {
                    return !vm.selectedProvinces.includes(item); s
                });
                return filtered;
            },
            paginated() {
                const vm = this;

                var page = vm.items.slice((vm.pageIndex - 1) * vm.pageSize, vm.pageIndex * vm.pageSize);
                return page;
            },
            totalPages() {
                const vm = this;

                var total = Math.ceil(vm.items.length / vm.pageSize);
                return total;
            }
        },
        async created() {
            const vm = this;

            let cache = JSON.parse(localStorage.getItem('selectedProvinces')) || [];

            if (cache.length) {
                vm.selectedProvinces = cache;
            }
            else {
                vm.selectedProvinces = ['Cavite', 'Laguna', 'Batangas', 'Rizal', 'Quezon'];
            }

            await vm.getProvinces();

            await vm.get();
        },
        methods: {
            movePrevious() {
                if (this.pageIndex > 1) {
                    this.pageIndex--;
                }
            },
            moveNext() {
                if (this.pageIndex < this.totalPages)
                    this.pageIndex++;
            },

            async getProvinces() {
                const vm = this;
                const loop = true;
                const resultRecordCount = 200;
                let hasNextRows = false;
                let resultOffset = 0;
                let url1 = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query?f=json`;

                let provinces = [];

                do {
                    let url2 = url1 + `&where=1=1&returnDistinctValues=true&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=residence&cacheHint=false&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}`;

                    try {
                        await instance.get(url2)
                            .then(resp => {
                                const data = resp.data;

                                provinces = provinces.concat(data.features);

                                hasNextRows = data.exceededTransferLimit;
                            })
                    } catch (e) {
                        alert(e);
                    }

                    resultOffset += resultRecordCount + 1;

                } while (loop && hasNextRows);

                vm.provinces = [];

                provinces.forEach(item => {
                    let prov = vm.getProvince(item.attributes.residence);
                    if (prov && !vm.provinces.includes(prov)) {
                        vm.provinces.push(prov);
                    }
                });

                vm.provinces.sort();

                vm.selectedProvince = vm.filteredProvinces[0];
            },
            async get() {
                const vm = this;
                const loop = true;
                const resultRecordCount = 200;
                let resultOffset = 0;
                let url1 = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query?f=json`;

                let items = [];

                vm.items = [];

                if (vm.busy)
                    return;

                if (!vm.selectedProvinces.length) {
                    localStorage.removeItem('selectedProvinces');
                    return;
                }

                try {
                    vm.busy = true;

                    do {
                        let where = encodeURIComponent(`1=1`);

                        if (vm.selectedProvince.length > 0) {
                            where = '';
                            vm.selectedProvinces.map((p, index) => {
                                where += encodeURIComponent(`${index == 0 ? '' : 'OR'} residence LIKE '%${p}%' `);
                            });

                        }
                        let fields = 'FID,PH_masterl,nationalit,residence,edad,confirmed';
                        let url2 = url1 + `&where=${where}&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=${fields}&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}`;


                        await instance.get(url2)
                            .then(resp => {
                                const data = resp.data;
                                data.features.map(item => {
                                    vm.$set(item, 'expand', false);
                                    //if (item.attributes.nationalit == 'For validation')
                                    //    item.attributes.nationalit = '';
                                    //if (item.attributes.residence == 'For validation')
                                    //    item.attributes.residence = '';
                                    //if (item.attributes.confirmed == 'For validation')
                                    //    item.attributes.confirmed = '';
                                    //if (item.attributes.facility == 'For validation')
                                    //    item.attributes.facility = '';

                                    //item.confirmed = window.moment('calendar');
                                    item.province = vm.getProvince(item.attributes.residence);
                                })
                                items = items.concat(data.features);

                                vm.hasNextRows = data.exceededTransferLimit;
                            })

                        resultOffset += resultRecordCount + 1;
                    } while (loop && vm.hasNextRows);

                    vm.items = items;
                    vm.saveSelectedProvinces();
                } catch (e) {
                    alert(e);
                    localStorage.removeItem('selectedProvinces');
                } finally {
                    vm.busy = false;

                }
            },
            async getItem(id) {
                const vm = this;
                const loop = true;
                const resultRecordCount = 200;
                let resultOffset = 0;
                let url1 = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query?f=json`;

                let items = [];

                if (vm.busy)
                    return;

                if (!vm.selectedProvinces.length)
                    return;

                try {
                    do {
                        let where = encodeURIComponent(`FID = ${id}`);

                        let fields = '*';
                        let url2 = url1 + `&where=${where}&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=${fields}&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}`;

                        try {

                            await instance.get(url2)
                                .then(resp => {
                                    const data = resp.data;
                                    data.features.map(item => {
                                        const attributes = item.attributes;
                                        attributes.symptoms = attributes.symptoms.trim();
                                        attributes.travel_hx = attributes.travel_hx.trim();

                                    });

                                    items = items.concat(data.features);

                                    vm.hasNextRows = data.exceededTransferLimit;
                                })
                        } catch (e) {
                            alert(e);
                        }
                        resultOffset += resultRecordCount + 1;

                    } while (loop && vm.hasNextRows);


                    return items;

                } catch (e) {
                    alert(e)
                } finally {

                }
            },

            addProvince() {
                const vm = this;

                if (!vm.selectedProvinces.includes(vm.selectedProvince)) {
                    let nextIndex = vm.filteredProvinces.indexOf(vm.selectedProvince);

                    vm.selectedProvinces.push(vm.selectedProvince);

                    if (nextIndex < vm.filteredProvinces.length - 1) {
                        vm.selectedProvince = vm.filteredProvinces[nextIndex];
                    }
                }

            },
            removeProvince(index) {
                const vm = this;
                vm.selectedProvinces.splice(index, 1);
            },
            saveSelectedProvinces() {
                const vm = this;

                localStorage.setItem('selectedProvinces', JSON.stringify(vm.selectedProvinces));
            },
            async onProviceChanged() {
                //alert(this.selectedProvince)
                const vm = this;

                if (vm.selectedProvince)
                    await vm.get();
            },

            getProvince(residence) {
                //if (residence == 'For validation')
                //    return residence;

                let address = residence.split(',');

                if (address.length == 1 || address.length == 2) {
                    var foo = address[address.length - 1].trim();
                    if (address[0].includes('Davao City')) {
                        foo = address[0];
                    }
                    return foo;
                }
                return residence;
            },
            async viewPatient(info) {
                const vm = this;
                var item = await vm.getItem(info.FID);


                vm.selectedItem = null;
                vm.$bvModal.show('modal');
                vm.selectedItem = item[0].attributes;

            }

        }
    }
</script>