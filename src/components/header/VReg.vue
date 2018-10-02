<template>
	<Modal v-model="modalReg" width="600px" class='modal'>
		<p slot="header" class="header">
			<Icon type="ios-information-circle"></Icon>
			<span>请输入注册信息</span>
		</p>
		<div class="content">
			<img src="@/assets/logo.png" />
			<Form class="form" ref="formInline" :model="userInput" :rules="ruleLine">
				<FormItem prop="username">
					<Input class="content-input" prefix="ios-contact" placeholder="请输入姓名" clearable v-model='userInput.username' />
				</FormItem>
				<FormItem prop="userpass">
					<Input class="content-input" prefix="ios-arrow-down" placeholder="请输入密码" clearable v-model='userInput.userpass' type="password"
					/>
				</FormItem>
				<FormItem prop="userpass2">
					<Input class="content-input" prefix="ios-arrow-down" placeholder="请输入密码" clearable v-model='userInput.userpass2' type="password"
					/>
				</FormItem>
				<FormItem prop="email">
					<Input class="content-input" prefix="ios-arrow-down" placeholder="请输入密码" clearable v-model='userInput.email' type="email"
					/>
				</FormItem>
			</Form>
		</div>
		<div slot="footer" class="footer">
			<Button type="success" size="large" long :loading="modal_loading" @click="reg">{{regText}}</Button>
		</div>
	</Modal>
</template>
<script>
	import ruleLine from './ruleLine.js'
	export default {
		name: 'VReg',
		data() {
			const validatePassCheck = (rule, value, callback) => {
				if (value !== this.userInput.userpass) {
					callback(new Error('两次密码输入应当相同'));
				} else {
					callback();
				}
			};
			return {
				modal_loading: false,
				userInput: {},
				ruleLine: {
					userpass2: [{
							required: true,
							message: '请重复输入密码',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 4,
							message: '密码至少为四位',
							trigger: 'blur'
						}, {
							validator: validatePassCheck,
							trigger: 'blur'
						}
					],
				}
			}
		},
		created() {
			this.ruleLine = Object.assign(this.ruleLine, ruleLine)
		},
		computed: {
			modalReg: {
				get() {
					return this.$store.state.modalReg
				},
				set(value) {
					this.$store.commit('processHeader', 2)
				}
			},
			regText() {
				return this.modal_loading ? "注册中,请等待..." : "点击注册"
			}

		},
		methods: {
			reg() {
				this.modal_loading = true
				setTimeout(() => {
					this.$Message.success({
						content:`用户${this.userInput.username}注册成功`
					})
					this.modal_loading = false
					this.modalReg=false
				}, 1000)
			}
		}
	}
</script>
<style scoped="" lang="less">
	.header {
		color: green;
		text-align: center;
		font-size: 18px;
	}

	.content {
		display: flex;
		align-items: center;
		margin: auto 20px;
		img {
			flex: 0 1 auto;
			width: 100px;
			margin-right: 10px;
		}
		.form {
			flex: 4 1 auto;
		}
	}

	.footer {
		height: 50px;
		display: flex;
		align-items: center;
		button {
			height: 40px;
		}
	}
</style>
<style lang="less">
	.modal {
		.ivu-modal-header {
			margin-bottom: -10px;
			border-bottom: none;
		}
		.ivu-modal-footer {
			border-top: none;
			margin-top: -10px;
		}
	}

	.content-input {
		margin: 0px 5px;
		.ivu-input {
			height: 40px;
		}
		.ivu-input-prefix {
			i {
				line-height: 40px;
			}
		}
	}
</style>
