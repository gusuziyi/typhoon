<template>
	<Modal v-model="modalAbout" width='70%'  :closable="false">
		<Timeline>
			<TimelineItem color="green" >
				<p class="item">
					九月份很火的新闻就是山竹来袭，所以花了一些时间做了这个台风预警系统,要解决的问题有三个:
				</p>
				<p class='content'>第一是地图的绘制</p>
				<p class='content'>第二是台风路径的实时跟踪与预警</p>
				<p class='content'>第三是海上低压气旋的引力模拟</p>
			</TimelineItem>
			<TimelineItem color="blue" >
				<p class="item">
					由于笔记本配置实在太渣,无法同时完成海量计算,所以我就把这三个问题抽象成了三个独立的程序<br/>然后用vue-router和vuex连接起来,就成了一个单页面程序,这三个独立的程序分别是:
				</p>
				<p class='content'>字符点亮中国</p>
				<p class='content'>台风预警系统</p>
				<p class='content'>黑洞引力模拟器</p>
			</TimelineItem>
			<TimelineItem color="red">
				<p class="item">
					技术栈 : vue2 + vuex + vue-router + iview + webpack + async/await + canvas + less+ flex +echarts
				</p>
				</TimelineItem>
			<TimelineItem color="yellow" class="item">历时十八天,最终完成</TimelineItem>
		</Timeline>
	</Modal>
</template>
<script>
	export default {
		computed: {
			modalAbout: {
				get() {
					return this.$store.state.modalAbout
				},
				set(value){
					this.$store.commit('processHeader',3)
				}
			}
		}

	}
</script>
<style scoped="" lang="less">
	.item{
		 font-size: 14px;
        font-weight: bold;
	}
	 .content{
		 margin-top: 5px;
        padding-left: 5px;
		font-weight:200;
    }
</style>