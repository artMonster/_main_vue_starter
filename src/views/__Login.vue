<template>
    <div class="container">
        <div class="card login">
            <div class="card-body">
                <h2 class="card-title text-center">Enter your player name</h2>
                <form @submit.prevent="login" class="text-center p-4">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Please enter name ..." name="name" v-model="name">
                        <p v-if="errorText" class="text-danger">{{ errorText }}</p>
                    </div>
                    <button type="submit" class="btn btn-primary">Start</button>
                </form>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(game, index) of gameslist" :key="index">
                        <span class="px-2">{{ game.id }}</span>
                        <span class="px-2"><button @click.prevent="join" :name="game.id">join</button></span>
                    </li>
                </ul>
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
            name: '',
            playerid: false,
            gameid: false,
            gameslist: [],
            errorText: null
        }
    },
    mounted() {
        fb.collection('rooms').orderBy('ts').onSnapshot( snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.doc.data().isopen) {
                    this.gameslist.push({
                        id: change.doc.id,
                        plaeyer: change.doc.data().paleyers,
                    })
                }
            })
        })
    },
    methods: {
        join(e) {
            if (e.target.name) {
                console.log(e.target.name)
            } else {
                console.log(this)
                this.errorText = "Please enter a name first!"
            }
        },
        create() {
            fb.collection('rooms').add({
                isopen: true,
                paleyers: [this.name, false],
                ts: Date() 
            }).then( call => {
                this.gameid = call.id
            })
        },
        update() {
            let db = fb.collection('rooms').doc(this.gameid)
            db.update({
                paleyers: this.name,
            })
        },
        rout() {
            this.$router.push( {name: 'game', params: { gameid: this.gameid, name: this.name, playerid: this.playerid} } )
        },
        login() {
            if (this.name) {
                fb.collection('rooms').orderBy('ts').onSnapshot( snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if (change.doc.data().isopen) {
                            this.gameid = change.doc.id
                        }
                    })
                    
                })
                if (this.gameid) {
                        this.playerid = 2
                        this.update()
                        this.rout()
                    } else {
                        this.create()
                        this.playerid = 1
                        this.rout()
                    }
           } else {
                this.errorText = "Please enter a name first!"
            }
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

