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
      <Table  max-height="500" :columns="columns" :data="uriData"></Table>
    </div>
    <!--模态框-->
    <div v-show="false">
      <Modal :value="modalOperate.operate === uriModelOperate.add || modalOperate.operate === uriModelOperate.edit"
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
                <span class="infoSpanFont">uri编码:</span>
              </td>
              <td align="left" width="90%">
                <Vinput  v-model="uriForm.code"  placeholder="请输入uri编码" placement="right"
                         validate="required" validate-scope="infoUri" name="uri编码">
                </Vinput>
              </td>
            </tr>
            <tr>
              <td align="right" width="20%">
                <span class="requiredSpan">*</span>
                <span class="infoSpanFont">资源名称:</span>
              </td>
              <td align="left" width="90%">
                <Vinput  v-model="uriForm.name"  placeholder="请输入资源名称" placement="right"
                         validate="required" validate-scope="infoUri" name="资源名称">
                </Vinput>
              </td>
            </tr>
            <tr>
              <td align="right" width="20%">
                <span class="requiredSpan">*</span>
                <span class="infoSpanFont">资源类型:</span>
              </td>
              <td align="left" width="90%">
                <Input v-model="uriForm.type" readonly   placeholder="请输入资源类型" value="uri">
                </Input>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span class="requiredSpan">*</span>
                <span class="infoSpanFont">资源路径:</span>
              </td>
              <td align="left" >
                <Vinput  v-model="uriForm.uri"  placeholder="请输入资源访问路径" placement="right"
                         validate="required" validate-scope="infoUri" name="资源路径">
                </Vinput>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span class="infoSpanFont">请求类型:</span>
              </td>
              <td align="left" >
                <Select size="large" v-model="uriForm.method" style="width:100%" placeholder="请选择请求类型">
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td align="right" width="20%">
                <span class="infoSpanFont">备注:</span>
              </td>
              <td align="left" width="90%">
                <Input  v-model="uriForm.nt"  placeholder="请输入备注">
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
    getUriByPid,
    deleteResourceById
  } from '@/api/frame/menu/menu'
  import {
    getDictById,
    converCombineObj
  } from '@/utils/tool'

  export default {
    name: "info-uri",
    data(){
      return {
        // 列
        columns: [
          {
            title: '资源名称',
            key: 'name',
            width: 200,
            tooltip: true,
            fixed: 'left'
          },
          {
            title: '资源路径',
            tooltip: true,
            key: 'uri'
          },
          {
            title: '访问方法',
            width: 150,
            key: 'method'
          },
          {
            title: '操作',
            width: 150,
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
        uriForm:{
          uuid: '',
          code: '',
          type: 'uri',
          name: '',
          uri: '',
          method: 'GET',
          pid: '-1',
          enable: '1',
          nt: ''
        },

        // 表格数据
        uriData: [],

        // 模态框要进行的操作
        uriModelOperate: {
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

        // 当前被选中的菜单
        currentMenu: {},

        // 确认提交按钮的加载状态
        submitLoading: false
      }
    },
    methods: {
      /**
       * Description :刷新数据(菜单被点击之后)
       * @param       data 被选中的菜单
       * @return
       * @author     :loulan
       * */
      refreshData (menuData) {
        this.currentMenu = menuData;
        getUriByPid(menuData.uuid).then(response => {
          this.uriData = response.data;
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
        getUriByPid(this.currentMenu.uuid).then(response => {
          let tempData = new Array();
          const datas = response.data;
          for (const data of datas) {
            if (data.name.search(this.searchContent) != -1) {
              tempData.push(data);
            }
          }
          this.uriData = tempData;
        })
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
        this.resetData('uriForm');
        this.modalOperate.operate = this.uriModelOperate.add;
      },

      /**
       * Description :编辑数据
       * @param
       * @return
       * @author     :loulan
       * */
      edit(data) {
        this.resetData('uriForm');
        getResourceById(data.row.uuid).then (response => {
          const data = response.data;
          // 属性覆盖合并，避免部分属性不存在导致的错误
          converCombineObj(this.uriForm,data);
        });
        this.modalOperate.operate = this.uriModelOperate.edit;
      },

      /**
       * Description :uri删除
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
        this.$validator.validate("infoUri.*").then(result => {
          if (result) {
            // 提交按钮变为加载状态
            this.submitLoading = true;
            if (this.modalOperate.operate === this.uriModelOperate.add) {   // 添加操作
              this.uriForm.pid = this.currentMenu.uuid;
              this.uriForm.enable = '1';
              add(this.uriForm).then(response => {
                // 确认添加之后
                if (response.data === true) {
                  this.$operateNotice.success('操作提示','添加成功');
                  // 关闭模态框
                  this.modalOperate.operate = this.uriModelOperate.no;
                  // 添加之后重新获取数据
                  this.refreshData(this.currentMenu);
                } else {
                  this.$operateNotice.success('操作提示','添加失败');
                }

                this.submitLoading = false;
              })
            }else if (this.modalOperate.operate === this.uriModelOperate.edit) {  // 跟新操作
              update(this.uriForm).then(response => {
                // 确认添加之后
                if (response.data === true) {
                  this.$operateNotice.success('操作提示','更新成功');
                  // 关闭模态框
                  this.modalOperate.operate = this.uriModelOperate.no;
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
        this.modalOperate.operate = this.uriModelOperate.no;
        this.resetData('uriForm');
      },

      /**
       * Description :复位数据
       * @param       data要复位的数据
       * @return
       * @author     :loulan
       * */
      resetData(data) {
        if (data === 'uriForm') {
          this.uriForm = {
            uuid: '',
            code: '',
            type: 'uri',
            name: '',
            uri: '',
            method: 'GET',
            pid: '-1',
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
