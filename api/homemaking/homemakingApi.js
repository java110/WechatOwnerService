import {requestNoAuth} from '../../lib/java110/java110Request.js'
import url from '../../constant/url.js'

/**
 * 查询家政服务类型
 */
export function getHousekeepingTypeList(dataObj) {
    return new Promise(
        (resolve, reject) => {
            requestNoAuth({
                url: url.queryHousekeepingType,
                method: "GET",
                data: dataObj,
                //动态数据
                success: function (res) {
                    if (res.statusCode == 200) {
                        let _data = res.data
                        resolve(_data)
                        return
                    }
                    reject()
                },
                fail: function (e) {
                    reject()
                }
            })
        })
}

/**
 * 查询家政服务列表
 */
export function getHousekeepingServList(dataObj) {
    return new Promise(
        (resolve, reject) => {
            requestNoAuth({
                url: url.queryHousekeepingServ,
                method: "GET",
                data: dataObj,
                //动态数据
                success: function (res) {
                    if (res.statusCode == 200) {
                        let _data = res.data
                        resolve(_data)
                        return
                    }
                    reject()
                },
                fail: function (e) {
                    reject()
                }
            })
        })
}
/**
 * 查询家政服务列表
 */
export function searchHousekeepingServ(dataObj) {
    return new Promise(
        (resolve, reject) => {
            requestNoAuth({
                url: url.searchHousekeepingServ,
                method: "GET",
                data: dataObj,
                //动态数据
                success: function (res) {
                    if (res.statusCode == 200) {
                        let _data = res.data
                        resolve(_data)
                        return
                    }
                    reject()
                },
                fail: function (e) {
                    reject()
                }
            })
        })
}

/**
 * 查询家政服务费用
 */
export function getServFeeConfig(dataObj) {
    return new Promise(
        (resolve, reject) => {
            requestNoAuth({
                url: url.queryServFeeConfig,
                method: "GET",
                data: dataObj,
                //动态数据
                success: function (res) {
                    if (res.statusCode == 200) {
                        let _data = res.data
                        resolve(_data)
                        return
                    }
                    reject()
                },
                fail: function (e) {
                    reject()
                }
            })
        })
}

