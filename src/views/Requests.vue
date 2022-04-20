<template>
  <v-container fluid>
    <v-row align="stretch">
      <v-col cols="2" align-self="center">
        <v-subheader class="justify-center"> Requester Name </v-subheader>
      </v-col>

      <v-col cols="3" align-self="center">
        <v-select
          v-model="selectFaculty"
          :items="facultyList"
          item-text="firstName"
          item-value="lastName"
          label="Select Requester Name"
          persistent-hint
          return-object
          single-line
          @input="setFacultyName"
        >
          <template v-slot:item="data">
            {{ data.item.lastName }}, {{ data.item.firstName }}
          </template>
          <template v-slot:selection="data">
            {{ data.item.lastName }}, {{ data.item.firstName }}
          </template>
        </v-select>
      </v-col>

      <v-col cols="2" align-self="center">
        <v-subheader class="justify-center"> Event Type </v-subheader>
      </v-col>
      <v-col cols="3" align-self="center">
        <v-select
          v-model="selectEventType"
          :items="eventType"
          item-text="Event Type"
          item-value="eventType"
          label="Select Event Type"
          persistent-hint
          return-object
          single-line
        >
          <template v-slot:item="data">
            {{ data.item }}
          </template>
          <template v-slot:selection="data">
            {{ data.item }}
          </template>
        </v-select>
      </v-col>
    </v-row>

    <v-row align="stretch">
      <v-col cols="2" align-self="center">
        <v-subheader class="justify-center"> Course Name </v-subheader>
      </v-col>

      <v-col cols="3" align-self="center">
        <v-select
          v-model="selectClass"
          :items="classes"
          item-text="name"
          item-value="num"
          label="Select Course Name"
          persistent-hint
          return-object
          single-line
        >
          <template v-slot:item="data">
            {{ data.item.classNumber }}-{{ data.item.sectionNumber }}
            {{ data.item.className }}
          </template>
          <template v-slot:selection="data">
            {{ data.item.classNumber }}-{{ data.item.sectionNumber }}
            {{ data.item.className }}
          </template>
        </v-select>
      </v-col>

      <v-col cols="2" align-self="center">
        <v-subheader class="justify-center"> Room Name </v-subheader>
      </v-col>
      <v-col cols="3" align-self="center">
        <v-select
          v-model="selectRoom"
          :items="classes"
          item-text="room"
          item-value="room"
          label="Select Room"
          persistent-hint
          return-object
          single-line
        >
          <template v-slot:item="data">
            {{ data.item.room }}
          </template>
          <template v-slot:selection="data">
            {{ data.item.room }}
          </template>
        </v-select>
      </v-col>
    </v-row>

    <template>
      <v-row class="fill-height">
        <v-col class="pa-13">
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
                >Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[displayTypes] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="displayTypes = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="displayTypes = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="displayTypes = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="auto">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :type="displayTypes"
              :events="events"
              :event-color="getEventColor"
              :event-ripple="false"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @mousedown:event="startDrag"
              @mousedown:time="startTime"
              @mousemove:time="mouseMove"
              @mouseup:time="endDrag"
              @mouseleave.native="cancelDrag"
              @change="updateRange"
            >
              <template v-slot:event="{ event, timed, eventSummary }">
                <div class="v-event-draggable" v-html="eventSummary()"></div>
                <div
                  v-if="timed"
                  class="v-event-drag-bottom"
                  @mousedown.stop="extendBottom(event)"
                ></div>
              </template>
            </v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: () => ({
    value: "",
    events: [],
    colors: [
      "#2196F3",
      "#3F51B5",
      "#673AB7",
      "#00BCD4",
      "#4CAF50",
      "#FF9800",
      "#757575",
      "#d7ca35",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    selectFaculty: { firstName: "Null", lastName: "Void" },
    selectClass: {
      classNumber: "Null",
      sectionNumber: "Null",
      className: "Null",
    },
    selectRoom: { room: "Null" },
    selectEventType: { eventType: "Null" },
    eventType: ["Meeting", "Class", "Private"],
    facultyList: [],
    classes: [],
    focus: "",
    displayTypes: "week",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    mounted() {
      this.$refs.calendar.checkChange();
    },
  }),
  methods: {
    getCourseData() {
      axios.get("http://127.0.0.1:8000/courses").then((response) => {
        this.classes = response.data;
      });
    },
    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);
      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;
        this.dragTime = mouse - start;
      } else {
        this.createStart = this.roundTime(mouse);
        this.createEvent = {
          name: `${this.selectFaculty.lastName} ${this.selectFaculty.firstName}`,
          color: this.rndElement(this.colors),
          start: this.createStart,
          end: this.createStart,
          timed: true,
        };

        this.events.push(this.createEvent);
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;

        this.dragEvent.start = newStart;
        this.dragEvent.end = newEnd;
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },
    endDrag() {
      axios.post("http://127.0.0.1:8000/requests", {
        firstName: this.selectFaculty.firstName,
        lastName: this.selectFaculty.lastName,
        classNumber: this.selectClass.classNumber,
        sectionNumber: this.selectClass.sectionNumber,
        className: this.selectClass.className,
        room: this.selectRoom.room,
        eventType: this.selectEventType,
        startTime: new Date(this.createEvent.start).toString(),
        endTime: new Date(this.createEvent.end).toString(),
      });
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event.color;
    },

    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    getNameData() {
      axios.get("http://127.0.0.1:8000/FacultyNames").then((response) => {
        this.facultyList = response.data;
      });
    },
    viewDay({ date }) {
      this.focus = date;
      this.displayTypes = "day";
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

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  mounted() {
    this.getNameData();
    this.getCourseData();
    setTimeout(this.updateRange, 500);
  },
};
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: "";
  }

  &:hover::after {
    display: block;
  }
}
</style>
