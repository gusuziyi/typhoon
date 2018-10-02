let maskImage = new Image()
maskImage.src = require('./china.png')

export default {
	tooltip: { //悬停时提示
		formatter(params){
			let msg=params.name+'  : '+params.data.text
			return msg
		}
	},
	series: [{
		type: 'wordCloud',
		gridSize: 1,
		sizeRange: [2, 25], 
		rotationRange: [-90, 90],
		// rotationStep: 45,
		shape: 'circle',
		width: 800,
		height: 420,
		top:'-30',
		left:'left',
		maskImage,
		drawOutOfBound: false,
		textStyle: {
			normal: {
				color: function () {
					let r = Math.round(Math.random() * 200)
					let g = Math.round(Math.random() * 200)
					let b = Math.round(Math.random() * 200)
					let color = `rgb(${r},${g},${b})`
					return color
				}
			},
			emphasis: {
				color: 'red'
			}
		},
		data: [],
	}],
}
