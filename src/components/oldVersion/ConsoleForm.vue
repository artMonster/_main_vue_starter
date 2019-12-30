<template>
    <div class="console">
        <div class="card">
            <div class="card-header bg-danger">
                <form @submit.prevent="createCommand" class="form-inline">
                    <div class="col-md-3">
                        <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
                        <select id="inputState" class="form-control w-100" v-model="type">
                            <option selected>Choose type...</option>
                            <option value="am">new Message</option>
                            <option value="amr">new Message in Room</option>
                            <option value="ap">player to Room</option>
                            <option value="ar">mew Room</option>
                            <option value="as">mext Step</option>
                        </select>
                    </div>
                    <div class="col-md-5">
                        <input @keyup="consoleKey"
                            type="text"
                            name="command"
                            class="form-control w-100"
                            :placeholder="consoleCommand.type === '' ? 'Enter command ...' : '<= Choose type before command!'">
                        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-outline-light upp" type="submit" name="action" >Submit to console</button>
                        <button @click.prevent="logOut" class="btn btn-outline-light upp" type="button" name="action" >LogOut</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
</template>

<script>
import fb from '@/firebase/init';

export default {
    name: 'ConsoleForm',
    props: ["consoleCommand" ,"curentRoom", "state"],
    data() {
        return {
            name: '//',
            resp: null,
            errorText: null,
            message: null,
            type: null,
        }
    },
    methods: {
        consoleKey (e) {
            this.message =  e.target.value
        },
        logOut () {
            this.$emit("res", {logout: localStorage.playername})
            localStorage.clear()
            this.$router.push({name: 'Login'})
        },
        createCommand (e) {
            //console.log(e)
            //console.log(this)
            if (this.message) {
            } else {
                console.log("Invalid command: " + this.message)
            }

            if (this.type) {
            
            } else {
                console.log("Invalid command: " + this.type)
            }

            if (this.state.playername) {
            } else {
                console.log("Invalid command: " + this.state.playername)
            }
            if (this.curentRoom) {
            } else {
                console.log("Invalid command: " + this.curentRoom)
            }

            switch(this.type) {
                case "ap": { // ap = Add Player to room
                    console.log("Add Player to room: " + this.message)
                    break
                }
                case "ar": { // ar = Add new Room (in: true)
                    console.log("Add new Room: " + this.message)
                    this.ar()
                    break
                }
                case "as": { // as = Add next Step (in:)
                    console.log("Add next Step: " + this.message)
                    this.as()
                    break
                }
                case "am": { // am = Add new Message (in:)
                    console.log("Add new Message: " + this.message)
                    this.am()
                    break
                }
                case "amr": { // arm = Add new Message in Room  (in:)
                    console.log("Add new Message: " + this.message)
                    this.amr()
                    break
                }
                default: {
                    this.$emit("res", {message: this.message, type: this.type})
                    console.log("Message: " + this.message + " type: " + this.type)
                    break
                }
            }
        },
        am () {
            if (this.message) {
                fb.collection('messages').add({
                    message: this.message,
                    playername: this.state.playername,
                    timestamp: Date.now()
                }).then( call => {
                    let resp = {
                        id: call.id,
                        path: call.path,
                        message: this.message,
                        playername: this.state.playername,
                    }
                    this.$emit("res", resp)
                    //console.log(call);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                this.errorText = "A message must be entered first!";
            }
        },
        amr () {
            if (this.curentRoom && this.message) { 
                fb.collection('rooms').doc(this.curentRoom).collection('messages').add({
                    message: this.message,
                    playername: this.state.playername,
                    timestamp: Date.now()
                }).then( call => {
                    this.$emit("res", call)
                    //console.log(call);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                this.errorText = "A message must be entered first!";
            }
        },
        ar () {
            if (this.message) {
                fb.collection('rooms').add({
                    isopen: true,
                    timestamp: Date.now(),
                }).then( call => {
                    this.$emit("res", call)
                    //console.log(call)
                    //this.resp = call.id
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.errorText = "A message must be entered first!"
            }
        },
        /*
        as () {
            if (this.consoleCommand.command) {
                fb.collection('messages').add({
                    type: "//",
                    message: this.message,
                    playername: this.consoleCommand.data.playername,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                });
                this.command = null
                this.errorText = null
            } else {
                this.errorText = "A message must be entered first!"
            }
        },
        */
        
        apr () {
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

