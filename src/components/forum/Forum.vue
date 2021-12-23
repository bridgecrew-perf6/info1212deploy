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

        <div v-if="error" class="modal-background">
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
                <div v-if="!error" class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            <p class="title is-5">{{ forum.title }}</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <article class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            {{ forum.description }}
                                            <br v-if="forum.description !== '' && forum.description !== undefined && forum.description !== null">
                                            <small><strong>Auteur :</strong> {{ forum.author }} &nbsp;&nbsp; <strong>Créé
                                                le</strong> {{
                                                    new Date(forum.postDate).toLocaleDateString('fr')
                                                }}</small>
                                        </p>
                                    </div>

                                    <article v-for="message in forum.messages" v-bind:key="message" class="media">
                                        <figure class="media-left">
                                        </figure>
                                        <div class="media-content">
                                            <div class="content">
                                                <p>
                                                    <strong>{{ message.author }}</strong>
                                                    <br>
                                                    {{ message.post }}
                                                    <br>
                                                    <small>{{ new Date(message.date).toLocaleString('fr') }} &nbsp;&nbsp;
                                                        <span v-if="checkUser(message.authorId)"
                                                              v-on:click="deleteMessage(message._id)"
                                                              class="has-text-danger is-clickable">Supprimer</span></small>
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </article>

                            <article v-if="loggedIn" class="media">
                                <figure class="media-left">
                                </figure>
                                <div class="media-content">
                                    <div class="field">
                                        <p class="control">
                                            <textarea v-model="message" class="textarea"
                                                      placeholder="Ajouter un message..."></textarea>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <p class="control">
                                            <button v-on:click="postMessage" class="button is-primary">Poster un message</button>
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article v-if="!loggedIn" class="media">
                                <figure class="media-left">
                                </figure>
                                <div class="media-content has-text-centered">
                                    <p>Vous devez être connecté pour poster un message.
                                        <router-link to="/user/login/">Cliquez ici pour vous connecter.</router-link>
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Forum",
    props: ["user", "loggedIn"],
    data() {
        const getForumFunction = async () => {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/forum/get/" + this.$route.params.id, requestOptions);
            const response = await request.json();
            if (request.status === 200) {
                this.forum = response
                this.forum.messages.sort(this.sortingFunction)
                this.error = false
            } else if (request.status === 404) {
                this.error = true
            } else {
                this.internalServerError = true
            }
        }
        const postMessageFunction = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({
                    "_id": this.$cookies.get("_id"),
                    "message": {
                        "forum": this.$route.params.id,
                        "post": this.message,
                        "date": new Date(),
                        "author": this.user.firstname + ' ' + this.user.name,
                    }
                })
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/message/create/", requestOptions);
            if (request.status === 201) {
                this.message = ""
                await this.getForum()
            } else if (request.status === 401) {
                this.error = true
            } else {
                this.internalServerError = true
            }
        }

        const deleteMessageFunction = async (id) => {
            const requestOptions = {
                method: "DELETE",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({
                    "_id": this.$cookies.get("_id"),
                    "messageId": id
                })
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/message/delete/", requestOptions);
            if (request.status === 200) {
                await this.getForum()
            } else if (request.status === 401) {
                this.error = true
            } else {
                this.internalServerError = true
            }
        }

        return {
            forum: null,
            postMessage: postMessageFunction,
            deleteMessageF: deleteMessageFunction,
            getForum: getForumFunction,
            internalServerError: false,
            error: true,
            message: ""
        }
    },
    mounted() {
        this.getForum()
    },
    methods: {
        sortingFunction: function (a, b) {
            return new Date(a.date) - new Date(b.date);
        },
        checkUser: function (id) {
            return id === this.$cookies.get('_id')
        },
        deleteMessage: function (id) {
            if (confirm("Etes-vous sur de vouloir supprimer ce message ?")) {
                this.deleteMessageF(id)
            }
        }
    }

}
</script>

<style scoped>

</style>
