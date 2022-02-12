<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://campus.und.edu/brand/_files/images/logotype-full-rgb.png"
          transition="scale-transition"
          width="250"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div class="text-center">
        <v-btn class="mx-2" depressed elevation="2" to="/">Home </v-btn>
        <v-btn class="mx-2" depressed elevation="2" to="/contacts"
          >Contacts
        </v-btn>
        <v-btn class="mx-2" depressed elevation="2" to="/calendar"
          >Calendar
        </v-btn>
        <v-btn class="mx-2" depressed elevation="2" to="/requests"
          >Requests
        </v-btn>
        <v-btn class="mx-2" depressed elevation="2" to="/cs-courses"
          >CS Courses
        </v-btn>
        <v-btn class="mx-2" depressed elevation="2" to="/ee-courses"
          >EE Courses
        </v-btn>
        <v-btn class="mx-2" depressed elevation="2" to="/factory-center"
          >Factory Center
        </v-btn>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
