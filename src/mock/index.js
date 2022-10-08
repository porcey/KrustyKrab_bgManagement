let Mock = require('mockjs');

module.exports = function () {
    let data = { register: [], userList: [] }
    data.register = [{
        "id": 1,
        "name": "admin",
        "pwd": "admin123"
    },
    {
        "name": "xj1",
        "pwd": "4a5757352a136647f66b7c34bb5397ff",
        "id": 2
    }
    ]
    data.chartDataOne = [
        { "title": "一号楼", "num": 1827 },
        { "title": "二号楼", "num": 342 },
        { "title": "三号楼", "num": 541 },
        { "title": "四号楼", "num": 1347 },
        { "title": "五号楼", "num": 2431 },
        { "title": "六号楼", "num": 876 },
        { "title": "七号楼", "num": 1578 }
    ]
    data.chartDataTwo = {
        "day": ["星期1", "星期2", "星期3", "星期4", "星期5", "星期6", "星期7"],
        "num": {
            "外卖": [140, 232, 101, 264, 90, 340, 250],
            "快递": [120, 282, 111, 234, 220, 340, 310],
            "一般访客": [320, 132, 201, 334, 190, 130, 220],
            "授权访客": [220, 402, 231, 134, 190, 230, 120]

        }
    }
    data.chartDataThree = [
        { "value": 567, "name": "卫生" },
        { "value": 123, "name": "电梯" },
        { "value": 324, "name": "停车引导" },
        { "value": 89, "name": "水电" },
        { "value": 453, "name": "一般报修" },
        { "value": 767, "name": "门禁" }

    ]
    data.chartDataFour = {
        "day": ["星期1", "星期2", "星期3", "星期4", "星期5", "星期6", "星期7"],
        "num": {
            "一般用户": [320, 502, 401, 334, 390, 430, 720],
            "月租用户": [234, 564, 443, 234, 754, 430, 321],
            "特殊车辆": [220, 321, 335, 534, 390, 330, 310]

        }
    }
    for (let i = 0; i < 5; i++) {
        let obj = Mock.mock({
            'id': '@increment',
            "title": '海天家园',
            'num': "1-1-1",
            'hometype|1': ["三室两厅", "一室一厅", "两室一厅"],
            'owner': '@cname',
        })
        data.userList.push(obj)
    }
    return data
}