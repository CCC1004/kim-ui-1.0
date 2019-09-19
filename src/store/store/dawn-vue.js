

const dawnvue = {
  state: {
    // 框架头部高度， 在这里设置框架头部高度
    headerHeightPX: 60,  //可调
    // 框架标题栏高度，在这里设置小标题栏高度
    breadcrumbHeightPX: 35, // 可调
    // 屏幕（浏览器）可显示部分高度（框架总体高度）
    screenHeightPX: 1000,  // 不可调
  },
  mutations: {
    SET_SCREEN_HEIGHT_PX (state,param){
      state.screenHeightPX = param;
    }
  }
};

export default dawnvue;
