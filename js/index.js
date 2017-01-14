function getUTCTime(callback) {
    var tag = document.createElement("script");
    var before, after;
    tag.src = 'http://www.timeapi.org/utc/now.json?callback=utcCallback';
    window.utcCallback = function (obj) {
        after = new Date();
        if (obj.dateString) {
            var time = new Date(Math.floor((before.getTime() + after.getTime()) / 2));
            callback(false, { utc: new Date(obj.dateString), local: time });
        }
        else {
            callback(true, null);
        }
    };
    before = new Date();
    document.getElementsByTagName("head")[0].appendChild(tag);
}
/* function resize() {
 let frame = <any>document.getElementById('frame');
 //frame.style.width = document.body.style.width;
 //frame.style.height = document.body.style.height;
 frame.width  = document.body.clientWidth;
 frame.height = document.body.clientHeight - 50;
} */
function start() {
    //resize()
    var timespan = document.getElementById('time');
    var offset = null;
    getUTCTime(function (err, time) {
        if (err) {
            timespan.innerText = "Error extracting time from http://www.timeapi.org/utc/now";
        }
        else {
            offset = time.utc.getTime() - time.local.getTime();
        }
        setInterval(function () {
            if (offset !== null) {
                var time_1 = new Date(new Date().getTime() + offset);
                timespan.innerText = time_1.toString();
            }
        }, 500);
    });
}
window.onload = start;
