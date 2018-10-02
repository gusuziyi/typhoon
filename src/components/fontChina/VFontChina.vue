<template>
	<div class="echarts">
		<Button type="primary" @click.native='refresh' class="btn" size='large'>
			<span>点击刷新</span>
		</Button>
		<div class='chart' ref="myEchart"></div>
	</div>
</template>
<script>
	import echarts from 'echarts'
	require('echarts-wordcloud')
	import chartInit from './chartInit.js'
	import chinaTag from './chinaTag.js'
	
	export default {
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.chart = echarts.init(this.$refs.myEchart)
			window.onresize = this.chart.size
			this.chart.setOption(chartInit)
			this.refresh()
			let myEvent = new Event('resize')
			window.dispatchEvent(myEvent)
		},
		methods: {
			refresh() {
				let n = 3
				let chinaTagArr = chinaTag//外部数据
				while (n--) {
					chinaTagArr = chinaTagArr.concat(chinaTagArr)
				}
				this.chart.setOption({
					series: [{
						data: chinaTagArr
					}]
				})

			},

		}

	}
</script>
<style scoped="" lang="less">
	.echarts {
		position: relative;
		.btn {
			position: absolute;
			bottom: 50px;
			right: 10%;
			z-index: 1;
		}
		.chart {
			width: 100%;
			height: 420px;
			padding: 5px;
		}
	}
</style>
