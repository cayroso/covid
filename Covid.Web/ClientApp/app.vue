<template>
    <div v-cloak>
        <div class="card shadow-sm p-2">
            <div class="row flex-column-reverse flex-md-row">
                <div class="col-md-8">
                    <div class="mr-auto">
                        <div class="form-group mb-0 align-self-end">
                            <label class="font-weight-bold text-primary">
                                Selected Province(s)
                                <span @click="selectedProvinces = []" class="px-1 rounded border border-danger text-danger">
                                    <span class="fas fa-fw fa-eraser mr-1"></span>Clear
                                </span>
                            </label>

                            <div class="d-flex align-content-center flex-wrap ">
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
        <div class="row mt-2">
            <div class="col-lg-8">
                <div class="card shadow-sm p-1">
                    <b-overlay :show="busy">
                        <line-confirmed-per-day v-if="items" :chart-id="`c1`" :chart-data="items" :provinces="selectedProvinces"></line-confirmed-per-day>
                    </b-overlay>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm p-1 mt-lg-0 mt-2">
                    <b-overlay :show="busy">
                        <pie-age v-if="items" :chart-id="`c2`" :chart-data="items" :provinces="selectedProvinces"></pie-age>
                    </b-overlay>
                </div>
            </div>
        </div>


        <div class="card shadow mt-2">
            <div class="card-header d-flex flex-row justify-content-between">
                <h6 class="font-weight-bold mb-0 text-primary"> Confirmed Cases</h6>
                <h6 class="font-weight-bold mb-0 text-primary"> Total: {{items.length}} <span v-if="items.length !== filteredItems.length">, Filtered: {{filteredItems.length}}</span></h6>

            </div><b-overlay :show="busy">
                <div class="table-responsive mb-0">

                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <td class="text-center align-middle">#</td>
                                <td>PH</td>
                                <td>Age</td>
                                <td>Nationality</td>
                                <td>Residence</td>
                                <td>Date Confirmed</td>
                            </tr>
                            <tr class="bg-secondary">
                                <td class="text-center align-middle">
                                    <button @click="resetFilter" class="btn btn-sm btn-primary">
                                        Reset
                                    </button>
                                </td>
                                <td>
                                    <input v-model="filter.ph" type="text" class="form-control form-control-sm text-center" />
                                </td>
                                <td>
                                    <!--<input v-model="filter.age" type="number" class="form-control form-control-sm" disabled />-->
                                </td>
                                <td>
                                    <!--<input v-model="filter.nationality" type="text" class="form-control form-control-sm" disabled />-->
                                </td>
                                <td>
                                    <input v-model="filter.residence" type="text" class="form-control form-control-sm text-center" />
                                </td>
                                <td>
                                    <input v-model="filter.confirmed" type="text" class="form-control form-control-sm text-center" />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(feat,index) in paginated">
                                <td class="text-center align-middle">{{((pageIndex-1)*pageSize) + (index+1)}}</td>
                                <td>
                                    <span @click="viewPatient(feat.attributes)" class="text-primary" style="cursor:pointer">
                                        {{feat.attributes.PH_masterl}}
                                    </span>
                                </td>
                                <td>
                                    <div class="d-flex flex-row">
                                        <div>
                                            <span v-bind:class="{'fa-male': feat.attributes.kasarian == 'Male', 'fa-female': feat.attributes.kasarian == 'Female',  }" class="fas fa-fw"></span>
                                        </div>
                                        <div v-text="feat.attributes.edad"></div>
                                    </div>
                                </td>
                                <td>{{feat.attributes.nationalit}}</td>
                                <td>{{feat.attributes.residence}}</td>
                                <td class="text-right">{{feat.attributes.confirmed}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </b-overlay>
            <div class="card-footer">
                <b-overlay :show="busy">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="text-left align-middle d-flex flex-row">
                            <button @click="pageIndex = 1" class="btn btn-outline-primary">
                                <span class="fas fa-fw fa-angle-double-left"></span>
                            </button>
                            <button @click="movePrevious" class="btn btn-outline-primary ml-1">
                                <span class="fas fa-fw fa-angle-left"></span>
                            </button>
                        </div>

                        <div class="d-flex flex-row justify-content-center">
                            <div>
                                {{pageIndex}}/{{totalPages}} Page(s)
                            </div>
                            <!--<div class="d-flex flex-row ml-1">
                                Per Page: <input v-model="pageSize" type="number" class="form-control form-control-sm col-3" />
                            </div>-->
                        </div>

                        <div class="text-right align-middle d-flex flex-row">
                            <button @click="moveNext" class="btn btn-outline-primary">
                                <span class="fas fa-fw fa-angle-right"></span>
                            </button>
                            <button @click="pageIndex = totalPages" class="btn btn-outline-primary ml-1">
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
                baseArcgisUrl: 'https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query?f=json&returnDistinctValues=true&returnGeometry=false&spatialRel=esriSpatialRelIntersects&cacheHint=false',
                resultRecordCount: 2000,
                busy: false,
                items: [],
                selectedItem: null,
                selectedProvince: '',
                selectedProvinces: [],//, 'Cavite', 'Laguna'],//, 'Quezon City', 'San Juan City'],
                provinces: [],
                pageIndex: 1,
                pageSize: 15,
                filter: {
                    ph: '',
                    age: null,
                    nationality: '',
                    residence: '',
                    confirmed: ''
                }

            }
        },
        computed: {

            filteredProvinces() {
                const vm = this;


                var filtered = vm.provinces.filter(item => {
                    return !vm.selectedProvinces.includes(item);
                });

                return filtered;

            },
            filteredItems() {
                const vm = this;

                var filtered = vm.items.filter(item => {

                    var ph = item.attributes.PH_masterl.toLowerCase().includes(vm.filter.ph.toLowerCase());
                    //var age = item.attributes.PH_masterl.toLowerCase().includes(vm.filter.age);
                    var residence = item.attributes.residence.toLowerCase().includes(vm.filter.residence.toLowerCase());
                    var confirmed = item.attributes.confirmed.toLowerCase().includes(vm.filter.confirmed);

                    return ph && residence && confirmed;
                });

                return filtered;
            },
            paginated() {
                const vm = this;

                var page = vm.filteredItems.slice((vm.pageIndex - 1) * vm.pageSize, vm.pageIndex * vm.pageSize);

                return page;
            },
            totalPages() {
                const vm = this;

                var total = Math.ceil(vm.filteredItems.length / vm.pageSize);
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
            resetFilter() {
                const vm = this;

                vm.filter = {
                    ph: '',
                    age: null,
                    nationality: '',
                    residence: '',
                    confirmed: ''
                }
            },
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
                let hasNextRows = false;
                let resultOffset = 0;

                let provinces = [];

                do {
                    const where = encodeURIComponent('1=1');

                    const query = [
                        '&where=', where,
                        '&outFields=', 'residence',
                        '&resultOffset=', resultOffset,
                        '&resultRecordCount=', vm.resultRecordCount,
                    ].join('');


                    let url = vm.baseArcgisUrl + query;

                    try {
                        await instance.get(url)
                            .then(resp => {
                                const data = resp.data;

                                provinces = provinces.concat(data.features);

                                hasNextRows = data.exceededTransferLimit;
                            })
                    } catch (e) {
                        alert(e);
                    }

                    resultOffset += vm.resultRecordCount;

                } while (hasNextRows);

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
                let resultOffset = 0;
                let hasNextRows = false;
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
                    vm.pageIndex = 1;
                    do {
                        let where = encodeURIComponent(`1=1`);

                        if (vm.selectedProvince.length > 0) {
                            where = '';
                            vm.selectedProvinces.forEach((p, index) => {
                                where += encodeURIComponent(`${index == 0 ? '' : 'OR'} residence LIKE '%${p}' `);
                            });
                        }

                        const query = [
                            '&where=', where,
                            '&outFields=', 'FID,PH_masterl,kasarian,nationalit,residence,edad,confirmed',
                            '&resultOffset=', resultOffset,
                            '&resultRecordCount=', vm.resultRecordCount,
                        ].join('');

                        let url = vm.baseArcgisUrl + query;

                        await instance.get(url)
                            .then(resp => {
                                const data = resp.data;

                                data.features.forEach(item => {
                                    item.province = vm.getProvince(item.attributes.residence);
                                    //var address = vm.parseAddress(item.attributes.residence);

                                })

                                items = items.concat(data.features);

                                hasNextRows = data.exceededTransferLimit;
                            })

                        resultOffset += vm.resultRecordCount;

                    } while (hasNextRows);

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
                let hasNextRows = false;
                let resultOffset = 0;
                let items = [];

                if (vm.busy)
                    return;

                if (!vm.selectedProvinces.length)
                    return;

                try {
                    do {
                        let where = encodeURIComponent(`FID = ${id}`);

                        const query = [
                            '&where=', where,
                            '&outFields=', '*',
                            '&resultOffset=', resultOffset,
                            '&resultRecordCount=', vm.resultRecordCount,
                        ].join('');

                        let url = vm.baseArcgisUrl + query;

                        await instance.get(url)
                            .then(resp => {
                                const data = resp.data;
                                data.features.map(item => {
                                    const attributes = item.attributes;
                                    attributes.symptoms = attributes.symptoms.trim();
                                    attributes.travel_hx = attributes.travel_hx.trim();
                                });

                                items = items.concat(data.features);

                                hasNextRows = data.exceededTransferLimit;
                            });

                        resultOffset += vm.resultRecordCount;

                    } while (hasNextRows);

                    return items;

                } catch (e) {
                    alert(e);
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
                const vm = this;

                if (vm.selectedProvince)
                    await vm.get();
            },
            parseAddress(residence) {
                let address = residence.split(',');

                if (address.length == 2) {
                    return address
                }
                return ['', residence];
            },
            getProvince(residence) {
                const vm = this;

                let address = vm.parseAddress(residence);

                if (address.length > 0) {
                    var foo = address[address.length - 1].trim();

                    return foo;
                }
                return residence;
            },
            async viewPatient(info) {
                const vm = this;
                var item = await vm.getItem(info.FID);

                vm.$bvModal.show('modal');
                vm.selectedItem = item[0].attributes;
            }

        }
    }
</script>