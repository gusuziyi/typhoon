export default {
	username: [{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		},
		{
			type: 'string',
			min: 2,
			message: '用户名至少为两个字符',
			trigger: 'blur'
		}
	],
	userpass: [{
			required: true,
			message: '请输入密码',
			trigger: 'blur'
		},
		{
			type: 'string',
			min: 4,
			message: '密码至少为四位',
			trigger: 'blur'
		}
	],
	email: [{
			required: true,
			message: '请输入邮箱',
			trigger: 'blur'
		},
		{
			type: 'email',
			message: '请输入正确的邮箱格式',
			trigger: 'blur'
		}
	],
}