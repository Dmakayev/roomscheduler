import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Contacts from "@/views/Contacts";
import Calendar from "@/views/Calendar";
import CompSciCourses from "@/views/CS-Courses";
import EECourses from "@/views/EE-Courses";
import DeadEnd from "@/views/DeadEnd";
import Requests from "@/views/Requests";
import Help from "@/views/Help";
import Login from "@/views/Login";
import SubmitSchedule from "@/views/SubmitSchedule";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/cs-courses",
    name: "Computer Science Courses",
    component: CompSciCourses,
  },
  {
    path: "/submitSchedule",
    name: "Submit Schedule",
    component: SubmitSchedule,
  },
  {
    path: "/ee-courses",
    name: "Electrical Engineering Courses",
    component: EECourses,
  },
  {
    path: "/requests",
    name: "Request Calendar Slot",
    component: Requests,
  },
  {
    path: "/help",
    name: "Help",
    component: Help,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/:catchAll(.*)",
    component: DeadEnd,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
