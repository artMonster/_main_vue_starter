<template>
    <div class="container">
        <div class="chat">
            <div class="card mt-5">
                
                <div class="card-body">
                    <h1>Room: {{ gameid }} </h1>
                    <p>STEP: {{ step }}</p>
                    <p>PlayerID: {{ playerid }}</p>
                    <p>CURENTUSER: {{ step }}</p>
                    <p class="text-secondary nomessages" v-if="messages.length == 0">
                        [No messages yet!]
                    </p>
                    <div class="userlist">
                        <div v-for="(userlist, index) in userlist" :key="index">
                            <span class="text-info">[ {{ index }} ]: {{ userlist }} </span>
                        </div>
                    </div>
                    <!-- 
                    <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                        <div v-for="message in messages" :key="message.id">
                            <span class="text-info">[ {{ message.curentPlayerId }} ]: </span>
                            <span>{{message.state}}</span>
                        </div>
                    </div>
                    -->
                </div>
                <div class="card-action">
                    <form @submit.prevent="createStep" class="was-validated">
                        <div class="row align-content-center justify-content-center">
                            <div class="col-3 text-center">				
                                <div style="max-height: 140px; height: 140px; overflow: auto; width: 100%;">
                                    <h3>[ x ]</h3>

                                    <p>{{ userlist.length > 0 ? userlist[0].name : false }}</p>
                                   <!-- <p v-for="(playerx, index) of playerx" :key="index">{{ playerx }}</p> -->
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <dl class="row align-items-center justify-content-center text-center m-0">
                                        <dd v-for="(state, index) of state" :key="index" class="col-4 text-center py-4">
                                            <div v-if="state === 1 ">
                                                x
                                            </div>
                                            <div v-else-if="state === 2 ">
                                                o
                                            </div>
                                            <div v-else class="custom-control custom-radio">
                                                <input :disabled="state > 0 ? true : false" :data-state="state" type="radio" class="custom-control-input" :id="'ox' + index " name="radio" :value="index+1" v-model="newStep">
                                                <label class="custom-control-label" :for="'ox' + index"></label>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="form-group text-center">
                                    <button :disabled="curentPlayerId == playerid ? false : true " class="btn btn-primary btn-lg btn-block upp" type="submit" name="action">Creat Step {{ curentPlayerId }}</button>
                                </div>
                            </div>
                            <div class="col-3 text-center">				
                                <div style="max-height: 140px; height: 140px; overflow: auto; width: 100%;">
                                    <h3>[ o ] </h3>
                                    <p>{{ userlist.length > 1 ? userlist[1].name : false  }}</p>
                                    <!-- <p v-for="(playero, index) of playero" :key="index">{{ playero }}</p> -->
                                </div> 
                            </div>
                        </div>
                        <div class="form-group">
                            <!-- <input type="text" name="message" class="form-control" placeholder="Enter message ..."> -->
                            <p class="text-danger" v-if="errorText">{{ errorText }}</p>
                        </div>
                    </form>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import CreateMessage from '@/components/CreateMessage'; 
import fb from '@/firebase/init';
import moment from 'moment';

const getdategame = Date.now()

export default {
    name: 'Chat',
    props: ['gameid', 'name', 'playerid'],
    components: {
    //    CreateMessage
    },
    data() {
        return {
            oName: false,
            xName: false,
            userlist: [],
            curentPlayerId: 1,
            step: 0,
            state: [0,0,0,0,0,0,0,0,0],
            players: [],
            newStep: null,
            errorText: null,
            messages: [],
            room: 0,
            radio: '',
            db: [],
        }
    },
    created() {
        //fb.collection('rooms').doc(this.gameid).onSnapshot( doc => { this.userlist.push(doc.data().paleyers) })
    },
    mounted() {
    },     
    computed: {
        
        
        /*
        addP (playerid) {
            fb.collection('rooms').doc(this.gameid).collection('mess').add({
                status: 'userlist',
                name: this.name,
                playerid: playerid,
                timestamp: Date.now()
            }).then( call => {
                console.log(call)
            }).catch(err => {
                console.log(err)
            })
        },
        */
    },
    methods: {

        addPl (playerid) {
            console.log(playerid)
            /*
            fb.collection('rooms').doc(this.gameid).collection('mess').add({
                status: 'userlist',
                name: this.name,
                playerid: playerid,
                timestamp: Date.now()
            }).then( call => {
                console.log(call)
            }).catch(err => {
                console.log(err)
            })
            */

        },
        
        createStep () {

            console.log(this.curentPlayerId)

            this.state[this.newStep - 1] = this.curentPlayerId
            
            let db = fb.collection('rooms').doc(this.gameid).collection('steps').add({
                step: this.step,
                playerid: this.playerid,
                state: this.state,
                timestamp: Date.now()
            }).then(function() {
                console.log("Game STEP!!")
            }).catch(err => {
                console.log(err)
            })
            
        },
        createMessage (e) {
            
            let value = +e.target.radio.value

            if (value) {

                let ln = this.step
                
                if (!(ln === 1 || ln === 3 || ln === 5 || ln === 7 || ln === 9 || ln === 11)) {
                    this.curentuser = 1
                } else {
                    this.curentuser = 2
                }
                
                this.state[value - 1] = this.curentuser

                fb.collection('messages').add({
                    state: this.state,
                    message: value,
                    name: this.name,
                    player: this.curentuser,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err);
                });

                //e.target.radio[value - 1].disabled = true
                //e.target.radio[value - 1].checked = false
                //e.target.radio[value - 1].title = this.curentuser

                this.step++
                
                this.newStep = null;
                this.errorText = null;

            } else {

                this.errorText = "A message must be entered first!";

            }
        }
    }
        //console.log(this.addPl(1))

        
/*
        let mess = fb.collection('rooms').doc(this.gameid).collection('mess')
            mess.add({
                status: 'userlist',
                name: this.name,
                playerid: this.userlist.length,
                timestamp: Date.now()
            }).then( call => {
                console.log(call)
            }).catch(err => {
                console.log(err)
            })
*/
        //console.log('0')
       // console.log(this.userlist)
    
/*
        //this.room = this.game
        console.log(this.playerid)
        console.log(this.gameid)

        let mess = fb.collection('rooms').doc(this.gameid).collection('mess')
            mess.add({
                status: 'userlist',
                name: this.name,
                playerid: this.playerid,
                timestamp: Date.now()
            }).then( call => {
                console.log(call)
            }).catch(err => {
                console.log(err)
            })

            mess.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type = 'added') {
                        let doc = change.doc
                        if (doc.data().status === 'userlist') {
                            this.userlist.push({
                                id: doc.id,
                                name: doc.data().name,
                                })
                        }
                    }
                })
            })
        //console.log(this.curentPlayerId)
        /*
        let r = fb.collection('openrooms').orderBy('ts')
        r.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (Object.keys(change.doc.data().players).length === 1) {
                    this.room = change.doc.id
                    //this.players.push(change.doc.data().players.x)
                    fb.collection("rooms").doc("WAcNMrtGknk5ZVi0BNgs").set({
                        players: {
                            o: this.name
                        }
                    })
                    fb.collection('rooms').doc('WAcNMrtGknk5ZVi0BNgs').onSnapshot( function(snapshot) {
                        console.log(snapshot)
                    })
                    //this.players.push(this.name)
                }
                if (change.type = 'added') {
                    //this.messages.push({
                    //let doc = change.doc
                    //if (doc.data().players.length < 2) {
                        
                    //}
                    //console.log( Object.keys(doc.data().players).length )
                    //this.players[0] = doc.data().paleyers.x
                    //this.players[1] = doc.data().paleyers.o
                }
            })
        })


        let r = fb.collection('rooms').doc(this.gameid)
        r.onSnapshot(function(doc) {
            doc.docChanges().forEach(function(change) {
                console.log(change)
            })
            this.oName = doc.data().o_name
            this.xName = doc.data().x_name
        })
        */
       /* 
        var docRef = fb.collection("rooms").doc(this.gameid);

        docRef.get().then(doc => {
            if (doc.exists) {
                console.log("No such document!");
                this.xName = doc.data().x_name
                this.oName = doc.data().o_name
            } else {
                console.log("No such document!");
            }
        })

       let ref = fb.collection('rooms').doc(this.gameid).collection('steps')

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type = 'added') {
                    let doc = change.doc
                    this.state = doc.data().state
                    this.messages.push({
                        id: doc.id,
                        step: doc.data().step,
                        playerid: doc.data().playerid,
                        state: doc.data().state,
                        timestamp: moment(doc.data().timestamp).format('LTS')
                    })
                    if (this.step) {
                        console.log(this.step)
                        this.step++
                        if (this.curentPlayerId == 2) {
                            this.curentPlayerId = 1
                        } else {
                            this.curentPlayerId = 2
                        }
                    }
                }
            })
        })
        
    },*/
 
/*
        let db = fb.collection('rooms').doc(this.gameid).collection('mess').orderBy('timestamp', 'asc')
            db.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type = 'added') {
                        let doc = change.doc
                        if (doc.data().status === 'userlist') {
                            this.userlist.push({
                                id: doc.id,
                                playerid: doc.data().playerid,
                                name: doc.data().name,
                            })   
                        }
                    }
                })
                if (this.userlist.length < 2) {
                    //addPl(this.userlist.length)
                    //this.addPl(1)
                    console.log(this)
                }
            })
  */      
//    let mess = fb.collection('rooms').doc(this.gameid).collection('mess').where("status", "==", "userlist")
       

            


    
}
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 0px;
}

.chat h5{
    margin-top: 0px;
    margin-bottom: 40px;
}

.chat span{
    font-size: 1.2em;
}

.chat .time{
    display: block;
    font-size: 0.7em;
}

.messages{
    max-height: 300px;
    overflow: auto;
}
</style>
