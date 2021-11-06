'use strict';

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener('DOMContentLoaded',
function() {
    // おみくじボタン（class='omikuji'）　ボヤァと表示させる
    $(function(){
      ScrollReveal().reveal('.omikuji', { duration: 4000 });
    });

    // ボタン１、ボタン２のテキストエフェクト
    btn_effect();
    // ボタン１　アクション
    btn1_action();
    // ボタン２　アクション
    btn2_action();

  }, false
);


// ボタン１、ボタン２のテキストエフェクト
function btn_effect() {
    var w_text = '#text1'
    var w_delay = 1000
    text_animation(w_text,w_delay); //テキストエフェクト呼び出し
    w_text = '#text2'
    w_delay = 1800
    text_animation(w_text,w_delay); //テキストエフェクト呼び出し

}

// テキストエフェクト
function text_animation(w_text,w_delay) {
  $(w_text).textillate({
    // ループのオンオフ
    loop: false,
    // テキストが置き換えられるまでの表示時間
    minDisplayTime: 2000,
    // 遅延時間
    initialDelay: w_delay,
    // アニメーションが自動的にスタートするかどうか
    autoStart: true,
    // フェードインのエフェクトの詳細設定
    in: {
      // エフェクトの名前（animate.cssをご参照下さい）
      effect: 'fadeInLeftBig',
      // 遅延時間の指数
      delayScale: 1.5,
      // 文字ごとの遅延時間
      delay: 50,
      // trueにすることでアニメーションをすべての文字に同時に適用される
      sync: false,
      // trueにすることで文字を順番にではなく、ランダムに入ってくるようにする
      // (注：syncがtrueの場合は無効になる)
      shuffle: false
    }
  });
}

// ボタン１　アクション
function btn1_action() {
    // ラッキーカラー
    // マウスオーバーでアニメーション 
    {
      $("#btn1").hover(function() {
        $(this).stop().animate({zIndex:1},{
          duration:400,
          step:function(now){
            $(this).css({transform:'rotate(' + (now * 360) + 'deg)'});
          },
          complete:function(){
            $(this).css('zIndex', 0);
          }
        })
      },function() {
        //角度を初期値に戻す
        $(this).css({transform:'rotate(0deg)'});
      });
    }

    // ボタン１クリックで、カラーチェンジ
    {
      let btn1 = document.getElementById('btn1');
      let text1 = document.getElementById('text1');
      let image1 = document.getElementById('image1');
      btn1.addEventListener('click', () => {
        let results_text1 = ['skyblue','darkblue','steelblue','aquamarine','gold','orange','darkred','khaki','deeppink','hotpink','darkviolet'];
        let results_color1 = ['#87ceeb','#00008b','#4682b4','#7fffd4','#ffd700','#ffa500','#8b0000','#f0e68c','#ff1493','#ff69b4','#9400d3'];
        let n = Math.floor(Math.random() * results_text1.length);
        text1.textContent = results_text1[n];
        text1.style.color = '#a9a9a9'
        btn1.style.backgroundColor = results_color1[n];
        image1.style.opacity = 0.5;
      });
    }
}

// ボタン２　アクション
function btn2_action() {
    // ラッキーフード
    // ボタン２マウスオーバーでアニメーション 
    {
      $("#btn2").hover(function() {
        $(this).stop().animate({zIndex:1},{
          duration:100,
          step:function(now){
            $(this).css({transform:'rotateY(' + (now * 360) + 'deg)'});
          },
          complete:function(){
            $(this).css('zIndex', 0);
          }
        })
      },function() {
          //角度を初期値に戻す
          $(this).css({transform:'rotate(0deg)'});
      });
    }
    // ボタン２クリックで、ランチチェンジ
    {
      let text2 = document.getElementById('text2');
      let image2 = document.getElementById('image2');
      btn2.addEventListener('click', () => {
        let results_text2 = ['hamburger','pancakes','pasta','pizza','cha-han','fish','steak','tacos','vegetable'];
        let results_img2 = ['hamburger.jpg','pancakes.jpg','pasta.jpg','pizza.jpg','cha-han.jpg','fish.jpg','steak.jpg','tacos.jpg','vegetable.jpg']
        let results_color2 = ['#87ceeb','#00008b','#4682b4','#7fffd4','#ffd700','#ffa500','#8b0000','#f0e68c','#ff1493'];
        let n = Math.floor(Math.random() * results_text2.length);
        image2.src = './img/' + results_img2[n];
        text2.textContent = results_text2[n];
        text2.style.color = '#a9a9a9'
        btn2.style.backgroundColor = results_color2[n];
      });
  
    }
}

// jQueryのsnowfall
$(document).ready(function(){
  $(document).snowfall({
    maxSpeed : 5, // 最大速度（さいだい　そくど）
    minSpeed : 1, // 最小速度（さいしょう　そくど）
    maxSize  : 20, // 最大サイズ（さいだい　サイズ）
    minSize  : 1, // 最小サイズ（さいしょう　サイズ）
    image : 'img/snowflakes1.png'
  });
});
