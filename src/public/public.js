export function switchTrans(sourceArr,distArr,transStr){
	for(let i=0;i<sourceArr.length;i++){
		if(sourceArr[i]==transStr){
			return distArr[i]
		}
	}
	return '没有数据'
}

export function rangeTrans(sourceArr,distArr,transStr,num){
	let resultArr=[]
	let result=''
	for(let i=0;i<sourceArr.length;i+=num){
		resultArr.push(sourceArr.slice(i,i+num)) //分割sourceArr,每个子集为num个
	}
	for(let j=0;j<resultArr.length;j++){
		resultArr[j].forEach((index)=>{
			if(index==transStr){
				result= distArr[j]
			}
		})
	}
	if(!result){
		result='没有数据'
	}
	return result
}