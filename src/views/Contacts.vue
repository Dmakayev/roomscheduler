<template>
  <v-app>
    <v-card>
      <v-card-title>
        SEECS Faculty Listing
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="faculty"
          :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
</template>


<script>


export default {
  data()  {
    return {
      search: '',
      headers: [
        {
          text: 'Last Name',
          align: 'start',
          sortable: false,
          value: 'lastname',
        },
        {text: 'First Name', value: 'firstName'},
        {text: 'Email', value: 'email'},
        {text: 'Phone', value: 'phone'},
        {text: 'Department', value: 'department'},
        {text: 'Title', value: 'title'},
      ],
      faculty: []
    };
  },
  methods: {
    getFacultyData() {
      fetch('./Contacts.json').then(response => response.json())
          .then(data => (this.faculty = data));
      console.log(this.faculty)
    }
  },
  mounted() {
    this.getFacultyData();
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
