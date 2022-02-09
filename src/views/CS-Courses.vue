<template>
    <v-app>
        <v-card>
            <v-card-title>
                CS Course List
                <v-spacer></v-spacer>
                <v-text-field v-model="search"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              hide-details></v-text-field>
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
                headers: [
                    {
                        text: 'Department',
                        align: 'start',
                        sortable: false,
                        value: 'department',
                    },
                    { text: 'Class Number', value: 'num' },
                    { text: 'Class Name', value: 'name' },
                    { text: 'Credits', value: 'creds' },
                ],
                classes: []
            };
        },
        methods: {
            getClassData() {
                fetch('./ClassList.json').then(response => response.json())
                    .then(data => (this.classes = data));
                console.log(this.classes)
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