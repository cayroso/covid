<template>
    <div v-cloak>
        <div class="d-flex flex-column flex-md-row justify-content-end">
            <div class="form-group">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Province</span>
                    </div>
                    <select @change="onProviceChanged" v-model="selectedProvince" class="custom-select">
                        <option value="">All</option>
                        <option value="batangas">Batangas</option>
                        <option value="laguna">Laguna</option>
                    </select>
                </div>

            </div>
            <div class="form-group ml-md-2">
                <button class="btn btn-primary">
                    <span class="fas fa-fw fa-sync"></span>
                </button>
            </div>
        </div>
        <line-chart></line-chart>
        <div class="table-responsive">
            Total: {{items.length}}
            <table class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>FID</td>
                        <!--<td>sequ</td>-->
                        <td>PH_masterl</td>
                        <td>edad</td>
                        <td>kasarian</td>
                        <td>nationalit</td>
                        <td>residence</td>
                        <td>travel_hx</td>
                        <td>symptoms</td>
                        <td>confirmed</td>
                        <td>facility</td>
                        <td>status</td>
                        <td>epi_link</td>
                        <td>petsa</td>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(feat,index) in items">
                        <td>{{index+1}}</td>
                        <td>{{feat.attributes.FID}}</td>
                        <!--<td>{{feat.attributes.sequ}}</td>-->
                        <td>{{feat.attributes.PH_masterl}}</td>
                        <td>{{feat.attributes.edad}}</td>
                        <td>{{feat.attributes.kasarian}}</td>
                        <td>{{feat.attributes.nationalit}}</td>
                        <td>{{feat.attributes.residence}}</td>
                        <td>{{feat.attributes.travel_hx}}</td>
                        <td>{{feat.attributes.symptoms}}</td>
                        <td>{{feat.attributes.confirmed}}</td>
                        <td>{{feat.attributes.facility}}</td>
                        <td>{{feat.attributes.status}}</td>
                        <td>{{feat.attributes.epi_link}}</td>
                        <td>{{feat.attributes.petsa}}</td>
                        <!--<td>{{feat.attributes.edad}}</td>

                        <td>{{feat.attributes}}</td>-->
                    </tr>
                </tbody>
            </table>

        </div>

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

    export default {
        data() {
            return {
                hasNextRows: false,
                items: [],
                selectedNationality: '',
                selectedProvince: 'batangas',
                selectedHospital: '',

            }
        },
        created() {
            this.get();
        },
        methods: {
            async get() {
                const vm = this;
                const resultRecordCount = 200;
                let resultOffset = 0;
                let url1 = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query`;
                vm.items = [];
                do {
                    //let where = encodeURIComponent(`residence LIKE '%Quezon%'`);
                    //let where = (`residence LIKE '%Quezon%'`);
                    let where = encodeURIComponent(`1=1`);

                    if (vm.selectedProvince) {
                        where = encodeURIComponent(`residence LIKE '%${vm.selectedProvince}%'`);
                    }
                    let url2 = url1 + `?f=json&where=${where}&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&cacheHint=false&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}`;

                    try {

                        await instance.get(url2)
                            .then(resp => {
                                const data = resp.data;
                                data.features.map(item => {

                                    if (item.attributes.nationalit == 'For validation')
                                        item.attributes.nationalit = '';
                                    if (item.attributes.residence == 'For validation')
                                        item.attributes.residence = '';
                                    if (item.attributes.confirmed == 'For validation')
                                        item.attributes.confirmed = '';
                                    if (item.attributes.facility == 'For validation')
                                        item.attributes.facility = '';
                                })
                                vm.items = vm.items.concat(data.features);

                                vm.hasNextRows = data.exceededTransferLimit;
                            })
                    } catch (e) {
                        alert(e);
                    }
                    resultOffset += resultRecordCount + 1;
                } while (vm.hasNextRows);
            },
            async onProviceChanged() {
                //alert(this.selectedProvince)
                const vm = this;

                await vm.get();
            }
        }
    }
</script>