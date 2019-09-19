<template>
  <div style="width: 97%">
    <Qtree ref="qtree"
           :data="menuTree"
           iconField="icon"
           titleField="name"
           :show-checkbox="showCheckbox"
           @on-check-change="checkChange"
           @on-select-change="selectChange"></Qtree>
  </div>
</template>

<script>
  import {getMenuAll} from '@/api/frame/menu/menu';
  import {arrayToTree} from '@/utils/tool';

  export default {
    name: "menu-tree",
    props: {
      showCheckbox: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 菜单树状数据
        menuTree: [],
        // 复选框选中的数据
        menuCheckData: [],
        // 菜单数组数据
        menuArray: []
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
      init() {
        this.getMenuTree();
      },

      /**
       * Description :搜索输入框发生改变事件
       * @param
       * @return
       * @author     :loulan
       * */
      searchInputChange(searchInput) {
        let tempMenu = new Set();

        for (const menu of this.menuArray) {
          // 遍历所有菜单，查找与搜索内容符合的菜单
          if (menu.name.indexOf(searchInput) != -1) {
            // 寻找当前菜单的父菜单
            this.menuFindParent(menu, tempMenu);
          }
        }

        this.menuTree = arrayToTree('uuid', 'pid', '-1', tempMenu);
      },

      /**
       * Description :根据菜单寻找父菜单
       * @param       menu 菜单
       * @param       tempMenu 暂时的菜单，用来保存查询出来的父菜单
       * @return
       * @author     :loulan
       * */
      menuFindParent (menu,tempMenu) {
        // 先把菜单中的子属性去掉
        menu['children'] = undefined;
        // 将当前菜单保存
        tempMenu.add(menu)
        // 如果当前菜单已经时顶级父类，直接返回
        if (menu.pid === '-1') {
          return;
        }
        // 如果当前菜单不是顶级父类，那么就查找其父类
        for (const aMenu of this.menuArray) {
          if (menu.pid === aMenu.uuid) {
            this.menuFindParent(aMenu, tempMenu);
          }
        }
      },

      /**
       * Description :获取菜单树
       * @param
       * @return
       * @author     :loulan
       * */
      getMenuTree () {
        getMenuAll().then(response => {
          this.menuTree = arrayToTree('uuid', 'pid', '-1', response.data);
          this.menuArray = response.data;
        })
      },

      /**
       * Description :获取复选框选中的数据
       * @param
       * @return
       * @author     :loulan
       * */
      getCheckedData () {
        return this.menuCheckData;
      },

      /**
       * Description :复选框被选中事件
       * @param       checkData 已经勾选节点数组
       * @param       data 当前节点数据
       * @return
       * @author     :loulan
       * */
      checkChange(checkData,data) {
        this.menuCheckData = checkData;
      },

      /**
       * Description :根据指定的id数据自动选中复选框
       * @param       checkedMenuIds 选中复选框的id数组
       * @return
       * @author     :loulan
       * */
      checkedMenu(checkedMenus) {
        this.menuCheckData = checkedMenus;

        let checkedMenuIds = new Array();
        for (const checkedMenu of checkedMenus) {
          checkedMenuIds.push(checkedMenu.uuid);
        }

        for (const menu of this.menuArray) {
          // 先将菜单复选框清空
          this.$set(menu,'checked',undefined);
          // 如果时被选中的然后选中
          if (checkedMenuIds.indexOf(menu.uuid) != -1) {
            this.$set(menu,'checked',true);
          }
        }
      },

      /**
       * Description :节点选中事件
       * @param       datas 数组形式的被选中的数据
       * @param       data 当前被选中的数据
       * @return
       * @author     :loulan
       * */
      selectChange (datas,data) {
        this.$emit('selectMenu',data);
      },
      
      /**
       * Description :取消掉点击事件发生得颜色变化
       * @param       
       * @return
       * @author     :loulan
       * */
      cancelSelectMenu () {
        this.$refs.qtree.cancelClick();
      },
    }
  }
</script>

<style scoped>

</style>
