/*********************************************************
 ** 描述:  这个是通用的工具类
 ** 日期： 2019/8/30 14:19
 ** 作者： 楼兰
 ** 版本： 0.0.0
 *********************************************************/
import store from "@/store/index"

/**
 * Description :将数组list集合转化为树状(递归方式)
 * @param       idName id属性的字段名称，有的是uuid
 * @param       pidName pid属性的字段名称
 * @param       PidValue 顶级父类的pid的值（一般为-1）
 * @param       arr 数组list等
 * @return      树状list数据
 * @author     :loulan
 * */
export function arrayToTree(idName, pidName, pidValue, arr) {
  let tempChildren = new Array();
  let tempArr = arr;

  for (const obj of tempArr) {
    // 判断当前对象的id是否和参数pid值相等
    if (obj[pidName] === pidValue) {
      // 相等先将该数据放入临时数组中，说明他是上面参数pidValue所有者的字类对象
      tempChildren.push(obj);
      // 然后再去判断当前对象是否也有字类
      let children = arrayToTree(idName, pidName, obj[idName], tempArr);
      // 如果当前对象也有字类那么写入对象中,没有不写
      if (children.length > 0) {
        obj['children'] = children;
      }
    }
  }
  // 返回pidVlue所有者的子类
  return tempChildren;
}

/**
 * Description :通过字典id获取字典对象集合
 * @param       dictid 字典id编码
 * @return      指定编码的字典对象集合
 * @author     :loulan
 * */
export function getDictById(dictid) {
  let tempDict = [];
  const dicts = store.getters.dicts;
  for (const dict of dicts) {
    if (dict.dictid === dictid) {
      tempDict.push(dict);
    }
  }

  return new Promise((resolve,reject)=> {
    resolve(tempDict);
  })
}

/**
 * Description :让源数据覆盖并合并目标数据
 * 用法用处: 很多时候后端返回来的json数据的null项时不存在的,也就是生成json的时候就被干掉了,使用这部分数据
 * 进行动态显示的时候,就会造成一些项的未定义而报错,所以将我们自己定义的对象和返回的数据合并被覆盖,这样需要的
 * 数据都会存在
 * @param       target 要被覆盖合并的目标对象
 * @param       source 进行合并覆盖的源数据
 * @return
 * @author     :loulan
 * */
export function converCombineObj(target,source) {
  return Object.assign(target,source);
}

/**
 * Description :判断两个数组是否相等
 * @param
 * @return
 * @author     :loulan
 * */
export function arrayEqual(arr1,arr2) {
  // 如果数组判定其中一个或者全部都是未定义，那么判定为不等
  if (arr1 === undefined || arr2 === undefined) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  } else {
    let a1 = new Array();
    let a2 = new Array();

    for (const arr of arr1) {
      a1.push(arr);
    }

    for (const arr of arr2) {
      a2.push(arr);
    }
    // 采用的方式是排序之后转化为字符串进行比较的方式
    return a1.sort().toString() === a2.sort().toString();
  }
}
