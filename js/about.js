//HTML文書全体の読み込み後、ページが表示されてから実行
window.onload = function () {
  //厳格モード（コードをより厳しくエラーチェック）
  "use strict";
  let pathname = "/My-AR-Makeup-Filter";
  //let pathname = "";
  //スクリーン高さ調整
  //スクロールバーのサイズを除いた画面の高さ（document.documentElement.clientHeight)
  let browserHeight = document.documentElement.clientHeight;
  //bodyの高さ（document.body.clientHeight）
  let bodyHeight = document.body.clientHeight;
  let addHeight = browserHeight - bodyHeight;
  let heightAbout = document.getElementById('heightAbout');
  let heightAboutHeight = heightAbout.offsetHeight;
  if (addHeight > 0) {
    heightAbout.style.height = heightAboutHeight + addHeight + 'px';
  }
  //ヘッダーボタン/
  document.querySelector(".headerTop").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/index.html" + location.hash;
  }, false);
  document.querySelector(".headerResult").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/result.html" + location.hash;
  }, false);
  document.querySelector(".headerDiagnose").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/diagnose.html" + location.hash;
  }, false);
  document.querySelector(".linkResult").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/result.html" + location.hash;
  }, false);

};

