	九月份比较火的新闻就是山竹来袭，所以花了十几天时间做了一个台风预警系统，这个软件需要解决的问题有三个:
	第一是地图的绘制
	第二是台风路径的实时跟踪与预警
	第三是海上低压气旋的引力模拟
	由于笔记本配置实在太渣,2g内存,赛扬的cpu,无法同时完成海量的计算,所以我就把这三个问题抽象成了三个独立的程序:字符点亮中国、台风预警系统和黑洞引力模拟器,然后用vue-router和vuex连接起来,就成了一个单页面程序。

.
├── build                                       # webpack配置文件
├── config                                      # 项目打包路径
├── dist                                        # 上线项目文件，放在服务器即可正常访问
├── my-theme                                    # 自定义的iview皮肤
│   └── index.less                              # 样式配置文件
├── screenshots                                 # 项目截图
├── src                                         # 源码目录
│   ├── assets                                  # 公共图片
│   ├── components                              # 组件
│   │   ├── fontChina                           # 字符点亮中国
│   │   │   ├── chartInit.js                    # 初始化设置
│   │   │   ├── chinaTag.js                     # 标签数据
│   │   │   ├── VFontChina.vue                  # 字符点亮中国组件
│   │   ├── fractal
│   │   │   ├── canvasCtl.js                    # 黑洞计算集
│   │   │   ├── complex.js                      # 复数计算集
│   │   │   ├── ruleInline.js                   # 表单验证规则
│   │   │   └── VFractal.vue                    # 分型计算组件
│   │   ├── header
│   │   │   ├── ruleLine.js                     # 表单验证规则
│   │   │   ├── VAbout.vue                      # 关于组件
│   │   │   ├── VLogin.vue                      # 登录组件
│   │   │   └── VReg.vue                        # 注册组件
│   │   ├── typhoon
│   │   │   ├── chartInit.js                    # 初始化设置
│   │   │   ├── queen.js                        # 台风计算集
│   │   │   └── VTyphoon.vue                    # 台风组件
│   │   ├── VHeader.vue                         # 首页头部组件
│   │   ├── VNav.vue                            # 首页导航组件
│   │   └── VSider.vue                          # 首页左侧组件
│   │                            
│   ├── public                                  # 公共配置
│   │   └── public.js                           # 公共函数
│   ├── router                                  # 路由配置
│   │   └── router.js                           # 路由函数
│   ├── store                                   # vuex的状态管理
│   │   ├── actions.js                          # 配置actions
│   │   ├── getters.js                          # 配置getters
│   │   ├── index.js                            # 引用vuex，创建store
│   │   ├── modules                             # 子模块
│   │   │   ├── chinaMap                        # 中国地图模块
│   │   │   │   └──index.js                     #存储主函数
│   │   │   └── southMap                        # 两广地图模块
│   │   │       └──index.js                     #存储主函数
│   │   ├── state.js                            # 配置state
│   │   └── mutations.js                        # 配置mutations
│   ├── static                                  # 不能参加webpack编译的文件
│   │   ├── city.json                           # 城市经纬度
│   │   ├── typhoon.gif                         # 台风动画
│   │   └── south.json                          # 两广地图
│   ├── App.vue                                 # 页面入口文件
│   └── main.js                                 # 程序入口文件，加载各种公共组件
├── favicon.ico                                 # 图标
└── index.html                                  # 入口html文件


技术栈：vue2 + vuex + vue-router + iview + webpack + async/await + canvas + less+ flex +echarts