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
                <form class="card" @submit.prevent="register">
                    <div class="card-header">
                        <div class="card-header-title">
                            <p class="title is-5">Inscription</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">

                            <p class="title is-5">Données personnelles :</p>

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
                                <label class="label">Numéro de téléphone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input
                                        v-bind:class="!checkListObject.phone && checkListObject.phone !== null && 'is-danger'"
                                        v-on:blur="checkPhone"
                                        v-model="data.phone" class="input"
                                        type="text" placeholder="0498765432">
                                    <span class="icon is-small is-left"><font-awesome-icon
                                        :icon="['fas', 'phone-alt']"/></span>
                                    <span v-if="!checkListObject.phone && checkListObject.phone !== null"
                                          class="icon is-small is-right has-text-danger"><font-awesome-icon
                                        :icon="['fas', 'times']"/></span>
                                    <span v-if="checkListObject.phone" class="icon is-small is-right has-text-success"><font-awesome-icon
                                        :icon="['fas', 'check']"/></span>
                                </div>
                                <p v-if="!checkListObject.phone && checkListObject.phone !== null"
                                   class="help is-danger">Veuillez entrer un numéro de
                                    téléphone
                                    valide. (04xx xx xx xx)</p>
                            </div>
                            <hr>
                            <p class="title is-5">Données de connexion :</p>

                            <div class="field">
                                <label class="label">Adresse e-mail</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input
                                        v-bind:class="((!checkListObject.email && checkListObject.email !== null) || (!checkListObject.emailSyntax && checkListObject.emailSyntax !== null))  && 'is-danger'"
                                        v-model="data.email"
                                        class="input" type="email" v-on:blur="checkEmail"
                                        placeholder="albert.einstein@relativity.com">
                                    <span class="icon is-small is-left"><font-awesome-icon
                                        :icon="['fas', 'at']"/></span>
                                    <span
                                        v-if="(!checkListObject.email && checkListObject.email !== null) || (!checkListObject.emailSyntax && checkListObject.emailSyntax !== null)"
                                        class="icon is-small is-right  has-text-danger"><font-awesome-icon
                                        :icon="['fas', 'times']"/></span>
                                    <span v-if="checkListObject.email && checkListObject.emailSyntax"
                                          class="icon is-small is-right has-text-success"><font-awesome-icon
                                        :icon="['fas', 'check']"/></span>
                                </div>
                                <p v-if="!checkListObject.email && checkListObject.email !== null"
                                   class="help is-danger">Cet adresse e-mail est déjà
                                    utilisée.</p>
                                <p v-if="!checkListObject.emailSyntax && checkListObject.emailSyntax !== null"
                                   class="help is-danger">Veuillez entrer une adresse e-mail valide.</p>
                            </div>

                            <div class="field">
                                <label class="label">Mot de passe</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input
                                        v-bind:class="!checkListObject.password && checkListObject.password !== null && 'is-danger'"
                                        v-on:blur="checkPassword"
                                        v-model="data.password" class="input"
                                        v-bind:type="!toggle && 'password' || 'text'">
                                    <span class="icon is-small is-left">
                                        <font-awesome-icon :icon="['fas', 'lock']"/>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <font-awesome-icon
                                            v-if="!checkListObject.password && checkListObject.password !== null"
                                            class="has-text-danger" :icon="['fas', 'times']"/>
                                        <font-awesome-icon v-if="checkListObject.password" class="has-text-success"
                                                           :icon="['fas', 'check']"/>
                                    </span>

                                    <div id="icons">
                                        <font-awesome-icon class="has-text-grey-dark" v-if="!toggle"
                                                           v-on:click="toggle = !toggle;" :icon="['far', 'eye']"/>
                                        <font-awesome-icon v-if="toggle" v-on:click="toggle = !toggle;"
                                                           :icon="['far', 'eye-slash']"/>
                                    </div>

                                </div>
                                <p v-if="!checkListObject.password && checkListObject.password !== null"
                                   class="help is-danger">Veuillez entrer un mot de passe contenant au moins 8
                                    caractères, une majuscule, une minuscule et un chiffre.</p>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input v-on:click="checkCheckBox" id="checkBox" type="checkbox">
                                        J'accepte les
                                        <router-link to="/cgu/user/">conditions générales d'utilisation</router-link>
                                        .</label>
                                </div>
                                <p v-if="!checkListObject.checkbox && checkListObject.checkbox !== null"
                                   class="help is-danger">Vous ne pouvez pas vous inscrire
                                    sans
                                    accepter les conditions générales d'utilisation.</p>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button v-bind:title="this.failed && 'Tous les champs ne sont pas remplis'"
                                            id="sendButton" disabled class="button is-link">Inscription
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
    name: "Register",
    data() {
        const registerFunction = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"user": this.data})
            };
            const request = await fetch("https://linfo1212serverm.herokuapp.com" + "/user/register/", requestOptions);
            if (request.status === 201) {
                await this.$router.push("/user/login/")
            } else if (request.status === 400) {
                this.checkListObject.email = false
            } else {
                this.internalServerError = true
            }
        }

        return {
            data: {
                name: "",
                firstname: "",
                email: "",
                phone: "",
                password: "",
            },
            register: registerFunction,
            failed: true,
            internalServerError: false,
            checkListObject: {
                hasCheckedOnce: null,
                checkbox: null,
                phone: null,
                email: true,
                emailSyntax: null,
                name: null,
                firstname: null,
                password: null
            },
            toggle: false
        }
    },
    methods: {
        checkPhone: function () {
            const regex = /[0][4][0-9]{2}(?:[-\s.]?[0-9]{2}){3}$/
            this.checkListObject.phone = regex.test(this.data.phone)
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
        checkEmail: function () {
            this.checkListObject.email = true;
            const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
            this.checkListObject.emailSyntax = regex.test(this.data.email)
            this.checkList()
        },
        checkPassword: function () {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            this.checkListObject.password = regex.test(this.data.password)
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

#icons {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-200%, -45%);
}

#icons:active {
    color: #242424 !important;
}
</style>
