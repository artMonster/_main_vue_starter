<template>
    <div class="container">
        <div class="card login">
            <div class="card-body">
                <h2 class="card-title text-center">Login</h2>
                <form @submit.prevent="login" class="text-center" >
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Please enter your name ..." name="name" v-model="playername">
                        <p v-if="errorText" class="text-danger">{{ errorText }}</p>
                    </div>
                    <button type="submit" class="btn btn-primary" >Enter Chat</button>
                </form>
            </div>
        </div>
    </div>
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
                this.ap()
            } else {
                this.errorText = "Please enter a name first!"
            }
        },
        ap() {
            fb.collection('freeplayers').add({
                    playername: this.playername,
                    timestamp: Date.now()
                }).then( call => {
                    console.log("login.ap" + call)
                    localStorage.playername = this.playername
                    localStorage.playerid = call.id
                    this.$router.push({name: 'game', params: {playername: this.playername, playerid: call.id }})
                }).catch(err => {
                    console.log("login.ap" + err)
                })
        }
    }
}
</script>

<style>
.login{
    max-width: 450px;
    margin-top: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>
