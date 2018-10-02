<style scoped lang="less">
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}
</style>
<template>
	<div class="layout" >
		<Layout>
			<Header>
				<v-header/>
			</Header>
			<Layout>
				<Sider hide-trigger :style="{background: '#fff'}">
					<v-sider/>
				</Sider>
				<Layout :style="{padding: '0 24px 24px'}">
					<v-nav/>
					<Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
						<keep-alive>
							<router-view />
						</keep-alive>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>
<script>
	import VHeader from '@/components/VHeader'
	import VSider from '@/components/VSider'
	import VNav from '@/components/VNav'
	export default {
		name: 'App',
		components: {
			VHeader,
			VSider,
			VNav
		}
	}
</script>
