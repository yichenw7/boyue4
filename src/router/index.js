import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');                             //登录页面
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');                          //左侧管理菜单
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');                                //主页
const gameList = r => require.ensure([], () => r(require('@/page/gameList')), 'gameList');                    //游戏列表
const addGame = r => require.ensure([], () => r(require('@/page/addGame')), 'addGame');                       //添加游戏
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');                    //用户权限列表
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');                 //订单查询
const callbackDebug= r => require.ensure([], () => r(require('@/page/callbackDebug')), 'callbackDebug');      //调试支付回调接口
const callbackSet = r => require.ensure([], () => r(require('@/page/callbackSet')), 'callbackSet');           //调试回调地址
const loginDebug = r => require.ensure([], () => r(require('@/page/loginDebug')), 'loginDebug');              //调试登录接口
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');                       //说明




const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addGame',
			component: addGame,
			meta: ['添加游戏'],
		},{
			path: '/gameList',
			component: gameList,
			meta: ['游戏列表'],
		},{
			path: '/callbackSet',
			component: callbackSet,
			meta: ['游戏管理', '配置回调地址'],
		},{
			path: '/callbackDebug',
			component: callbackDebug,
			meta: ['游戏管理', '调试支付回调接口'],
		},{
			path: '/loginDebug',
			component: loginDebug,
			meta: ['游戏管理', '调试登录接口'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['游戏管理', '订单列表'],
		},{
			path: '/userList',
			component: userList,
			meta: ['设置', '用户权限设置'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
