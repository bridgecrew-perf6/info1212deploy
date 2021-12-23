<template>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="">
                <img src="../../assets/logo.png" id="logo">
            </router-link>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <font-awesome-icon :icon="['fas', 'bars']"/>
            </a>
        </div>

        <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-start">

                <router-link to="/" class="navbar-item is-size-5">Accueil</router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <router-link to="/meetings/enrol/" class="navbar-link is-size-5">Inscriptions</router-link>
                    <div class="navbar-dropdown">
                        <router-link to="/meetings/enrol/" class="navbar-item is-size-6">Inscrire un enfant
                        </router-link>
                        <router-link to="/meetings/enrolments/" class="navbar-item is-size-6">Consulter mes
                            inscriptions
                        </router-link>
                    </div>
                </div>
                <!--
                TODO If enough time
                <div class="navbar-item has-dropdown is-hoverable">
                    <router-link to="/camp/information/" class="navbar-link is-size-5">Camp</router-link>
                    <div class="navbar-dropdown">
                        <router-link to="/camp/information/" class="navbar-item is-size-6">Informations</router-link>
                        <hr class="navbar-divider">
                        <router-link to="/camp/enrol/" class="navbar-item is-size-6">Inscrire un enfant</router-link>
                        <router-link to="/camp/enrolments/" class="navbar-item is-size-6">Consulter mes inscriptions
                        </router-link>
                    </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable">
                    <router-link to="/staff/" class="navbar-link is-size-5">Staff</router-link>
                    <div class="navbar-dropdown">
                        <router-link to="/staff/2021-2022/" class="navbar-item is-size-6">2021-2022</router-link>
                        <router-link to="/staff/2020-2021/" class="navbar-item is-size-6">2020-2021</router-link>
                        <router-link to="/staff/2019-2020/" class="navbar-item is-size-6">2019-2020</router-link>
                        <router-link to="/staff/" class="navbar-item"><strong>...</strong></router-link>
                        <hr class="navbar-divider">
                        <router-link to="/staff/alumni/" class="navbar-item is-size-6">Anciens</router-link>
                    </div>
                </div>


                -->
                <router-link to="/forum/" class="navbar-item is-size-5">Forum</router-link>
                <router-link to="/contact/" class="navbar-item is-size-5">Contact</router-link>
            </div>

            <div class="navbar-end">
                <a href="https://www.facebook.com/patrotamines" class="navbar-item">
                    <font-awesome-icon :icon="['fab', 'facebook']"/>
                </a>
                <a href="https://www.instagram.com/patro_tamines/" class="navbar-item">
                    <font-awesome-icon :icon="['fab', 'instagram']"/>
                </a>

                <div class="navbar-item">
                    <div v-if="!loggedIn" class="buttons">
                        <router-link to="/user/register/" class="button is-primary">
                            <strong>S'inscrire</strong>
                        </router-link>
                        <router-link to="/user/login/" class="button is-light">Se connecter</router-link>
                    </div>

                    <router-link v-if="loggedIn" to="/user/profile/" class="navbar-item">Bonjour {{ user.firstname }}
                        !
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    props: {
        loggedIn: Boolean,
        user: null
    },
}
</script>

<style scoped>
#logo {
    width: 150px;
    position: absolute;
}

.navbar {
    padding: 0 10vw
}

#navbarMenu {
    padding-left: 200px;
}
</style>
