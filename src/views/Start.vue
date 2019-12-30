<template>
    <section class="start">
        <div class="container">
            <div class="row vh-100 align-content-center justify-content-center">

            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'start',
    data () {
        return {
            playername: "",
            playerid: "",
            errorText: null
        }
    },
    created() {
        if (localStorage.playerid && localStorage.playername) {
            this.$router.push({
                name: 'game',
                params: {
                    playername: localStorage.playername,
                    playerid: localStorage.playerid
                }
            })
        }
    },
    methods: {
        login() {
            if (this.playername) {
            } else {
                this.errorText = "Please enter a name first!"
            }
        },
    }
}
</script>
