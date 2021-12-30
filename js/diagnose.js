//HTML文書全体の読み込み後、ページが表示されてから実行
window.onload = function () {
  "use strict";
  //スクリーン高さ調整
  let browserHeight = document.documentElement.clientHeight;
  let bodyHeight = document.body.clientHeight;
  let addHeight = browserHeight - bodyHeight;
  let heightDiagnose = document.getElementById('heightDiagnose');
  let heightDiagnoseHeight = heightDiagnose.offsetHeight;
  if (addHeight > 0) {
    heightDiagnose.style.height = heightDiagnoseHeight + addHeight + 'px';
  };
  function heightChange() {
    heightDiagnose.style.height = 0 + 'px';
    browserHeight = document.documentElement.clientHeight;
    bodyHeight = document.body.clientHeight;
    addHeight = browserHeight - bodyHeight;
    heightDiagnoseHeight = heightDiagnose.offsetHeight;
    if (addHeight > 0) {
      heightDiagnose.style.height = heightDiagnoseHeight + addHeight + 'px';
      bodyHeight = document.body.clientHeight;
    };
  };
  //顔タイプ計測基準、本と整形外科サイトより
  const video = document.querySelector("#camera");
  const canvas = document.querySelector("#picture");
  const videoSize = 200;
  // カメラ設定 /
  const constraints = {
    audio: false,
    video: {
      //widthとheightの値の大きさで画像の荒さ大きさが決まる//
      //値を大きくすればするほど、videoはキレイに写るが容量が大きくなる//
      width: videoSize,
      height: videoSize,
      facingMode: "user" // フロントカメラを利用する
      //facingMode: { exact: "environment" }  // リアカメラを利用する場合
    }
  };
  //ビデオ動画を左右反転（鏡面反転）表示させる
  video.style.transform = "scaleX(-1)";
  var PCElement = document.querySelector('#PC');
  var PC2Element = document.querySelector('#PC2');
  var PC3Element = document.querySelector('#PC3');
  var SP2Element = document.querySelector('#SP2');
  var SP3Element = document.querySelector('#SP3');
  //表示しているデバイス
  let device;
  // カメラを<video>と同期/パソコンの時のみ
  if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
    // スマートフォンやタブレットでは表示
    PCElement.style.display = "none";
    PC2Element.style.display = "none";
    PC3Element.style.display = "none";
    SP2Element.style.display = "block";
    SP3Element.style.display = "block";
    heightChange();
    device = "スマホ";
  } else {
    device = "パソコン";
    PCElement.style.display = "block";
    PC2Element.style.display = "block";
    PC3Element.style.display = "block";
    SP2Element.style.display = "none";
    SP3Element.style.display = "none";

    heightChange();
    // パソコンなら表示
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log(err.name + ": " + err.message);
      });
  }
  console.log("使用デバイス：" + device);

  // フェイスライン-キャンバス /
  const faceCanvas = document.querySelector("#faceLine");

  //CSSからの変数
  const SelectElement = document.querySelector("body");
  const SelectStyle = getComputedStyle(SelectElement);
  const guidLineColor = String(SelectStyle.getPropertyValue("--guidLine-color")).trim();
  const mainColor = String(SelectStyle.getPropertyValue("--canvasMain-color")).trim();
  const canvasSize = String(SelectStyle.getPropertyValue("--canvas-size")).replace("px", "").trim();
  const lineWidth = (String(SelectStyle.getPropertyValue("--canvas-border-width")).replace("px", "").trim()) / 5 * 2;

  // フェイスライン-キャンバス設定 /
  if (faceCanvas.getContext) {
    const faceContext = faceCanvas.getContext("2d");
    // フェイスライン太さ /
    faceContext.lineWidth = lineWidth / 5 * 6;
    // フェイスライン色 /
    faceContext.strokeStyle = guidLineColor;
    faceContext.beginPath();
    // フェイスライン形 /
    //楕円の長軸半径
    let rx = canvasSize / 2;
    let ry = rx;
    let radiusX = rx / 7 * 4;
    let radiusY = rx / 7 * 5;
    //ellipse(楕円の中心ｘ,楕円の中心ｙ,楕円の長軸半径,楕円の短軸半径,楕円の回転)
    faceContext.ellipse(rx, ry, radiusX, radiusY, 0, 0, Math.PI * 2);
    //横ガイドライン
    faceContext.moveTo(rx - radiusX, ry);     // 始点に移動
    faceContext.lineTo(rx + radiusX, ry);     // 終点
    //縦ガイドライン
    faceContext.moveTo(rx, ry - radiusY);          // 始点に移動
    faceContext.lineTo(rx, ry + radiusY);     // 終点
    faceContext.stroke();
  }
  //ページのスタイル設定
  // a = document.getElementById(a),b = c;
  const p1 = document.getElementById('p1'),
    p1cssText = p1.style.cssText;
  const p2 = document.getElementById('p2'),
    p2cssText = p2.style.cssText;
  const p3 = document.getElementById('p3'),
    p3cssText = p3.style.cssText;
  const p4 = document.getElementById('p4'),
    p4cssText = p4.style.cssText;
  //ページのスタイル設定ここまで！
  //ボタンと文章の設定
  const diagnosing = document.getElementById('diagnosing'),
    diagnosingcssText = diagnosing.style.cssText;

  const diagnosed = document.getElementById('diagnosed'),
    diagnosedcssText = diagnosed.style.cssText;
  const b2 = document.getElementById('b2'),
    b2cssText = b2.style.cssText;
  const b1 = document.getElementById('b1'),
    b1cssText = b1.style.cssText;
  //消えていたボタン
  const selectedButtonDiv = document.getElementById('selectedButtonDiv'),
    selectedButtonDivcssText = selectedButtonDiv.style.cssText;
  const selectedButtonDiv2 = document.getElementById('selectedButtonDiv2'),
    selectedButtonDiv2cssText = selectedButtonDiv2.style.cssText;
  //ボタンスタイル
  const select11 = document.getElementById('select11'),
    select11cssText = select11.style.cssText;
  const select12 = document.getElementById('select12'),
    select12cssText = select12.style.cssText;
  const select21 = document.getElementById('select21'),
    select21cssText = select21.style.cssText;
  const select22 = document.getElementById('select22'),
    select22cssText = select22.style.cssText;
  //パソカラ選択ボタン
  //パーソナルカラーボタンデザイン
  const Spring = document.getElementById('Spring'),
    SpringcssText = Spring.style.cssText;
  const Summer = document.getElementById('Summer'),
    SummercssText = Summer.style.cssText;
  const Autumn = document.getElementById('Autumn'),
    AutumncssText = Autumn.style.cssText;
  const Winter = document.getElementById('Winter'),
    WintercssText = Winter.style.cssText;

  //ボタンと文章の設定ここまで！
  //各ページの切り替え
  //1ページ目
  function firstPage() {
    location.reload();
    heightChange();
  }
  //2ページ目
  function secondPage() {
    //p1非表示・p2表示
    p2.style.cssText = p2cssText + 'display: block !important;';
    p1.style.cssText = p1cssText + 'display: none !important;';
    heightChange();
  }
  //3ページ目
  function thirdPage() {
    //p2非表示・p3表示
    p3.style.cssText = p3cssText + 'display: block !important;';
    p2.style.cssText = p2cssText + 'display: none !important;';
    heightChange();
  }
  //顔タイプを表示する変数
  let faceType;
  //結果ページのURL
  let resultURL = "http://" + window.location.host + "/result.html";
  //4ページ目
  function fourthPage() {
    //p3非表示・p4表示
    p4.style.cssText = p4cssText + 'display: block !important;';
    p3.style.cssText = p3cssText + 'display: none !important;';
    heightChange();
  }
  //5ページ目
  function fifthPage() {
    if (flowA > flowB) {
      if (flowC > flowD) {
        //AとCが多い
        faceType = "cute";
      } else {
        //AとDが多い
        faceType = "fresh";
      }
    } else {
      if (flowC > flowD) {
        //BとCが多い
        faceType = "feminine";
      } else {
        //BとDが多い
        faceType = "cool";
      }
    }
    console.log(faceType);
    window.location.href = resultURL + "#" + faceType + selectPersonalColor;
  }
  //APIの適用が成功した後
  function successful() {
    b1.style.cssText = b1cssText + 'display: block !important;';
    b2.style.cssText = b2cssText + 'display: block !important;';
    diagnosing.style.cssText = diagnosingcssText + 'display: none !important;';
    diagnosed.style.cssText = diagnosedcssText + 'display: block !important;';
    heightChange();
  }
  //各ページの切り替えここまで

  //決定ボタンでダウンロードする画像
  var downloadImgSrc;
  //ヘッダーボタン/
  document.querySelector(".headerTop").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + "/index.html" + location.hash;
  }, false);
  document.querySelector(".headerResult").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + "/result.html" + location.hash;
  }, false);
  document.querySelector(".headerAbout").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + "/about.html" + location.hash;
  }, false);

  //シャッターボタン/
  document.querySelector("#shutter").addEventListener("click", () => {
    secondPage();
    // 適用された！    
    const ctx = canvas.getContext("2d");
    video.pause(); // 映像を停止
    //drawImageで描くcanvasの画像を左右反転(鏡面反転)
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    // canvasに画像を貼り付ける
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //撮影ボタンを偶数回押した時に、鏡面反転が戻ってしまうのを回避するため、canvasに画像を貼り付けた後、元に戻す
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    //canvasを画像に変更して出力
    //base64を使用すると、画像をテキストデータとしてhtmlコードに埋め込むことができる
    const canvasDataURL = canvas.toDataURL("image/jpeg", 0.75);
    downloadImgSrc = canvasDataURL;
    api(canvasDataURL);
  }, false);

  //ファイルアップロード追加
  var file = document.getElementById('file');
  var canvas2 = document.getElementById('picture');
  let picture = document.getElementById('picture');
  var canvas2Width = canvasSize;
  var canvas2Height = canvasSize;
  var uploadImgSrc;

  // Canvasの準備
  canvas2.width = canvas2Width;
  canvas2.height = canvas2Height;
  var ctx = canvas2.getContext('2d');

  function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];
    // 画像ファイル以外は処理を止める
    if (!fileData.type.match('image.*')) {
      alert('画像を選択してください');
      return;
    }
    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function () {
      // Canvas上に表示する
      uploadImgSrc = reader.result;
      downloadImgSrc = uploadImgSrc;
      canvas2Draw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
  }
  // ファイルが指定された時にloadLocalImage()を実行
  file.addEventListener('change', loadLocalImage, false);

  // Canvas上に画像を表示する
  function canvas2Draw() {
    secondPage();
    // canvas内の要素をクリアする
    ctx.clearRect(0, 0, canvas2Width, canvas2Height);
    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;
    img.onload = function () {
      canvas2Height = this.height * (canvas2Width / this.width);
      let pictureHeight = this.height * (canvas2Width / this.width);
      picture.style.height = pictureHeight + 'px';
      ctx.drawImage(img, 0, 0, canvas2Width, canvas2Width);
      //ctx.drawImage(img, 0, 0, canvas2Width, canvas2Height);
      //コンソールで、画像URLを表示
      const canvas2DataURL = canvas2.toDataURL("image/jpeg", 0.75);
      //コンソールで、画像URLを表示
      //console.log(canvas2DataURL);
      api(canvas2DataURL);
    }
  }
  //ファイルアップロード追加完了

  //顔タイプ診断の基準
  let flowA = 0;
  let flowB = 0;
  let flowC = 0;
  let flowD = 0;

  //apiの状態を可視化
  //顔認識api内容
  async function api(FILE_URL) {
    heightChange();
    const MODEL_URL = "./face-api.js-master/weights";
    let img, context, newCanvas;
    loadModels();
    async function loadModels() {
      console.log("loadModels:モデルを読み込む");
      Promise.all([
        faceapi.loadSsdMobilenetv1Model(MODEL_URL),
        faceapi.loadFaceLandmarkModel(MODEL_URL),
        faceapi.loadFaceRecognitionModel(MODEL_URL),
      ])
        .then(detectAllFaces)
    }
    async function detectAllFaces() {
      console.log("detectAllFaces：全ての顔を見つけ出す");
      // Image
      img = await faceapi.fetchImage(FILE_URL);
      // Canvas, Context
      newCanvas = document.getElementById("picture");
      newCanvas.width = img.width;
      newCanvas.height = img.height;
      context = newCanvas.getContext("2d");
      context.fillRect(0, 0, newCanvas.width, newCanvas.height);
      context.drawImage(img, 0, 0);
      const iSize = { width: img.width, height: img.height };
      const fData = await faceapi.detectAllFaces(img).withFaceLandmarks();
      const rData = await faceapi.resizeResults(fData, iSize);
      rData.forEach(data => { drawResult(data); });
    }

    function drawResult(data) {
      console.log("drawResult!!：結果を描画");
      const det = data.detection;
      const mrks = data.landmarks.positions;
      const box = det.box;
      context.fillStyle = guidLineColor;
      context.strokeStyle = guidLineColor;
      context.lineWidth = lineWidth;
      context.strokeRect(box.x, box.y, box.width, box.height);
      drawLandmarks(mrks);
      Keisoku(mrks);
      successful();
    }

    function drawLandmarks(mrks) {
      context.beginPath();
      for (let i = 0; i < mrks.length; i++) {
        if (i != 0 && i != 17 && i != 22 && i != 27 && i != 31 && i != 36 && i != 42 && i != 48) {
          context.moveTo(mrks[i].x, mrks[i].y);          // 始点に移動
          context.lineTo(mrks[i - 1].x, mrks[i - 1].y);     // 終点
        }
      }
      let startI = [36, 42, 30];
      let endI = [41, 47, 33];
      for (let I = 0; I < startI.length; I++) {
        context.moveTo(mrks[startI[I]].x, mrks[startI[I]].y);          // 始点に移動
        context.lineTo(mrks[endI[I]].x, mrks[endI[I]].y);     // 終点
      }
      context.strokeStyle = mainColor;  // 線の色
      context.lineWidth = lineWidth;           // 線の太さ
      context.stroke();
      drawPoints(mrks);
    }

    function drawPoints(mrks) {
      for (let i = 0; i < mrks.length; i++) {
        let x = mrks[i].x;
        let y = mrks[i].y;
        context.fillRect(x - (lineWidth / 2), y - (lineWidth / 2), lineWidth, lineWidth);
        //context.fillText(i, x, y, 18);
      }
    }
    function Keisoku(mrks) {

      /*Q1-----------------------------------------------------------------*/
      //両頬の頬骨間の長さX：16番Xー0番X
      let hooboneX = (mrks[16].x - mrks[0].x);
      //眉間のY座標：21番Yと22番Yの平均
      let mikenY = (mrks[21].y + mrks[22].y) / 2
      //眉間～顎先までの長さY：8番Yー眉間のY座標 
      let mikenAgoY = (mrks[8].y - mikenY);
      //縦　分母：両方の比の長さを足した長さ　分子：mikenAgoY　値を10倍にして小数点第一位を四捨五入
      let mikenAgoYRatio = Math.round((mikenAgoY / (mikenAgoY + hooboneX)) * 10);
      //横　分母：両方の比の長さを足した長さ　分子：hooboneX　値を10倍にして小数点第一位を四捨五入
      let hooboneXRatio = Math.round((hooboneX / (mikenAgoY + hooboneX)) * 10);
      //横幅が長いのがA、縦長の顔がB
      //卵顔が縦：横＝1:1より
      if (hooboneXRatio > mikenAgoYRatio) {
        console.log("Q1:横長の顔A " + hooboneX + " " + mikenAgoY);
        flowA += 1;
      } else {
        console.log("Q1:縦長の顔B" + hooboneX + " " + mikenAgoY);
        flowB += 1;
      };

      /*--------------------------------------------------------------------*/
      /*Q2--------------------------------------------------------------------*/
      //鼻下Y～口下Yまでの長さ
      let hanaKutiY = (mrks[57].y - mrks[33].y);
      //口下Y～顎先Yまでの長さ
      let kutiAgoY = (mrks[8].y - mrks[57].y);
      //口から鼻長いのがA、短いがB＝顎が短いのがA、長いのがB
      /*Q2で使用される基準比率は、口下Y～鼻下Y：顎先Y～口下Y＝1：1*/
      if (hanaKutiY >= kutiAgoY) {
        console.log("Q2:顎が短いA");
        flowA += 1;
      } else {
        console.log("Q2:顎が長いB");
        flowB += 1;
      };

      /*--------------------------------------------------------------------*/
      /*Q3--------------------------------------------------------------------*/
      //左目の幅X：39番Xー36番X
      let hidarimeX = (mrks[39].x - mrks[36].x);
      //右目幅X：45番Xー42番X
      let migimeX = (mrks[45].x - mrks[42].x);
      //目の幅:hidarimeXとmigimeXの平均
      let meX = (hidarimeX + migimeX) / 2;
      //目の間：42番X-39番X
      let menoaidaX = (mrks[42].x - mrks[39].x);
      /*Q3で使用される基準比率は、目の幅X：目の間X＝1：1*/
      if (meX < menoaidaX) {
        console.log("Q3:離れ目A");
        flowA += 1;
      } else {
        console.log("Q3:より目B");
        flowB += 1;
      };

      /*--------------------------------------------------------------------*/
      /*Q4--------------------------------------------------------------------*/
      //口中Y：62番Yと66番Yの平均
      let kutinakaY = (mrks[62].y + mrks[66].y) / 2;
      //眉間Y～口中Y
      let mikenKutinakaY = (kutinakaY - mikenY);
      //左フェイス（3番4番の直線の一次方程式）
      //傾きa
      let sanYonKatamuki = (mrks[3].y - mrks[4].y) / (mrks[3].x - mrks[4].x);
      //切片b=y-ax
      let sanYonSeppen = (mrks[3].y - (sanYonKatamuki * mrks[3].x));
      //一次方程式Y=sanYonKatamuki*X+sanYonSeppen
      //sanYonKatamuki*X = Y-sanYonSeppen
      //X = (Y-sanYonSeppen)/sanYonkatamuki
      let hidariX = (kutinakaY - sanYonSeppen) / sanYonKatamuki;

      //右フェイス（12番13番の直線の一次方程式）
      //傾きa
      let zyuniZyusanKatamuki = (mrks[12].y - mrks[13].y) / (mrks[12].x - mrks[13].x);
      //切片b=y-ax
      let zyuniZyusanSeppen = (mrks[12].y - (zyuniZyusanKatamuki * mrks[12].x));
      //一次方程式Y=zyuniZyusanKatamuki*x+zyuniZyusanSeppen
      //zyuniZyusanKatamuki*X = Y-zyuniZyusanSeppen
      //X = (Y-zyuniZyusanSeppen)/zyuniZyusanKatamuki
      let migiX = (kutinakaY - zyuniZyusanSeppen) / zyuniZyusanKatamuki;

      //口を軸として左右に延長した距離
      let kutizikuKaoX = (migiX - hidariX);
      /*Q4で使用される基準比率は、眉頭Y～口中Y：口中を軸として左右延長ライン＝6：5．5～11/
      眉頭Y～口中Y：口中を軸として左右延長ライン＝6：～5.4／11～
      */

      if (mikenKutinakaY * 5.5 < kutizikuKaoX * 6 && mikenKutinakaY * 11 > kutizikuKaoX * 6) {
        console.log("Q4:骨っぽさを感じないC");
        flowC += 1;
      } else {
        console.log("Q4:骨っぽさを感じるD");
        flowD += 1;
      };


      /*--------------------------------------------------------------------*/
      /*Q5--------------------------------------------------------------------*/
      console.log("Q5:計測不可(頬の丸み）");
      /*--------------------------------------------------------------------*/
      /*Q6--------------------------------------------------------------------*/
      //左目の上と下を定義
      if (mrks[43].y < mrks[44].y) {
        var hidarimeUeY = mrks[43].y;
      } else {
        var hidarimeUeY = mrks[44].y;
      };
      if (mrks[46].y > mrks[47].y) {
        var hidarimeSitaY = mrks[46].y;
      } else {
        var hidarimeSitaY = mrks[47].y;
      };


      //右目の上と下を定義
      if (mrks[37].y < mrks[38].y) {
        var migimeUeY = mrks[37].y;
      } else {
        var migimeUeY = mrks[38].y;
      };
      if (mrks[41].y > mrks[40].y) {
        var migimeSitaY = mrks[41].y;
      } else {
        var migimeSitaY = mrks[40].y;
      };

      let hidarimeY = (hidarimeSitaY - hidarimeUeY);
      let migimeY = (migimeSitaY - migimeUeY);
      let meY = (hidarimeY + migimeY) / 2;

      /*Q6で使用される基準比率は、目の高さY:目の幅X＝1：3*/

      if (meY * 3 > meX) {
        console.log("Q6:丸い目C");
        flowC += 1;
      } else {
        console.log("Q6:切れ長の目D");
        flowD += 1;
      };

      /*--------------------------------------------------------------------*/
      /*Q7--------------------------------------------------------------------*/
      console.log("Q7:計測不可(鼻の形)");
      /*--------------------------------------------------------------------*/

      /*Q8--------------------------------------------------------------------*/
      //唇の高さY
      let kutiTakasaY = (mrks[57].y - mrks[51].y);
      //唇の幅X
      let kutiHabaX = (mrks[54].x - mrks[48].x);

      /*Q8で使用される基準比率は、口の高さY:口の幅X＝1：3*/
      if (kutiTakasaY * 3 > kutiHabaX) {
        console.log("Q8:唇が厚いC");
        flowC += 1;
      } else {
        console.log("Q8:唇が薄いD");
        flowD += 1;
      };

      /*--------------------------------------------------------------------*/
      console.log("A" + flowA + "/" + "B" + flowB + "/" + "C" + flowC + "/" + "D" + flowD);
    }
  }

  //戻るボタンを押す
  document.querySelector("#reload").addEventListener("click", () => {
    firstPage();
  }, false);

  //決定ボタンを押す
  document.querySelector("#decision").addEventListener("click", () => {
    const downloadUrl = downloadImgSrc;
    const downloadFileName = "顔タイプ診断使用画像";
    let downloadLink = document.getElementById('faceTypeDL');
    downloadLink.href = downloadUrl;
    downloadLink.download = downloadFileName;
    thirdPage();
  }, false);

  //自己診断チェック
  let selected1 = 0;
  let selected2 = 0;
  document.querySelector("#select11").addEventListener("click", () => {
    selected1 = 1;
    resetSelect11Select12();
    appearSelectedButton();
    document.getElementById('selectImg11').src = "img/icon/頬が丸く出ている_ピンク.png";
    select11.style.cssText = select11cssText + 'border-color: #F593AA !important;';
  }, false);
  document.querySelector("#select11").addEventListener("mouseover", () => {
    if (selected1 != 1) {
      document.getElementById('selectImg11').src = "img/icon/頬が丸く出ている_紺.png";
      select11.style.cssText = select11cssText + 'border-color: #4A487F !important;';
    }
  }, false);
  document.querySelector("#select11").addEventListener("mouseout", () => {
    if (selected1 != 1) {
      document.getElementById('selectImg11').src = "img/icon/頬が丸く出ている_緑.png";
      select11.style.cssText = select11cssText + 'border-color: #39AAB2 !important;';
    }
  }, false);

  document.querySelector("#select12").addEventListener("click", () => {
    selected1 = 2;
    resetSelect11Select12();
    appearSelectedButton();
    document.getElementById('selectImg12').src = "img/icon/頬に丸みがあまりない_ピンク.png";
    select12.style.cssText = select12cssText + 'border-color: #F593AA !important;';
  }, false);
  document.querySelector("#select12").addEventListener("mouseover", () => {
    if (selected1 != 2) {
      document.getElementById('selectImg12').src = "img/icon/頬に丸みがあまりない_紺.png";
      select12.style.cssText = select12cssText + 'border-color: #4A487F !important;';
    }
  }, false);
  document.querySelector("#select12").addEventListener("mouseout", () => {
    if (selected1 != 2) {
      document.getElementById('selectImg12').src = "img/icon/頬に丸みがあまりない_緑.png";
      select12.style.cssText = select12cssText + 'border-color: #39AAB2 !important;';
    }
  }, false);

  function resetSelect11Select12() {
    document.getElementById('selectImg11').src = "img/icon/頬が丸く出ている_緑.png";
    document.getElementById('selectImg12').src = "img/icon/頬に丸みがあまりない_緑.png";
    select11.style.cssText = select11cssText + 'border-color: #39AAB2 !important;';
    select12.style.cssText = select12cssText + 'border-color: #39AAB2 !important;';
  };

  document.querySelector("#select21").addEventListener("click", () => {
    selected2 = 1;
    resetSelect21Select22();
    appearSelectedButton();
    document.getElementById('selectImg21').src = "img/icon/小鼻に丸みがある_ピンク.png";
    select21.style.cssText = select21cssText + 'border-color: #F593AA !important;';
  }, false);
  document.querySelector("#select21").addEventListener("mouseover", () => {
    if (selected2 != 1) {
      document.getElementById('selectImg21').src = "img/icon/小鼻に丸みがある_紺.png";
      select21.style.cssText = select21cssText + 'border-color: #4A487F !important;';
    }
  }, false);
  document.querySelector("#select21").addEventListener("mouseout", () => {
    if (selected2 != 1) {
      document.getElementById('selectImg21').src = "img/icon/小鼻に丸みがある_緑.png";
      select21.style.cssText = select21cssText + 'border-color: #39AAB2 !important;';
    }
  }, false);

  document.querySelector("#select22").addEventListener("click", () => {
    selected2 = 2;
    resetSelect21Select22();
    appearSelectedButton();
    document.getElementById('selectImg22').src = "img/icon/鼻筋が通っている_ピンク.png";
    select22.style.cssText = select22cssText + 'border-color: #F593AA !important;';
  }, false);
  document.querySelector("#select22").addEventListener("mouseover", () => {
    if (selected2 != 2) {
      document.getElementById('selectImg22').src = "img/icon/鼻筋が通っている_紺.png";
      select22.style.cssText = select22cssText + 'border-color: #4A487F !important;';
    }
  }, false);
  document.querySelector("#select22").addEventListener("mouseout", () => {
    if (selected2 != 2) {
      document.getElementById('selectImg22').src = "img/icon/鼻筋が通っている_緑.png";
      select22.style.cssText = select22cssText + 'border-color: #39AAB2 !important;';
    }
  }, false);

  function resetSelect21Select22() {
    document.getElementById('selectImg21').src = "img/icon/小鼻に丸みがある_緑.png";
    document.getElementById('selectImg22').src = "img/icon/鼻筋が通っている_緑.png";
    select21.style.cssText = select21cssText + 'border-color: #39AAB2 !important;';
    select22.style.cssText = select22cssText + 'border-color: #39AAB2 !important;';
  };

  function appearSelectedButton() {
    if (selected1 != 0) {
      if (selected2 != 0) {
        selectedButtonDiv.style.cssText = selectedButtonDivcssText + 'display: block !important;';
        heightChange();
      }
    }
  };
  document.querySelector("#selectedButton").addEventListener("click", () => {
    if (selected1 == 1) {
      flowC += 1;
    }
    if (selected2 == 1) {
      flowC += 1;
    }
    if (selected1 == 2) {
      flowD += 1;
    }
    if (selected2 == 2) {
      flowD += 1;
    }
    console.log(flowA);
    console.log(flowB);
    console.log(flowC);
    console.log(flowD);
    fourthPage();
  }, false);

  //再読み込みボタンを押す
  document.querySelector("#reloadIframe").addEventListener("click", () => {
    document.getElementById('personalcolorIframe').src = "https://personalcolor.visee.jp";
  }, false);

  //顔タイプ診断
  document.querySelector("#reloadIframe").addEventListener("click", () => {
    document.getElementById('personalcolorIframe').src = "https://personalcolor.visee.jp";
  }, false);

  function PCColorReset() {
    selected3 = 1;
    Spring.style.cssText = SpringcssText + 'background-color: #39AAB2 !important;';
    Summer.style.cssText = SummercssText + 'background-color: #39AAB2 !important;';
    Autumn.style.cssText = AutumncssText + 'background-color: #39AAB2 !important;';
    Winter.style.cssText = WintercssText + 'background-color: #39AAB2 !important;';
  };

  let selectPersonalColor;
  let selected3 = 0;

  //Springボタン
  document.querySelector("#Spring").addEventListener("click", () => {
    PCColorReset();
    selectPersonalColor = "Spring";
    Spring.style.cssText = SpringcssText + 'background-color: #F593AA !important;';
    appearSelectedButton2();
  });
  document.querySelector("#Spring").addEventListener("mouseover", () => {
    if (selectPersonalColor != "Spring") {
      Spring.style.cssText = SpringcssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#Spring").addEventListener("mouseout", () => {
    if (selectPersonalColor != "Spring") {
      Spring.style.cssText = SpringcssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Summerボタン
  document.querySelector("#Summer").addEventListener("click", () => {
    PCColorReset();
    selectPersonalColor = "Summer";
    Summer.style.cssText = SummercssText + 'background-color: #F593AA !important;';
    appearSelectedButton2();
  });
  document.querySelector("#Summer").addEventListener("mouseover", () => {
    if (selectPersonalColor != "Summer") {
      Summer.style.cssText = SummercssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#Summer").addEventListener("mouseout", () => {
    if (selectPersonalColor != "Summer") {
      Summer.style.cssText = SummercssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Autumnボタン
  document.querySelector("#Autumn").addEventListener("click", () => {
    PCColorReset();
    selectPersonalColor = "Autumn";
    Autumn.style.cssText = AutumncssText + 'background-color: #F593AA !important;';
    appearSelectedButton2();
  });
  document.querySelector("#Autumn").addEventListener("mouseover", () => {
    if (selectPersonalColor != "Autumn") {
      Autumn.style.cssText = AutumncssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#Autumn").addEventListener("mouseout", () => {
    if (selectPersonalColor != "Autumn") {
      Autumn.style.cssText = AutumncssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Winterボタン
  document.querySelector("#Winter").addEventListener("click", () => {
    PCColorReset();
    selectPersonalColor = "Winter";
    Winter.style.cssText = WintercssText + 'background-color: #F593AA !important;';
    appearSelectedButton2();
  });
  document.querySelector("#Winter").addEventListener("mouseover", () => {
    if (selectPersonalColor != "Winter") {
      Winter.style.cssText = WintercssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#Winter").addEventListener("mouseout", () => {
    if (selectPersonalColor != "Winter") {
      Winter.style.cssText = WintercssText + 'background-color: #39AAB2 !important;';
    }
  });

  function appearSelectedButton2() {
    console.log("〇");
    if (selected3 != 0) {
      selectedButtonDiv2.style.cssText = selectedButtonDiv2cssText + 'display: block !important;';
      heightChange();
    }
  };
  document.querySelector("#selectedButton2").addEventListener("click", () => {
    fifthPage();
  });


};

