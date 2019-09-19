/*  ************************ 引入vue相关组件  ************************   */

import Vue from 'vue'

// 引入iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// Progress 进度条
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'    // progress bar style

// 导入moment.js
import moment from 'moment'

// 引入vee-validate的配置
import '@/utils/my-vee-validate.js'

// 引入图片查看器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// 引入自定义组件
import '@/components/componentConfig'

Vue.use(iView)

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    title: false, // 显示当前图片的标题
    scalable: false, // 图片是否可翻转
    rotatable: true, // 图片是否可旋转
  	tooltip: true, // 显示缩放百分比
  	navbar: false, // 显示缩略图导航, 多张图片时使用
  	loop: false, // 循环显示，多张图片时使用
  	loading: true
  }
})
