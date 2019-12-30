<template>
    <div class="board">
        <form @submit.prevent="createStep" class="pt-4">
            <div class="form-group">
                <dl class="row align-items-center justify-content-center text-center m-0">
                    <dd v-for="(state, index) of boardState" :key="index" class="col-4 text-center py-4">
                        <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" :id="index+1" name="radio" :value="index+1" v-model="stepValue">
                            <label class="custom-control-label" :for="index+1"></label>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="form-group text-center">
                <button class="btn btn-primary btn-lg btn-block upp" type="submit" name="action">Add Step</button>
            </div>
        </form>
    </div>
</template>

<script>
import fb from '@/firebase/init';
import moment from 'moment'

export default {
    name: 'Board',
    props: ['boardState'],
    data() {
        return {
            list: [],
            stepValue: 0,
            errorText: null
        }
    },
    created() {
        let list = []
        fb.collection("messages").onSnapshot( querySnapshot => {            
            querySnapshot.forEach(doc => {
                list.push( { id: doc.id, name: doc.data().name } )
            })
            this.list = list
        })
        
    },
    updated() {
        
    },
    methods: {
        createStep () {
            let obj = {
                type: "as",
                command: this.stepValue
            }
            this.$emit("stepInBoard", obj)
        }
    }
}
</script>

