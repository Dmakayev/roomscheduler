<template>
  <v-row class="fill-height">
    <v-col class="pa-13">
      <v-sheet height="100">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        >
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
              <br />
              <span v-html="selectedEvent.room"></span>
              <br />
              <span v-html="selectedEvent.instructor"></span>
              <br />
              <span v-html="selectedEvent.sectionNum"></span>
              <br />
              <span v-html="selectedEvent.sectionTime"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    classes: [],
    meetings: [],
  }),
  methods: {
    getCourseData() {
      axios.get("http://127.0.0.1:8000/courses").then((response) => {
        this.classes = response.data;
      });
    },
    getMeetingData() {
      axios.get("http://127.0.0.1:8000/requests").then((response) => {
        this.meetings = response.data;
      });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      const events = [];
      const allDay = this.rnd(0, 3) === 0;
      this.classes.forEach((item) => {
        if (item.time !== "TBA") {
          const timeArray = item.time.split("-");
          const startTime = moment(timeArray[0], ["h:mm A"]).format("HH:mm");
          const endTime = moment(timeArray[1], ["h:mm A"]).format("HH:mm");
          const eventColor = this.colors[this.rnd(0, this.colors.length - 1)];
          const semesterStartDate = new Date(2022, 0, 10); //MANUAL DATES FOR SPRING 2022
          const semesterEndDate = new Date(2022, 4, 16); //MANUAL DATES FOR SPRING 2022
          const dayArray = item.days.split("");
          if (item.days !== "") {
            let loop = new Date(semesterStartDate);
            while (loop <= semesterEndDate) {
              dayArray.forEach((days) => {
                if (days === "M" && loop.getDay() === 1) {
                  events.push({
                    name: item.classNumber + " " + item.className,
                    details: "Credits: " + item.credits,
                    room: "Room: " + item.room,
                    instructor: "Instructor: " + item.instructor,
                    sectionNum: "Section: " + item.sectionNumber,
                    sectionTime: item.time,
                    start:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      startTime,
                    end:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      endTime,
                    color: eventColor,
                    timed: !allDay,
                  });
                } else if (days === "T" && loop.getDay() === 2) {
                  events.push({
                    name: item.classNumber + " " + item.className,
                    details: "Credits: " + item.credits,
                    room: "Room: " + item.room,
                    instructor: "Instructor: " + item.instructor,
                    sectionNum: "Section: " + item.sectionNumber,
                    sectionTime: item.time,
                    start:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      startTime,
                    end:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      endTime,
                    color: eventColor,
                    timed: !allDay,
                  });
                } else if (days === "W" && loop.getDay() === 3) {
                  events.push({
                    name: item.classNumber + " " + item.className,
                    details: "Credits: " + item.credits,
                    room: "Room: " + item.room,
                    instructor: "Instructor: " + item.instructor,
                    sectionNum: "Section: " + item.sectionNumber,
                    sectionTime: item.time,
                    start:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      startTime,
                    end:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      endTime,
                    color: eventColor,
                    timed: !allDay,
                  });
                } else if (days === "R" && loop.getDay() === 4) {
                  events.push({
                    name: item.classNumber + " " + item.className,
                    details: "Credits: " + item.credits,
                    room: "Room: " + item.room,
                    instructor: "Instructor: " + item.instructor,
                    sectionNum: "Section: " + item.sectionNumber,
                    sectionTime: item.time,
                    start:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      startTime,
                    end:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      endTime,
                    color: eventColor,
                    timed: !allDay,
                  });
                } else if (days === "F" && loop.getDay() === 5) {
                  events.push({
                    name: item.classNumber + " " + item.className,
                    details: "Credits: " + item.credits,
                    room: "Room: " + item.room,
                    instructor: "Instructor: " + item.instructor,
                    sectionNum: "Section: " + item.sectionNumber,
                    sectionTime: item.time,
                    start:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      startTime,
                    end:
                      loop.getFullYear() +
                      "-" +
                      (loop.getMonth() + 1) +
                      "-" +
                      loop.getDate() +
                      " " +
                      endTime,
                    color: eventColor,
                    timed: !allDay,
                  });
                }
              });
              let newDate = loop.setDate(loop.getDate() + 1);
              loop = new Date(newDate);
            }
          }
        }
      });

      this.meetings.forEach((meetingItem) => {
        const eventColor = this.colors[this.rnd(0, this.colors.length - 1)];
        events.push({
          name: meetingItem.firstName + " " + meetingItem.lastName,
          instructor: "Host: " + meetingItem.firstName + " " + meetingItem.lastName,
          details: "Meeting Type: " + meetingItem.eventType,
          room: "Room: " + meetingItem.room,
          sectionNum: "Section: " + meetingItem.sectionNumber,
          sectionTime:
            moment(meetingItem.startTime).format("HH:mm") +
            " - " +
            moment(meetingItem.endTime).format("HH:mm"),
          start: moment(meetingItem.startTime).format("YYYY-MM-DD HH:mm"),
          end: moment(meetingItem.endTime).format("YYYY-MM-DD HH:mm"),
          color: eventColor,
          timed: !allDay,
        });
      });
      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },

  mounted() {
    this.$refs.calendar.checkChange();
    this.getCourseData();
    this.getMeetingData();
    setTimeout(this.updateRange, 500);
  },
};
</script>

<style scoped></style>
