<template>
	<div class="bgDiv">
		<canvas class="canvas" ref="canvas"></canvas>
		<Form ref="formInline" class="form" :model="beginData" :rules="ruleInline" :label-width="80">
			<FormItem prop="rmax">
				<Input type="text" v-model="beginData.rmax" placeholder="实轴最大值">
				<span slot="prepend">实轴最大</span>
				</Input>
			</FormItem>
			<FormItem class='item' prop="rmin">
				<Input type="text" v-model="beginData.rmin" placeholder="实轴最小值">
				<span slot="prepend">实轴最小</span>
				</Input>
			</FormItem>
			<FormItem class='item' prop="imax">
				<Input type="text" v-model="beginData.imax" placeholder="虚轴最大值">
				<span slot="prepend">虚轴最大</span>
				</Input>
			</FormItem>
			<FormItem class='item' prop="imin">
				<Input type="text" v-model="beginData.imin" placeholder="虚轴最小值">
				<span slot="prepend">虚轴最小</span>
				</Input>
			</FormItem>
			<FormItem class='item' prop="escape">
				<Input type="text" v-model="beginData.escape" placeholder="超出此值则逃逸">
				<span slot="prepend">逃逸极值</span>
				</Input>
			</FormItem>
			<FormItem class='item' prop="room">
				<Input type="text" v-model="beginData.room" placeholder="不小于1">
				<span slot="prepend">缩放比例</span>
				</Input>
			</FormItem>
			<FormItem class='item' prop="real">
				<Input type="text" v-model="beginData.real" placeholder="初始实轴">
				<span slot="prepend">初始实轴</span>
				</Input>
			</FormItem>
			<FormItem class='item' prop="illus">
				<Input type="text" v-model="beginData.illus" placeholder="初始虚轴">
				<span slot="prepend">初始虚轴</span>
				</Input>
			</FormItem>
			<FormItem class='btn-item '>
				<Button class='btn' type="primary" @click="handleSubmit('formInline')">设置参数</Button>
				<Button type="primary" @click="reset">复位初值</Button>
			</FormItem>
			<FormItem class='item btn-item'>
				<Button class='btn' type="primary" @click="goOn" v-if='!isTravel&&timeArrow'>星际漫游</Button>
				<Button class='btn' type="primary" @click="goOn" v-else-if='!isTravel&&!timeArrow'>时空逆转</Button>
				<Button class='btn' type="primary" disabled v-else>正在漫游</Button>
				<Button type="primary" @click="dark">随机黑洞</Button>
			</FormItem>

		</Form>
	</div>
</template>
<script>
	import canvasCtl from './canvasCtl.js'
	import ruleInline from './ruleInline.js'
	export default {
		data() {
			return {
				canvas: null,
				oriData: { //默认参数,不要改动,否则恢复默认值
					real: 0, //默认z0=(0,0),此时c的解为julia的特殊解mandelbort
					illus: 0,
					rmax: 1, //实轴最大
					rmin: -1.5, //实轴最小
					imax: 1.2, //虚轴最大
					imin: -1.2, //虚轴最小
					escape: 100, //逃逸次数
					maxiter: 99, //最大计算量
					room: 1.5 //漫游缩放比例
				},
				beginData: {}, //用户设置的参数,对应于上方v-model,用于覆盖oriData
				ruleInline: {}, //策略集,检测数值有效性,
				isTravel: false, //星际旅行状态,false相对静止,true在运动,
				timeArrow: true, //时间方向,true时间流逝,false时间逆流
				lastTime: 0 //上一帧更新时间点,用于计算fps
			}
		},
		created() {
			this.ruleInline = ruleInline //在渲染v-form前初始化rules 
		},
		mounted() {
			this.canvas = this.$refs.canvas
			this.initData(this.oriData)
			this.canvas.onmousewheel = (event) => {//滚轮缩放
				if (event.wheelDelta > 0) {
					canvasCtl.roomIn(event)
				} else {
					canvasCtl.roomOut(event)
				}
			}
			this.canvas.onmousedown = (event) => {//平移拖拽
				canvasCtl.drag(event)
			}
			this.canvas.onmouseover = (event) => {//悬停提示
				this.$Message.info({
					content: ' 操作提示 : 滚轮缩放 , 拖拽平移',
					duration: 2
				})
			}
			canvasCtl.initCompute()
		},
		methods: {
			initData(dataArr) { //设置计算集canvasCtl的数据
				this.beginData = canvasCtl.initData({
					rmax: +dataArr.rmax,
					rmin: +dataArr.rmin,
					imax: +dataArr.imax,
					imin: +dataArr.imin,
					escape: +dataArr.escape,
					maxiter: +dataArr.escape - 1,
					room: +dataArr.room,
					real: +dataArr.real,
					illus: +dataArr.illus,
					canvas: this.canvas
				})
			},
			handleSubmit(name) { //设置参数
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Message.success('设置成功')
						this.initData(this.beginData)
						canvasCtl.initCompute()
					} else {
						this.$Message.error('请检查输入的数值')
					}
				})
			},
			reset() { //复位初值
				this.initData(this.oriData)
				canvasCtl.initCompute()
			},
			goOn() { //星际漫游
				if (!this.isTravel) {
					this.isTravel = true
					this.animateGoOn(8, this.timeArrow)
					this.timeArrow = !this.timeArrow
				}
			},
			animateGoOn: async function (travelTime, timeArrow) {
				while (travelTime--) {
					timeArrow ? canvasCtl.goOn() : canvasCtl.goBack()
					this.lastTime = canvasCtl.getFps(this.lastTime, travelTime)
					let sleepTime = 400
					try {
						await this.sleep(travelTime, sleepTime)
					} catch (e) { //捕捉到错误时,设置开关状态
						if (!timeArrow) { //时间逆流时,初始状态没有路径,手工绘制最后一帧
							this.initData(this.beginData)
							setTimeout(canvasCtl.initCompute(), sleepTime)
						}
						this.isTravel = e
						this.lastTime = 0
					}
				}
			},
			sleep(travelTime, sleepTime) {
				return new Promise((resolve, reject) => {
					if (travelTime) {
						setTimeout(() => {
							resolve()
						}, sleepTime)
					} else {
						reject(false)
					}

				})
			},
			dark() { //随机黑洞函数
				this.initData(this.oriData)
				let updateDark = canvasCtl.getDark()
				let darkData = Object.assign(this.beginData, updateDark)
				this.initData(darkData)
				canvasCtl.initCompute()
			}
		},
	}
</script>
<style scoped="" lang="less">
	.bgDiv {
		display: flex;
		.canvas {
			flex: 3 1 auto;
			height: 400px;
			background-color: blue;
		}
		.form {
			flex: 1 3 auto;
			height: 400px;
			margin-left: -70px;
			.item {
				margin-top: -20px;
			}
			.btn-item {
				text-align: center;
				.btn {
					margin-right: 5%;
				}
			}
		}
	}
</style>
