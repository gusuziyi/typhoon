<template>
	<Modal v-model="modalLogin" width="500px" class='modal'>
		<p slot="header" class="header">
			<Icon type="ios-information-circle"></Icon>
			<span>请输入登录信息</span>
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
			</Form>
		</div>
		<div slot="footer" class="footer">
			<Button type="success" size="large" long :loading="modal_loading" @click="login">{{loginText}}</Button>
		</div>
	</Modal>
</template>
<script>
	import ruleLine from './ruleLine.js'
	import {mapActions} from 'vuex'
	export default {
		name: 'VLogin',
		data() {
			return {
				modal_loading: false,
				userInput: {},
			}
		},
		created() {
			this.ruleLine = ruleLine
		},
		computed: {
			modalLogin: {
				get() {
					return this.$store.state.modalLogin
				},
				set(value) {
					this.$store.commit('processHeader', 1)
				}
			},
			loginText() {
				return this.modal_loading ? "登陆中,请等待..." : "点击登录"
			}

		},
		methods: {
			login() {
				this.modal_loading = true
				setTimeout(() => {
					this.setLoginUser(this.userInput.username)
					this.$Message.success({
						content:`欢迎回来,${this.userInput.username}`,
						duration: 2
					})
					this.modal_loading = false
					this.modalLogin=false
				}, 1000)
			},
			...mapActions([
				'setLoginUser'
			])
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
	.modal{
		.ivu-modal-header{
			margin-bottom: 10px;
			border-bottom: none;
		}
		.ivu-modal-footer{
			border-top: none;
			margin-top: -10px;
		}
	}
	.content-input {
		margin: 10px auto;
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
