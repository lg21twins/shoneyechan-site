/* ============================================================
   하루안부 · App A11y Loader (v3.2.8)
   ----------------------------------------------------------------
   모든 모바일·웹 앱 페이지의 <head>에서 즉시 실행되어
   사용자 접근성 모드를 복원한다. (페이지 깜박임 방지)

   사용:
     <head>
       <link rel="stylesheet" href="../07_디자인/tokens/tokens.css">
       <script src="../07_디자인/_app-theme.js"></script>   <!-- defer X -->
     </head>

   localStorage 키 컨벤션:
     · 모든 키는 'haru-app-*' 접두사
     · preview 전용 키는 'haru-preview-*' (별도 네임스페이스)

   현재 활성 키:
     haru-app-text-size   — 'large' (있을 때만) — 환자·시니어
     haru-app-contrast    — 'high' (있을 때만) — 환자·시니어

   v3.2.8 (2026-05-17): 다크 모드 제거. 라이트 단일 운영.
     · data-theme 강제 코드 제거 (라이트가 기본값)
     · setTheme / getTheme / isDark API 제거
     · 레거시 키 자동 청소(haru-app-theme, haru-preview-theme)는 유지
       — 기존 사용자 브라우저에 남아있을 수 있는 'dark' 값을 한 번씩 정리

   helper API (전역 window.HaruTheme):
     setTextSize(size)      — 'normal' | 'large'
     setContrast(level)     — 'normal' | 'high'
     getTextSize() / getContrast()
   ============================================================ */
(function () {
  const root = document.documentElement;

  // ---- 페이지 전환 스타일 자동 주입 (모든 앱 공통) ----
  // _app-theme.js 가 위치한 폴더의 system/transitions.css 를 찾는다.
  try {
    const me = document.currentScript;
    if (me && me.src && !document.querySelector('link[data-haru-transitions]')) {
      const href = me.src.replace(/_app-theme\.js.*$/, 'system/transitions.css');
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-haru-transitions', '');
      document.head.appendChild(link);
    }
  } catch (e) { /* noop */ }

  // View Transition 미지원 브라우저용 진입 페이드 트리거 (Safari 등)
  if (!('startViewTransition' in document)) {
    root.classList.add('haru-page-enter');
  }

  // ---- 레거시 다크 키 자동 청소 (기존 브라우저에 남아있을 수 있는 값 정리) ----
  ['haru-app-theme', 'haru-preview-theme'].forEach((k) => {
    if (localStorage.getItem(k) !== null) localStorage.removeItem(k);
  });

  const textSize = localStorage.getItem('haru-app-text-size');
  if (textSize === 'large') {
    root.setAttribute('data-a11y-text', 'large');
  }

  const contrast = localStorage.getItem('haru-app-contrast');
  if (contrast === 'high') {
    root.setAttribute('data-a11y-contrast', 'high');
  }

  // ---- iframe-only iOS status bar overlay (모바일 앱 한정) ----
  // 데스크톱/showcase iframe에 띄우면 iOS 상태바가 없어 상단이 잘려 보인다.
  // window.top !== window.self 일 때만 가짜 status bar 이미지를 주입해
  // 실제 iPhone 캡쳐와 동등한 여백을 확보한다. (v3.2.13, 2026-05-25)
  try {
    const me2 = document.currentScript;
    const isMobileApp = root.getAttribute('data-platform') === 'mobile';
    const inIframe = (function () {
      try { return window.top !== window.self; } catch (e) { return true; }
    })();
    // 스크롤리텔링(.sc-phone-screen 등)은 외부 SVG 상태바가 별도로 그려지므로 중복 주입 방지
    let isScrolly = false;
    try {
      const frame = window.frameElement;
      if (frame && frame.parentElement) {
        isScrolly = /(sc|feat)-(phone|ipad|browser)-/.test(frame.parentElement.className);
      }
    } catch (e) { /* cross-origin → 일반 iframe 으로 간주 */ }

    // 명시적 비활성화 — 쇼케이스 등이 ?embed 파라미터로 가짜 상태바 끔
    const noStatusParam = /[?&](embed|no-status)\b/.test(location.search);

    // ?embed=1 (또는 ?no-status) iframe — 쇼케이스 비주얼 정리:
    //  · 공통: iframe 안 스크롤바 숨김
    //  · 모바일 앱만: 콘텐츠 상단에 status bar 높이만큼 패딩(외부 오버레이와 겹침 방지)
    //    → status bar 자체 위치/모양은 건드리지 않음
    if (noStatusParam && inIframe) {
      const embedStyle = document.createElement('style');
      embedStyle.setAttribute('data-haru-embed-styles', '');
      const mobilePad = isMobileApp
        ? 'body { padding-top: 51px !important; box-sizing: border-box !important; }'
        : '';
      embedStyle.textContent = `
        html, body { scrollbar-width: none !important; -ms-overflow-style: none !important; }
        html::-webkit-scrollbar, body::-webkit-scrollbar,
        *::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none !important; }
        ${mobilePad}
      `;
      (document.head || document.documentElement).appendChild(embedStyle);
    }

    if (isMobileApp && inIframe && !isScrolly && !noStatusParam) {
      root.classList.add('haru-in-iframe');
      // data: URI 내장 — 파일 경로 의존성 제거 (공백 인코딩 / file:// CORS 회피)
      const statusBarSrc = 'data:image/png;base64,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';
      const css = document.createElement('style');
      css.setAttribute('data-haru-status-bar', '');
      css.textContent = `
        .haru-in-iframe { --safe-t: 68px !important; }
        .haru-in-iframe .app, .haru-in-iframe body > .bg + * { position: relative; }
        .haru-status-bar-overlay {
          position: absolute; top: 0; left: 0; right: 0;
          width: 100%; height: 50px;
          z-index: 1000; pointer-events: none;
          display: block; overflow: hidden;
          background: transparent;
        }
        .haru-status-bar-overlay img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
      `;
      document.head.appendChild(css);
      const inject = function () {
        if (document.querySelector('.haru-status-bar-overlay')) return;
        const target = document.querySelector('.app') || document.body;
        if (!target) return;
        const wrap = document.createElement('div');
        wrap.className = 'haru-status-bar-overlay';
        wrap.setAttribute('aria-hidden', 'true');
        const img = document.createElement('img');
        img.src = statusBarSrc;
        img.alt = '';
        wrap.appendChild(img);
        target.insertBefore(wrap, target.firstChild);
      };
      if (document.body) inject();
      else document.addEventListener('DOMContentLoaded', inject);
    }
  } catch (e) { /* noop */ }

  // ---- API ----
  const api = {
    setTextSize(s) {
      if (s === 'large') {
        root.setAttribute('data-a11y-text', 'large');
        localStorage.setItem('haru-app-text-size', 'large');
      } else {
        root.removeAttribute('data-a11y-text');
        localStorage.removeItem('haru-app-text-size');
      }
      window.dispatchEvent(new CustomEvent('haru:text-size-change', { detail: { size: s } }));
    },
    getTextSize() {
      return localStorage.getItem('haru-app-text-size') === 'large' ? 'large' : 'normal';
    },
    setContrast(c) {
      if (c === 'high') {
        root.setAttribute('data-a11y-contrast', 'high');
        localStorage.setItem('haru-app-contrast', 'high');
      } else {
        root.removeAttribute('data-a11y-contrast');
        localStorage.removeItem('haru-app-contrast');
      }
      window.dispatchEvent(new CustomEvent('haru:contrast-change', { detail: { contrast: c } }));
    },
    getContrast() {
      return localStorage.getItem('haru-app-contrast') === 'high' ? 'high' : 'normal';
    },
  };

  window.HaruTheme = api;
})();
