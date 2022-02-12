<template>
  <v-container fluid>
    <v-row align="stretch">
      <v-col cols="2" align-self="center">
        <v-subheader class="justify-center"> Instructor Name </v-subheader>
      </v-col>

      <v-col cols="3" align-self="center">
        <v-select
          v-model="selectFaculty"
          :items="facultyList"
          item-text="firstName"
          item-value="lastname"
          label="Select Faculty Name"
          persistent-hint
          return-object
          single-line
          @input="setFacultyName"
        >
          <template v-slot:item="data">
            {{ data.item.firstName }} {{ data.item.lastname }}
          </template>
          <template v-slot:selection="data">
            {{ data.item.firstName }} {{ data.item.lastname }}
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
          :items="classList"
          item-text="name"
          item-value="num"
          label="Select Course Name"
          persistent-hint
          return-object
          single-line
        >
          <template v-slot:item="data">
            {{ data.item.department }}{{ data.item.num }} {{ data.item.name }}
          </template>
          <template v-slot:selection="data">
            {{ data.item.department }}{{ data.item.num }} {{ data.item.name }}
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
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
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
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="auto">
            <v-calendar
              ref="calendar"
              v-model="value"
              color="primary"
              type="4day"
              :events="events"
              :event-color="getEventColor"
              :event-ripple="false"
              @change="getEvents"
              @mousedown:event="startDrag"
              @mousedown:time="startTime"
              @mousemove:time="mouseMove"
              @mouseup:time="endDrag"
              @mouseleave.native="cancelDrag"
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
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    selectFaculty: { firstName: "Null", lastname: "Void" },
    selectClass: { department: "Null", num: "Null", name: "Null" },
    facultyList: [],
    classList: [],
    focus: "",
    type: "month",
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
          name: `${this.selectFaculty.firstName} ${this.selectFaculty.lastname} | ${this.selectClass.department}${this.selectClass.num} ${this.selectClass.name}`,
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
    // getEvents ({ start, end }) {
    //   const events = []
    //
    //   const min = new Date(`${start.date}T00:00:00`).getTime()
    //   const max = new Date(`${end.date}T23:59:59`).getTime()
    //   const days = (max - min) / 86400000
    //   const eventCount = this.rnd(days, days + 20)
    //
    //   for (let i = 0; i < eventCount; i++) {
    //     const timed = this.rnd(0, 3) !== 0
    //     const firstTimestamp = this.rnd(min, max)
    //     const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
    //     const start = firstTimestamp - (firstTimestamp % 900000)
    //     const end = start + secondTimestamp
    //
    //     events.push({
    //       name: this.rndElement(this.names),
    //       color: this.rndElement(this.colors),
    //       start,
    //       end,
    //       timed,
    //     })
    //   }
    //
    //   this.events = events
    // },

    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    getNameData() {
      fetch("./Contacts.json")
        .then((response) => response.json())
        .then((data) => (this.facultyList = data));
    },

    getClassData() {
      fetch("./ClassList.json")
        .then((response) => response.json())
        .then((data) => (this.classList = data));
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  mounted() {
    this.getNameData();
    this.getClassData();
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
