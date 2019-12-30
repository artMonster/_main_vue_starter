<template>
    <div class="mf">
        <form @submit.prevent="createMessage">
            <div class="row align-items-center w-100">
                <div class="col">
                    <input type="text" name="message" class="form-control w-100" placeholder="Enter message ..." v-model="newmess">
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary btn-block" type="submit" name="action">Submit</button>
                </div>
            </div>
            <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            
        </form>
    </div>
</template>

<script>

export default {
    name: 'MessagesForm',
    data() {
        return {
            newmess: null,
            errorText: null
        }
    },
    methods: {
        createMessage (e) {
            //console.log(e)
            let obj = {
                type: "am",
                command: this.newmess
            }
            this.$emit("textMessage", obj)
            this.newmess = null
            this.errorText = null
        }
        /*
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
        */
    }    
}
</script>

