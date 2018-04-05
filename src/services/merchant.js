import request from '../utils/request';
import qs from 'qs';
import {getSessionStorage, isObject} from "../utils/helper";


export const ContentType = {
  JSON : "application/json;charset=UTF-8",
  FORM : "application/x-www-form-urlencoded; charset=UTF-8"
};

export const HttpMethod = {
  GET : "GET",
  POST : "POST",
  PUT : "PUT",
  PATCH : "PATCH",
  DELETE : "DELETE",
  OPTIONS : "OPTIONS"
};

/**
 * 封装header
 * @returns {{"Content-Type": string}}
 */
const getTokenHeaders = () => {
    return {
      authorization:getSessionStorage("token")
    }
};
/**
 *
 * @returns {{"Content-Type": string, authorization}}
 */
const getTokenFormHeaders = () =>{
  return {
    "Content-Type": ContentType.FORM,
    authorization:getSessionStorage("token")
  }
};

/**
 *
 * @returns {{"Content-Type": string}}
 */
const getNoTokenFormHeader = () =>{
  return {
    "Content-Type": ContentType.FORM,
  }
};

/**
 * 登录
 * @param params
 * @returns {Object}
 */
export function login(params) {
  return request(`/v1/user/login`, {
    method:HttpMethod.POST,
    headers: getNoTokenFormHeader(),
    body:qs.stringify(params)
  })
}

/**
 * 商家端获取首页信息
 * @param merchantId
 * @returns {Object}
 */
export function getMerchantInfo(merchantId) {
  return request(`/v1/home/${merchantId}`, {
    method: HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 获取订单列表
 * @param merchantId
 * @param tableId
 * @returns {Object}
 */
export function getOrderList(merchantId,tableId) {
  let path;
  if(isObject(tableId)) {
    path=`/v1/order/${merchantId}/table/${tableId}`;
  } else {
    path=`/v1/order/${merchantId}`;
  }
  return request(path, {
    method: HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 获取某张台的订单列表
 * @param merchantId
 * @param tableNum
 * @returns {Object}
 */
export function getTableOrderList(merchantId,tableNum) {
  return request(`/v1/order/${merchantId}/table/${tableNum}`, {
    method: HttpMethod.GET,
    headers:getTokenHeaders()
  })
}

/**
 * 修改订单信息
 * @param params
 * @returns {Object}
 */
export function updateOrder(params) {
  return request(`/v1/order/${params.id}/${params.orderId}`, {
    method:HttpMethod.PUT,
    headers: getTokenFormHeaders(),
    body:qs.stringify(params)
  });
}


/**
 * 修改订单状态
 * @param params
 * @returns {Object}
 */
export function updateOrderStatus(params) {
  return request(`/v1/order/${params.id}/status/${params.orderId}`, {
    method:HttpMethod.PUT,
    headers:getTokenFormHeaders(),
    body:qs.stringify(params)
  });
}

//获取订单详情
export function getOrderDetail(merchantId, orderId) {
  return request(`/v1/order/${merchantId}/${orderId}`, {
    method : HttpMethod.GET,
    headers:getTokenHeaders()
  })
}


/**
 * 获取客户列表信息
 * @param merchantId
 * @returns {Object}
 */
export function getCustomerList(merchantId) {
  return request(`/v1/order/customer/${merchantId}`, {
    method : HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 获取菜单列表
 * @param merchantId
 * @returns {Object}
 */
export function getMenuList(merchantId) {
  return request(`/v1/menu/${merchantId}`, {
    method : HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 获取售馨菜式
 * @param merchantId
 * @returns {Object}
 */
export function getSaleoutMenu(merchantId) {
  return request(`/v1/menu/${merchantId}/saleout`, {
    method : HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 获取食物详情
 * @param merchantId
 * @param foodId
 * @returns {Object}
 */
export function getMenuDetail(merchantId, foodId) {
  return request(`/v1/menu/${merchantId}/${foodId}`, {
    method : HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 添加菜式
 * @param params
 * @returns {Object}
 */
export function saveFood(params) {
  return request(`/v1/menu/${params.id}`, {
    method:HttpMethod.POST,
    headers:getTokenFormHeaders(),
    body:qs.stringify(params)
  });
}

/**
 * 修改菜式
 * @param params
 * @returns {Object}
 */
export function updateFood(params) {
  return request(`/v1/menu/${params.id}/${params.foodId}`, {
    method:HttpMethod.PUT,
    headers:getTokenFormHeaders(),
    body:qs.stringify(params)
  });
}

/**
 * 删除菜式
 * @param foodId
 * @param merchantId
 * @returns {Object}
 */
export function deleteFood(foodId, merchantId) {
  return request(`/v1/menu/${merchantId}/${foodId}`, {
    method:HttpMethod.DELETE,
    headers:getTokenHeaders()
  });
}

/**
 * 获取餐桌列表
 * @param merchantId
 * @param status
 * @returns {Object}
 */
export function getTableList(merchantId,status) {
  let url ='';
  if(isObject(status)) {
    url=`/v1/table/${merchantId}/status/${status}`;
  } else {
    url = `/v1/table/${merchantId}`;
  }
  return request(url, {
    method:HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 获取餐桌详情
 * @param merchantId
 * @param tableId
 * @returns {Object}
 */
export function getTableDetail(merchantId, tableId) {
  return request(`/v1/table/${merchantId}/${tableId}`, {
    method:HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 添加餐桌
 * @param params
 * @returns {Object}
 */
export function addTable(params) {
  return request(`/v1/table/${params.id}`, {
    method:HttpMethod.POST,
    headers: getTokenFormHeaders(),
    body:qs.stringify(params)
  });
}

/**
 * 删除餐桌
 * @param merchantId
 * @param tableId
 * @returns {Object}
 */
export function deleteTable(merchantId, tableId) {
  return request(`/v1/table/${merchantId}/${tableId}`, {
    method:HttpMethod.DELETE,
    headers:getTokenHeaders()
  });
}

/**
 * 修改餐桌
 * @param params
 * @returns {Object}
 */
export function updateTable(params) {
  return request(`/v1/table/${params.id}/${params.tableId}`, {
    method:HttpMethod.PUT,
    headers:getTokenFormHeaders(),
    body:qs.stringify(params)
  });
}

/**
 * 获取聊天室信息
 * @param merchantId
 * @param tableNum
 * @returns {Object}
 */
export function getChatRoomInfo(merchantId, tableNum) {
  return request(`/v1/table/${merchantId}/${tableNum}`, {
    method: HttpMethod.GET,
    headers:getTokenHeaders()
  })
}

/**
 * 获取聊天记录
 * @param merchantId
 * @param tableNum
 * @returns {Object}
 */
export function getChatRecord(merchantId, tableNum) {
  return request(`/v1/chat/${merchantId}/table/${tableNum}`, {
    method: HttpMethod.GET,
    headers:getTokenHeaders()
  })
}

/**
 * 文件上传
 * @param params
 * @returns {Object}
 */
export function uploadFile(params) {
  let formData = new FormData();
  formData.append("file",params.file);
  formData.append("userId", params.userId);
  return request('/v1/upload', {
    method:HttpMethod.OPTIONS,
    headers:getTokenHeaders(),
    body:formData
  })
}


/**
 * 获取分类列表
 * @param merchantId
 * @returns {Object}
 */
export function getClassifyList(merchantId) {
  return request(`/v1/classify/${merchantId}`, {
    method: HttpMethod.GET,
    headers:getTokenHeaders()
  })
}

/**
 * 添加分类
 * @param params
 * @returns {Object}
 */
export function addClassify(params) {
  return request(`/v1/classify/${params.id}`, {
    method:HttpMethod.POST,
    headers: getTokenFormHeaders(),
    body:qs.stringify(params)
  });
}

/**
 * 删除分类
 * @param merchantId
 * @param classifyId
 * @returns {Object}
 */
export function deleteClassify(merchantId, classifyId) {
  return request(`/v1/classify/${merchantId}/${classifyId}`, {
    method:HttpMethod.DELETE,
    headers:getTokenHeaders()
  })
}
