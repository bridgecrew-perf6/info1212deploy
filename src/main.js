import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'


import E404 from "@/components/E404";

// user components
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";

// home components
import Groups from "./components/home/Groups";
import MeetingsInformation from "./components/home/Information";
import Home from "./components/home/Home";
import StaffFull from "./components/home/StaffFull";

// meetings components
import MeetingsEnrol from "./components/meetings/MeetingsEnrol";
import MeetingsEnrolments from "./components/meetings/MeetingsEnrolments";

// import des éléments de fonctionnement des icones
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons"
import ForumList from "./components/forum/ForumList";
import Forum from "./components/forum/Forum";



require('./assets/main.scss')


Vue.config.productionTip = false

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
Vue.use(VueCookies)

const router = new VueRouter({   // configuration des routes
    mode: 'history',
    routes: [
        {
            path: "/", components: {
                default: Home,
                b: Groups,
                a: MeetingsInformation,
                c: StaffFull
            }
        },
        {path: "/404", component: E404},

        // user path's
        {path: "/user/login", component: Login},
        {path: "/user/register", component: Register},
        {path: "/user/profile", component: Profile},

        // meetings path's
        {path: "/meetings/enrol", component: MeetingsEnrol},
        {path: "/meetings/enrolments", component: MeetingsEnrolments},

        // forum path's
        {path: "/forum", component: ForumList},
        {path: "/forum/discussion/:id", component: Forum},
        {path: "/forum/create", component: MeetingsEnrolments},
        {path: "/forum/search", component: MeetingsEnrolments},

        // home path's
        {path: '/home/groups', component: Groups},
        {path: '/home/information', component: MeetingsInformation},
        {path: "/:pathMatch(.*)*", redirect: "/404"}
    ]
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
