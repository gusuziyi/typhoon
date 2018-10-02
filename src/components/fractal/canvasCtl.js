	let rmax, //实轴
		rmin,
		imax, //虚轴
		imin,
		escape, //逃逸速度
		maxiter //最大计算量
	let canvas = null, //canvas句柄
		real, //zN起始值
		illus,
		beginData = {} //初始设置值
	let canvasWidth = 0, //canvas的宽和高
		canvasHeight = 0
	let canvas2d = null, //2d绘图句柄
		rowData = [],
		rowLen = 0 //rowData的长度,r,g,b,a 除4得出像素点数量
	let room = 1, //旅行速度,1为同步,
		travelPath = [] //旅行路径,用于返程

	import complex from './complex.js'
	const initData = (inputData) => { //将vue中设置数据同步至此
		rmax = inputData.rmax
		rmin = inputData.rmin
		imax = inputData.imax
		imin = inputData.imin
		room = inputData.room
		escape = inputData.escape
		maxiter = inputData.maxiter
		canvas = inputData.canvas
		real = inputData.real
		illus = inputData.illus
		canvasWidth = canvas.width //canvas的宽和高
		canvasHeight = canvas.height //不是style中的宽高,而是原始的值
		canvas2d = canvas.getContext("2d") //2d绘图句柄
		beginData = { //初始化使用initData(beginData)
			rmax,
			rmin,
			imax,
			imin,
			room,
			escape,
			maxiter,
			real,
			illus,
			canvas
		}
		return beginData
	}
	const roomIn = (event) => { //相应鼠标点击使用屏幕像素坐标系
		let x = event.clientX
		let y = event.clientY
		//计算使用M集坐标,显示使用屏幕像素坐标
		//将屏幕像素转换为M集坐标
		let mandelX = rmin + (rmax - rmin) * x / window.innerWidth
		let mandelY = imin + (imax - imin) * y / window.innerHeight
		let width = (rmax - rmin) / 2
		let height = (imax - imin) / 2
		rmax = mandelX + width / room
		rmin = mandelX - width / room
		imax = mandelY + height / room
		imin = mandelY - height / room
		initCompute()
	}
	const roomOut = (event) => { //相应鼠标点击使用屏幕像素坐标系
		let x = event.clientX
		let y = event.clientY
		//计算使用M集坐标,显示使用屏幕像素坐标
		//将屏幕像素转换为M集坐标
		let mandelX = rmin + (rmax - rmin) * x / window.innerWidth
		let mandelY = imin + (imax - imin) * y / window.innerHeight
		let width = (rmax - rmin) / 2
		let height = (imax - imin) / 2
		rmax = mandelX + width * room
		rmin = mandelX - width * room
		imax = mandelY + height * room
		imin = mandelY - height * room
		initCompute()
	}
	const drag = (event) => { //左右移动
		let x = event.clientX
		//计算使用M集坐标,显示使用屏幕像素坐标
		//将屏幕像素转换为M集坐标
		canvas.onmousemove = (ev) => {//鼠标移动时重绘
			let xN = ev.clientX//在屏幕上鼠标移动距离
			let updateX = (rmax - rmin) * (xN - x) / window.innerWidth//在M集上鼠标移动距离
			let width = (rmax - rmin) / 2
			let o_room=Math.abs(imax)+Math.abs(imin)//由room带来的系数修正
			if(o_room>3){
				rmax = updateX + width / (3*o_room)
				rmin = updateX - width / (3*o_room)
			}else{
				rmax = updateX + width / 2
				rmin = updateX - width / 2
			}
			initCompute()
		}
		canvas.onmouseup = () => {
			canvas.onmousemove = null
			canvas.onmouseup = null
		}
	}

	const reset = () => {
		initData(beginData)
		initCompute()
	}
	const initCompute = () => {
		let width = (imax - imin) * canvasWidth / canvasHeight //M坐标系宽度,此举作用为按比例计算
		let rmid = (rmax + rmin) / 2
		rmin = rmid - width / 2
		rmax = rmid + width / 2
		let escapeArray = computeRow()
		drawRow(escapeArray)
	}
	const computeRow = () => {
		let escapeArray = []
		let row = 0 //第一行开始计算
		for (; row < canvasHeight; row++) {
			let ci = imin + (imax - imin) * row / canvasHeight
			for (let i = 0; i < canvasWidth; i++) {//从第一列
				let z_N = {//初始化z0
					real,
					illus
				}
				let cr = rmin + (rmax - rmin) * i / canvasWidth
				let constC = {//常数c
					real: cr,
					illus: ci
				}
				let j = 0
				for (; j < maxiter; j++) {//计算逃逸
					let multResult = complex.complexMult(z_N, z_N)
					z_N = complex.complexAdd(multResult, constC)
					if (complex.mod(z_N) > 4) { //逃逸
						escapeArray.push(j) //记录逃逸时迭代次数
						break
					}
				}
				if (j == maxiter) //未逃逸被捕获,设置值为最大计算量
					escapeArray.push(maxiter)
			}
		}
		return escapeArray
	}

	const drawRow = (escapeArray) => {
		canvas2d.clearRect(0, 0, canvasWidth, canvasHeight)
		let rowData = canvas2d.createImageData(canvasWidth, canvasHeight)
		for (let i = 0; i < escapeArray.length; i++) {
			let red = 4 * i
			let green = 4 * i + 1
			let blue = 4 * i + 2
			let alpha = 4 * i + 3
			if (escapeArray[i] < maxiter) {
				//逃逸,对应于M集外面的点 
				let color = Math.floor(escapeArray[i] * 255 / maxiter)
				if (color > 200) { //紫色色阶
					rowData.data[red] = color
					rowData.data[green] = (color - 180) * 3
					rowData.data[blue] = color
					rowData.data[alpha] = 180

				} else { //蓝色色阶
					rowData.data[red] = color
					rowData.data[green] = color
					color * 4 > 255 ? rowData.data[blue] = 255 : rowData.data[blue] = color * 4
					rowData.data[alpha] = 200
				}
			} else if (escapeArray[i] == maxiter) { //未逃逸,形成黑洞
				rowData.data[red] = 0
				rowData.data[green] = 0
				rowData.data[blue] = 0
				rowData.data[alpha] = 255
			}
		}
		// console.log(rowData, escapeArray)
		canvas2d.putImageData(rowData, 0, 0)
	}

	const getDark = () => { //生成黑洞
		let real = Math.random() * 2 - 1, //-1~1
			illus = Math.random() * 2 - 1 //-1~1
		let rMaxOffset = Math.abs(real) * 1.2,
			iMaxOffset = Math.abs(illus) * 1.2,
			rMinOffset = Math.abs(real) * 0.2,
			iMinOffset = Math.abs(illus) * 0.2
		return {
			rmax: rmax - rMaxOffset,
			rmin: rmin - rMinOffset,
			imax: imax - iMaxOffset,
			imin: imin - iMinOffset,
			real,
			illus,
		}
	}

	const goOn = () => {
		let travelBegin=Object.assign(beginData, {imin,imax,rmin,rmax})
		initData(travelBegin) //存储旅行起始位置
		let w_O = canvasWidth / 3,
			h_O = canvasHeight / 3
		let x = Math.round(Math.random() * w_O + w_O),
			y = Math.round(Math.random() * h_O + h_O)
		let mandelX = rmin + (rmax - rmin) * x / canvasWidth,
			mandelY = imin + (imax - imin) * y / canvasHeight
		let width = (rmax - rmin) / 2,
			height = (imax - imin) / 2
		rmax = mandelX + width / room
		rmin = mandelX - width / room
		imax = mandelY + height / room
		imin = mandelY - height / room
		travelPath.push({
			rmax,
			rmin,
			imax,
			imin
		})
		initCompute()
	}
	const getFps = (lastTime, travelTime) => {
		let now = +new Date,
			fps = ''
		if (travelTime) {
			fps = (1000 / (now - lastTime)).toFixed(1) + 'fps'
		} else {
			fps = '漫游结束'
		}
		canvas2d.fillStyle = '#EEEEEE'
		canvas2d.fillText(fps, 2, 10)
		return now
	}
	const goBack = () => {
		let axis = travelPath.pop()
		rmax = axis.rmax
		rmin = axis.rmin
		imax = axis.imax
		imin = axis.imin
		initCompute()
	}
	export default {
		initData,
		roomIn,
		roomOut,
		drag,
		reset,
		initCompute,
		getDark,
		goOn,
		goBack,
		getFps
	}
