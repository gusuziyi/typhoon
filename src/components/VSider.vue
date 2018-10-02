<template>
	<Menu :active-name="activeCard" theme="light" ref='side_menu' width="auto" :open-names="isMenu" accordion @on-open-change='tapMenu'
	    @on-select='tapMenu'>
		<router-link to='/typhoon'>
			<MenuItem name="3">
			<Icon type="ios-analytics" /> 台风实时路径
			</MenuItem>
		</router-link>
		<router-link to='/fontChina'>
			<MenuItem name="4">
			<Icon type="ios-bonfire" /> 字符点亮中国
			</MenuItem>
		</router-link>
		<router-link to='/fractal'>
			<MenuItem name="5">
			<Icon type="logo-codepen" /> 分形逃逸算法
			</MenuItem>
		</router-link>
	</Menu>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import * as Public from '@/public/public'
	export default {
		name: 'VSider',
		data() {
			return {
				isMenu: []
			}
		},
		computed: {
			...mapState([
				'activeCard',
				'activeMenu',
				'clickCard'
			])
		},
		watch: {
			clickCard(val) {
				let openMenuArr=[3,4,5]
				let openMenu=[ '台风实时路径', '字符点亮中国','分形逃逸算法']
				let openNum=Public.switchTrans(openMenu,openMenuArr,this.activeMenu)
				this.isMenu = []
				this.isMenu.push(openNum+'') //格式必须为['1']
				this.$nextTick(() => {
					this.$refs.side_menu.updateOpened()
				})
				// console.log(this.activeMenu,this.activeCard,'clickCard');
			}
		},
		methods: {
			tapCard(menuName, cardName) {
				this.setActiveCard({
					menuName,
					cardName
				})
			},
			tapMenu(menuName) {
				//若是submenu,则在展开时,menuName[0]为数字,若为MenuItem,则menuName在展开为数字
				let offMenu = menuName == '' ? true : false //菜单关闭
				let isMenu = parseInt(menuName) || parseInt(menuName[0]) //是菜单项打开
				
				if (!isMenu) {
					if (offMenu) {
						this.setActiveCard({
							menuName: this.activeMenu, //设置活动菜单
							cardName: ''
						})
					}
					return
				} else {
					this.isMenu = []
					this.isMenu.push(isMenu + '') //格式必须为['1']
					this.$nextTick(() => {
						this.$refs.side_menu.updateOpened()
					})
					let menuArr = [ 3, 4,5]
					let menueStrArr = [ '台风实时路径','字符点亮中国', '分形逃逸算法']
					let activeMenu = Public.switchTrans(menuArr, menueStrArr, isMenu)
					this.setActiveCard({
						menuName: activeMenu, //设置活动菜单
						cardName: ''
					})
				}
				// console.log(this.activeCard, this.activeMenu,'tapMenu');
			},
			...mapMutations([
				'setActiveCard',
				'setActiveMenu'
			])
		}
	}
</script>
<style scoped="" lang="less">
	//去除router-link 默认蓝色 
	a,
	a.router-link-active {
		color: #515a6e;
	}
</style>
