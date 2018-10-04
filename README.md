	
  九月份比较火的新闻就是山竹来袭，所以花了十几天时间做了一个台风预警系统，这个软件需要解决的问题有三个:
	第一是地图的绘制
	第二是台风路径的实时跟踪与预警
	第三是海上低压气旋的引力模拟
 
  由于笔记本配置实在太渣,2g内存,赛扬的cpu,无法同时完成海量的计算,所以我就把这三个问题抽象成了三个独立的程序:
  即字符点亮中国、台风预警系统和黑洞引力模拟器,然后用vue-router和vuex连接起来,就成了一个单页面程序。



  下载后,点击dist中的index.html可直接使用
  
  想复原项目,在根目录下运行npm install后运行npm run dev即可
  
  技术栈：vue2 + vuex + vue-router + iview + webpack + async/await + canvas + less+ flex +echarts
  
  在github中预览效果:https://gusuziyi.github.io/typhoon
  
