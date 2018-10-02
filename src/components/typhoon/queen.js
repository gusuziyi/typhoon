	import * as Public from '@/public/public.js'
	const setTyphoon = () => { //生成台风
		let o_log = Math.random() * 15 + 112 //初始经度 112-127
		let o_lat ,
			seaArea = ''
		let v_log,
			v_lat,
			log_arrow = -1, //西
			lat_arrow = -1 //南
		if (o_log <= 120) {
			o_lat = Math.random() + 21 //初始纬度 21-22
			seaArea = '南海'
			// let symbol = [-1, 1] //台风若在南海,随机向东or向西
			// log_arrow = symbol[Math.floor(Math.random() * 2)] //随机正负号
			lat_arrow = 1 //北
		} else {
			o_lat = Math.random() * 2 + 23 //初始纬度 23-25
			seaArea = '东海'
		}
		v_log = (Math.random() * 0.2 + 0.2) * log_arrow
		v_lat = (Math.random() * 0.2 + 0.003) * lat_arrow
		let v = [v_log, v_lat]
		let strong = Math.floor(Math.random() * 8 + 9) // 9-17级
		let strongStr = getStrongStr(strong)
		let nameArr = ['山竹', '榴莲', '芒果', '海燕', '青柠', '摩羯', '云雀', '飞燕']
		let name = nameArr[Math.floor(Math.random() * 8)]
		let ifStronger = '' //  增强 or 削弱
		let curDate = new Date()
		let time = curDate.toLocaleDateString()
		return [{
			name,
			seaArea,
			strong,
			strongStr,
			ifStronger,
			time,
			v,
			landing: false,
			gameover: false,
			value: [o_log, o_lat, strong]
		}]
	}

	const setTyphoonPath = (typhoon) => {//设置运动轨迹
		let strong = typhoon.strong,
			strongStr, ifStronger = ''
		let gameover=typhoon.gameover
		if(gameover){ //如果已经消亡,则一直消亡
			gameover = true
		}
		if (typhoon.landing) { //已经登陆
			if (Math.random() * 10 > 6) { //40%概率减弱
				strong = strong - 1
				if (strong < 8) {
					strong=6
					gameover = true //第一次消亡,为风力削弱为6时
				} else {
					ifStronger = '削弱'
				}
			}
		} else { //未登陆
			if (Math.random() * 10 > 8) { //20%概率增强
				strong = strong + 1
				if (strong > 21) {
					strong = 21
				} else {
					ifStronger = '增强'
				}

			}

		}
		strongStr = getStrongStr(strong)

		let date = new Date(typhoon.time)
		date = date.setDate(date.getDate() + 1) //增加一天
		let time = new Date(date).toLocaleDateString()

		let v_log = typhoon.v[0]*(Math.random() + 0.5)//随机数为模拟的加速度
		let v_lat = typhoon.v[1]*(Math.random() + 0.5)
		let o_log = typhoon.value[0] + v_log
		let o_lat = typhoon.value[1] + v_lat
		let typhoonTemp = {
			strong,
			strongStr,
			ifStronger,
			gameover,
			time,
			value: [o_log, o_lat, strong]
		}
		let typhoonUpdate = Object.assign(typhoon, typhoonTemp)
		return [typhoonUpdate]
	}

	function getStrongStr(strong) {
		let strongArr = [6,7,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
		let strongArrStr = ['普通大风','热带风暴', '强热带风暴', '台风', '强台风', '超强台风', '史诗级台风', '传说中的台风']
		let strongStr = Public.rangeTrans(strongArr, strongArrStr, strong, 2)
		return strongStr
	}


	const computWaring = (waringMapCur, typhoonNow) => { //实时计算预警值
		let waringMapNew = []
		let landing = false
		for (let i = 0; i < waringMapCur.length; i++) {
			let c_log = waringMapCur[i].geoCoord[0]
			let c_lat = waringMapCur[i].geoCoord[1]
			let t_log = typhoonNow[0].value[0]
			let t_lat = typhoonNow[0].value[1]
			//台风距离
			let pathLen = Math.abs(c_log - t_log) * Math.abs(c_log - t_log) + Math.abs(c_lat - t_lat) * Math.abs(c_lat - t_lat)
			// 预警值与台风距离成反比,与台风强度成正比
			let waringLen = pathLen - typhoonNow[0].strong
			let value = 0 //预警数值
			if (pathLen < 0.5) {//判断登陆点
				value = 800
				if (!typhoonNow[0].landing) {
					landing = {
						name: waringMapCur[i].name,
						geoCoord: waringMapCur[i].geoCoord
					}
				}
			}
			if (waringLen < 10) {
				value = 800
			} else if (waringLen < 20) {
				value = 600
			} else if (waringLen < 40) {
				value = 400
			} else if (waringLen < 90) {
				value = 200
			} else {
				value = 0
			}
			waringMapNew.push({
				name: waringMapCur[i].name,
				value,
				geoCoord: waringMapCur[i].geoCoord,
			})
		}
		return {
			waringMapNew,
			landing
		}
	}

	export default {
		setTyphoon,
		setTyphoonPath,
		computWaring
	}
