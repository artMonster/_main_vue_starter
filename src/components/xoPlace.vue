<template>
	<div class="container vh-100">
		<div class="row vh-100 align-items-center justify-content-center text-center">
			<!-- 
			<div class="col-12">				
				<div>
					<p v-for="(posts, index) of posts" :key="index"> {{ posts.title }}</p>
				</div>
			</div> -->
			<div class="col-3">				
				<div style="max-height: 140px; height: 140px; overflow: auto; width: 100%;">
					<h3>[ x ]</h3>
					<p v-for="(playerx, index) of playerx" :key="index">{{ playerx }}</p>
				</div>
			</div>
			<div class="col-6 text-center">
				<div class="mb-4">
					<h1>{{ title }}</h1>
					<h2>Room [ {{ room }} ]</h2>
					<p><strong>User: </strong>[ {{ curentuser }} ]</p>
					<p><span class="badge badge-light"><strong>Step: </strong> {{ step }} </span></p>
				</div>
				<form id="form" class="was-validated" @submit="checkForm" method="post" novalidate="false">
					<fieldset>
						<dl class="row no-gutters text-info mb-0">
							<dt class="col text-muted"> x </dt>
							<dt class="col-3"> a </dt>
							<dt class="col-3"> b </dt>
							<dt class="col-3"> c </dt>
							<dt class="col text-muted"> o </dt>
						</dl>
						<dl class="row align-items-center no-gutters mb-0">
							<dt class="col text-info"> 1 </dt>
							<dd class="col-3 border-right border-bottom py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input r1 c1 u1" id="ox1" name="radio" value="1" required>
									<label class="custom-control-label" for="ox1"></label>
								</div>
							</dd>
							<dd class="col-3 border-bottom py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input r1 c2" id="ox2" name="radio" value="2" required>
									<label class="custom-control-label" for="ox2"></label>
								</div>
							</dd>
							<dd class="col-3 border-left border-bottom py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input r1 c3 u2" id="ox3" name="radio" value="3" required>
									<label class="custom-control-label" for="ox3"></label>
								</div>
							</dd>
							<dt class="col text-info"> 1 </dt>
						</dl>
						<dl class="row align-items-center no-gutters mb-0">
							<dt class="col text-info"> 2 </dt>
							<dd class="col-3 border-right py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input c1 r2" id="ox4" name="radio" value="4" required>
									<label class="custom-control-label" for="ox4"></label>
								</div>
							</dd>
							<dd class="col-3 py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input c2 r2 u1 u2" id="ox5" name="radio" value="5" required>
									<label class="custom-control-label" for="ox5"></label>
								</div>
							</dd>
							<dd class="col-3 border-left py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input c3 r2" id="ox6" name="radio" value="6" required>
									<label class="custom-control-label" for="ox6"></label>
								</div>
							</dd>
							<dt class="col text-info"> 2 </dt>
						</dl>
						<dl class="row align-items-center no-gutters mb-0">
							<dt class="col text-info"> 3 </dt>
							<dd class="col-3 border-right border-top py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input c1 r3 u2" id="ox7" name="radio" value="7" required>
									<label class="custom-control-label" for="ox7"></label>
								</div>
							</dd>
							<dd class="col-3 border-top py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input c2 r3" id="ox8" name="radio" value="8" required>
									<label class="custom-control-label" for="ox8"></label>
								</div>
							</dd>
							<dd class="col-3 border-left border-top py-4">
								<div class="custom-control custom-radio">
									<input type="radio" class="custom-control-input c3 r3 u1" id="ox9" name="radio" value="9" required>
									<label class="custom-control-label" for="ox9"></label>
								</div>
							</dd>
							<dt class="col text-info"> 3 </dt>
						</dl>
						<dl class="row align-items-center no-gutters text-info mb-0">
							<dt class="col text-muted"> o </dt>
							<dt class="col-3"> a </dt>
							<dt class="col-3"> b </dt>
							<dt class="col-3"> c </dt>
							<dt class="col text-muted"> x </dt>
						</dl>
					</fieldset>
					<div class="text-center p-5">
						<button type="submit" class="btn btn-outline-info btn-lg btn-block">MOVE [ {{ curentuser }} ]</button>
					</div>
				</form>
			</div>
			
			<div class="col-3">				
				<div style="max-height: 140px; height: 140px; overflow: auto; width: 100%;">
					<h3>{{ name }}[ o ]</h3>
					<p v-for="(playero, index) of playero" :key="index">{{ playero }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import fb from '@/firebase/init';
	
	const getdategame = Date.now()
		
	export default {
		name: 'xoPlace',
		props: ['name'],
		data() {
			return {			
            	newMessage: null,
            	errorText: null,
				title: '',
				room: getdategame,
				playero: {
					name: 'Viltaliy',
					points: [],
				},
				playerx: {
					name: 'Math.random()',
					points: [],
				},
				curentuser: 'x',
				step: 1,
			}
		},
		computed: {
			total: function(e) {
				// --
			} 
		},
		methods: {

			checkForm: function(e) {
				
				e.preventDefault()
				
				let value = +e.target.radio.value

				if (value) {

					let ln = this.step

					this.curentuser = 'o'

					if (!(ln === 1 || ln === 3 || ln === 5 || ln === 7 || ln === 9 || ln === 11)) {

						this.curentuser = 'x'
						this.playero.points.push(value)

					} else {

						this.curentuser = 'o'
						this.playerx.points.push(value)
						
					}

					fb.collection('messages').add({
                    	message: value,
						name: this.name,
						player: this.curentuser,
                    	timestamp: Date.now()
					}).catch(err => {
						console.log(err);
					});

					e.target.radio[value - 1].disabled = true
					e.target.radio[value - 1].checked = false
					e.target.radio[value - 1].title = this.curentuser

					this.step++

				} else {

					alert('make a choice')
					this.errorText = "A message must be entered first!";

				}
				
				return false
			},
		},
	};

</script>