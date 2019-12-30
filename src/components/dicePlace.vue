<template>
	<div class="container vh-100">
		<div class="row vh-100 align-items-center justify-content-center text-center">
			<dice v-for="(d, index) of d" :key="d.id" :id="d.id" :num="d.num"></dice>
			<div class="col-12">
				<button v-on:click="roll" type="button" class="btn btn-outline-danger btn-lg">Update Roll</button>
			</div>
		</div>
	</div>
</template>s

<script>

import dice from './dice'

export default {
	name: 'dicePlace',
	components: { 
		dice
	},
	data() {
		return {
			d: [
				{id: 1, num: 0},
				{id: 2, num: 0},
				{id: 3, num: 0},
				{id: 4, num: 0},
				{id: 5, num: 0},
			],
		}
	},
	methods: {
		roll: function() {
			return this.d = [
				{id: 1, num: (Math.random()*6 + 1<<0)},
				{id: 2, num: (Math.random()*6 + 1<<0)},
				{id: 3, num: (Math.random()*6 + 1<<0)},
				{id: 4, num: (Math.random()*6 + 1<<0)},
				{id: 5, num: (Math.random()*6 + 1<<0)},
			]

		}
	}
};

</script>