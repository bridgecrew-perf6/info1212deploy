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
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            <p class="title is-5">Mes inscriptions</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <p v-if="empty" class="title is-5 has-text-centered">Vous n'avez pas encore
                                d'inscriptions</p>
                            <table v-if="!empty" class="table is-hoverable is-bordered">
                                <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Date de naissance</th>
                                    <th>Âge</th>
                                    <th>Équipe</th>
                                    <th><abbr title="Affiliation réglée">Aff. réglée</abbr></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="child in enrolments" :key="child">
                                    <td class="is-vcentered">{{ child.name }}</td>
                                    <td class="is-vcentered">{{ child.firstname }}</td>
                                    <td class="is-vcentered">{{
                                            new Date(child.birthdate).toLocaleDateString("fr")
                                        }}
                                    </td>
                                    <td class="is-vcentered">
                                        {{ computeAge(new Date(child.birthdate).toLocaleDateString('fr')) }} ans
                                    </td>
                                    <td class="is-vcentered">{{ child.team }}</td>
                                    <td class="has-text-centered is-vcentered">
                                        <font-awesome-icon v-if="!child.paid" class="has-text-danger"
                                                           :icon="['fas', 'times']"/>
                                        <font-awesome-icon v-if="child.paid" class="has-text-success"
                                                           :icon="['fas', 'check']"/>
                                    </td>
                                    <td>
                                        <button class="button is-danger is-fullwidth"
                                                v-on:click="deleteKid(child._id, child.name, child.firstname, new Date(child.birthdate).toLocaleDateString('fr'))">
                                            <span class="icon is-small">
                                                <font-awesome-icon :icon="['fas', 'times']"/>
                                            </span>
                                            <span>Supprimer</span>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "MeetingsEnrolments",
    data() {

        const getEnrolmentsFunction = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({"_id": this.$cookies.get("_id")})
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/child/get/", requestOptions);
            const response = await request.json();
            if (request.status === 200) {
                this.empty = response.length === 0;
                this.enrolments = response
            } else if (request.status === 401) {
                this.mustReconnect = true
            } else {
                this.internalServerError = true
            }
        }

        const deleteKidFunction = async (kidId) => {
            const requestOptions = {
                method: "DELETE",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({
                    "_id": this.$cookies.get("_id"),
                    "kidId": kidId
                })
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/child/delete/", requestOptions);
            if (request.status === 200) {
                await this.getEnrolments()
            } else if (request.status === 401) {
                this.mustReconnect = true
            } else {
                this.internalServerError = true
            }
        }


        return {
            deleteKidF: deleteKidFunction,
            getEnrolments: getEnrolmentsFunction,
            enrolments: [],
            empty: true,
            mustReconnect: false,
            internalServerError: false
        }
    },
    methods: {
        computeAge: function (bdate) {
            const today = new Date()
            const bdatedate = new Date(bdate.split("/")[2] + "-" + bdate.split("/")[1] + "-" + bdate.split("/")[0])
            const age = new Date(today - bdatedate).getUTCFullYear() - 1970
            return age
        },
        deleteKid: function (kidId, kidName, kidFirstname, kidBirthdate) {
            if (confirm("Etes-vous sur de vouloir supprimer cet enfant ?\n("+kidName+" "+kidFirstname+ " - " + kidBirthdate + ")")) {
                this.deleteKidF(kidId)
            }
        }
    },
    mounted() {
        this.getEnrolments()
    }
}
</script>

<style>
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
