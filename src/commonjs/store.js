/**
 * Created by chensenwei on 2017/9/1.
 */
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__;
//  第一次时判断seller是否为空
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
//  seller为空时,将seller用parse解析成json对象
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
//  为id添加数据
  seller[id][key] = value;
//  将id对应的数据 存储进localStorage.__seller__
  window.localStorage.__seller__ = JSON.stringify(seller);
};

//  读取商家对应的id数据
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
