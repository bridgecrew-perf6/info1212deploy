<template>
    <div>
        <div v-if="internalServerError" class="modal-background">
            <article class="message is-warning">
                <div class="message-header">
                    <p>500 Internal Server Error</p>
                    <button class="delete" v-on:click="internalServerError=false" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    Une erreur interne au serveur est survenue. Veuillez réessayer, si l'erreur persiste veuillez
                    contacter <a
                    href="mailto:florent.rousseau@student.uclouvain.be?subject=[SitePatroTamines] Problème : ">l'administrateur</a>.
                </div>
            </article>
        </div>

        <div v-if="kidCreated" class="modal-background">
            <article class="message is-success">
                <div class="message-header">
                    <p>201 Inscription enregistrée</p>
                    <button class="delete" v-on:click="$router.push('/meetings/enrolments/')" aria-label="delete"></button>
                </div>
                <div class="message-body">
                   Inscription de l'enfant bien sauvegardée ! Vous pouvez consulter vos inscriptions dans l'onglet Inscriptions > <router-link to="/meetings/enrolments/">Consulter mes inscriptions</router-link>.
                </div>
            </article>
        </div>

        <div v-if="mustReconnect" class="modal-background">
            <article class="message is-danger">
                <div class="message-header">
                    <p>401 Accès refusé</p>
                    <router-link to="/user/login/" class="delete" v-on:click="$emit('logOut')"
                                 aria-label="delete"></router-link>
                </div>
                <div class="message-body">
                    Erreur d'authentification, veuillez vous connecter/reconnecter !
                </div>
            </article>
        </div>

        <div class="hero is-fullheight has-background-image">

            <div class="full-size">
                <form class="card" @submit.prevent="enrol">
                    <div class="card-header">
                        <div class="card-header-title">
                            <p class="title is-5">Inscription de l'enfant</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">

                            <div class="field">
                                <label class="label">Nom</label>
                                <div class="control has-icons-right">
                                    <input id="name"
                                           v-bind:class="!checkListObject.name && checkListObject.name !== null && 'is-danger'"
                                           v-on:blur="checkField('name')" v-model="data.name" class="input" type="text"
                                           placeholder="Einstein">
                                    <span v-if="!checkListObject.name && checkListObject.name !== null"
                                          class="icon is-small is-right has-text-danger"><font-awesome-icon
                                        :icon="['fas', 'times']"/></span>
                                    <span v-if="checkListObject.name" class="icon is-small is-right has-text-success"><font-awesome-icon
                                        :icon="['fas', 'check']"/></span>
                                </div>
                                <p v-if="!checkListObject.name && checkListObject.name !== null" class="help is-danger">
                                    Veuillez entrer un nom.</p>
                            </div>

                            <div class="field">
                                <label class="label">Prénom</label>
                                <div class="control has-icons-right">
                                    <input id="firstname"
                                           v-bind:class="!checkListObject.firstname && checkListObject.firstname !== null && 'is-danger'"
                                           v-on:blur="checkField('firstname')" v-model="data.firstname" class="input"
                                           type="text" placeholder="Albert">
                                    <span v-if="!checkListObject.firstname && checkListObject.firstname !== null"
                                          class="icon is-small is-right has-text-danger"><font-awesome-icon
                                        :icon="['fas', 'times']"/></span>
                                    <span v-if="checkListObject.firstname"
                                          class="icon is-small is-right has-text-success"><font-awesome-icon
                                        :icon="['fas', 'check']"/></span>
                                </div>
                                <p v-if="!checkListObject.firstname && checkListObject.firstname !== null"
                                   class="help is-danger">Veuillez entrer un prénom.</p>
                            </div>

                            <div class="field">
                                <label class="label">Date de naissance</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input
                                        v-bind:class="!checkListObject.birthdate && checkListObject.birthdate !== null && 'is-danger'"
                                        v-on:blur="checkBDate"
                                        v-model="data.birthdate" class="input"
                                        type="date" placeholder="0498765432">
                                    <span class="icon is-small is-left"><font-awesome-icon
                                        :icon="['fas', 'calendar-day']"/></span>
                                    <span v-if="!checkListObject.birthdate && checkListObject.birthdate !== null"
                                          class="icon is-small is-right has-text-danger"><font-awesome-icon
                                        :icon="['fas', 'times']"/></span>
                                    <span v-if="checkListObject.birthdate"
                                          class="icon is-small is-right has-text-success"><font-awesome-icon
                                        :icon="['fas', 'check']"/></span>
                                </div>
                                <p v-if="!checkListObject.birthdate && checkListObject.birthdate !== null"
                                   class="help is-danger">Veuillez entrer une date valide, votre enfant doit avoir au minimum 6 ans pour être inscrit au patro.</p>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input v-on:click="checkCheckBox" id="checkBox" type="checkbox">
                                        J'accepte les
                                        <router-link to="/cgu/child/">conditions générales d'utilisation (enfant)</router-link>
                                        .</label>
                                </div>
                                <p v-if="!checkListObject.checkbox && checkListObject.checkbox !== null"
                                   class="help is-danger">Vous ne pouvez pas inscrire un enfant sans accepter ces conditions.</p>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button v-bind:title="this.failed && 'Tous les champs ne sont pas remplis'"
                                            id="sendButton" disabled class="button is-link">Inscrire mon enfant
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MeetingsEnrol",
    data() {
        const enrolFunction = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({"kid": this.data, _id: this.$cookies.get("_id")})
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/child/enrol/", requestOptions);
            if (request.status === 201) {
                this.kidCreated = true
            } else if (request.status === 400 || request.status === 401) {
                this.mustReconnect = true
            } else {
                this.internalServerError = true
            }
        }

        return {
            data: {
                name: "",
                firstname: "",
                birthdate: "",
                ownerId: this.$cookies.get("_id")
            },
            enrol: enrolFunction,
            failed: true,
            internalServerError: false,
            mustReconnect: false,
            kidCreated: false,
            checkListObject: {
                hasCheckedOnce: null,
                checkbox: null,
                birthdate: null,
                name: null,
                firstname: null,
            },
        }
    },
    methods: {
        checkBDate: function () {
            const delta = (new Date() - new Date(this.data.birthdate)).valueOf() / (1000 * 60 * 60 * 24 * 365)
            this.checkListObject.birthdate = delta > 5.5;
            this.checkList()
        },
        checkField: function (field) {
            this.checkListObject[field] = document.getElementById(field).value !== ""
            this.checkList()
        },
        checkCheckBox: function () {
            this.checkListObject.checkbox = document.getElementById("checkBox").checked
            this.checkList()
        },
        checkList: function () {
            this.checkListObject.hasCheckedOnce = true;
            this.failed = false;
            for (let item in this.checkListObject) {
                if (!this.checkListObject[item]) {
                    this.failed = true
                    break;
                }
            }
            document.getElementById("sendButton").disabled = this.failed;
        }
    },
    mounted() {
        document.title = "Patro Tamines - Inscription"
    },
}
</script>

<style scoped>
.modal-background {
    z-index: 10;
}
.message {
    z-index: 11;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
