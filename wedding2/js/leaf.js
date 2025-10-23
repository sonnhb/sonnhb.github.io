(function () {
  const $wrap = document.getElementById("leaves");

  // Bảng màu trái tim (đỏ/hồng tím). Muốn đổi, sửa mảng này.
  const colors = [
    "#EF4444",
    "#F43F5E",
    "#FB7185",
    "#EC4899",
    "#D946EF",
    "#F59E0B",
  ];

  const rand = (a, b) => Math.random() * (b - a) + a;
  const randi = (a, b) => Math.floor(rand(a, b + 1));

  // SVG trái tim (viewBox 0 0 64 64), có thêm viền bóng nhẹ
  function heartSVG(fill) {
    return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <filter id="s" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="rgba(0,0,0,.18)"/>
        </filter>
      </defs>
      <path filter="url(#s)" fill="${fill}" d="M46.5 10c-5 0-9.1 2.6-11.5 6.6C32.6 12.6 28.5 10 23.5 10 15.3 10 9 16.4 9 24.6 9 39.1 32 54 32 54s23-14.9 23-29.4C55 16.4 48.7 10 40.5 10h6z"/>
      <path fill="rgba(255,255,255,.18)" d="M24 14c-5.6 0-10 4.3-10 10 0 1.8.3 3.5.9 5.1 3.2-7 9.3-11.8 16.6-13.1C29.7 14.3 26.9 14 24 14z"/>
    </svg>`;
  }

  function createLeaf() {
    const leaf = document.createElement("div");
    leaf.className = "leaf";

    // random props
    const size = rand(18, 44);
    const left = `${rand(0, 100)}vw`;
    const fallSec = rand(8, 18);
    const swaySec = rand(3, 7);
    const spinSec = rand(4, 10);
    const ampPx = rand(20, 80);
    const delayS = rand(-18, 0);
    const spinDeg = Math.random() < 0.5 ? 360 : -360;
    const opacity = rand(0.7, 1);

    leaf.style.setProperty("--size", `${size}px`);
    leaf.style.setProperty("--left", left);
    leaf.style.setProperty("--fall", `${fallSec}s`);
    leaf.style.setProperty("--sway", `${swaySec}s`);
    leaf.style.setProperty("--spin", `${spinSec}s`);
    leaf.style.setProperty("--amp", `${ampPx}px`);
    leaf.style.setProperty("--delay", `${delayS}s`);
    leaf.style.setProperty("--spin-deg", `${spinDeg}deg`);
    leaf.style.setProperty("--opacity", opacity);

    // structure: fallLayer > swayLayer > spinLayer > svg
    const fallLayer = document.createElement("div");
    fallLayer.className = "fall";

    const swayLayer = document.createElement("div");
    swayLayer.className = "sway";

    const spinLayer = document.createElement("div");
    spinLayer.className = "spin";
    spinLayer.innerHTML = heartSVG(colors[randi(0, colors.length - 1)]);

    swayLayer.appendChild(spinLayer);
    fallLayer.appendChild(swayLayer);
    leaf.appendChild(fallLayer);

    // mỗi lần rơi xong random nhẹ để tái sử dụng
    fallLayer.addEventListener("animationiteration", () => {
      leaf.style.setProperty("--left", `${rand(0, 100)}vw`);
      leaf.style.setProperty("--size", `${rand(18, 44)}px`);
      leaf.style.setProperty("--opacity", rand(0.7, 1));
    });

    return leaf;
  }

  // render N trái tim
  const COUNT = 15; // chỉnh số lượng tại đây
  for (let i = 0; i < COUNT; i++) $wrap.appendChild(createLeaf());
})();
