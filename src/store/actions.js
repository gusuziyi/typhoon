export default {
		setLoginUser({commit},loginUser) {
			commit('setLoginUser',loginUser)
		},
		loginOut({commit}){
			commit('loginOut')
		}
	}