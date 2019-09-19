<template>
	<div style="position: relative">
    <table style="width: 100%">
      <tr>
        <td align="right">
          <span class="requiredSpan">*</span>
          <span class="infoSpanFont">编码路径:</span>
        </td>
        <td align="left" colspan="3">
          <Vinput size="large" v-model="menuForm.code" :disabled="currentOperate!='add' && currentOperate!='edit'"
                  placeholder="请输入编码(用于路由path)"
                  validate="required" validate-scope="infoMenu" name="编码路径">
          </Vinput>
        </td>
      </tr>
      <tr>
        <td align="right">
          <span class="requiredSpan">*</span>
          <span class="infoSpanFont">资源标题:</span>
        </td>
        <td align="left" colspan="3">
          <Vinput size="large" v-model="menuForm.name" :disabled="currentOperate!='add' && currentOperate!='edit'"
                  placeholder="请输入资源标题(用于路由name)"
                  validate="required" validate-scope="infoMenu" name="资源标题"></Vinput>
        </td>
      </tr>
      <tr>
        <td align="right">
          <span class="infoSpanFont">资源路径:</span>
        </td>
        <td align="left" colspan="3">
          <Input size="large" v-model="menuForm.uri" :disabled="currentOperate!='add' && currentOperate!='edit'"
                  placeholder="请输入资源路径(组件路径)"></Input>
        </td>
      </tr>
      <tr>
        <td align="right" style="width: 15%">
          <span class="requiredSpan">*</span>
          <span class="infoSpanFont">类型:</span>
        </td>
        <td align="left" style="width: 35%">
          <Select size="large" v-model="menuForm.type" :disabled="currentOperate!='add' && currentOperate!='edit'" style="width:100%" placeholder="请选择菜单项">
            <Option value="dirt" >菜单组(dirt)</Option>
            <Option value="menu" >菜单(menu)</Option>
          </Select>
        </td>

        <td align="right" style="width: 15%">
          <span class="requiredSpan">*</span>
          <span class="infoSpanFont">是否启用:</span>
        </td>
        <td align="left" style="width: 35%">
          <Select size="large" v-model="menuForm.enable" :disabled="currentOperate!='add' && currentOperate!='edit'" style="width:100%" placeholder="请选择是否启用">
            <Option v-for="item in isEnableDicts" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </td>
      </tr>
      <tr>
        <td align="right">
          <span class="requiredSpan">*</span>
          <span class="infoSpanFont">父级节点:</span>
        </td>
        <td align="left" colspan="3">
          <Select size="large" v-model="menuForm.pid" :disabled="currentOperate!='add' && currentOperate!='edit'"
                  style="width:100%" placeholder="请选择父级节点" filterable>
            <Option value="-1">顶级</Option>
            <Option v-for="item in menuArray" :value="item.uuid" :key="item.uuid">{{ item.name }}</Option>
          </Select>
        </td>

      </tr>
      <tr>
        <td align="right"><span class="infoSpanFont">排序顺序:</span></td>
        <td align="left" colspan="3">
          <Input size="large" v-model="menuForm.orderNum" :disabled="currentOperate!='add' && currentOperate!='edit'" placeholder="请设置排序顺序"></Input>
        </td>
      </tr>
      <tr>
        <td align="right"><span class="infoSpanFont">图标编码:</span></td>
        <td align="left" colspan="3">
          <Input style="width: 70%" size="large" v-model="menuForm.icon" :disabled="currentOperate!='add' && currentOperate!='edit'" placeholder="请输入图标编码"></Input>
          <Icon style="margin-left: 15%" :custom="'iconfont '+menuForm.icon"></Icon>
        </td>
      </tr>
      <tr>
        <td align="right"><span class="infoSpanFont">备注:</span></td>
        <td align="left" colspan="3">
          <Input size="large" v-model="menuForm.nt" :disabled="currentOperate!='add' && currentOperate!='edit'" placeholder="请输入备注信息"></Input>
        </td>
      </tr>
    </table>
    <div style="margin-top: 20px" align="center">
      <Button type="primary"  size="large" @click="submit" :disabled="currentOperate!='add' && currentOperate!='edit'" :loading="submitLoading">确定</Button>
      <Button type="default"  style="margin-left: 50px" size="large" :disabled="currentOperate!='add' && currentOperate!='edit'" @click="cancel">取消</Button>
    </div>
  </div>
</template>

<script>
  import {
    getDictById,
    converCombineObj
  } from '@/utils/tool'
  import {
    add,
    update,
    getResourceById,
    getMenuAll,
    deleteResourceById
  } from '@/api/frame/menu/menu'

  export default {
    name: "info-menu",
    data() {
      return {
        // 菜单提交项
        menuForm:{
          uuid: '',
          code: '',
          type: 'menu',
          name: '',
          uri: '',
          pid: '-1',
          orderNum: '',
          icon: '',
          enable: '1',
          nt: ''
        },
        // 字典数据[是否使能]
        isEnableDicts: [],
        // 确定按钮提交状态
        submitLoading: false,
        // 更新按钮跟新状态
        updateLoading: false,
        // 菜单树，为父级节点下拉框设置
        menuArray: [],
        // 当前操作，查看【select】，添加【add】，编辑【edit】
        currentOperate: 'select'
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      /**
       * Description :初始化一些数据,比如字典等数据
       * @param
       * @return
       * @author     :loulan
       * */
      init() {
        getDictById('IS_ENABLE').then(data => {
          this.isEnableDicts = data;
        })
        this.refreshMenuNodes();
        this.resetData('menuForm');
      },
      
      /**
       * Description :刷新父级节点的菜单数据
       * @param       
       * @return
       * @author     :loulan
       * */
      refreshMenuNodes () {
        getMenuAll().then(response => {
          this.menuArray = response.data;
        })
      },

      /**
       * Description :菜单添加
       * @param
       * @return
       * @author     :loulan
       * */
      add () {
        const tempId = this.menuForm.uuid;
        this.resetData('menuForm');
        this.menuForm.pid = tempId;
        // 操作状态改为添加
        this.currentOperate = 'add';
      },

      /**
       * Description :菜单编辑
       * @param
       * @return
       * @author     :loulan
       * */
      edit () {
        // 如果编辑之前没有数据就进行提示
        if (this.menuForm.uuid === undefined || this.menuForm.uuid === '') {
          this.$Message.warning('请先选择一条数据');
        } else {
          this.currentOperate = 'edit';
        }
      },

      /**
       * Description :菜单删除
       * @param
       * @return
       * @author     :loulan
       * */
      delete() {
        // 如果编辑之前没有数据就进行提示
        if (this.menuForm.uuid === undefined || this.menuForm.uuid === '') {
          this.$Message.warning('请先选择一条菜单');
        } else {
          const tempId = this.menuForm.uuid;
          this.$confirm("提示","确定删除吗？").then(() => {
            deleteResourceById(this.menuForm.uuid).then(response => {
              // 确认删除之后
              if (response.data === true) {
                this.$operateNotice.success('操作提示','删除成功');
                // 删除之后重新获取数据
                this.$emit('menuAddUpdateOver');
                this.refreshMenuNodes();
                this.resetData('menuForm');
              } else {
                this.$operateNotice.error('操作提示','删除失败');
              }
            });
          });
        }
      },

      /**
       * Description :刷新数据(菜单被点击之后)
       * @param       data 被选中的菜单
       * @return
       * @author     :loulan
       * */
      refreshData(data) {
        getResourceById(data.uuid).then(response => {
          const data = response.data;
          // 属性覆盖合并，避免部分属性不存在导致的错误
          converCombineObj(this.menuForm,data);
          // 刷新数据之后变为不可编辑状态
          this.currentOperate = 'select';
        })
      },

      /**
       * Description :确定提交按钮(添加或者更新)
       * @param
       * @return
       * @author     :loulan
       * */
      submit() {
        this.$validator.validate("infoMenu.*").then(result => {
          if (result) {
            if (this.currentOperate === 'add') {
              // 确定按钮加载种
              this.submitLoading = true;
              add(this.menuForm).then(response => {
                // 确认添加之后
                if (response.data === true) {
                  this.$operateNotice.success('操作提示','添加成功');
                  // 添加之后重新获取数据
                  this.$emit('menuAddUpdateOver');
                  this.refreshMenuNodes();
                  // 操作状态改为查看
                  this.currentOperate = 'select';
                } else {
                  this.$operateNotice.error('操作提示','添加失败');
                }
                // 确定按钮加载结束
                this.submitLoading = false;
              })
            }else if (this.currentOperate === 'edit') {
              // 确定按钮加载种
              this.submitLoading = true;
              update(this.menuForm).then(response => {
                // 确认添加之后
                if (response.data === true) {
                  this.$operateNotice.success('操作提示','更新成功');
                  // 添加之后重新获取数据
                  this.$emit('menuAddUpdateOver');
                  this.refreshMenuNodes();
                  // 操作状态改为查看
                  this.currentOperate = 'select';
                } else {
                  this.$operateNotice.error('操作提示','更新失败');
                }
                // 确定按钮加载结束
                this.submitLoading = false;
              })
            }
          }
        });
      },

      /**
       * Description :取消按钮
       * @param
       * @return
       * @author     :loulan
       * */
      cancel() {
        this.currentOperate = 'select';
      },

      /**
       * Description :复位数据
       * @param       data要复位的数据
       * @return
       * @author     :loulan
       * */
      resetData(data) {
        if (data === 'menuForm') {
          this.menuForm = {
            uuid: '',
            code: '',
            type: 'menu',
            name: '',
            uri: '',
            pid: '-1',
            orderNum: '',
            icon: '',
            enable: '1',
            nt: ''
          }
        }
      }
    }
  }
</script>

<style scoped>
  td {
    padding: 5px 10px;
  }

  .requiredSpan{
    font-size: 16px;
    font-weight: bolder;
    color: red;
  }

  .infoSpanFont {
    font-size: 14px;
    font-weight: bolder;
    color: black;
  }
</style>
