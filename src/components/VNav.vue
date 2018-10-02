<template>
	<Breadcrumb :style="{margin: '24px 0'}">
		<BreadcrumbItem>主页</BreadcrumbItem>
		<BreadcrumbItem>{{this.activeMenu}}</BreadcrumbItem>
		<BreadcrumbItem v-show='this.activeCard'>{{this.activeCard}}</BreadcrumbItem>
	</Breadcrumb>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		name: 'VNav',
		computed: {
			...mapState([
				'activeCard',
				'activeMenu'
			])
		}
	}
</script>