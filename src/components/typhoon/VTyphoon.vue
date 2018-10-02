<template>
	<div class="echarts">
		<label class="date" v-if="dateFlag">当前时间: {{this.typhoonNow[0].time}}</label>
		<label class="date" v-else="">当前时间: {{date}}</label>
		<Button type="primary" size="large" @click.native="createTyphoon" class="btn">
			<span v-if="hasTyphoon">点击清除台风</span>
			<span v-else>随机生成台风</span>
		</Button>
		<div class="chart" ref="myEchart"></div>
	</div>
</template>
<script>
	import echarts from 'echarts'
	import chartInit from './chartInit.js' //初始化的option
	import queen from './queen.js' //台风算法集
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	// import 'echarts/map/js/province/guangdong.js' //同步写法
	export default {
		data() {
			return {
				hasTyphoon: false,
				chart: null,
				date: new Date().toLocaleDateString(),
				dateFlag: false
			}
		},
		computed: {
			typhoon() { //在南海或东海随机生成一个台风
				let typhoon = queen.setTyphoon()
				let desc = `${typhoon[0].strong}级${typhoon[0].strongStr}【${typhoon[0].name}】出现在${typhoon[0].seaArea}`
				let title = `消息: ${typhoon[0].name}出现!`
				this.$Notice.info({
					title,
					desc,
					duration: 7
				});
				return typhoon
			},
			computWaring() { //根据台风位置和城市位置计算预警值
				let waringMapNew = queen.computWaring(this.waringMapCur, this.typhoonNow)
				return waringMapNew

			},
			...mapState({
				typhoonNow: (state) => state.southMap.typhoonNow,
				waringMap: (state) => state.southMap.waringMap,
				waringMapCur: (state) => state.southMap.waringMapCur
			})
		},
		watch: {
			typhoonNow(val) { //台风实时监测
				let computwaringMap = this.computWaring
				let waringMapNew = computwaringMap.waringMapNew //最新预警值
				let landing = computwaringMap.landing //是否登陆
				let gameover = val[0].gameover //是否消失
				if (this.hasTyphoon) {
					this.dateFlag = true //台风出现,右上角显示日期
					if (landing) {//登陆信号由城市发出
						val[0].landing = true //设置台风登陆,触发削弱函数
						let desc =
							`${val[0].strongStr}【${val[0].name}】已登陆,登陆点为${landing.name}<br/>东经:${landing.geoCoord[0]} , 北纬:${landing.geoCoord[1]}`
						let title = `警报: ${val[0].name}已登陆!`
						this.$Notice.warning({
							title,
							desc,
							duration: 7
						});
					}
					if (gameover) {
						let desc = `台风【${val[0].name}】已削弱为无足轻重`
						let title = `警报解除: ${val[0].name}已消亡!`
						this.$Notice.info({
							title,
							desc,
						});
						this.cleanTyphoon()
						this.hasTyphoon = false
					} else {
						this.chart.setOption({
							series: [{
								name: 'typhoon',
								data: val
							}, {
								name: '预警等级',
								data: waringMapNew
							}]
						})
					}

					if (val[0].ifStronger == '增强') {
						let desc = `【${val[0].name}】已增强为${val[0].strong}级${val[0].strongStr}`
						let title = `警报: ${val[0].name}已增强!`
						this.$Notice.warning({
							title,
							desc
						});
					} else if (val[0].ifStronger == '削弱') {
						let desc = `【${val[0].name}】已削弱为${val[0].strong}级${val[0].strongStr}`
						let title = `喜讯: ${val[0].name}已削弱!`
						this.$Notice.success({
							title,
							desc
						});
					}
				}
			}
		},
		mounted() {
			this.chart = echarts.init(this.$refs.myEchart)
			window.onresize = this.chart.resize
			this.chart.setOption(chartInit)
			this.$store.dispatch('initMap', this.chart) //加载地图文件
		},
		beforeDestroy: function () {
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			createTyphoon() {
				this.hasTyphoon = !this.hasTyphoon
				if (this.hasTyphoon) { //生成台风
					this.chart.setOption({
						series: [{
							name: 'typhoon',
							data: this.typhoon
						}]
					})
					//mapActions函数,用于推送typhoon状态
					this.updateTyphoon({ 
						typhoon: this.typhoon,
						flag: true  //flag用于控制setInterval的时间
					})
				} else {
					this.cleanTyphoon()
				}
			},
			cleanTyphoon() {
				this.chart.setOption({
					series: [{
						name: 'typhoon',
						data: []
					}, {
						name: '预警等级',
						data: this.waringMap
					}]
				})
				this.updateTyphoon({
						typhoon: [],
						flag: false
					}),
					this.dateFlag = false
			},
			...mapActions([
				'updateTyphoon'
			])
		},
	}
</script>
<style  lang="less">
	.echarts {
		position: relative;
		button {
			position: absolute;
			z-index: 1;
			bottom: 10px;
			right: 10px;
		}
		.date {
			position: absolute;
			z-index: 1;
			top: 10px;
			right: 10px;
			background-color: #2d8ce0;
			border-color: #2d8cf0;
			color: white;
			padding: 5px 10px;
			border-radius: 5px;
			font-family: "microsoft yahei";
		}
		.chart{
			height:400px; 
			max-width: 1080px;
		}
	}
</style>
