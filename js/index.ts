
interface Window { utcCallback: (obj: any) => void }

function getUTCTime(callback: (err: boolean, time: {utc: Date, local: Date} | null) => void ) : void {
 let tag = document.createElement("script");
 let before, after: Date;

 tag.src = 'https://www.timeapi.org/utc/now.json?callback=utcCallback';
 window.utcCallback = function(obj: any) {
  after = new Date();
  if (obj.dateString) {
   let time = new Date(Math.floor((before.getTime() + after.getTime()) / 2));
   callback(false, {utc: new Date(obj.dateString), local: time})
  } else {
   callback(true, null);
  }
 }
 before = new Date()
 document.getElementsByTagName("head")[0].appendChild(tag)
}

/* function resize() {
 let frame = <any>document.getElementById('frame');
 //frame.style.width = document.body.style.width;
 //frame.style.height = document.body.style.height;
 frame.width  = document.body.clientWidth;
 frame.height = document.body.clientHeight - 50;
} */

function showServrTime() {
 //resize()
 let timespan = document.getElementById('time');
 let offset : number | null = null;
 getUTCTime((err, time) => {
  if (err) {
   timespan.innerText = "Error extracting time from http://www.timeapi.org/utc/now";
  } else {
   offset = time.utc.getTime() - time.local.getTime();
  }
  setInterval(() => {
   if (offset !== null) {
    let time = new Date(new Date().getTime() + offset);
    timespan.innerText = time.toString();
   }
  }, 500);
 });
}

function showLocalTime() {
 let timespan = document.getElementById('time');
 setInterval(() =>{
  timespan.innerText = new Date().toString();
 }, 500)
}

window.onload = showLocalTime;
setInterval(() => {
 location.reload(true);
}, 5000);
