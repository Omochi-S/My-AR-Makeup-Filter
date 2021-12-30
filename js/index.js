window.onload = function () {
  "use strict";
  //let pathname = "/My-AR-Makeup-Filter";
  let pathname = "";
  //スクリーン高さ調整
  let browserHeight = document.documentElement.clientHeight;
  let bodyHeight = document.body.clientHeight;
  let addHeight = browserHeight - bodyHeight;
  let heightIndex = document.getElementById('heightIndex');
  let heightIndexHeight = heightIndex.offsetHeight;
  if (addHeight > 0) {
    heightIndex.style.height = heightIndexHeight + addHeight + 'px';
  };
  //ヘッダーボタン/
  document.querySelector(".headerResult").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/result.html" + location.hash;
  }, false);
  document.querySelector(".headerAbout").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/about.html" + location.hash;
  }, false);
  document.querySelector(".headerDiagnose").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/diagnose.html" + location.hash;
  }, false);
  document.querySelector(".linkResult").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/result.html" + location.hash;
  }, false);
  document.querySelector(".linkDiagnose").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/diagnose.html" + location.hash;
  }, false);
};

