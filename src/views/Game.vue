<template>
    <section class="mb-5">
        <ConsoleForm @res="res" :consoleCommand="consoleCommand" :curentRoom="curentRoom" :state="state" />
        <div class="container chat">
            <div class="row align-content-center justify-content-center">
                <div class="col-12 py-4">
                    <p class="text-primary text-center font-weight-light display-1"> x‧o </p>
                    <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
                    <hr class="my-4">
                    <h3 class="text-center"> {{ curentRoom ? curentRoom : null }}</h3>
                </div>
                <div class="col-10 mb-5">
                    <Rooms @joinRoom="joinRoom" />
                </div>
                <!-- 
                <div class="col-6" v-if="curentRoom">
                    <Board v-if="curentRoom" @stepInBoard="stepInBoard" :boardState="state.boardState ? state.boardState : [0,0,0,0,0,0,0,0,0]" />
                </div>
                -->
                <div class="col-6">
                    <PlayersList :curentRoom="curentRoom" />
                </div>
                <div class="col-6">
                    <Chats @textMessage="textMessage" :curentRoom="curentRoom"/>
                </div>                    
            </div>
        </div>
    </section>
</template>

<script>

import ConsoleForm from '@/components/ConsoleForm'
import PlayersList from '@/components/PlayersList'
import Rooms from '@/components/Rooms'
import Board from '@/components/Board'
import Chats from '@/components/Chats'

import fb from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'game',
    props: ['playername', 'playerid'],
    components: {
       ConsoleForm, PlayersList, Rooms, Board, Chats
    },
    data() {
        return {
            mess: [],
            state: [],
            consoleCommand: [],
            curentRoom: false,
            toastCount: 0,
        }
    },
    created: function () {
        this.state = {
            playername: this.playername,
            playerid: this.playerid,
        }

    },
    updated() {

    },
    methods: {
        textMessage(message) {
            let obj = {
                type: "am",
                message: message,
                playername: this.playername,
                curentRoom: this.curentRoom,
                playerid: this.playerid,
            }
            this.consoleCommand = obj
            //console.log(this)
        },
        joinRoom(id) {
            console.log(id)
            this.curentRoom = id
        },
        stepInBoard(boardObj) {
            this.consoleCommand = boardObj
        },
        res(e) {
            this.toastCount = e
            this.$bvToast.toast(`Resp: ${e.message} <br> ${e.playername} `, {
                title: e.id + ' / Message',
                autoHideDelay: 5000,
                toaster: 'b-toaster-bottom-right',
                appendToast: false,
                variant: 'danger'
            })
        }
    }
}
</script>