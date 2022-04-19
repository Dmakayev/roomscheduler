<template>
  <v-app>
    <v-card>
      <v-card-title>
        Course List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>
        <v-col class="d-flex" cols="4" sm="2">
          <v-select
            v-model="filter_val"
            :items="courseFilter"
            filled
            label="Filter by:"
            dense
            hide-details
          ></v-select>
        </v-col>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="classes"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sortBy: "classNumber",
      search: "",
      filter_val: "",
      headers: [
        {
          text: "Course Number",
          align: "start",
          sortable: false,
          value: "classNumber",
          filterable: this.filter_value(),
        },
        { text: "Course Name", value: "className" },
        { text: "Credits", value: "credits" },
        { text: "Section", value: "sectionNumber" },
        { text: "Capacity", value: "capacity" },
        { text: "Room", value: "room" },
        { text: "Days", value: "days" },
        { text: "Time", value: "time" },
        { text: "Instructor", value: "instructor" },
      ],
      classes: [],
      courseFilter: [
        { text: "None", value: "" },
        { text: "CSCI", value: "CSCI " },
        { text: "EE", value: "EE " },
      ],
    };
  },
  methods: {
    getCourseData() {
      axios.get("http://127.0.0.1:8000/courses").then((response) => {
        this.classes = response.data;
      });
    },
    filter_value(value) {
      if (!this.filter_val) {
        return true;
      }
      return value === this.filter_val;
    },
  },
  mounted() {
    this.getCourseData();
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
