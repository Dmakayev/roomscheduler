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
      <v-data-table :headers="headers" :items="faculty" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon medium class="mr-2" @click="copyEmail(item)">
            mdi-content-copy
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Last Name",
          align: "start",
          sortable: false,
          value: "lastName",
        },
        { text: "First Name", value: "firstName" },
        { text: "Email", value: "email" },
        { text: "", value: "actions", sortable: false },
        { text: "Phone", value: "phone" },
        { text: "Department", value: "department" },
        { text: "Title", value: "title" },
      ],
      faculty: [],
      editedIndex: -1,
    };
  },
  methods: {
    getFacultyData() {
      axios.get("http://127.0.0.1:8000/FacultyNames").then((response) => {
        this.faculty = response.data;
      });

      ///////// THIS IS FOR LOCAL JSON USE
      // fetch("./Contacts.json")
      //   .then((response) => response.json())
      //   .then((data) => (this.faculty = data));
      // console.log(this.faculty);
    },
    copyEmail(item) {
      console.log(item.email);
      navigator.clipboard.writeText(item.email);
    },
  },
  mounted() {
    this.getFacultyData();
  },
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
