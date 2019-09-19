<!--使用说明-->
<!--
该树是对原本iview Tree的强化版
data： 是必须传输的数据，而且传输的该数据必须经过this.QtreeData()的转化，否则回出现一些异常情况
titleField： 是要显示数据的字段
iconField： 是要显示图标的字段（该图标选用的是自定义图标，查看阿里图标库，或者本地例程），这些都在数据里面体现
multiple： 表示是否多选的情况
showCheckbox： 是否开启复选框模式
checkDirectly：  开启后，在 show-checkbox 模式下，select 的交互也将转为 check，也就是说满足先前条件，select单选和多选模式就会失效，只剩下check模式

add: 添加按钮是否显示     附带 add事件
edit： 编辑按钮是否显示   附带  edit事件
delete： 删除按钮是否显示 附带  delete事件
-->
<template>
  <Tree :render="QtreeRender"
        :data="data"
        :show-checkbox="showCheckbox"
        check-strictly
        @on-check-change="onCheckChange"
        @on-toggle-expand="onToggleExpand"></Tree>
</template>

<script>
  export default {
    name: "Qtree",
    props: {
      // 树数据
      data: {
        type: Array,
        default () {
          return [];
        }
      },
      // 树显示的title
      titleField: {
        type: String,
        default: 'titles'
      },
      // 图标字段
      iconField: {
        type: String,
        defalutl: 'icon'
      },
      // 是否支持多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 是否显示复选框
      showCheckbox: {
        type: Boolean,
        default: false
      },
      // 开启后，在 show-checkbox 模式下，select 的交互也将转为 check
      checkDirectly: {
        type: Boolean,
        default: false
      },
      // 这个一般不会使用，是在其它组件自己去设置多选模式的时候使用，例如tree-select
      selectNo: {
        type: Boolean,
        default: false
      },
      // 这个一般不会使用，是在其它组件自己去设置单选模式的时候使用，例如tree-select
      clickNo: {
        type: Boolean,
        default: false
      },
      // 添加按钮，只在单选模式
      add:{
        type: Boolean,
        default: false
      },
      // 编辑按钮，只在单选模式
      edit:{
        type: Boolean,
        default: false
      },
      // 删除按钮，只在单选模式
      delete:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 保存上次点击的数据,发生下次点击事件,可以使用这个的引用还原上次点击的数据(这里主要应用发生点击事件还原上次点击节点的背景色)
        clickData: {},
        // 多选情况下选中的数据
        selectDatas: [],
        // 复选框模式下的选中数据
        checkedDatas: [],
        // 发生点击事件之后当前节点的背景色
        clickColor: 'rgba(45, 140, 240,0.7)',
        // 鼠标移入当前节点的背景色
        enterColor: 'rgba(45, 140, 240,0.3)',
      }
    },
    methods: {


      /**
       * Description :重写树体
       * @param
       * @return
       * @author     :loulan
       * */
      QtreeRender(h, { root, node, data }) {
        return h('div', {
          style: {
            cursor: 'default',   // 保证鼠标碰到字体不会变成其它还是箭头
            fontSize: '14px',
            display: 'inline-block',
            width: '100%',
            margin:'-8px 0px',
            position: 'relative',
            backgroundColor: data.qtreeClickColor
          }
        }, [
          /*树部分*/
          h('div',{
            style: {
              width: '100%',
              paddingTop: '2.5px',
              paddingBottom: '2.5px',
              backgroundColor: data.qtreeEnterColor
            },
            on: {
              mouseenter: () => {
                // 鼠标移入变换颜色
                this.$set(data,'qtreeEnterColor',this.enterColor);
              },
              mouseleave: () => {
                // 鼠标移除回复颜色(就是让背景色为未定义)
                this.$set(data,'qtreeEnterColor',undefined);
              },
              click: () => {
                this.nodeClick(data);
              }
            }
          }, [
            // 采用栅格的方式，前面22格显示图标和数据，后面2格显示的是对勾（多选框使用）
            h('Row',{},[
              h('Col',{
                props: {
                  span: !this.showCheckbox && !this.multiple &&(this.add || this.edit || this.delete)?'16':'22'
                }
              },[
                h('Icon', {
                  props: {
                    custom: 'iconfont '+data[this.iconField]
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span',{
                  style: {
                    // 多选情况下，选中要改变字体颜色
                    color: this.multiple && data.selected? this.clickColor: ''
                  }
                },data[this.titleField])
              ]),
              // 是否激活增删改按钮
              h('Col',{
                props: {
                  // 激活了添加，编辑，删除按钮，同时必须未单选模式，也就是不是复选框模式也不是多选模式才可以
                  span: !this.showCheckbox && !this.multiple &&(this.add || this.edit || this.delete)?'6':'0'
                }
              },[
                h('Icon', {
                  props: {
                    custom: 'iconfont icon-add'
                  },
                  style: {
                    left: '0px',
                    marginRight: '8px',
                    cursor: 'pointer',
                    display: !this.showCheckbox && !this.multiple && this.add && data.qtreeEnterColor===this.enterColor? undefined : 'none',
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      event.stopPropagation();
                      this.$emit('add',data);
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    custom: 'iconfont icon-edit'
                  },
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    display: !this.showCheckbox && !this.multiple && this.edit && data.qtreeEnterColor===this.enterColor? undefined : 'none',
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      event.stopPropagation();
                      this.$emit('edit',data);
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    custom: 'iconfont icon-delete'
                  },
                  style: {
                    right: '0px',
                    marginRight: '0px',
                    cursor: 'pointer',
                    display: !this.showCheckbox && !this.multiple && this.delete && data.qtreeEnterColor===this.enterColor? undefined : 'none',
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      event.stopPropagation();
                      this.$emit('delete',data);
                    }
                  }
                })
              ]),
              h('Col',{
                props: {
                  span: '2'
                },
                style: {
                  textAlign: 'right'
                }
              },[
                h('Icon', {
                  props: {
                    type: 'md-checkmark'
                  },
                  style: {
                    right: '0px',
                    marginRight: '0px',
                    display: this.multiple && data.selected? undefined : 'none',
                    color: this.clickColor
                  }
                }),
              ])
            ])
          ])
        ]);
      },

      /**
       * Description :节点点击事件
       * @param       data 当前数据
       * @return
       * @author     :loulan
       * */
      nodeClick(data) {
        /*判断是否将select设置为了check，是并判断是否是复选框模式，是的话，那么单选和多选将会失效，只有复选框模式有效*/
        if (this.checkDirectly && this.showCheckbox) {
          // 如果点击了被选中的，那么改变为未定义
          if (data.checked === true) {
            this.$set(data,'checked',undefined);
            (this.checkedDatas).remove(data);
          } else {
            // 如果点击了没有选中的，那么改变为选中
            this.$set(data,'checked',true);
            (this.checkedDatas).push(data);
          }
          // 触发复选框树
          this.$emit('on-check-change', this.checkedDatas, data);
        }
        /*如果没有开启checkDirectly，那么单选或多选是可以和复选框模式一块存在的，并且之间互不干扰*/
        else {

          /*判断是否时多选，这个是多选模式*/
          if (this.multiple && !this.selectNo) {
            // 如果点击了被选中的，那么改变为未定义
            if (data.selected === true) {
              this.$set(data, 'selected', undefined);
              (this.selectDatas).remove(data);
            } else {
              // 如果点击了没有选中的，那么改变为选中
              this.$set(data, 'selected', true);
              (this.selectDatas).push(data);
            }
          }
          /*这个是单选模式*/
          else if(!this.multiple && !this.clickNo){
            // 发生点击事件,根据引用还原上次点击事件数据的颜色
            this.$set(this.clickData, 'qtreeClickColor', undefined);
            // 本次点击数据的颜色设置
            this.$set(data, 'qtreeClickColor', this.clickColor);
            // 将本次点击事件的数据放入引用,以便下次点击事件使用
            this.clickData = data;

            this.selectDatas = [];
            this.selectDatas.push(data);
          }

          // 如果不是其它组件自己设置模式（那么本组件自己设置模式，否则由调用组件自己设置）
          if (!this.clickNo && !this.selectNo) {
            // 触发select-change事件
            this.$emit('on-select-change', this.selectDatas, data);
          } else {
            // 触发select-change事件,其它组件自动记录选中数据
            this.$emit('on-select-change', undefined, data);
          }
        }
      },


      /**
       * Description :点击复选框时触发的事件
       * @param       datas,当前已经选中的节点数组
       * @param       data: 当前项
       * @return
       * @author     :loulan
       * */
      onCheckChange(datas,data) {
        // 清空复选数据
        this.checkedDatas = [];
        // 赋值复选模式数据，至于为说明这样操作，是因为有一个将select设置为check的属性需要将复选数据搞到当前checkedDatas里面
        this.checkedDatas = datas;
        this.$emit('on-check-change', this.checkedDatas, data);
      },

      /**
       * Description :展开和收起子列表时触发
       * @param       data 当前节点的数据
       * @return
       * @author     :loulan
       * */
      onToggleExpand(data){
        this.$emit('on-toggle-expand', data);
      },

      /* ##############################提供组件内可被调用的一些方法################################# */

      /**
       * Description :取消点击，单选模式下取消选中情况下的变化
       * @param
       * @return
       * @author     :loulan
       * */
      cancelClick() {
        // 取消选中的颜色
        this.$set(this.clickData,'qtreeClickColor',undefined);
        // 取消掉选中的数据
        this.clickData = {};
      }
    }
  }
</script>

<style scoped>

</style>
