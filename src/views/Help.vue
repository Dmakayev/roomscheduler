<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Help Center</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left> mdi-home </v-icon>
        Home
      </v-tab>
      <v-tab>
        <v-icon left> mdi-account-multiple </v-icon>
        Contacts
      </v-tab>
      <v-tab>
        <v-icon left> mdi-calendar-text </v-icon>
        Calendar
      </v-tab>
      <v-tab>
        <v-icon left> mdi-calendar-cursor </v-icon>
        Requests
      </v-tab>
      <v-tab>
        <v-icon left> mdi-keyboard </v-icon>
        CS Courses
      </v-tab>
      <v-tab>
        <v-icon left> mdi-lightning-bolt-circle </v-icon>
        EE Courses
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>This is the Home page</p>

            <p>some example text for instructions on the home page</p>

            <p class="mb-0">
              some more example text to hold help page instructions
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>this is the contacts page.</p>

            <p class="mb-0">
              this is some example text to hold contacts page instructions
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>this is the calendar page</p>

            <p class="mb-0">
              this is example text to hold calendar instructions
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>this is the requests page</p>

            <p class="mb-0">
              this is example text to hold request page instructions
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>this is the CS course help page</p>

            <p class="mb-0">
              this is example text to hold CS course page instructions
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>this is the EE course help page</p>

            <p class="mb-0">
              this is example text to hold EE course page instructions
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {};
</script>
<style scoped></style>
