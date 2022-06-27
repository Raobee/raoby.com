const BLOG_API_URL="https://www.raobee.com/api/"

$(document).ready(function () {
    $("#load_animation").hide();
    getArchives();
});


$('.nav a').click(function () {
    target = $(this).attr('nav');
    if(target){
        switchTo(target);
    }
});

function switchTo(target) {
    console.log(target);
    $('.content_right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function getArchives() {
    let t = ``;
    $.ajax({
        type: "GET",
        url: BLOG_API_URL + "posts?pageSize=10",
        dataType: "json",
        success: function (json) {
            let dom = $('.recent_archives');
            if(json.status !== "success"){
                t+="<li>加载失败力QvQ</li>>";
                dom.html(t);
                return;
            }
            data = json.data.dataSet;
            for (var i = 0; i < data.length; i++) {
                title = data[i].title;
                link = data[i].permalink;
                time = new Date(data[i].created*1000).Format("yyyy-MM-dd");
                t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
            }
            dom.html(t);
        },
        error: function (){
            t+="<li>加载失败力QvQ</li>>";
            $('.recent_archives').html(t);
        }
    })
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//异步加载背景

function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    }
    reader.readAsDataURL(blob);
}
var url = "https://outshare.raobee.com/2022/04/24/cb390166fea00.jpg";
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = "blob";
xhr.onload = function () {
    if (this.status === 200) {
        var blob = this.response;
        blobToDataURI(blob, function (t) {
            $("body").css("background-image", "url('" + t + "')");
            var DOM_bg = $("#background_small");
            DOM_bg.addClass("smallBg");
            DOM_bg.css("opacity", "0");
        });
    }
}
xhr.send();
