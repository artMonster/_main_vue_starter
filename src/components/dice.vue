<template>
	<div class="col-2 text-center">
		<div class="my-5">
			<h1>{{ id }}</h1>
			<h3>{{ num }}</h3>
		</div>
	</div>
</template>


<script>
	export default {
		name: 'dice',
		props: ['id', 'num'],
		data() {
			return {
			}
		},
		methods: {
			reload: function() {
				this.id = (Math.random()*6 + 1<<0)
			}
		}  
	}	
</script>