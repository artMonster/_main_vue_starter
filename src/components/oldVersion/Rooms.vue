<template>
        <ul class="list-group">
            <li v-for="room in list" :key="room.id" class="list-group-item">
                <div class="input-group">
                    <input type="text" class="form-control" :value="room.id">
                    <div class="input-group-prepend">
                        <div class="input-group-text bg-success text-white">
                            <span>{{ room.isopen }}</span>
                        </div>
                        <div class="input-group-text">
                            <input type="radio" name="radio" v-model="joinRoomId" :value="room.id">
                        </div>
                        <div class="">
                            <button :disabled="joinRoomId !== room.id" @click.prevent="joinRoom" class="form-control btn btn-primary" type="button" name="action">Join</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
</template>

<script>
import fb from '@/firebase/init';
import moment from 'moment'

export default {
    name: 'Rooms',
    data() {
        return {
            list: [],
            errorText: null,
            joinRoomId: null,
        }
    },
    created() {
        fb.collection("rooms").onSnapshot( querySnapshot => {
            
            let list = []
            
            querySnapshot.forEach(doc => {
                list.push( { id: doc.id, isopen: doc.data().isopen} )
            })
            this.list = list
        })
    },
    methods: {
        joinRoom () {
            this.$emit("joinRoom", this.joinRoomId)
        },
    }
}
</script>

