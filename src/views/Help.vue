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
        <v-icon left> mdi-book-open-variant </v-icon>
        Course List
      </v-tab>
      <v-tab>
        <v-icon left> mdi-cloud-upload </v-icon>
        Submit Schedule
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>Welcome to the Help Home page</p>

            <p class="mb-0">Select any of the left hand tabs to find detailed information or instructions for each page section's functionalities.</p>


          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>Contacts help page.</p>
            <p>This page presents current UND faculty per semester.</p>

            <p>The contacts are automatically populated from the UND database.</p>
            <p>Search or filter contacts by first name, last name, email, phone, department or title. </p>
            <p>Add any contact via the "add contact" tab and filling in the required information fields.</p>
            <p>Pencil Icon - Edit any of the contact's information.</p>
            <p>Trash Bin Icon - Delete the selected contact.</p>
            <p>Clipboard Icon - Copy selected contact's email to PC clipboard.</p>
            <p class="mb-0">For ease of search, there is a "rows per page" option located at the bottom to select number of contacts presented.</p>


          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>Calendar help page.</p>
            <p>This page presents the course schedule for the semester.</p>
            <p>Calendar is populated after selected course schedule (per semester) PDF is submitted - see "submit schedule" tab for instructions on schedule submission.</p>
            <p>"Today" tab automatically presents the current day's scheduled courses.</p>
            <p>Filter courses by month, week, day using drop down selection located in the top right of the calendar page.</p>
            <p>By using bi-directional arrows located by month; view any month's scheduled courses.</p>
            <p>Selecting specific day or "more" option will present that day's course schedule.</p>
            <p class="mb-0">Click on any course within the calendar to view or update (pencil icon for updating) course information.</p>


          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>Request help page.</p>
            <p>This page is used to request a personalized block of time on the calendar.</p>
            <p>Fill in the required information fields, located at the top of the page.</p>
            <p>Select day, then click and drag on the calendar space below to select a time-block to request.</p>

            <p class="mb-0">
              The requested personalized time block will then be populated into the pages main calendar.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>Course List help page.</p>
            <p>This page will list all computer science and electrical engineering courses after schedule is submitted - see "submit schedule" tab for instructions on schedule submission.</p>
            <p>Using the search bar, filter and search for a specific class.</p>

            <p class="mb-0">
              Class number, class name, and class credits can be clicked to show data in increasing or decreasing order for numeric value or alphabetical order.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>Submit Schedule help page.</p>
            <p>This page is used to submit a semester course schedule to be presented to the calendar.</p>
            <p>Choose the UND specific course PDF to be uploaded and click "upload".</p>

            <p class="mb-0">
              Once the upload is complete, the calendar will be populated with the course schedule for the specific semester that was chosen for upload.
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
