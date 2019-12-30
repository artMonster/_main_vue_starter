<template>
    <div class="container">
        <div class="messages">
            <h1> TITLE </h1>
            <messagesForm />
        </div>
    </div>
</template>

<script>
import messagesForm from '@/components/MessagesForm'; 
import fb from '@/firebase/init';
import moment from 'moment';

const getdategame = Date.now()

export default {
    name: 'Chat',
    props: ['gameid', 'name', 'playerid'],
    components: {
        messagesForm
    },
    data() {
        return {
            messages: [],
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
