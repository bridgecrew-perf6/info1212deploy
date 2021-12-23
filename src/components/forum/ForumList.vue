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
        <div class="hero is-fullheight has-background-image">
            <div class="full-size">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            <p class="title is-5">Forums</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <article v-for="forum in forums" v-bind:key="forum" class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <router-link :to="endpointFunction(forum._id)"><strong>{{
                                                forum.title
                                            }}</strong></router-link>
                                        <p>
                                            {{ forum.description }}
                                            <br v-if="forum.description !== '' && forum.description !== undefined && forum.description !== null">
                                            <small><strong>Auteur :</strong> {{ forum.author }} <br> <strong>Créé
                                                le</strong> {{ new Date(forum.postDate).toLocaleDateString('fr') }}
                                                &nbsp;&nbsp;
                                                <span v-if="checkUser(forum.authorId)"
                                                      v-on:click="deleteForum(forum._id)"
                                                      class="has-text-danger is-clickable">Supprimer</span></small>
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article v-if="loggedIn" class="media">
                                <div class="media-content">
                                    <div class="content title is-5">
                                        Créer un nouveau forum
                                    </div>
                                    <div class="field">
                                        <label class="label">Titre</label>
                                        <p class="control">
                                            <input v-model="title" class="input"
                                                   placeholder="Ajouter un titre..."/>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <label class="label">Description</label>
                                        <p class="control">
                                            <input v-model="description" class="input"
                                                   placeholder="Ajouter une description..."/>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <p class="control">
                                            <button v-on:click="createForum" class="button is-primary">Créer un forum
                                            </button>
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
    name: "ForumList",
    props: ["user", "loggedIn"],
    data() {

        const getAllForumsFunction = async () => {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + + "/forum/get/", requestOptions);
            const response = await request.json();
            if (request.status === 200) {
                this.empty = response.length === 0;
                this.forums = response
                this.forums.sort(this.sortingFunction)
            } else if (request.status === 401) {
                this.mustReconnect = true
            } else {
                this.internalServerError = true
            }
        }

        const createForumFunction = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({
                    "_id": this.$cookies.get("_id"),
                    "forum": {
                        "title": this.title,
                        "postDate": new Date(),
                        "description": this.description,
                        "author": this.user.firstname + ' ' + this.user.name,
                    }
                })
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/forum/create/", requestOptions);
            const response = await request.json();
            if (request.status === 201) {
                await this.$router.push("/forum/discussion/" + response.forumId)
            } else if (request.status === 401) {
                this.error = true
            } else {
                this.internalServerError = true
            }
        }

        const deleteForumFunction = async (id) => {
            const requestOptions = {
                method: "DELETE",
                headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.$cookies.get("token")},
                body: JSON.stringify({
                    "_id": this.$cookies.get("_id"),
                    "forumId": id
                })
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/forum/delete/", requestOptions)
            if (request.status === 200) {
                await this.getAllForums()
            } else if (request.status === 401) {
                this.error = true
            } else {
                this.internalServerError = true
            }
        }

        return {
            internalServerError: false,
            forums: [],
            createForum: createForumFunction,
            deleteForumF: deleteForumFunction,
            getAllForums: getAllForumsFunction,
            title: "",
            description: "",
        }
    },
    mounted() {
        this.getAllForums()
    },
    methods: {
        sortingFunction: function (a, b) {
            return new Date(b.postDate) - new Date(a.postDate);
        },
        endpointFunction: function (id) {
            return "/forum/discussion/" + id
        },
        checkUser: function (id) {
            return id === this.$cookies.get('_id')
        },
        deleteForum: function (id) {
            if (confirm("Etes-vous sur de vouloir supprimer ce forum ?")) {
                this.deleteForumF(id)
            }
        }
    }
}
</script>

<style scoped>

</style>
