<template>
    <ul class="list-group scrollbox2" v-chat-scroll="{always: true, smooth: true}">
        <li v-for="player in list" :key="player.id" class="list-group-item">{{ player.playername }}  <span class="badge badge-info">{{ player.timestamp }}</span> <span class="badge badge-secondary"> {{ player.id }} </span></li>
    </ul>
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
        fb.collection("freeplayers").onSnapshot( querySnapshot => {
                    
                    let list = []
                    
                    querySnapshot.forEach(doc => {
                        list.push( { id: doc.id, playername: doc.data().playername, timestamp: doc.data().timestamp } )
                    })

                    this.list = list
                })  
    },
    update() {       
    if (this.curentRoom) {
                console.log(this)
                fb.collection('rooms').doc(this.curentRoom).collection('freeplayers').onSnapshot( querySnapshot => {
                    
                    let list = []
                    
                    querySnapshot.forEach(doc => {
                        list.push( { id: doc.id, playername: doc.data().playername, timestamp: doc.data().timestamp } )
                    })

                    this.list = list
                })

            } else {
            
                fb.collection("freeplayers").onSnapshot( querySnapshot => {
                    
                    let list = []
                    
                    querySnapshot.forEach(doc => {
                        list.push( { id: doc.id, playername: doc.data().playername, timestamp: doc.data().timestamp } )
                    })

                    this.list = list
                })  

            }
    }
}
</script>

