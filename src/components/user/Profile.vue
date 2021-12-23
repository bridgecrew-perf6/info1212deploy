<template>
    <div class="hero is-fullheight has-background-image">
        <div class="full-size">
            <form class="card">
                <div class="card-header">
                    <div class="card-header-title">
                        <p class="title is-5">Profil</p>
                    </div>
                </div>
                <div class="card-content">
                    <div class="content">
                        <div class="columns">
                            <!--
                            TODO Profile Picture and profile deletion
                            <div class="column is-one-quarter">
                                <div class="profile-img">
                                    <img src="../../assets/images/avatarPlaceholder.png">
                                </div>
                                <div class="buttons columns">
                                    <div class="column">
                                        <button class="button is-info is-fullwidth">
                                        <span class="icon is-small">
                                            <font-awesome-icon :icon="['fas', 'pen']"/>
                                        </span>
                                            <span>
                                            Modifier
                                        </span>
                                        </button>
                                    </div>
                                    <div class="column">
                                        <button class="button is-danger is-fullwidth">
                                        <span class="icon is-small">
                                            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                                        </span>
                                            <span>
                                            Supprimer
                                        </span>
                                        </button>
                                    </div>
                                </div>

                                <div class="buttons to-bottom">
                                    <button class="button is-medium is-danger is-fullwidth">
                                        <span class="icon is-small">
                                            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                                        </span>
                                        <span>
                                            Supprimer mon profil
                                        </span>
                                    </button>
                                </div>
                            </div>
                            -->

                            <div class="column">
                                <div class="header-with-button">
                                    <p class="title is-5">Données personnelles :</p>
                                    <p v-on:click="$emit('logOut')" class="button is-danger">Déconnexion</p>
                                </div>

                                <div class="field">
                                    <label class="label">Nom</label>
                                    <div class="control">
                                        <input id="name" class="input" type="text" v-model="user.name" disabled>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Prénom</label>
                                    <div class="control">
                                        <input id="firstname" class="input" type="text" v-model="user.firstname"
                                               disabled>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Date de naissance</label>
                                    <div class="control">
                                        <input v-if="user.birthdate == null" id="birthdate" class="input" type="text"
                                               value="Inconnue"
                                               disabled>
                                        <input v-else class="input" type="text" v-model="user.birthdate"
                                               disabled>
                                    </div>
                                </div>

                                <hr>

                                <p class="title is-5">Données de connexion :</p>

                                <div class="field">
                                    <label class="label">Adresse-email</label>
                                    <div class="control">
                                        <input id="email" class="input" type="text" v-model="user.email" disabled>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Mot de passe</label>
                                    <div class="control">
                                        <input id="password" class="input" type="text" value="Caché"
                                               disabled>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    props: ["user"],
    mounted() {
        document.title = "Patro Tamines - Profil"
    },
}
</script>

<style scoped>
.profile-img img {
    width: 100%;
}


.to-bottom {
    bottom: 0;
}

.header-with-button {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
