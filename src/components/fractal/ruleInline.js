const validateInteger = (rule, value, callback) => {
	if (!Number.isInteger(+value) && value != '0') {
		callback(new Error('请输入数字值'));
	} else if (value < 0) {
		callback(new Error('请输入正数数字值'));
	} else {
		callback();
	}
}
const validateFloat = (rule, value, callback) => {
	if (!Number(+value)) {
		callback(new Error('请输入数字值'));
	} else if (value <  0) {
		callback(new Error('请输入正数数字值'));
	} else {
		callback();
	}
}
const validateNumber = (rule, value, callback) => {
	if (!Number(+value) && value != '0') {
		callback(new Error('请输入数字值'));
	} else {
		callback();
	}
}
export default {
	rmax: [{
		validator: validateNumber,
		trigger: 'blur'
	}],
	rmin: [{
		validator: validateNumber,
		trigger: 'blur'
	}],
	imax: [{
		validator: validateNumber,
		trigger: 'blur'
	}],
	imin: [{
		validator: validateNumber,
		trigger: 'blur'
	}],
	escape: [{
		validator: validateInteger,
		trigger: 'blur'
	}],
	room: [{
		validator: validateFloat,
		trigger: 'blur'
	}],
	real: [{
		validator: validateNumber,
		trigger: 'blur'
	}],
	illus: [{
		validator: validateNumber,
		trigger: 'blur'
	}]
}
