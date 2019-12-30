<template>
    <div class="container" style="margin-bottom: 30px">
        
    </div>
</template>

<script>
import fb from '@/firebase/init';

const getdategame = Date.now()

export default {
    name: 'CreateMessage',
    props: ['name', 'mess'],
    data() {
        return {
            	newMessage: null,
            	errorText: null,
				title: '',
                room: getdategame,
                state: this.messages.state,
				playero: {
					name: this.name,
					points: [],
				},
				playerx: {
					name: false,
					points: [],
				},
				curentuser: 1,
				step: 1,
			}
    },
    created() {
        console.log(this.messages.length)
        if (this.messages) {
            this.state = this.messages.state
        }
    },
    methods: {
        createMessage (e) {
            let value = +e.target.radio.value

            if (value) {

                let ln = this.step
                
                if (!(ln === 1 || ln === 3 || ln === 5 || ln === 7 || ln === 9 || ln === 11)) {
                    this.curentuser = 1
                } else {
                    this.curentuser = 2
                }
                
                this.state[value - 1] =  this.curentuser

                fb.collection('messages').add({
                    message: value,
                    name: this.name,
                    player: this.curentuser,
                    state: this.state,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err);
                });

                //e.target.radio[value - 1].disabled = true
                //e.target.radio[value - 1].checked = false
                //e.target.radio[value - 1].title = this.curentuser

                this.step++
                
                this.newMessage = null;
                this.errorText = null;

            } else {

                this.errorText = "A message must be entered first!";

            }
        }
    }    
}
</script>

