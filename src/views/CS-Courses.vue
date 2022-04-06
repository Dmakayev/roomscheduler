<template>
    <v-app>
        <v-card>
            <v-card-title>
                Course List
                <v-spacer></v-spacer>
                <v-text-field v-model="search"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              hide-details></v-text-field>
                <v-col
                       class="d-flex"
                       cols="4"
                       sm="2"
                       >
                          <v-select v-model ="filter_val"
                                :items="fils"
                                filled
                                label="Filter by:"
                                dense
                                hide-details
                            ></v-select>
                </v-col>
            </v-card-title>
            <v-data-table :headers="headers"
                          :items="classes"
                          :search="search"></v-data-table>
        </v-card>
    </v-app>
</template>


<script>


    export default {
        data() {
            return {
                search: '',
                filter_val: '',
                headers: [
                    {
                        text: 'Department',
                        align: 'start',
                        sortable: false,
                        value: 'department',
                        filter: this.filter_value,
                    },
                    { text: 'Class Number', value: 'num' },
                    { text: 'Class Name', value: 'name' },
                    { text: 'Credits', value: 'creds' },
                ],
                classes: [],
                fils: [
                    {text: 'None', value: ''},
                    { text: 'CSCI', value: 'CSCI' },
                    { text: 'EE', value: 'EE' }
                ]
            };
        },
        methods: {
            getClassData() {
                fetch('./ClassList.json').then(response => response.json())
                    .then(data => (this.classes = data));
                console.log(this.classes)
            },
            filter_value(value) {
                if (!this.filter_val) {
                    return true;
                }
                return value === this.filter_val
            }
        },
        mounted() {
            this.getClassData();
        }
    };

</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>