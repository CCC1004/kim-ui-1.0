<template>
  <Collapse v-model="openCollapse">
    <Panel name="1">
      <span class="collapsePanel">菜单信息</span>
      <div slot="content">
        <info-menu @menuAddUpdateOver="menuAddUpdateOver" ref="infoMenu"></info-menu>
      </div>
    </Panel>
    <Panel name="2">
      <span class="collapsePanel">页面控件资源</span>
      <p slot="content">
        <info-element ref="infoElement"></info-element>
      </p>
    </Panel>
    <Panel name="3">
      <span class="collapsePanel">页面请求访问资源</span>
      <p slot="content">
        <info-uri ref="infoUri"></info-uri>
      </p>
    </Panel>
  </Collapse>
</template>

<script>
  export default {
    name: "info",
    components: {
      "infoMenu": () => import('./info-menu'),
      "infoElement": () => import('./info-element'),
      "infoUri": () => import('./info-uri')
    },
    data() {
      return {
        // 要显示的折叠面板
        openCollapse: '1'
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      /**
       * Description :组件初始化
       * @param
       * @return
       * @author     :loulan
       * */
      init() {

      },

      /**
       * Description :菜单添加或者修改完成事件(需要刷新菜单树)
       * @param
       * @return
       * @author     :loulan
       * */
      menuAddUpdateOver() {
        this.$emit('menuAddUpdateOver');
      },

      /**
       * Description :刷新数据,比如菜单重新选择之后就要刷新数据
       * @param
       * @return
       * @author     :loulan
       * */
      refreshData (menuData) {
        this.$refs.infoMenu.refreshData(menuData);
        this.$refs.infoElement.refreshData(menuData);
        this.$refs.infoUri.refreshData(menuData);
      },

      /**
       * Description :菜单信息添加
       * @param
       * @return
       * @author     :loulan
       * */
      infoMenuAdd () {
        this.$refs.infoMenu.add();
      },
      
      /**
       * Description :菜单编辑
       * @param
       * @return
       * @author     :loulan
       * */
      infoMenuEdit () {
        this.$refs.infoMenu.edit();
      },

      /**
       * Description :菜单删除
       * @param
       * @return
       * @author     :loulan
       * */
      infoMenuDelete () {
        this.$refs.infoMenu.delete();
      }
    }
  }
</script>

<style scoped>
  .collapsePanel {
    font-size: 14px;
    font-weight: bolder;
  }
</style>
