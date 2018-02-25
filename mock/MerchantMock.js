const Mock=require('mockjs');
module.exports={
  //商家端获取首页信息
  [`POST /v1/home/`](req,res){
    const data = Mock.mock({
      "data": [
        {
          "capacity": 26322,
          "name|1-3": "桌号",
          "personNum": 87164,
          "price": 73141,
          "status|1": 48680,
          "time": "@time"
        }
      ],
      "eatingNum": 37330,
      "eatingPerson": 16233,
      "emptyTable": 37141,
      "price": 10232,
      "saleOutNum": 86752,
      "unReadMsg": 52353
    });
    res.json(data);
  },

  // 获取订单列表
  [`POST /v1/order/`](req,res){
    const data = Mock.mock({
      "data": [
        {
          "id": 58747,
          "name": "桌号",
          "personNum": 23108,
          "price": "测试内容1g03",
          "status": "状态",
          "time": "@time"
        }
      ],
      "totalCount": 74328,
      "totalPerson": 47750,
      "totalPrice": "金额"
    });
    res.json(data);
  },

