import Vue from 'vue'
import Router from 'vue-router'
import VTyphoon from '@/components/typhoon/VTyphoon'
import VFractal from '@/components/fractal/VFractal'
import VFontChina from '@/components/fontChina/VFontChina'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/typhoon'
    },
		{
			path: '/typhoon',
			name: 'typhoon',
			component: VTyphoon
		},
		{
			path: '/fractal',
			name: 'fractal',
			component: VFractal
		},{
			path: '/fontChina',
			name: 'fontChina',
			component: VFontChina
		}
  ]
})
