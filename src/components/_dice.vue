<template>
	<div class="col-2 text-center">
		<div class="my-5">
			<h1>{{ id }}</h1>
			<Progress :transitionDuration="duration" :value="100">
				<div class="content h2">{{ result }}</div>
			</Progress>W
		</div>
	</div>
</template>


<script>

import {eventEmitter} from '../main'

import Progress from 'easy-circular-progress';

	export default {
		name: 'dice',
		components: { Progress },
		data() {
			return {
				result: 0,
				id: 0,
				duration: 0,
			}
		},

		//props: ['id', 'result', 'percent', 'duration'],
		
		created() {
		 	eventEmitter.$on( 'rollUpdate', (me) => {
		 		this.result = me.result
		 		console.log(me)
		 	})
		    
		  }
		  
		}	
</script>