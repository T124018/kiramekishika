document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.instagram-introduce');
  const images = Array.from(container.querySelectorAll('img'));

  // 無限ループ用に画像を複製
  container.innerHTML += container.innerHTML;

  const imageWidth = 210; // 画像200px + margin-right10px
  const totalWidth = imageWidth * images.length;
  let scrollPos = 0;
  const speed = 1.0; // スクロール速度

  function animate() {
    scrollPos -= speed;
    if (Math.abs(scrollPos) >= totalWidth) {
      scrollPos = 0;
    }
    container.style.transform = `translateX(${scrollPos}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});


