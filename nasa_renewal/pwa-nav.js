(function () {
  var isStandalone = ('standalone' in navigator && navigator.standalone) ||
                     window.matchMedia('(display-mode: standalone)').matches;
  if (!isStandalone) return;

  // 1. iOS 풀스크린에서 상단 status bar 영역 보정
  var css = document.createElement('style');
  css.textContent = [
    '.page-topbar { padding-top: calc(env(safe-area-inset-top, 0px) + 8px) !important; }',
    '.hero-topbar-wrap { padding-top: env(safe-area-inset-top, 0px) !important; }',
    '.page-header { padding-top: calc(env(safe-area-inset-top, 0px) + 8px) !important; }'
  ].join('\n');
  (document.head || document.documentElement).appendChild(css);

  // 2. 동일 도메인 링크 클릭 시 Safari로 빠지지 않게 인터셉트
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.nodeName !== 'A') el = el.parentNode;
    if (!el || !el.href) return;
    var url = new URL(el.href, location.href);
    if (url.origin !== location.origin) return;
    if (el.target === '_blank') return;
    e.preventDefault();
    location.href = url.href;
  });
})();
