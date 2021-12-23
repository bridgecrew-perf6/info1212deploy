<template>
    <div>
        <section class="hero is-fullheight has-background-image">
            <div class="hero-body container">
                <div class="is-center">
                    <p class="title is-1">
                        Patro Saint-Jean Berchmans de Tamines
                    </p>
                </div>
            </div>
            <font-awesome-icon onclick="window.scroll(0, window.scrollY + 400)" id="scroll" title="Faites défiler !" :icon="['fas', 'angle-double-down']"/>
        </section>
    </div>

</template>

<script>
export default {
    name: "Home",
    mounted() {
        document.title = "Patro Tamines - Accueil"
    },
}
</script>

<style scoped>
.is-fullheight{
    height: 102vh;
}
.title.is-1{
    color: white;
    text-shadow: 0 0 5px black;
    text-align: center;
}
.is-1{
    font-weight: 1000;
}
#scroll{
    position: absolute;
    bottom: 5vh;
    left: 50%;

    color: white;
    font-size: 5rem;
    animation: 0.5s ease-in-out 1s infinite zoomIn alternate;
    animation-delay: 2s;
    opacity: 0;
}
@keyframes zoomIn {
    0%{
        opacity: 1;
        transform: scale(1);
    }
    100%{
        transform: scale(1.3);
        opacity: 1;
    }
}
</style>