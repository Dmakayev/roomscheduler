import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import FactoryCenter from "@/views/FactoryCenter";
import Contacts from "@/views/Contacts";
import Calendar from "@/views/Calendar";
import CompSciCourses from "@/views/CS-Courses";
import EECourses from "@/views/EE-Courses";
import DeadEnd from "@/views/DeadEnd";
import Requests from "@/views/Requests";
import Help from "@/views/Help";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/factory-center",
    name: "Factory Center",
    component: FactoryCenter,
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
