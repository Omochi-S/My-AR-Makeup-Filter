window.onload = function () {
  "use strict";
  //let pathname = "/My-AR-Makeup-Filter";
  let pathname = "";
  //スクリーン高さ調整
  let browserHeight = document.documentElement.clientHeight;
  let bodyHeight = document.body.clientHeight;
  let addHeight = browserHeight - bodyHeight;
  let heightResult = document.getElementById('heightResult');
  let heightResultHeight = heightResult.offsetHeight;
  if (addHeight > 0) {
    heightResult.style.height = heightResultHeight + addHeight + 'px';
  };
  //URLから＃以降取り出し
  const urlHash = location.hash;
  //顔タイプ英語表記
  const hashAfter = urlHash.replace('#', '');//(最初の'#'しか置換されない)
  console.log(hashAfter);
  //顔タイプ表記
  let faceName;
  //パーソナルカラー表記
  let personalColorName;
  //お勧めのフィルターのために選ばれた番号
  let typeNumber;
  let typeNumber1;
  let typeNumber2;
  //上の番号の位別
  let hyaku;
  let zyuu;
  //クリップボードにコピーするテキスト
  let clipboardText;
  var SnapCodeArray = {
    0: { "name": "SnapCode by 山吹萌子", "code": "img/snapcode/000山吹萌子.png", "img": "img/snapcode/000説明.png", "url": "山吹 萌子" },
    100: { "name": "Cute", "code": "img/snapcode/100Cute.png", "img": "img/AI生成顔/AI-100Cute.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=0a8625b56b8843f58b5210fa4c9cf920&metadata=01" },
    200: { "name": "Fresh", "code": "img/snapcode/200Fresh.png", "img": "img/AI生成顔/AI-200Fresh.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=73343b78582f43b2ac5d771b055e3187&metadata=01" },
    300: { "name": "Feminine", "code": "img/snapcode/300Feminine.png", "img": "img/AI生成顔/AI-300Feminine.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=85e9c9816e83429491d849c016f5387e&metadata=01" },
    400: { "name": "Cool", "code": "img/snapcode/400Cool.png", "img": "img/AI生成顔/AI-400Cool.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=16dcb9b08ffe49fda8dcbd8aaba4e3f8&metadata=01" },
    110: { "name": "CuteSpring", "code": "img/snapcode/110CuteSpring.png", "img": "img/AI生成顔/AI-110CuteSpring.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=42acf0989df64c2681e622a93102219d&metadata=01" },
    111: { "name": "CuteSpringDark", "code": "img/snapcode/111CuteSpringDark.png", "img": "img/AI生成顔/AI-111CuteSpringDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=c2703d36ae954b6788c19cfc7fd74904&metadata=01" },
    120: { "name": "CuteSummer", "code": "img/snapcode/120CuteSummer.png", "img": "img/AI生成顔/AI-120CuteSummer.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=281e0ad06af74f23bbdf3161e44e5614&metadata=01" },
    121: { "name": "CuteSummerDark", "code": "img/snapcode/121CuteSummerDark.png", "img": "img/AI生成顔/AI-121CuteSummerDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=72cd926795c640b2b57e7b582438c78e&metadata=01" },
    130: { "name": "CuteAutumn", "code": "img/snapcode/130CuteAutumn.png", "img": "img/AI生成顔/AI-130CuteAutumn.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=9c42918ab9474a17999589cfff54cfb2&metadata=01" },
    131: { "name": "CuteAutumnDark", "code": "img/snapcode/131CuteAutumnDark.png", "img": "img/AI生成顔/AI-131CuteAutumnDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=22a66a75d85348c093f6e38aafa1891d&metadata=01" },
    140: { "name": "CuteWinter", "code": "img/snapcode/140CuteWinter.png", "img": "img/AI生成顔/AI-140CuteWinter.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=1d58810c290d42e48fbb3c568da499b6&metadata=01" },
    141: { "name": "CuteWinterDark", "code": "img/snapcode/141CuteWinterDark.png", "img": "img/AI生成顔/AI-141CuteWinterDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=6697a411ccc7476c884c8236636751bc&metadata=01" },
    210: { "name": "FreshSpring", "code": "img/snapcode/210FreshSpring.png", "img": "img/AI生成顔/AI-210FreshSpring.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=063f17dd30664307bc08ee2e85a61274&metadata=01" },
    211: { "name": "FreshSpringDark", "code": "img/snapcode/211FreshSpringDark.png", "img": "img/AI生成顔/AI-211FreshSpringDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=019ffcb2ff6449b9bd769e54da2499e9&metadata=01" },
    220: { "name": "FreshSummer", "code": "img/snapcode/220FreshSummer.png", "img": "img/AI生成顔/AI-220FreshSummer.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=d2010e5b6d794a5b9937be5bf3637ee9&metadata=01" },
    221: { "name": "FreshSummerDark", "code": "img/snapcode/221FreshSummerDark.png", "img": "img/AI生成顔/AI-221FreshSummerDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=f044de299e674566844796f0350e97f2&metadata=01" },
    230: { "name": "FreshAutumn", "code": "img/snapcode/230FreshAutumn.png", "img": "img/AI生成顔/AI-230FreshAutumn.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=4de0e0b2493f41a0bf4e283ffdc939a1&metadata=01" },
    231: { "name": "FreshAutumnDark", "code": "img/snapcode/231FreshAutumnDark.png", "img": "img/AI生成顔/AI-231FreshAutumnDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=ad7d7bb7a69a401a951c9b249d4ac420&metadata=01" },
    240: { "name": "FreshWinter", "code": "img/snapcode/240FreshWinter.png", "img": "img/AI生成顔/AI-240FreshWinter.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=4b7eee7536494a75b958800f72b485ce&metadata=01" },
    241: { "name": "FreshWinterDark", "code": "img/snapcode/241FreshWinterDark.png", "img": "img/AI生成顔/AI-241FreshWinterDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=90c70f92b7f649fb884a5d274b308471&metadata=01" },
    310: { "name": "FeminineSpring", "code": "img/snapcode/310FeminineSpring.png", "img": "img/AI生成顔/AI-310FeminineSpring.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=873a85148e5f4fc2a786f00ea2b665cd&metadata=01" },
    311: { "name": "FeminineSpringDark", "code": "img/snapcode/311FeminineSpringDark.png", "img": "img/AI生成顔/AI-311FeminineSpringDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=f06ec112adaf4ccdbe4f336de08f04b1&metadata=01" },
    320: { "name": "FeminineSummer", "code": "img/snapcode/320FeminineSummer.png", "img": "img/AI生成顔/AI-320FeminineSummer.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=6a72e22e695149ecb231e3bad7119e8f&metadata=01" },
    321: { "name": "FeminineSummerDark", "code": "img/snapcode/321FeminineSummerDark.png", "img": "img/AI生成顔/AI-321FeminineSummerDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=ed861104fc3e46c1a39b41e4abff5bed&metadata=01" },
    330: { "name": "FeminineAutumn", "code": "img/snapcode/330FeminineAutumn.png", "img": "img/AI生成顔/AI-330FeminineAutumn.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=76a0274339d747538621240bd82924be&metadata=01" },
    331: { "name": "FeminineAutumnDark", "code": "img/snapcode/331FeminineAutumnDark.png", "img": "img/AI生成顔/AI-331FeminineAutumnDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=42e36e5e68e54b42a2ecb48114c9d158&metadata=01" },
    340: { "name": "FeminineWinter", "code": "img/snapcode/340FeminineWinter.png", "img": "img/AI生成顔/AI-340FeminineWinter.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=271d11c11f394551bd1f2c301aa2395d&metadata=01" },
    341: { "name": "FeminineWinterDark", "code": "img/snapcode/341FeminineWinterDark.png", "img": "img/AI生成顔/AI-341FeminineWinterDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=77b99c79c2294c98bdb3046d8bd8543e&metadata=01" },
    410: { "name": "CoolSpring", "code": "img/snapcode/410CoolSpring.png", "img": "img/AI生成顔/AI-410CoolSpring.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=953900e605394b4c83a330305e0dfd6a&metadata=01" },
    411: { "name": "CoolSpringDark", "code": "img/snapcode/411CoolSpringDark.png", "img": "img/AI生成顔/AI-411CoolSpringDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=f05daf1dd93b4ef7808c0bfbb34ee654&metadata=01" },
    420: { "name": "CoolSummer", "code": "img/snapcode/420CoolSummer.png", "img": "img/AI生成顔/AI-420CoolSummer.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=02746d8ef88c4dadaed2f41394d863cc&metadata=01" },
    421: { "name": "CoolSummerDark", "code": "img/snapcode/421CoolSummerDark.png", "img": "img/AI生成顔/AI-421CoolSummerDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=02746d8ef88c4dadaed2f41394d863cc&metadata=01" },
    430: { "name": "CoolAutumn", "code": "img/snapcode/430CoolAutumn.png", "img": "img/AI生成顔/AI-430CoolAutumn.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=a73645236e0148009c8f5229b372f624&metadata=01" },
    431: { "name": "CoolAutumnDark", "code": "img/snapcode/431CoolAutumnDark.png", "img": "img/AI生成顔/AI-431CoolAutumnDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=eed184a7e2f24f8b990f63cd0af62001&metadata=01" },
    440: { "name": "CoolWinter", "code": "img/snapcode/440CoolWinter.png", "img": "img/AI生成顔/AI-440CoolWinter.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=4d3e5b3bdea6432db3ed0c0661aa2205&metadata=01" },
    441: { "name": "CoolWinterDark", "code": "img/snapcode/441CoolWinterDark.png", "img": "img/AI生成顔/AI-441CoolWinterDark.png", "url": "https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=e433f720bdb84409a566f6c32fbc0d5b&metadata=01" }
  };
  //顔タイプボタンデザイン
  const FtCute = document.getElementById('FtCute'),
    FtCutecssText = FtCute.style.cssText;
  const FtFresh = document.getElementById('FtFresh'),
    FtFreshcssText = FtFresh.style.cssText;
  const FtFeminine = document.getElementById('FtFeminine'),
    FtFemininecssText = FtFeminine.style.cssText;
  const FtCool = document.getElementById('FtCool'),
    FtCoolcssText = FtCool.style.cssText;
  //顔タイプボタン文デザイン
  const FtCuteP = document.getElementById('FtCuteP'),
    FtCutePcssText = FtCuteP.style.cssText;
  const FtFreshP = document.getElementById('FtFreshP'),
    FtFreshPcssText = FtFreshP.style.cssText;
  const FtFeminineP = document.getElementById('FtFeminineP'),
    FtFemininePcssText = FtFeminineP.style.cssText;
  const FtCoolP = document.getElementById('FtCoolP'),
    FtCoolPcssText = FtCoolP.style.cssText;
  //パーソナルカラーボタンデザイン
  const PcNone = document.getElementById('PcNone'),
    PcNonecssText = PcNone.style.cssText;
  const PcSpring = document.getElementById('PcSpring'),
    PcSpringcssText = PcSpring.style.cssText;
  const PcSummer = document.getElementById('PcSummer'),
    PcSummercssText = PcSummer.style.cssText;
  const PcAutumn = document.getElementById('PcAutumn'),
    PcAutumncssText = PcAutumn.style.cssText;
  const PcWinter = document.getElementById('PcWinter'),
    PcWintercssText = PcWinter.style.cssText;
  //パーソナルカラー文デザイン
  const PcNoneP = document.getElementById('PcNoneP'),
    PcNonePcssText = PcNoneP.style.cssText;
  const PcSpringP = document.getElementById('PcSpringP'),
    PcSpringPcssText = PcSpringP.style.cssText;
  const PcSummerP = document.getElementById('PcSummerP'),
    PcSummerPcssText = PcSummerP.style.cssText;
  const PcAutumnP = document.getElementById('PcAutumnP'),
    PcAutumnPcssText = PcAutumnP.style.cssText;
  const PcWinterP = document.getElementById('PcWinterP'),
    PcWinterPcssText = PcWinterP.style.cssText;
  //ノンフィルターの時に消す
  const noneFilterHideButton = document.getElementById('noneFilterHideButton'),
    noneFilterHideButtoncssText = noneFilterHideButton.style.cssText;
  const noneTypeHideP = document.getElementById('noneTypeHideP'),
    noneTypeHidePcssText = noneTypeHideP.style.cssText;
  //フィルターボタン
  const Filter1 = document.getElementById('Filter1'),
    Filter1cssText = Filter1.style.cssText;
  const Filter2 = document.getElementById('Filter2'),
    Filter2cssText = Filter2.style.cssText;
  const noneFilter1 = document.getElementById('noneFilter1'),
    noneFilter1cssText = noneFilter1.style.cssText;
  const noneFilter2 = document.getElementById('noneFilter2'),
    noneFilter2cssText = noneFilter2.style.cssText;
  //デフォルトデザイン


  faces();
  function faces() {
    //パーソナルカラー診断
    if (hashAfter.match(/Spring/)) {
      personalColorName = "Spring";
      PcSpringP.style.cssText = PcSpringPcssText + 'text-decoration-color: #F593AA !important;';
    } else if (hashAfter.match(/Summer/)) {
      personalColorName = "Summer";
      PcSummerP.style.cssText = PcSummerPcssText + 'text-decoration-color: #F593AA !important;';
    } else if (hashAfter.match(/Autumn/)) {
      personalColorName = "Autumn";
      PcAutumnP.style.cssText = PcAutumnPcssText + 'text-decoration-color: #F593AA !important;';
    } else if (hashAfter.match(/Winter/)) {
      personalColorName = "Winter";
      PcWinterP.style.cssText = PcWinterPcssText + 'text-decoration-color: #F593AA !important;';
    }
    //顔タイプ診断
    if (hashAfter.match(/cute/)) {
      typeNumber = 100;
      faceName = "Cute";
      FtCute.style.cssText = FtCutecssText + 'background-color: #F593AA !important;';
      PcNone.style.cssText = PcNonecssText + 'background-color: #F593AA !important;';
      FtCuteP.style.cssText = FtCutePcssText + 'text-decoration-color: #F593AA !important;';
      selects();
      result();
    } else if (hashAfter.match(/fresh/)) {
      typeNumber = 200;
      faceName = "Fresh";
      FtFresh.style.cssText = FtFreshcssText + 'background-color: #F593AA !important;';
      PcNone.style.cssText = PcNonecssText + 'background-color: #F593AA !important;';
      FtFreshP.style.cssText = FtFreshPcssText + 'text-decoration-color: #F593AA !important;';
      selects();
      result();
    } else if (hashAfter.match(/feminine/)) {
      typeNumber = 300;
      faceName = "Feminine";
      FtFeminine.style.cssText = FtFemininecssText + 'background-color: #F593AA !important;';
      PcNone.style.cssText = PcNonecssText + 'background-color: #F593AA !important;';
      FtFeminineP.style.cssText = FtFemininePcssText + 'text-decoration-color: #F593AA !important;';
      selects();
      result();
    } else if (hashAfter.match(/cool/)) {
      typeNumber = 400;
      faceName = "Cool";
      FtCool.style.cssText = FtCoolcssText + 'background-color: #F593AA !important;';
      PcNone.style.cssText = PcNonecssText + 'background-color: #F593AA !important;';
      FtCoolP.style.cssText = FtCoolPcssText + 'text-decoration-color: #F593AA !important;';
      selects();
      result();
    } else {
      noneTypeHideP.style.cssText = noneTypeHidePcssText + 'display: none !important;';
      typeNumber = (Math.floor(Math.random() * 4) + 1) * 100;
      document.getElementById('title').innerHTML = "診断結果は不明です。";
      document.getElementById('title2').innerHTML = "ARメイクフィルターをランダムに表示しています。";
      if (typeNumber == 100) {
        FtCute.style.cssText = FtCutecssText + 'background-color: #F593AA !important;';
      } else if (typeNumber == 200) {
        FtFresh.style.cssText = FtFreshcssText + 'background-color: #F593AA !important;';
      } else if (typeNumber == 300) {
        FtFeminine.style.cssText = FtFemininecssText + 'background-color: #F593AA !important;';
      } else if (typeNumber == 400) {
        FtCool.style.cssText = FtCoolcssText + 'background-color: #F593AA !important;';
      }
      PcNone.style.cssText = PcNonecssText + 'background-color: #F593AA !important;';
      PcNoneP.style.cssText = PcNonePcssText + 'text-decoration-color: #fffef7 !important;';
      selects();
    }

  };
  //ヘッダーボタン
  document.querySelector(".headerTop").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/index.html" + location.hash;
  }, false);
  document.querySelector(".headerAbout").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/about.html" + location.hash;
  }, false);
  document.querySelector(".headerDiagnose").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/diagnose.html" + location.hash;
  }, false);
  document.querySelector(".linkAbout").addEventListener("click", () => {
    window.location.href = "http://" + window.location.host + pathname + "/about.html" + location.hash;
  }, false);

  //タイトルに表示
  function result() {
    document.getElementById('title').innerHTML = "あなたの顔タイプは「" + faceName + "」です。";
    document.getElementById('title2').innerHTML = "パーソナルカラーは「" + personalColorName + "」です。";
  };
  function selects() {
    console.log(typeNumber);
    if (typeNumber % 100 < 1) {
      typeNumber1 = 0;
      typeNumber2 = typeNumber;
      noneFilterHideButton.style.cssText = noneFilterHideButtoncssText + 'display: none !important;';
      document.getElementById('photoSpan').innerHTML = "　　";
    } else {
      typeNumber1 = typeNumber;
      typeNumber2 = typeNumber + 1;
      document.getElementById('photoSpan').innerHTML = "<a href='https://generated.photos/' target='_new' class='linkLine'>出典：Generated Photos</a> ";
      noneFilterHideButton.style.cssText = noneFilterHideButtoncssText + 'display: block !important;';

    }
    snapCode();
    ARImgReset();
  };
  function ARImgReset() {
    Filter1.style.cssText = Filter1cssText + 'display: none !important;';
    noneFilter1.style.cssText = noneFilter1cssText + 'display: block !important;';
    noneFilter1.style.cssText = noneFilter1cssText + 'textalign: center !important;';
    Filter2.style.cssText = Filter2cssText + 'display: none !important;';
    noneFilter2.style.cssText = noneFilter2cssText + 'display: block !important;';
    noneFilter2.style.cssText = noneFilter2cssText + 'textalign: center !important;';
  }

  function snapCode() {
    document.getElementById('snapCodeName1').innerHTML = SnapCodeArray[typeNumber1].name;
    document.getElementById('snapCodeImg1').src = SnapCodeArray[typeNumber1].code;
    document.getElementById('ARImg1').src = SnapCodeArray[typeNumber1].img;

    document.getElementById('snapCodeName2').innerHTML = SnapCodeArray[typeNumber2].name;
    document.getElementById('snapCodeImg2').src = SnapCodeArray[typeNumber2].code;
    document.getElementById('ARImg2').src = SnapCodeArray[typeNumber2].img
  };




  //リンクボタンを押したとき
  document.querySelector("#snapCodeLink1").addEventListener("click", () => {
    clipboardText = SnapCodeArray[typeNumber1].url;
    clipboard();
  });
  document.querySelector("#snapCodeLink2").addEventListener("click", () => {
    clipboardText = SnapCodeArray[typeNumber2].url;
    clipboard();
  });
  function clipboard() {
    navigator.clipboard.writeText(clipboardText);                     // 選択しているテキストをクリップボードにコピーする
    alert("コピーしました。\nSnapCameraの検索バーに貼り付けてください。\n\nコピー内容：" + clipboardText);                            // 任意でアラートを出す
  };

  //フィルター有効ボタン
  document.querySelector("#Filter1").addEventListener("click", () => {
    Filter1.style.cssText = Filter1cssText + 'display: none !important;';
    noneFilter1.style.cssText = noneFilter1cssText + 'display: block !important;';
    noneFilter1.style.cssText = noneFilter1cssText + 'textalign: center !important;';
    document.getElementById('ARImg1').src = SnapCodeArray[typeNumber1].img;
  });
  document.querySelector("#Filter2").addEventListener("click", () => {
    Filter2.style.cssText = Filter2cssText + 'display: none !important;';
    noneFilter2.style.cssText = noneFilter2cssText + 'display: block !important;';
    noneFilter2.style.cssText = noneFilter2cssText + 'textalign: center !important;';
    document.getElementById('ARImg2').src = SnapCodeArray[typeNumber2].img;
  });
  document.querySelector("#noneFilter1").addEventListener("click", () => {
    noneFilter1.style.cssText = noneFilter1cssText + 'display: none !important;';
    Filter1.style.cssText = Filter1cssText + 'display: block !important;';
    Filter1.style.cssText = Filter1cssText + 'textalign: center !important;';
    document.getElementById('ARImg1').src = 'img/AI生成顔/AI-000None.png';
  });
  document.querySelector("#noneFilter2").addEventListener("click", () => {
    noneFilter2.style.cssText = noneFilter2cssText + 'display: none !important;';
    Filter2.style.cssText = Filter2cssText + 'display: block !important;';
    Filter2.style.cssText = Filter2cssText + 'textalign: center !important;';
    document.getElementById('ARImg2').src = 'img/AI生成顔/AI-000None.png';
  });


  //顔タイプボタンの反応時
  //Cuteボタン
  document.querySelector("#FtCute").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = 100 + zyuu;
    FTColorReset();
    FtCute.style.cssText = FtCutecssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#FtCute").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (hyaku != 100) {
      FtCute.style.cssText = FtCutecssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#FtCute").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (hyaku != 100) {
      FtCute.style.cssText = FtCutecssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Freshボタン
  document.querySelector("#FtFresh").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = 200 + zyuu;
    FTColorReset();
    FtFresh.style.cssText = FtFreshcssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#FtFresh").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (hyaku != 200) {
      FtFresh.style.cssText = FtFreshcssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#FtFresh").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (hyaku != 200) {
      FtFresh.style.cssText = FtFreshcssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Feminineボタン
  document.querySelector("#FtFeminine").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = 300 + zyuu;
    FTColorReset();
    FtFeminine.style.cssText = FtFemininecssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#FtFeminine").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (hyaku != 300) {
      FtFeminine.style.cssText = FtFemininecssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#FtFeminine").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (hyaku != 300) {
      FtFeminine.style.cssText = FtFemininecssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Coolボタン
  document.querySelector("#FtCool").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = 400 + zyuu;
    FTColorReset();
    FtCool.style.cssText = FtCoolcssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#FtCool").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (hyaku != 400) {
      FtCool.style.cssText = FtCoolcssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#FtCool").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (hyaku != 400) {
      FtCool.style.cssText = FtCoolcssText + 'background-color: #39AAB2 !important;';
    }
  });
  //パーソナルカラーボタンの反応時
  //未選択ボタン
  document.querySelector("#PcNone").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = hyaku;
    PCColorReset();
    PcNone.style.cssText = PcNonecssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#PcNone").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (zyuu != 0) {
      PcNone.style.cssText = PcNonecssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#PcNone").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (zyuu != 0) {
      PcNone.style.cssText = PcNonecssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Springボタン
  document.querySelector("#PcSpring").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = hyaku + 10;
    PCColorReset();
    PcSpring.style.cssText = PcSpringcssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#PcSpring").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (zyuu != 10) {
      PcSpring.style.cssText = PcSpringcssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#PcSpring").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (zyuu != 10) {
      PcSpring.style.cssText = PcSpringcssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Summerボタン
  document.querySelector("#PcSummer").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = hyaku + 20;
    PCColorReset();
    PcSummer.style.cssText = PcSummercssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#PcSummer").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (zyuu != 20) {
      PcSummer.style.cssText = PcSummercssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#PcSummer").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (zyuu != 20) {
      PcSummer.style.cssText = PcSummercssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Autumnボタン
  document.querySelector("#PcAutumn").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = hyaku + 30;
    PCColorReset();
    PcAutumn.style.cssText = PcAutumncssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#PcAutumn").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (zyuu != 30) {
      PcAutumn.style.cssText = PcAutumncssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#PcAutumn").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (zyuu != 30) {
      PcAutumn.style.cssText = PcAutumncssText + 'background-color: #39AAB2 !important;';
    }
  });
  //Winterボタン
  document.querySelector("#PcWinter").addEventListener("click", () => {
    typeNumberMemory();
    typeNumber = hyaku + 40;
    PCColorReset();
    PcWinter.style.cssText = PcWintercssText + 'background-color: #F593AA !important;';
    selects();
  });
  document.querySelector("#PcWinter").addEventListener("mouseover", () => {
    typeNumberMemory();
    if (zyuu != 40) {
      PcWinter.style.cssText = PcWintercssText + 'background-color: #4A487F !important;';
    }
  });
  document.querySelector("#PcWinter").addEventListener("mouseout", () => {
    typeNumberMemory();
    if (zyuu != 40) {
      PcWinter.style.cssText = PcWintercssText + 'background-color: #39AAB2 !important;';
    }
  });

  function typeNumberMemory() {
    var numString = String(typeNumber);
    hyaku = Number(numString[0] + "00");
    zyuu = Number(numString[1] + "0");
  };
  function FTColorReset() {
    FtCute.style.cssText = FtCutecssText + 'background-color: #39AAB2 !important;';
    FtCute.style.cssText = FtCutecssText + 'background-color: #39AAB2 !important;';
    FtFresh.style.cssText = FtFreshcssText + 'background-color: #39AAB2 !important;';
    FtFeminine.style.cssText = FtFemininecssText + 'background-color: #39AAB2 !important;';
    FtCool.style.cssText = FtCoolcssText + 'background-color: #39AAB2 !important;';
  };
  function PCColorReset() {
    PcNone.style.cssText = PcNonecssText + 'background-color: #39AAB2 !important;';
    PcSpring.style.cssText = PcSpringcssText + 'background-color: #39AAB2 !important;';
    PcSummer.style.cssText = PcSummercssText + 'background-color: #39AAB2 !important;';
    PcAutumn.style.cssText = PcAutumncssText + 'background-color: #39AAB2 !important;';
    PcWinter.style.cssText = PcWintercssText + 'background-color: #39AAB2 !important;';
  };
};

