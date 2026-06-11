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

/* ──────────────────────────────────────────────────────────────────────────
   디자인쇼잉 하이라이트 수신기 (FIELD TEST · TRANSFORMATION 섹션)
   쇼잉 덱은 이 앱 페이지를 <iframe>으로 임베드한다. file:// 로 열면 모든 페이지가
   "null" 오리진이라 부모 프레임이 이 문서를 직접 읽지 못한다(SecurityError).
   그래서 부모가 postMessage 로 명령만 보내고, 실제 스포트라이트는 여기서 — 자기
   자신의 DOM 위에서 — 그린다(크로스오리진 장벽 없음).
   same-origin(http/라이브)에서는 부모가 직접 DOM을 만지므로 메시지를 보내지 않아
   이 수신기는 그대로 idle 상태로 남는다. 표준 IIFE는 분리 — PWA 가드와 무관하게 항상 동작.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  var TITLE_SEL = '.rail-title,.section-title,.sheet-section-title,.vD-all-title,.sky-card-title,.channel-title,.overview-eyebrow,.entry-row-title';
  var SECTION_SEL = 'section, .lib-section, .overview, .sheet-section, .day-section, .stack-section, .sky-section, .neo-section, .poster-section';
  var HL_STYLE = [
    '.pmc-dim { opacity: 0.14 !important; filter: brightness(0.55) saturate(0.6) !important; transition: opacity .42s ease, filter .42s ease !important; }',
    '@keyframes pmcRingIn { 0% { opacity: 0; } 100% { opacity: 1; } }',
    '.pmc-hl { position: relative !important; }',
    '.pmc-ring {',
    '  position: absolute; box-sizing: border-box; inset: var(--pmc-iyt, 0px) var(--pmc-ix, 14px) var(--pmc-iyb, 0px) var(--pmc-ix, 14px);',
    '  border: 2px solid rgba(var(--accent-rgb), 0.92); border-radius: var(--pmc-r, 16px);',
    '  box-shadow: 0 0 28px 4px rgba(var(--accent-rgb), 0.34), inset 0 0 22px rgba(var(--accent-rgb), 0.08);',
    '  pointer-events: none; z-index: 2147483646;',
    '  animation: pmcRingIn 0.5s ease-out 1;',
    '}'
  ].join('\n');

  function ensureStyle() {
    if (document.getElementById('pmc-hl-style')) return;
    var s = document.createElement('style');
    s.id = 'pmc-hl-style';
    s.textContent = HL_STYLE;
    (document.head || document.documentElement).appendChild(s);
  }

  function resolveTarget(spec) {
    if (!spec) return null;
    if (spec.indexOf('text:') === 0) {
      var want = spec.slice(5).trim();
      var els = document.querySelectorAll(TITLE_SEL);
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.offsetParent === null) continue; // 숨겨진 중복 후보 건너뛰기
        var t = el.textContent.replace(/\s+/g, ' ').trim();
        if (t === want || t.indexOf(want) === 0) return el.closest(SECTION_SEL) || el.parentElement;
      }
      return null;
    }
    var matches = document.querySelectorAll(spec);
    for (var j = 0; j < matches.length; j++) { if (matches[j].offsetParent !== null) return matches[j]; }
    return matches[0] || null;
  }

  function clearSpotlight() {
    var r = document.querySelectorAll('.pmc-ring'); for (var i = 0; i < r.length; i++) r[i].remove();
    var d = document.querySelectorAll('.pmc-dim'); for (var k = 0; k < d.length; k++) d[k].classList.remove('pmc-dim');
    var h = document.querySelectorAll('.pmc-hl'); for (var m = 0; m < h.length; m++) h[m].classList.remove('pmc-hl');
  }

  function spotlight(target) {
    var node = target;
    while (node && node.parentElement && node !== document.body && node !== document.documentElement) {
      var parent = node.parentElement, ch = parent.children;
      for (var i = 0; i < ch.length; i++) { var sib = ch[i]; if (sib !== node && !sib.contains(target)) sib.classList.add('pmc-dim'); }
      node = parent;
    }
  }

  function getScroller(el) {
    var n = el.parentElement;
    while (n && n !== document.body && n !== document.documentElement) {
      var oy = window.getComputedStyle(n).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 4) return n;
      n = n.parentElement;
    }
    return document.scrollingElement || document.documentElement;
  }

  function centerScroll(target) {
    var TOPPAD = 56;
    var scroller = getScroller(target);
    var isRoot = scroller === document.scrollingElement || scroller === document.documentElement || scroller === document.body;
    var vpH = isRoot ? (window.innerHeight || document.documentElement.clientHeight) : scroller.clientHeight;
    var tRect = target.getBoundingClientRect();
    var ref = isRoot ? 0 : scroller.getBoundingClientRect().top;
    var offsetInView = tRect.top - ref;
    var delta;
    if (tRect.height >= vpH - TOPPAD * 2) delta = offsetInView - TOPPAD;
    else delta = offsetInView - (vpH - tRect.height) / 2;
    try {
      if (isRoot) window.scrollBy({ top: delta, behavior: 'smooth' });
      else scroller.scrollBy({ top: delta, behavior: 'smooth' });
    } catch (e) {
      if (isRoot) window.scrollBy(0, delta); else scroller.scrollTop += delta;
    }
  }

  function apply(spec) {
    var target = resolveTarget(spec);
    if (!target) return;
    ensureStyle();
    clearSpotlight();
    var radius = parseFloat(window.getComputedStyle(target).borderTopLeftRadius) || 0;
    var isRoundedCard = radius > 4;
    var ring = document.createElement('div');
    ring.className = 'pmc-ring';
    if (isRoundedCard) {
      var pad = 5;
      ring.style.setProperty('--pmc-ix', pad + 'px');
      ring.style.setProperty('--pmc-iyt', pad + 'px');
      ring.style.setProperty('--pmc-iyb', pad + 'px');
      ring.style.setProperty('--pmc-r', Math.max(8, radius - pad) + 'px');
    } else {
      var out = 6;
      ring.style.setProperty('--pmc-ix', (-out) + 'px');
      ring.style.setProperty('--pmc-iyt', (-out) + 'px');
      ring.style.setProperty('--pmc-iyb', (-out) + 'px');
      ring.style.setProperty('--pmc-r', '14px');
    }
    spotlight(target);
    centerScroll(target);
    target.classList.add('pmc-hl');
    target.appendChild(ring);
  }

  // 늦게 도착한 이전 명령의 재전송이 새 명령을 덮지 않게 seq 단조성 가드
  var lastSeq = 0;
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || typeof d !== 'object' || d.__pmc == null) return;
    if (typeof d.seq === 'number') { if (d.seq < lastSeq) return; lastSeq = d.seq; }
    if (d.__pmc === 'highlight') apply(d.sel);
    else if (d.__pmc === 'clear') clearSpotlight();
  });
})();
