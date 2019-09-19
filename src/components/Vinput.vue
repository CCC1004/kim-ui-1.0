<!--使用说明-->
<!--
这个就是一个input输入框，再其上加了验证显示控件。使用
该组件需要遵循iview的input输入框，验证需要准寻vee-validate的规则。
属性需要注意的有3个（这3个事必填项，其余的使用和iview的Input用法一样）
validate: 这个和v-validate填写的内容应该事一样的
validate-scope: 这个事验证的域，或者说事范围，因为需要验证的各种框挺多，但是你有不需要全部验证，那么就设置一个域，这个域内的东西就会得到验证，其它的不会
name： 这个就简单了，要验证输入框的名字
-->
<template>
  <div>
    <Tooltip :disabled="!errors.has(name,validateScope)"
             :content="errors.first(name,validateScope)"
             title="" style="width: 100%"
             :placement="placement" always="always" theme="light">
      <Input ref="Vinput"
             :type="type"
             :value="value"
             :size="size"
             :placeholder="placeholder"
             :clearable="clearable"
             :disabled="disabled"
             :readonly="readonly"
             :maxlength="maxlength"
             :icon="icon"
             :prefix="prefix"
             :suffix="suffix"
             :search="search"
             :enter-button="enterButton"
             :rows="rows"
             :autosize="autosize"
             :number="number"
             :autofocus="autofocus"
             :autocomplete="autocomplete"
             :element-id="elementId"
             :spellcheck="spellcheck"
             :wrap="wrap"
             :name="name"
             v-validate="validate"
             :data-vv-scope="validateScope"
             v-model="vinputValue"

             @on-enter="onEnter"
             @on-click="onClick"
             @on-change="onChange"
             @on-focus="onFocus"
             @on-blur="onBlur"
             @on-keyup="onKeyup"
             @on-keydown="onKeydown"
             @on-keypress="onKeypress"
             @on-search="onSearch"
             @on-clear="onClear">
      </Input>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    props: {
      /*以下是提示的属性tooltip*/
      placement: {
        type: String,
        default: 'top-end'
      },
      /*一下是input的属性*/
      type: {
        default: 'text'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      size: {
        default () {
          return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
        }
      },
      placeholder: {
        type: String,
        default: ''
      },
      maxlength: {
        type: Number
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      readonly: {
        type: Boolean,
        default: false
      },
      number: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      spellcheck: {
        type: Boolean,
        default: false
      },
      autocomplete: {
        type: String,
        default: 'off'
      },
      clearable: {
        type: Boolean,
        default: false
      },
      elementId: {
        type: String
      },
      wrap: {
        default: 'soft'
      },
      prefix: {
        type: String,
        default: ''
      },
      suffix: {
        type: String,
        default: ''
      },
      search: {
        type: Boolean,
        default: false
      },
      enterButton: {
        type: [Boolean, String],
        default: false
      },

      name:{
        required: true,
        type: String,
        default: ""
      },
      validate: {
        required: true,
        type: String,
        default: "required"
      },
      validateScope: {
        required: true,
        type: String,
        default: "dawn-vue"
      }
    },
    data() {
      return {
        vinputValue: ''
      }
    },
    computed: {},
    watch: {
      /*实现使用v-model进行双向数据绑定*/
      //父级使用v-model时使数据发生变化这个监听器触发
      value: {
        handler(newValue) {
          this.vinputValue = newValue;
        },
        immediate: true
      },
      //输入框内容发生变化监听器触发这个事件
      vinputValue: {
        handler(newValue){
          //input事件就是触发v-model的关键，所以这里使用input
          this.$emit('input', newValue)
        },
        immediate: true
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        //  要进行初始化的东西
      },
      /*以下方法为input的事件方法*/
      onEnter(event) {
        this.$emit('on-enter',event);
      },
      onClick(event) {
        this.$emit('on-click',event);
      },
      onChange(event) {
        this.$emit('on-change',event);
      },
      onFocus() {
        this.$emit('on-focus');
      },
      onBlur() {
        this.$emit('on-blur');
      },
      onKeyup(event) {
        this.$emit('on-keyup',event);
      },
      onKeydown(event) {
        this.$emit('on-keydown',event);
      },
      onKeypress(event) {
        this.$emit('on-keypress',event);
      },
      onSearch(value) {
        this.$emit('on-search',value);
      },
      onClear() {
        this.$emit('on-clear');
      }
    }
  }
</script>

<style scoped>

</style>
