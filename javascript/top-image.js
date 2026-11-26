$(function(){
  var $slides = $(".slideshow-fade li");
  var current = 0;
  var total = $slides.length;

  setInterval(function(){
    var next = (current + 1) % total;

    $slides.eq(current).fadeOut(1000);
    $slides.eq(next).fadeIn(1000);

    current = next;
  }, 3000);  // 3秒ごとに切り替え
});

