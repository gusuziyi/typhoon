// import axios from 'axios'
import mapData from './south.json'
import cityres from './city.json'
import echarts from 'echarts'
import queen from '@/components/typhoon/queen.js'
const state = {
	typhoonNow: [{
		name: 'test'
	}],
	waringMap: [{
		name: 'X市',
		value: 0,
		geoCoord: [120.1, 25.1]
	}], //默认预警
	waringMapCur: [{
		name: '广州市',
		value: 200,
		geoCoord: [120.1, 25.1]
	}], //实时预警
	typhoonHandle: null
}

const actions = {
	initMap({commit}, chart) {
		echarts.registerMap('自制两广地图', mapData);
		let cityDetail = cityres.cityDetail //获得geo
		let waring = cityres.waringInit //获得地名与waring
		let southMap = []
		for (let i = 0; i < cityDetail.length; i++) {
			if (cityDetail[i].name == "广东省" || cityDetail[i].name == "广西壮族自治区") {
				southMap = southMap.concat(cityDetail[i].children)
			}
		}
		// console.log(cityDetail,southMap);
		//闭包初始化waringMap
		let waringMap = ((waring) => {
			let waringArr = []
			let len = waring.length
			while (len--) {
				let cityName = waring[len]
				let geoCoord = []
				let i
				for (i = 0; i < southMap.length; i++) {
					if (southMap[i].name == cityName) {
						geoCoord.push(southMap[i].log)
						geoCoord.push(southMap[i].lat)
					}
				}
				if (i == southMap.length) {
					geoCoord.push('暂无数据') //未收录坐标
				}
				waringArr.push({
					name: cityName + '市',
					value: 0,
					geoCoord
				})
			}
			return waringArr
		})(waring)
		// console.log(waring,waringMap); 
		commit('setWaring', waringMap) //调用mutations

		chart.setOption({
			series: [{
				name: '预警等级', // 浮动框的标题
				type: 'map',
				geoIndex: 0,
				data: waringMap
			}, {
				name: 'typhoon'
			}]
		});
		chart.resize()
	},
	updateTyphoon({
		commit
	}, {
		typhoon,
		flag
	}) {
		// commit('setTyphoonHandle',true) 此处使用while(typhoonHandle)会卡死,故折中使用flag
		if (flag) { //flag用于控制时间
			state.typhoonHandle = setInterval(() => {
				let typhoonNow = queen.setTyphoonPath(typhoon[0])
				commit('updateTyphoon', typhoonNow)
			}, 2000)
		} else {
			clearInterval(state.typhoonHandle)
		}
	}
}
const mutations = {
	updateTyphoon(state, typhoonNow) {
		state.typhoonNow = typhoonNow
	},
	setWaring(state, waringMap) {
		state.waringMap = waringMap
		state.waringMapCur = waringMap
	},
	cleanTyphoon(state) {
		state.typhoonNow = [],
			state.waringMapCur = state.waringMap
	}

}

export default {
	state,
	actions,
	mutations
}
