<template>
    <div>
        <p>{{  list.length }}</p>
        <ul class="list-group scrollbox2">
            <li v-for="player in list" :key="player.id" class="list-group-item">{{ player.playername }}  <span class="badge badge-info">{{ player.timestamp }}</span> <span class="badge badge-secondary"> {{ player.id }} </span></li>
        </ul>
    </div>
</template>

<script>
import fb from '@/firebase/init';
import moment from 'moment'

export default {
    name: 'PlayersList',
    props: ['curentRoom'],
    data() {
        return { 
            list: [],
            errorText: null
        }
    },
    created() {
        console.log(this.list)
        fb.collection("freeplayers")
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach( change => {
                if (change.type === "added") {
                    this.list.push({ id: change.doc.id, playername: change.doc.data().playername, timestamp: change.doc.data().timestamp })
                    console.log(this)
                    //list.push( )
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data())
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data())
                }
            })
            //this.list = list
            
        })
    }
    /*
    created: function () {
        let me = this
        fb.collection("freeplayers")
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach( change => {
                if (change.type === "added") {
                    me.list.push({ id: change.doc.id, playername: change.doc.data().playername, timestamp: change.doc.data().timestamp })
                    console.log(me)
                    //list.push( )
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data())
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data())
                }
            })
            //this.list = list
            
        })
        
        console.log(this)
        this.state = {
            playername: this.playername,
            playerid: this.playerid,
        }
        

    },*/


    /*
    created() {
        if (this.curentRoom) {
            fb.collection("rooms").doc(this.curentRoom).collection("freeplayers").onSnapshot( querySnapshot => {
                    
                    let list = []
                    
                    querySnapshot.forEach(doc => {
                        list.push( { id: doc.id, playername: doc.data().playername, timestamp: doc.data().timestamp } )
                    })

                    this.list = list
                }) 
        }
        fb.collection("freeplayers").onSnapshot( querySnapshot => {
                    
                    let list = []
                    
                    querySnapshot.forEach(doc => {
                        list.push( { id: doc.id, playername: doc.data().playername, timestamp: doc.data().timestamp } )
                    })

                    this.list = list
                })  
    },*/
}
</script>

