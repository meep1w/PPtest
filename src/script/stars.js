window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({length: 70}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random() * 2 * Math.PI,
      speed: Math.random() * 0.15 + 0.04,
      tw: Math.random() * 0.8 + 0.5
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let s of stars) {
      ctx.save();
      ctx.globalAlpha = 0.56 + 0.44 * Math.sin(Date.now()/600 * s.tw + s.a);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#9ecaff';
      ctx.shadowBlur = 8 * s.r;
      ctx.fill();
      ctx.restore();
      // Лёгкое "движение" для ваиба глубины
      s.x += 0.008 * Math.cos(s.a);
      s.y += 0.012 * Math.sin(s.a);
      if (s.x < 0) s.x += canvas.width;
      if (s.x > canvas.width) s.x -= canvas.width;
      if (s.y < 0) s.y += canvas.height;
      if (s.y > canvas.height) s.y -= canvas.height;
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resizeStars);
  resizeStars();
  drawStars();
});
