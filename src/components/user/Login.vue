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
                <form class="card" @submit.prevent="login">
                    <div class="card-header">
                        <div class="card-header-title">
                            <p class="title is-5">Connexion</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label">Adresse e-mail</label>
                                <div class="control">
                                    <input v-model="data.email" class="input" type="email"
                                           placeholder="albert.einstein@relativity.com">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Mot de passe</label>
                                <div id="password" class="control">
                                    <input v-model="data.password" class="input" v-bind:type="!toggle && 'password' || 'text'">
                                    <div id="icons">
                                        <font-awesome-icon class="has-text-grey-dark" v-if="!toggle" v-on:click="toggle = !toggle;" :icon="['far', 'eye']"/>
                                        <font-awesome-icon v-if="toggle" v-on:click="toggle = !toggle;" :icon="['far', 'eye-slash']"/>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <p v-if="failed" class="has-text-danger">Adresse e-mail ou mot de passe
                                        incorrect.</p>
                                    <button class="button is-link">Connexion</button>
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
    name: "Login",
    data() {
        const loginFunction = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.data)
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/user/login/", requestOptions);
            const response = await request.json();
            if (request.status === 200) {
                this.$cookies.set("_id", response._id);
                this.$cookies.set("token", response.token);
                this.$emit("getUserInfo");
                await this.$router.push("/")
            } else if (request.status === 401) {
                this.failed = true
                this.password = "";
            } else {
                this.internalServerError = true
                this.password = "";
            }
        }

        return {
            login: loginFunction,
            data: {
                password: "",
                email: ""
            },
            failed: false,
            internalServerError: false,
            toggle: false
        }
    },
    mounted() {
        console.log(process.env.SERVER_IP)
        document.title = "Patro Tamines - Connexion"
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
#password {
    position: relative;
}
#icons{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-60%, -45%);
}
#icons:active{
    color: #242424 !important;
}
</style>
