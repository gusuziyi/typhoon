import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import  southMap from './modules/southMap'
import  chinaMap from './modules/chinaMap/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: state,
	actions: actions,
	mutations:mutations ,
	modules:{
		southMap,
		chinaMap
	}
})
