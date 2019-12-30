<template>
    <div class="container">
        <ul class="list-group">
            <!-- <li v-for="room in roomslist" :key="room.id" class="list-group-item">{{ room.name }}</li> -->
        </ul>
    </div>
</template>

<script>
import fb from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'RooomList',
    data() {
        return {
            roomslist: [],
            errorText: null
        }
    },
    created() {

        fb.collection("messages").onSnapshot( querySnapshot => {
            
            let list = []
            
            querySnapshot.forEach(doc => {
                list.push({ 
                    id: doc.id,
                    name: doc.data().name
                    })
            })
            
            this.roomslist = list
        })
    },
    methods: {
        createMessage () {
            if (this.newmess) {
                fb.collection('messages').add({
                    mess: this.newmess,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err);
                });
                this.newmess = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be entered first!";
            }
        }
    }
}
</script>

