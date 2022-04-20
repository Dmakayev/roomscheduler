import Vue from "vue";
import VueRouter from "vue-router";
import Contacts from "@/views/Contacts";
import Calendar from "@/views/Calendar";
import Courses from "@/views/Courses";
import DeadEnd from "@/views/DeadEnd";
import Requests from "@/views/Requests";
import Help from "@/views/Help";
import Login from "@/views/Login";
import SubmitSchedule from "@/views/SubmitSchedule";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/calendar",
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
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/submitSchedule",
    name: "Submit Schedule",
    component: SubmitSchedule,
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
    component: Login,
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
