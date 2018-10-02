import * as Public from '@/public/public.js'
let symbolPic='image://data:image/gif;base64,R0lGODlhKAAoAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzNjM1MUNBMDk5ODExRTRBNDM0OTFBMjNDNzk5QTY1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUzNjM1MUNCMDk5ODExRTRBNDM0OTFBMjNDNzk5QTY1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTU1MTlCRUIwOTk3MTFFNEE0MzQ5MUEyM0M3OTlBNjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTU1MTlCRUMwOTk3MTFFNEE0MzQ5MUEyM0M3OTlBNjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJFAABACwAAAAAKAAoAAACvoyPmaDtv4CEtMpZs7tY+8M13PVF2IiOZUCmbuih7Ptm8kwqbQepKsgCnXg6mNFlGPZyx1qHyEjuaDTgZjhB1pKIaJPqhXHH0jAYS7R+z8I0mpHqxsXdcvYn/9FndrP7tneCA7c3GIInxXeYkzfoGKG4ZUhICbXGNvXHdIZlKHK5lXnFOFlJGflw87k5tYQ42XYX5crmyWcDFjubRkuHyGvBVCpkMyoZ9DFbVKiscTi8sKL7iixdB2edrb3tUQAAIfkECRQAAQAsAAAAACgAKAAAAsKMj6nL7Q9jAIqCe6WjCfuvdZzxYdPkhSdSpqKWHW3bRTEJsuhIPub+w81gnJJwFtxkjECkq2Gy/GgyJmMpLYIsrFwlBXbemteoWRzzds9N9JFXxaKH6qP92Z7i79R19g+385ZkJ4j1lWYVJ2e24KL4Fnkz8mhF9TS2OOhUOEmZM8coo7MJeKaV2LXoVkn5hVN6WgilVaoJNIooVbM6qwQZSdbzG9qmEmoaaFMsqFJxwvWp7ExMHbJnXUaY7bjC/Q1RAAAh+QQJFAABACwAAAAAKAAoAAACw4yPqcvtASCY8Nk1c933Zt2FxyeWxhehaWoi6gub7wmjVjSSUj17uqqIMXA7nO3EKYISxJ8TKKFhcpSiEkpZSmlZXsxYHXHB3ms1HLWae9DkmeTVKbdRYG9MRufqXTn1Hda0YnXkcqT1tyJk+CSGh+cHOYYBV5MIEvm49qWRqRnXCUjEJAeqODlUuEk218CWOKlKacra1WHKtZPms3hFN0TKEoQ16spYoVioB4wWdxzSCblcfFs23HJJjYRdos39DY5dAAAh+QQJFAABACwAAAAAKAAoAAACw4yPqcvdEKCbNNqKGZBq+50tIPKVZRiNh/mlXvgarLmq0ztfcuzeI0u68HQaCOjkOg05HWVsRlsVcU8o0kc9XmstRzerXXanRjCUy2xKrOdkGr1jA91kt3g+1lW3cVqetDfUl0QnAxgmSNiytfb1R0eVUoPWyAMUafPjJ1epBbhjx1loI4nIyeGYEBm6GCjV1MNa5mqoludIW2v7aDf4KpIza7lEcdrJ9EaW00eKIjvnrKGYGO1FXb2L3WGxrC3tDZ5RAAAh+QQFFAABACwAAAAAKAAoAAACv4yPqcvtBwKY8VlGc75cz1VxoCZ2iEeGpRGiESqtqsdKrurMG3uTj/6xpYQ+TIvC2yVgxmSlKDxBIc/dpucMSrPEHtIGXn5SXlpQywMjy69rWzxes4lhNLmt7HLD3JvCqgRUFYe2Fyglx4SY2AI3ONU12ACo6JKU88VGE1Xj+OhH+ZOH5fY1OYRX6oSxWEb3aqG5CklF5TWbx1pbI6hWOPIITNaRKctJrHmEczEntgIR+Wv6LPJLHbt8naPNzVEAADs='
export default {
	backgroundColor: '#272D3A',
	tooltip: { //对应城市
		trigger: 'item',
		formatter: function (params) {
			let waringData = [0,200, 400, 600, 800]
			let waringDataArr = ['没有威胁','蓝色预警', '黄色预警', '橙色预警', '红色预警']
			let rank = Public.switchTrans(waringData, waringDataArr, params.value)
			return params.name + ' : ' + rank
		}
	},
	title: {
		text: '两广地区台风模拟',
		subtext:'作者:千茉紫依  (纯属虚构)',
		left: '10px',
		top: '10px',
		textStyle: {
			color: '#fff'
		},
	},
	visualMap: { //左下映射表
		min: 0,
		max: 800,
		left: '10px',
		bottom:'10px',
		pieces: [{
			value: 0,
			label: '没有威胁',
			color: '#ddd'
		},{
			value: 200,
			label: '蓝色预警',
			color: '#50a3ba'
		}, {
			value: 400,
			label: '黄色预警',
			color: '#ee0'
		}, {
			value: 600,
			label: '橙色预警',
			color: '#ea9736'
		}, {
			value: 800,
			label: '红色预警',
			color: '#d94e5d'
		}],
		textStyle: {
			color: '#fff'
		}
	},
	geo: { //地理坐标系,地图在vuex的southMap模块中定义
		map: '自制两广地图',
		roam: true, //可缩放移动
		left: '15%',
		top:'50px',
		label: { //地图地名样式
			normal: {
				show: false,
				fontSize: 10,
				textStyle: {
					color: 'rgba(0,0,0,0.4)'
				}
			}
		},
		itemStyle: {
			normal: {
				borderColor: 'rgba(0, 0, 0, 0.2)'
			},
			emphasis: {
				areaColor: 'rgba(255, 255, 255, 0.4)',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowBlur: 20,
				borderWidth: 0,
				shadowColor: 'rgba(255, 255, 255, 0.4)'
			}
		}
	},
	series: [{
		name: 'typhoon',
		type: 'scatter',
		coordinateSystem: 'geo',
		data: [],
		zlevel: 1,
		symbolSize: (data)=>data[2]*3, //映射为params.value=[log,lat,strong]
		symbol:symbolPic,
		
		tooltip: {
			trigger: 'item',
			formatter: function (params) {
				
				let msg=`台风 ${params.data.name} <br/>生成于 ${params.data.time} <br/>目前为 ${params.data.strong}级  ${params.data.strongStr}<br/>实时位置<br/>东经: ${params.value[0]}  <br/>北纬: ${params.value[1]}`
				return msg
			}
		},
		label: {
			normal: {
				show: false,
			},
			emphasis: {
				show: true,
				backgroundColor: 'red',
				borderColor: 'white',
				borderWidth: 1,
				borderRadius:'50%',
				formatter:  function (params) {
					return  params.data.name 
				}
			}
		}
	}]
}
