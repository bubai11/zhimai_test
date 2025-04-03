// 云函数入口文件
// cloudfunctions/getOpenId/index.js
const cloud = require('wx-server-sdk')
const axios = require('axios');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const { code } = event; // 从前端传递的 code
    const appId = 'wxc32918dac4588fbb'; 
    const appSecret = '2d7cd2a83d65a94b7cbe9bdffbeac441'; 
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    try {
        const response = await axios.get(url);
        const { openid } = response.data; // 获取 openId

        return {
            success: true,
            openId: openid,
        };
    } catch (err) {
        return {
            success: false,
            error: err,
        };
    }
}
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }