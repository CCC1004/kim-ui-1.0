<template>
	<div>
    <!--收索-->
    <div style="margin-bottom: 10px">
      <Input v-model="searchContent" placeholder="请输入要收索的资源名称" style="width: 50%"></Input>
      <Button type="primary" custom-icon="iconfont icon-search" size="small" style="margin-left: 10px" @click="search">查询</Button>
      <Button type="info" custom-icon="iconfont icon-add" size="small"  @click="add" style="margin-left: 10px">添加</Button>
    </div>
    <!--表格-->
    <div>
      <Table  max-height="500" :columns="columns" :data="elementData"></Table>
    </div>
    <!--模态框-->
    <div v-show="false">
      <Modal :value="modalOperate.operate === elementModelOperate.add || modalOperate.operate === elementModelOperate.edit"
             mark
             :mask-closable="false"
             :closable="false"
             :loading="true"
             :title="modalOperate[modalOperate.operate].title">
        <div>
          <table width="100%">
            <tr>
              <td align="right" width="20%">
                <span class="requiredSpan">*</span>
                <span class="infoSpanFont">控件编码:</span>
              </td>
              <td align="left" width="90%">
                <Vinput  v-model="elementForm.code"  placeholder="请输入控件编码" placement="right"
                         validate="required" validate-scope="infoElement" name="控件编码">
                </Vinput>
              </td>
            </tr>
            <tr>
              <td align="right" width="20%">
                <span class="requiredSpan">*</span>
                <span class="infoSpanFont">控件名称:</span>
              </td>
              <td align="left" width="90%">
                <Vinput  v-model="elementForm.name"  placeholder="请输入控件名称" placement="right"
                         validate="required" validate-scope="infoElement" name="控件名称">
                </Vinput>
              </td>
            </tr>
            <tr>
              <td align="right" width="20%">
                <span class="requiredSpan">*</span>
                <span class="infoSpanFont">控件类型:</span>
              </td>
              <td align="left" width="90%">
                <Input v-model="elementForm.type" readonly   placeholder="请输入控件类型" value="button">
                </Input>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span class="requiredSpan">*</span>
                <span class="infoSpanFont">是否启用:</span>
              </td>
              <td align="left" >
                <Select v-model="elementForm.enable" style="width:100%" placeholder="请选择是否启用">
                  <Option v-for="item in isEnableDicts" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td align="right" width="20%">
                <span class="infoSpanFont">备注:</span>
              </td>
              <td align="left" width="90%">
                <Input  v-model="elementForm.nt"  placeholder="请输入备注">
                </Input>
              </td>
            </tr>
          </table>
        </div>
        <div slot="footer">
          <Button type="primary" style="margin-left: 10px" :loading="submitLoading" @click="submit">确定</Button>
          <Button type="warning" @click="cancel" style="margin-left: 20px">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import {
    add,
    update,
    getResourceById,
    getElementByPid,
    deleteResourceById
  } from '@/api/frame/menu/menu'
  import {
    getDictById,
    converCombineObj
  } from '@/utils/tool'

  export default {
    name: "info-element",
    data() {
      return {
        // 列
        columns: [
          {
            title: '资源名称',
            key: 'name',
            width: 200,
            fixed: 'left'
          },
          {
            title: '资源编码',
            key: 'code'
          },
          {
            title: '资源类型',

            key: 'type'
          },
          {
            title: '操作',
            width: 175,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    customIcon: 'iconfont icon-edit'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {this.edit(params)}
                  }
                }, ''),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    customIcon: 'iconfont icon-delete'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {this.delete(params)}
                  }
                }, '')
              ]);
            }
          }
        ],

        // element提交项
        elementForm:{
          uuid: '',
          code: '',
          type: 'button',
          name: '',
          pid: '-1',
          enable: '1',
          nt: ''
        },

        // 字典数据[是否使能]
        isEnableDicts: [],

        // 页面控件数据
        elementData: [],

        //当前菜单数据
        currentMenu: {},

        // 模态框要进行的操作
        elementModelOperate: {
          add: 'add',
          edit: 'edit',
          no: 'no'
        },

        /*这个模态框要显示的标题以及当前要进行的操作集合数据*/
        modalOperate:{
          operate: 'no',
          add: {
            title: "新增"
          },
          edit: {
            title: "编辑"
          },
          no: {
            title: '无'
          }
        },

        // 搜索内容
        searchContent: '',

        // 确认提交按钮的加载状态
        submitLoading: false
      }
    },
    mounted() {
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
      },

      /**
       * Description :刷新数据(菜单被点击之后)
       * @param       data 被选中的菜单
       * @return
       * @author     :loulan
       * */
      refreshData (menuData) {
        this.currentMenu = menuData;
        getElementByPid(menuData.uuid).then(response => {
          this.elementData = response.data;
        })
      },

      /**
       * Description :收索指定的内容(纯前端收索)
       * @param
       * @return
       * @author     :loulan
       * */
      search() {
        if (this.currentMenu.uuid === undefined) {
          this.$Message.warning('请先选择一条菜单');
          return ;
        }
        getElementByPid(this.currentMenu.uuid).then(response => {
          let tempData = new Array();
          const datas = response.data;
          for (const data of datas) {
            if (data.name.search(this.searchContent) != -1) {
              tempData.push(data);
            }
          }
          this.elementData = tempData;
        });
      },

      /**
       * Description :添加数据
       * @param
       * @return
       * @author     :loulan
       * */
      add() {
        if (this.currentMenu.uuid === undefined) {
          this.$Message.warning('请先选择一条菜单');
          return ;
        }
        this.resetData('elementForm');
        this.modalOperate.operate = this.elementModelOperate.add;
      },

      /**
       * Description :编辑数据
       * @param
       * @return
       * @author     :loulan
       * */
      edit(data) {
        this.resetData('elementForm');
        getResourceById(data.row.uuid).then (response => {
          const data = response.data;
          // 属性覆盖合并，避免部分属性不存在导致的错误
          converCombineObj(this.elementForm,data);
        });
        this.modalOperate.operate = this.elementModelOperate.edit;
      },

      /**
       * Description :element删除
       * @param
       * @return
       * @author     :loulan
       * */
      delete(data) {
        this.$confirm("提示","确定删除吗？").then(() => {
          deleteResourceById(data.row.uuid).then(response => {
            // 确认删除之后
            if (response.data === true) {
              this.$operateNotice.success('操作提示','删除成功');
              // 添加之后重新获取数据
              this.refreshData(this.currentMenu);
            } else {
              this.$operateNotice.success('操作提示','删除失败');
            }
          });
        });
      },

      /**
       * Description :确定提交数据按钮
       * @param       
       * @return
       * @author     :loulan
       * */
      submit(){
        this.$validator.validate("infoElement.*").then(result => {
          if (result) {
            if (this.modalOperate.operate === this.elementModelOperate.add) {   // 添加操作
              // 提交按钮变为加载状态
              this.submitLoading = true;

              this.elementForm.pid = this.currentMenu.uuid;
              add(this.elementForm).then(response => {
                // 确认添加之后
                if (response.data === true) {
                  this.$operateNotice.success('操作提示','添加成功');

                  // 关闭模态框
                  this.modalOperate.operate = this.elementModelOperate.no;
                  // 添加之后重新获取数据
                  this.refreshData(this.currentMenu);
                } else {
                  this.$operateNotice.success('操作提示','添加失败');
                }

                this.submitLoading = false;
              })
            }else if (this.modalOperate.operate === this.elementModelOperate.edit) {  // 跟新操作
              update(this.elementForm).then(response => {
                // 确认添加之后
                if (response.data === true) {
                  this.$operateNotice.success('操作提示','更新成功');
                  // 关闭模态框
                  this.modalOperate.operate = this.elementModelOperate.no;
                  // 添加之后重新获取数据
                  this.refreshData(this.currentMenu);
                } else {
                  this.$operateNotice.success('操作提示','更新失败');
                }

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
        this.modalOperate.operate = this.elementModelOperate.no;
        this.resetData('elementForm');
      },

      /**
       * Description :复位数据
       * @param       data要复位的数据
       * @return
       * @author     :loulan
       * */
      resetData(data) {
        if (data === 'elementForm') {
          this.elementForm = {
            uuid: '',
            code: '',
            type: 'button',
            name: '',
            pid: '',
            enable: '1',
            nt: ''
          }
        }
      }
    }
  }
</script>

<style scoped>
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

  td {
    padding: 5px 10px;
  }
</style>
