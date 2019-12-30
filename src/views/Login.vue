<template>
    <section class="login">
        <div class="container">
            <div class="row vh-100 align-content-center justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class="card login">
                        <div class="card-header">
                            <h2 class="card-title text-center">Please introduce yourself</h2>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="login" class="text-center" >
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Please enter your name ..." name="name">
                                    <p v-if="errorText" class="text-danger">{{ errorText }}</p>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Start Game</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import fb from '@/firebase/init';

export default {
    name: 'login',
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
