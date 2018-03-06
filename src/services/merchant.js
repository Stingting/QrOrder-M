import request from '../utils/request';
import qs from 'qs';
import {getLocalStorage, getSessionStorage, isObject} from "../utils/helper";
/**
 * 登录
 * @param params
 * @returns {Object}
 */
export function login(params) {
  return request('/v1/user/login', {
    method:'POST',
    headers:{
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:qs.stringify(params)
  })
}

/**
 * 商家端获取首页信息
 * @param merchantId
 * @returns {Object}
 */
export function getMerchantInfo(merchantId) {
  return request('/v1/home/'+ merchantId, {
    method: 'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
  });
}

/**
 * 获取订单列表
 * @param merchantId
 * @returns {Object}
 */
export function getOrderList(merchantId) {
  return request(`/v1/order/${merchantId}`, {
    method:'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
  });
}


/**
 * 修改订单信息
 * @param params
 * @returns {Object}
 */
export function updateOrder(params) {
  return request(`/v1/order/${params.id}/${params.orderId}`, {
    method:'PUT',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      authorization:getSessionStorage("token")
    },
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
    method:'PUT',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      authorization:getSessionStorage("token")
    },
    body:qs.stringify(params)
  });
}

/**
 * 获取客户列表信息
 * @param merchantId
 * @returns {Object}
 */
export function getCustomerList(merchantId) {
  return request(`/v1/order/customer/${merchantId}`, {
    method:'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
  });
}

/**
 * 获取菜单列表
 * @param merchantId
 * @returns {Object}
 */
export function getMenuList(merchantId) {
  return request('/v1/menu/' + merchantId, {
    method:'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
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
    method:'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
  });
}

/**
 * 添加菜式
 * @param params
 * @returns {Object}
 */
export function saveFood(params) {
  return request(`/v1/menu/${params.id}`, {
    method:'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      authorization:getSessionStorage("token")
    },
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
    method:'put',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      authorization:getSessionStorage("token")
    },
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
    method:'delete',
    headers: {
      authorization:getSessionStorage("token")
    }
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
    method:'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
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
    method:'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
  });
}

/**
 * 添加餐桌
 * @param params
 * @returns {Object}
 */
export function addTable(params) {
  return request(`/v1/table/${params.id}`, {
    method:'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      authorization:getSessionStorage("token")
    },
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
    method:'delete',
    headers: {
      authorization:getSessionStorage("token")
    }
  });
}

/**
 * 修改餐桌
 * @param params
 * @returns {Object}
 */
export function updateTable(params) {
  return request(`/v1/table/${params.id}/${params.tableId}`, {
    method:'put',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      authorization:getSessionStorage("token")
    },
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
   return request(`/v1/customer/chatRoom/${merchantId}/${tableNum}`, {
     method: 'GET',
     headers: {
       authorization:getSessionStorage("token")
     }
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
    method:'get',
    headers:{
      authorization:getSessionStorage("token")
    }
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
  const obj = {
    userId:2
  }
  params.userId = 2;
  return request('/v1/upload', {
    method:'OPTIONS',
    headers:{
      authorization: getSessionStorage("token")
    },
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
    method:'GET',
    headers: {
      authorization:getSessionStorage("token")
    }
  })
}

/**
 * 添加分类
 * @param params
 * @returns {Object}
 */
export function addClassify(params) {
  return request(`/v1/classify/${params.id}`, {
    method:'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      authorization:getSessionStorage("token")
    },
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
    method:'delete',
    headers: {
      authorization:getSessionStorage("token")
    }
  })
}
