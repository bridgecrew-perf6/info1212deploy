<template>
    <div>
        <section class="has-background-primary full-size">
            <div class="tile is-ancestor">
                <div class="tile is-parent is-4">
                    <article class="tile is-child notification is-link">
                        <p class="title">
                            <font-awesome-icon :icon="['far', 'clock']"/>
                            Horaires
                        </p>
                        <br>
                        <br>
                        <p class="is-size-4 has-text-centered">
                            De 14h15 à 18h15<br>
                            Tous les samedis*
                        </p>
                        <br><br><br>
                        <p class=" has-text-centered">
                            *Sauf période particulière (blocus, examens, vacances, ...)
                        </p>
                    </article>
                </div>

                <div class="tile is-parent is-4">
                    <article class="tile is-child notification">
                        <p class="title">
                            <font-awesome-icon :icon="['fas', 'euro-sign']"/>
                            Coût
                        </p>

                        <br>
                        <p class="is-size-4 has-text-centered">
                            1€ par samedi pour le goûter<br>
                            20€ par an pour l'affiliation<br>
                            100€ pour le camp*
                        </p>
                        <br><br>
                        <p class=" has-text-centered">
                            *Suceptible d'évoluer
                        </p>
                    </article>
                </div>

                <div class="tile is-parent is-4">
                    <article class="tile is-child notification is-link">
                        <p class="title">
                            <font-awesome-icon :icon="['fas', 'map-marker-alt']"/>
                            Adresse
                        </p>
                        <br>
                        <br>
                        <p class="is-size-4 has-text-centered">
                            Rue Notre-Dame 26<br>
                            5060 Tamines
                        </p>
                        <br><br><br>
                    </article>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
export default {
    name: "Information"
}
</script>

<style scoped>
.bigIcon {
    font-size: 8rem;
}
</style>