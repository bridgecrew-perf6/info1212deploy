<template>
    <div id="app">
        <Navbar :user="user" v-bind:logged-in="isLoggedIn"/>
        <router-view v-on:getUserInfo="getUserInfo" v-on:logOut="logOut" :user="user" :logged-in="isLoggedIn"/>
        <router-view name="a" v-on:getUserInfo="getUserInfo" v-on:logOut="logOut"/>
        <router-view name="b" v-on:getUserInfo="getUserInfo" v-on:logOut="logOut"/>
        <router-view name="c" v-on:getUserInfo="getUserInfo" v-on:logOut="logOut"/>
        <Footer/>
    </div>
</template>

<script>
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";

export default {
    name: 'App',
    components: {
        Footer,
        Navbar,
    },
    data() {
        const getUserInfoFunction = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({"_id": this.$cookies.get("_id")})
            };
            const request = await fetch("http://" + window.location.hostname + ":3000" + "/user/get/", requestOptions);
            const response = await request.json();
            if (request.status === 200) {
                this.user = response;
                this.isLoggedIn = true;
            } else if(request.status === 401) {
                this.logOut()
            }
        }

        return {
            getUserInfo: getUserInfoFunction,
            isLoggedIn: false,
            user: {
                firstname: null,
                name: null,
                email: null,
                phone: null
            }
        }
    },
    methods: {
        logOut() {
            this.user = {
                email: null,
                name: null,
                firstname: null,
                phone: null,
                birthdate: null
            };
            this.isLoggedIn = false;
            this.$cookies.remove("_id")
            this.$cookies.remove("token")
            this.$router.push('/user/login/')
        }
    },
    mounted() {
        document.title = "Patro Tamines"
        this.getUserInfo()
    },
}
</script>

<style>
@import url('http://fonts.cdnfonts.com/css/avenir-lt-std');

* {
    scroll-behavior: smooth;
}

#app {
    font-family: 'Avenir LT Std', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.has-background-image {
    background: url("./assets/background-image.jpg") center;
    background-size: cover;
}

.has-background-image-blured {
    background: url("./assets/background-image-blured.jpg") center;
    background-size: cover;
}

.full-size {
    padding: 20vh 10vw;
}

.has-background-image-staff{
    background: url("./assets/staff.jpg") center;
    background-size: cover;
}
</style>
