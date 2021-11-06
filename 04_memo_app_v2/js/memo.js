"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
  function() {

    // 1.localStorageが使えるか（つかえるか）確認（かくにん）
    if (typeof  localStorage === "undefined") {
      window.alert("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      viewStorage();      // localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
      saveLocalStorage(); // 2.localStorageへの保存（ほぞん）
      delLocalStorage();  // 3.localStorageから１件削除（さくじょ）
      allClearLocalStorage();  // 4.localStorageからすべて削除（さくじょ）
      selectTable();      // 5.データ選択（せんたく）
    }

  }, false
);

// 2.localStorageへの保存（ほぞん）
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click",
    function(e){
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      // 値の入力チェック
      if (key=="" || value=="") {
          window.alert("Key、Memoはいずれも必須です。");
          return;
      }else{
        let w_confirm = window.confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存（save）しますか？"); //version-up1 add
        //確認（かくにん）ダイアログで「OK」を押されたとき、保存（ほぞん）する version-up1 add
        if (w_confirm === true){ //version-up1 add
          localStorage.setItem(key, value);
          viewStorage(); //localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
          let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        } //version-up1 add
      }
    }, false
  );
};

// 3.localStorageから１件削除（さくじょ）
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click",
    function(e) {
      e.preventDefault();
      let w_sel = "0";          // 選択（せんたく）されていれば、"1"が返却（へんきゃく）される
      w_sel = selectCheckBox(); // テーブルからデータ選択（せんたく） version-up2 chg: selectRadioBtn ==> selectCheckBox

      if(w_sel === "1"){
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;
        let w_confirm = window.confirm("LocalStorageから\n" + key + " " + value + "\nを削除（delete）しますか？"); //version-up1 add
        //確認（かくにん）ダイアログで「OK」を押されたとき、削除（さくじょ）する  version-up1 add
        if (w_confirm === true){ //version-up1 add
          localStorage.removeItem(key);
          viewStorage(); //localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
          let w_msg = "LocalStorageから" + key + " " + value + "を削除（delete）しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        } //version-up1 add
      }
    }, false
  );
};

// 4.localStorageからすべて削除（さくじょ）
function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click",
    function(e) {
      e.preventDefault();
      let w_confirm = window.confirm("LocalStorageのデータをすべて削除（all clear）します。\nよろしいですか？");
      //確認（かくにん）ダイアログで「OK」を押されたとき、すべて削除（さくじょ）する
      if (w_confirm === true){
          localStorage.clear();
          viewStorage(); //localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
          let w_msg = "LocalStorageのデータをすべて削除（all clear）しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
      }
    }, false
  );
};

// 5.データ選択（せんたく）
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click",
    function(e) {
      e.preventDefault();
      selectCheckBox(); //テーブルからデータ選択（せんたく） version-up2 chg: selectRadioBtn ==> selectCheckBox
    }, false
  );
}

// テーブルからデータ選択（せんたく）
function selectCheckBox() {  // version-up2 chg: selectRadioBtn ==> selectCheckBox
  let w_sel = "0"; //選択（せんたく）されていれば、”１”にする
  let w_cnt = 0;   //選択されているチェックボックスの数 // version-up2 add
  const chkbox1 = document.getElementsByName("chkbox1"); // version-up2 chg: radio1 ==> chkbox1
  const table1 = document.getElementById("table1");
  let w_textKey = "";  // work  version-up2 add
  let w_textMemo = ""; // work  version-up2 add

  for(let i = 0; i < chkbox1.length; i++){ // version-up2 chg: radio1 ==> chkbox1
    if(chkbox1[i].checked) { // version-up2 chg: radio1 ==> chkbox1
      if(w_cnt === 0) {      //最初にチェックされている行をワークに退避 version-up2 add
        w_textKey = table1.rows[i+1].cells[1].firstChild.data; // version-up2 chg  document.getElementById("textKey").value ==> w_textKey
        w_textMemo = table1.rows[i+1].cells[2].firstChild.data; // version-up2 chg  document.getElementById("textMemo").value ==> w_textMemo
        // return w_sel = "1"; version-up2 del
      } // version-up2 add
      w_cnt++; //選択されているチェックボックスの数をカウント version-up2 add
    }
  }

  document.getElementById("textKey").value = w_textKey;     //version-up2 add
  document.getElementById("textMemo").value = w_textMemo;   //version-up2 add
  if (w_cnt===1) {                                          //version-up2 add
    return w_sel = "1";                                     //version-up2 add
  }                                                         //version-up2 add
  else {                                                    //version-up2 add
    window.alert("１つ選択（select）してください。");
  }                                                         //version-up2 add
};

// localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
function viewStorage() {

  const list = document.getElementById("list");
  // htmlのテーブル初期化（しょきか）
  while(list.rows[0]) list.deleteRow(0);

  // localStorageすべての情報（じょうほう）の取得（しゅとく）
  for (let i=0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    // localStorageのキーと値（あたい）を表示（ひょうじ）
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";  // version-up2 chg: name radio1 ==> chkbox1, type radio ==> checkbox
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }

  // jQueryのplugin tablesorterを使ってテーブルのソート
  // sortList: 引数１...最初からソートしておく列を指定、引数２...0…昇順,1…降順
  $("#table1").tablesorter({
    sortList: [[1, 0]]
  });

  $("#table1").trigger("update");
};