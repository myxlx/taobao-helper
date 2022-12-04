const axios = require('axios');
const iconv = require('iconv-lite');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const release = ["十三号","12号"];

const config = {
    method: 'get',
    responseType: "arraybuffer",
    url: 'https://woshixiaohuajiang.jiyoujia.com/i/asynSearch.htm' +
        '?_ksTS=1670159755091_107' +
        '&input_charset=gbk' +
        '&mid=w-21734276718-0' +
        '&trophies=true' +
        '&wid=21734276718' +
        '&path=/search.htm' +
        '&search=y' +
        '&spm=a1z10.3-c-s.w4010-21734276716.3.22a12f95kVwt5k' +
        '&orderType=newOn_desc',
    headers: {
        'Cookie': '_tb_token_=ef5376e4364e3; cookie2=153e28994ff65eb5675bc568c7b3b0c3; t=cc8b6e1138dc3cbb04a1d392674b6115',
        'Accept-Encoding': 'identity',
        'Content-type': 'application/json;charset=UTF-8'
    }
};

axios(config,release)
    .then(function (response) {
        const duoRou = new Map()
        const strData = iconv.decode(response.data, 'gbk');
        const dom = new JSDOM(strData);
        dom.window.document.querySelectorAll(".\\\"item-name").forEach(function (it){
            if (it.textContent.includes(release[0]) && it.textContent.includes(release[1])){
                duoRou.set(it.textContent.replace(/\s*/g,""),it.href.slice(32,44))
            }
        })
        console.log(duoRou);
    })
    .catch(function (error) {
        console.log(error);
    });


