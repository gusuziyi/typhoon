<template>
	<Menu mode="horizontal" theme="dark" active-name=''>
		<router-link to='/'>
			<div class="layout-logo">
				<img src="@/assets/QQ.jpg" height="150%">
			</div>
		</router-link>
		<div class="layout-nav">
			<MenuItem v-if='loginUser' name="1"> {{loginUser}}</MenuItem>
			<MenuItem v-else name="1" @click.native='processHeader(1)'>
			<Icon type="md-contact" /> 登录
			</MenuItem>

			<MenuItem v-if='loginUser' name="2" @click.native='doLoginOut'> 退出
			</MenuItem>
			<MenuItem v-else name="2" @click.native='processHeader(2)'>
			<Icon type="ios-flower" /> 注册
			</MenuItem>
			
			<MenuItem name="3" @click.native='processHeader(3)'>
			<Icon type="ios-information-circle" /> 关于
			</MenuItem>
		</div>
		<div>
			<v-login/>
			<v-reg/>
			<v-about/>
		</div>
	</Menu>
</template>
<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import VLogin from './header/VLogin'
	import VReg from './header/VReg'
	import VAbout from './header/VAbout'
	export default {
		name: 'VHeader',
		computed: {
			...mapState([
				'loginUser'
			])
		},
		components: {
			VLogin,
			VAbout,
			VReg
		},
		methods: {
			...mapMutations([
				'processHeader'
			]),
			...mapActions([
				'loginOut'
			]),
			doLoginOut(){
				this.$Message.success({
					content:`再见,${this.loginUser}`,
					duration: 2
				})
				this.loginOut()
			}
		}
	}
</script>
<style scoped lang="less">
	.layout-logo {
		width: 100px;
		height: 30px;
		float: left;
		position: relative;
		top: 10px;
		left: 20px;
		img {
			border: 2px solid white;
			border-radius: 50%;
		}
	}

	.layout-nav {
		width: 420px;
		position: absolute;
		right: 0px;
		display: flex;
		justify-content: flex-end;
		&>li {
			height: 20px;
			margin-left: 0px;
			margin-top: 20px;
			line-height: 20px;
		}
		&>li+li {
			border-left: 1px solid #eee;
		}
	}
</style>
