<template>
    <div class="chats">
        <div class="chatlist scrollbox" v-chat-scroll="{always: true, smooth: true}">
            <div v-for="m in list" :key="m.id">
                <div v-if="m.type === '//'" class="text-right bg-light">
                    <span class="text-danger">{{ m.playername }} {{ m.message }} </span>
                </div>
                <div v-else >
                    <div class="card px-3 py-2">
                        <div class="row">
                            <div class="m-0 col">
                                <strong class="text-primary">{{ m.playername }} </strong>
                            </div>
                            <div class="col-auto">
                                <p class="badge badge-pill badge-secondary"><small>{{ m.timestamp.calendar }}</small></p>    
                            </div>
                            <div class="col-12">
                                <div class="bg-light" style="padding: .5rem .75rem">
                                    
                                    <p class="mb-0"><span class="badge badge-secondary mx-2">{{ m.timestamp.time }}</span> <small>{{m.message}}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="messageform mt-2">
            <div class="card card-footer px-3 pt-3">
                <form @submit.prevent="createMessage">
                    <div class="row align-items-center w-100">
                        <div class="col">
                            <input type="text" name="message" class="form-control w-100" placeholder="Enter message ..." v-model="message">
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary btn-block" type="submit" name="action">Submit</button>
                        </div>
                    </div>
                    <p class="text-danger" v-if="errorText">{{ errorText }}</p>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>

import fb from '@/firebase/init';
import VueChatScroll from 'vue-chat-scroll'
import moment from 'moment'



export default {
    name: 'Chats',
    props: ['curentRoom'],
    data() {
        return {
            list: [],
            message: null,
            errorText: null
        }
    },
    /*
    created() {
        console.log(this.curentRoom)

        let ref = fb.collection('messages')
        
        if (this.curentRoom) {
            ref = fb.collection('rooms').doc(this.curentRoom).collection('messages')
        }

        ref.onSnapshot( querySnapshot => {
            
            let list = []
            
            querySnapshot.forEach(doc => {
                list.push({ 
                    id: doc.id,
                    playername: doc.data().playername,
                    message: doc.data().message,
                    timestamp: {
                        time: moment(doc.data().timestamp).locale('uk').format('LTS'),
                        calendar: moment(doc.data().timestamp).locale('uk').format('LL'),
                    }
                })
            })
            this.list = list
        })
        

    },updated() {
        
        
    },
    */
    methods: {
        createMessage () {
            
            this.$emit("textMessage", this.message)

            this.message = null
            this.errorText = null
        },
    }
}
</script>

