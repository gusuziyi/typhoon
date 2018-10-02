export default {
		setLoginUser(state,loginUser){
			state.loginUser=loginUser
		},
		loginOut(state){
			state.loginUser=null
		},
		setActiveCard(state,{menuName,cardName}){
			state.activeMenu=menuName
			state.activeCard=cardName
		},
		clickCard(state){
			state.clickCard=!state.clickCard
		},
		setActiveCardPrice(state,activeCardPrice){
			state.activeCardPrice=activeCardPrice
		},
		
		processHeader(state,tapNum){
			switch(tapNum){
				case 1:state.modalLogin=!state.modalLogin
				break
				case 2:state.modalReg=!state.modalReg
				break
				case 3:state.modalAbout=!state.modalAbout
				break
			}
		}
	}