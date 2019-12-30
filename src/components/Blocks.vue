<template>
	<div class="container-fluid" :style="{'background': mainThemeColor}">
		<div class="row justify-content-center align-item-center text-center vh-100">
			<div class="col-8">
				
			</div>
			<div class="col-6">
				<h1 class="display-1"><span :style="{'background': mainThemeColor}">{{ mainThemeColor }}</span></h1>
				<hr class="my-5">
				<button type="button" class="btn btn-outline-danger btn-block btn-lg" @click="pushButons"><span class="h1">Change color</span></button>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Vuenime from 'vuenime'
	//import store from '../store'


	export default {
		name: 'blocks',
		methods: {
			pushButons: function() {
				this.mainThemeColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
			},
		},
		data() {
			console.log(this)
			return {
				title: 'BlOcKs',
				mainThemeColor: '#000000',
			}
		},
	}	
</script>