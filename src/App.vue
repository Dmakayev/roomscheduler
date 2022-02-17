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
      <v-btn
        v-if="!loggedIn()"
        class="ma-2 white--text"
        depressed
        elevation="2"
        to="/login"
        color="primary"
        dark
        >Login</v-btn
      >
      <v-btn
        v-if="loggedIn()"
        @click="logout"
        class="ma-2"
        color="primary"
        dark
        >Sign Out</v-btn
      >
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
        <v-btn class="mx-2" depressed elevation="2" to="/help"
        >Help
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
  methods: {
    logout() {
      localStorage.clear();
      this.$root.$refs.loggedIn = false
      this.$router.push({ name: "Login" });
    },
    loggedIn() {
      if(localStorage.getItem("user-info") == null){
        return false
      }
      return true
    }
  },
  mounted(){
    this.loggedIn()
  }
};
</script>
