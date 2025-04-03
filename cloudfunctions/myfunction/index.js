// cloudfunctions/myFunction/index.js
import { init, database } from 'wx-server-sdk';

init();
const db = database();

export async function main(event, context) {
    const { openId, userInfo } = event; // 获取传递的参数

    try {
        const res = await db.collection('users').add({
            data: {
                openId,
                userInfo,
                createdAt: new Date(),
            },
        });
        return {
            success: true,
            message: '用户信息已保存',
            data: res,
        };
    } catch (err) {
        return {
            success: false,
            message: '保存失败',
            error: err,
        };
    }
}