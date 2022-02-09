<template>
  <v-app>


    <v-app-bar
      app
      color="primary"
      dark
    >
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
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/contacts">Contact List</router-link> |
        <router-link to="/calendar">Calendar</router-link> |
        <router-link to="/cs-courses">CS Courses</router-link> |
        <router-link to="/ee-courses">EE Courses</router-link> |
        <router-link to="/FactoryCenter">Factory Center</router-link>
      </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
