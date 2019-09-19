<template>
  <div>
    <div class="menu-split" :style="{height: splitHeight+'px'}">
      <Split v-model="split">
        <div slot="left" class="menu-split-pane">
          <div style="height: 36px">
            <Input v-model="searchInput" @on-change="searchInputChange" style="width: 50%" search></Input>
            <Button type="primary" custom-icon="iconfont icon-add" size="small" @click="add"></Button>
            <Button type="success" custom-icon="iconfont icon-edit" size="small" @click="edit"></Button>
            <Button type="error" custom-icon="iconfont icon-delete" size="small" @click="del"></Button>
          </div>
          <div style="width: 100%">
            <menu-tree :style="{height: (splitHeight-25-36)+'px'}" @selectMenu="selectMenu" ref="menuTree"></menu-tree>
          </div>
        </div>
        <div slot="right" class="menu-split-pane">
          <info  :style="{height: (splitHeight-20)+'px'}" @menuAddUpdateOver="menuAddUpdateOver" ref="info"></info>
        </div>
      </Split>
    </div>
  </div>
</template>

<script>

  export default {
    name: "menus",
    computed: {
      splitHeight: function () {
        //获取浏览器显示内容部分的高度
        let contentHeightPX = this.$store.getters.contentHeightPX;
        // 10 是外部上下分开各5px所以-10
        let splitHeight = contentHeightPX - 10;
        return splitHeight;
      }
    },
    components: {
      "menuTree": () => import('./component/menu-tree'),
      "info": () => import('./component/info')
    },
    data () {
      return {
        // 面板分割位置，0到1  0向左 1向右
        split: 0.3,

        // 输入搜索框内容
        searchInput: ''
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      /**
       * Description :数据初始化
       * @param
       * @return
       * @author     :loulan
       * */
      init () {
      },

      /**
       * Description :菜单添加修改完成事件(需要刷新菜单树)
       * @param
       * @return
       * @author     :loulan
       * */
      menuAddUpdateOver(){
        this.$refs.menuTree.getMenuTree();
      },

      /**
       * Description :searchaInput发生改变事件
       * @param
       * @return
       * @author     :loulan
       * */
      searchInputChange(){
        this.$refs.menuTree.searchInputChange(this.searchInput);
      },

      /**
       * Description :菜单树发生点击选中了某个节点,那么要将选中的数据传递给右边信息栏
       * @param
       * @return
       * @author     :loulan
       * */
      selectMenu (menuData) {
        this.$refs.info.refreshData(menuData);
      },

      /**
       * Description :添加按钮
       * @param
       * @return
       * @author     :loulan
       * */
      add() {
        this.$refs.info.infoMenuAdd();
      },

      /**
       * Description :编辑按钮
       * @param
       * @return
       * @author     :loulan
       * */
      edit () {
        this.$refs.info.infoMenuEdit();
      },

      /**
       * Description :删除按钮
       * @param
       * @return
       * @author     :loulan
       * */
      del () {
        this.$refs.info.infoMenuDelete();
      }
    }
  }
</script>

<style scoped>
  .menu-split{
    margin: 5px;
    border: 1px solid #dcdee2;
  }
  .menu-split-pane{
    overflow: auto;
    overflow-y: auto;
    padding: 10px;
  }
</style>
