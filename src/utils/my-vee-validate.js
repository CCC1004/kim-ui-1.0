import Vue from 'vue';
import zh_CN from 'vee-validate/dist/locale/zh_CN'; // 引入中文文件
import VeeValidate, { Validator } from 'vee-validate'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)


const i18n = new VueI18n({
  locale: 'zh_CN'
})

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fieldBags',  // 报冲突时 可自定义修改字段名称
  delay: 0, // 错误提示的延迟时间
  strict: true, // 没有设置规则的表单不进行校验，
  enableAutoClasses: false,
  locale: 'zh_CN', // 对语言（中文）的配置
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input', //* *input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
  inject: true,
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
}

const dictionary = {
  zh_CN: {
    messages: {
      required: (field) => field + '不能为空'
    }
  }
}


Vue.use(VeeValidate, config)
Validator.localize(dictionary);
