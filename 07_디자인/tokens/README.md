# 하루안부 · Design Tokens

**v1.0 · 2026.04.18**
**위치**: `07_디자인/tokens/tokens.css`
**적용 대상**:
- 보호자 · 요양보호사 · 환자 → **모바일 PWA**
- 의료진 (의사·간호사) → **데스크톱 웹**

**네이티브 앱 없음** (모바일은 PWA, 데스크톱은 일반 웹)

---

## 요약 — 딱 3가지만 기억

1. 모든 화면은 `tokens.css` 하나만 import 한다.
2. `<html>`에 `data-role`과 `data-platform`을 반드시 선언한다.
3. 색·간격·크기는 Layer 2 (Semantic) 토큰만 쓴다. Layer 1 (원시 팔레트) 직접 사용 금지.

---

## 1. 왜 만들었나

세션 이전 상태에서는 다음 문제가 있었다.

- 문서 3개가 각각 다른 토큰 이름을 썼다 (`--blue` / `--primary-blue` / `--blue-500` 혼재).
- `common.css`는 HTML에서 import되지 않아 실질적으로 죽은 코드였다.
- 탭바 높이가 문서마다 50px / 56px / 60px로 달랐다.
- 각 역할(보호자/의료진/환자)별로 HTML을 통째로 다시 쓰던 구조였다.

이걸 **토큰 1개 + data-attribute 오버라이드**로 바꾼다. 같은 HTML이 역할과 플랫폼만 바꾸면 그대로 다른 화면이 된다.

---

## 2. 구조 — 3계층 + 2축

```
Layer 1 · PRIMITIVE    원시 팔레트 (brand-blue-500, space-5, font-16 …)
   ↓ 참조
Layer 2 · SEMANTIC     의미 기반 (color-text-primary, space-inset-default …)  ← 화면은 여기만 쓴다
   ↓ 참조
Layer 3 · COMPONENT    컴포넌트 전용 (tabbar-height, card-padding …)

Theme A · data-role     보호자/의료진/환자가 --color-accent 등을 갈아끼움
Theme B · data-platform 모바일/웹이 --size-*/--space-page-margin 등을 갈아끼움
```

---

## 3. 사용법 — HTML 기본 세팅

```html
<!doctype html>
<html lang="ko" data-role="guardian" data-platform="mobile">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>하루안부</title>
  <link rel="stylesheet" href="/07_디자인/tokens/tokens.css">
</head>
<body>
  <!-- 앱 내용 -->
</body>
</html>
```

### data-role 값

| 값 | 대상 | --color-accent | 플랫폼 |
|---|---|---|---|
| `guardian` | 보호자 | `#2C7AFC` (딥 블루) | 모바일 PWA |
| `medical` | 의료진 총칭 | `#22C55E` (케어 그린, Tailwind green-500) | **데스크톱 웹** |
| `doctor` | 의사 | 동일 그린 | 데스크톱 웹 |
| `nurse` | 간호사 | 동일 그린 | 데스크톱 웹 |
| `caregiver` | 요양보호사 | 동일 그린 | **모바일 PWA** (의료진과 같은 컬러, 다른 플랫폼) |
| `patient` | 환자 | `#FB923C` (편안 오렌지) + **접근성 자동 상향** (본문 18px, 터치 56px) | 모바일 PWA |

> 색 테마는 같아도 플랫폼이 다르면 `data-platform`도 맞게 바꿀 것. caregiver는 green 테마지만 mobile.
> `data-role="patient"`는 텍스트 크기와 터치 영역을 자동으로 키운다. 환자 화면에서 따로 고령자 CSS를 쓸 필요 없음.

### data-platform 값

| 값 | 페이지 여백 | 터치 타겟 | 헤더 | 탭바 |
|---|---|---|---|---|
| `mobile` | 16px | 44px | 44px | 56px |
| `web` | 24px | 36px | 64px | 60px (+ 사이드바 240px, content max 1280px) |

### 조합 예시

```html
<!-- 보호자 모바일 PWA -->
<html data-role="guardian" data-platform="mobile">

<!-- 의료진 데스크톱 웹 (간호사·의사 대시보드) -->
<html data-role="nurse" data-platform="web">

<!-- 요양보호사 모바일 PWA (데스크톱 웹 아님!) -->
<html data-role="caregiver" data-platform="mobile">

<!-- 환자 모바일 PWA -->
<html data-role="patient" data-platform="mobile">
```

> NOTE — 자주 하는 실수: `caregiver`는 컬러 테마는 `medical`(그린)과 같지만 **플랫폼은 mobile**. `data-platform="web"`으로 쓰면 사이드바 레이아웃이 나와 현장 사용에 부적합.

---

## 4. 토큰 사용 규칙

### DO — 써도 되는 것 (Layer 2 · 3)

```css
.card {
  background: var(--card-bg);                 /* Layer 3 */
  padding: var(--card-padding);               /* Layer 3 */
  border-radius: var(--card-radius);          /* Layer 3 */
  color: var(--color-text-primary);           /* Layer 2 */
  margin-bottom: var(--space-stack-default);  /* Layer 2 */
}

.cta {
  background: var(--color-accent);            /* 역할에 따라 자동 전환 */
  color: var(--color-accent-on);
  height: var(--size-button-default);         /* 플랫폼에 따라 자동 전환 */
  border-radius: var(--radius-button);
}
```

### DON'T — 쓰면 안 되는 것

```css
/* Layer 1 원시 팔레트 직접 사용 금지 */
color: var(--brand-blue-500);        /* NO — --color-accent 써라 */
background: var(--palette-gray-50);  /* NO — --color-bg-surface-muted 써라 */

/* 하드코딩 금지 */
padding: 16px;                       /* NO — var(--space-inset-default) */
border-radius: 12px;                 /* NO — var(--radius-card) */
color: #111827;                      /* NO — var(--color-text-primary) */

/* 구 토큰 이름 사용 금지 */
color: var(--blue);                  /* NO (v8 common.css 유물) */
color: var(--t1);                    /* NO (v9 HANDOFF 유물) */
```

### 예외 — Layer 1을 직접 쓸 수 있는 경우

- Layer 2 토큰을 새로 추가할 때 (토큰 정의 자리에서만).
- 역할 그라디언트 등 브랜드 전용 장식에서 특정 brand shade가 필요할 때.

---

## 5. 주요 토큰 치트시트

### 색

```css
/* 텍스트 */
--color-text-primary     /* 본문, 제목 */
--color-text-secondary   /* 메타, 날짜 */
--color-text-tertiary    /* placeholder */
--color-text-on-accent   /* accent 배경 위 */

/* 배경 */
--color-bg-canvas        /* 앱 전체 배경 */
--color-bg-surface       /* 기본 카드 */
--color-bg-surface-muted /* 약한 강조 카드 */
--color-bg-glass         /* 글래스 카드 (rgba + blur 필요) */

/* 역할 컬러 (data-role이 바꿔줌) */
--color-accent           /* 메인 포인트 */
--color-accent-soft      /* 연한 배경용 (chip, badge) */
--color-accent-strong    /* 강한 강조 (hover, active) */
--color-accent-on        /* accent 배경 위 텍스트 색 */

/* 상태 */
--color-success          /* 완료, 정상 */
--color-warning          /* 주의, 미완료 */
--color-danger           /* 긴급, 에러 */
--color-info             /* 정보 (accent와 alias) */
```

### 간격

```css
/* 컴포넌트 내부 패딩 */
--space-inset-compact    /*  8px */
--space-inset-default    /* 16px */
--space-inset-loose      /* 24px */

/* 세로 간격 (스택) */
--space-stack-tight      /*  4px */
--space-stack-default    /* 12px */
--space-stack-loose      /* 24px */
--space-stack-section    /* 32px */

/* 레이아웃 (플랫폼이 조정) */
--space-page-margin      /* mobile 16, web 24 */
--space-section-gap      /* 32px */
```

### 크기 / 라운드

```css
--size-touch-target      /* mobile 44, web 36, patient 56 */
--size-tab-bar           /* mobile 56, web 60 */
--size-icon-md           /* 24px */

--radius-card            /* 12px — 카드 기본 */
--radius-card-lg         /* 16px */
--radius-button          /* 12px */
--radius-pill            /* 9999 — 알약 */
```

### 컴포넌트

```css
--tabbar-height, --tabbar-bg, --tabbar-radius, --tabbar-shadow
--card-bg, --card-padding, --card-radius, --card-border
--header-height, --header-padding-x
--sos-bg, --sos-text, --sos-radius
--focus-ring
```

---

## 5.5 로고 · 파비콘

브랜드 자산은 `07_디자인/logo/brand-system/` 에서 직접 참조. 재가공 금지.

| 파일 | 용도 |
|---|---|
| `01_심볼단독.svg` | 앱 아이콘, 파비콘, 사이드바 브랜드 마크 (정사각형 공간) |
| `02_워드마크단독.svg` | "하루안부" 텍스트 로고만 필요할 때 |
| `03_콤비네이션_가로.svg` | 온보딩, 스플래시, 발표자료 헤더 |
| `04_콤비네이션_세로.svg` | 스플래시 센터, 세로 배너 |
| `05_단색버전.svg` | 단색 배경 위 (CTA 배너 등) |

### HTML 기본 세팅 — favicon

모든 페이지 `<head>`에 아래 2줄 필수:

```html
<link rel="icon" type="image/svg+xml" href="<상대경로>/logo/brand-system/01_심볼단독.svg">
<link rel="apple-touch-icon" href="<상대경로>/logo/brand-system/01_심볼단독.svg">
```

### 헤더 · 사이드바 브랜드 삽입

```html
<!-- 모바일 헤더 -->
<a href="/" class="app-brand" aria-label="하루안부 홈">
  <img src=".../logo/brand-system/01_심볼단독.svg" alt="" width="28" height="28">
  <span>하루안부</span>
</a>

<!-- 데스크톱 사이드바 -->
<a href="/" class="sidebar-brand" aria-label="하루안부 홈">
  <span class="sidebar-brand-mark">
    <img src=".../logo/brand-system/01_심볼단독.svg" alt="">
  </span>
  <span>하루안부</span>
</a>
```

> `alt=""` — 옆에 워드마크 텍스트가 있으므로 이미지는 장식용. 스크린리더 중복 방지.
> 링크 `aria-label="하루안부 홈"`로 대체 라벨 제공.

---

## 5.6 아이콘 규칙 (Fluent Filled — 컨텍스트별 크기)

| 컨텍스트 | variant | 렌더 크기 |
|---|---|---|
| 탭바 · 상단바 · FAB · 사이드바 메뉴 | `fluent:*-24-filled` | 24px |
| 리스트 row 인라인 | `fluent:*-20-filled` | 20px |
| **칩 · 배지 · 작은 메타** | `fluent:*-16-filled` | **16px** |
| SOS 히어로 · 빈 상태 일러스트 | `fluent:*-28-filled` 이상 | 28~48px |

```html
<!-- 칩 안 아이콘 (16-filled 사용) -->
<span class="chip chip-danger">
  <iconify-icon icon="fluent:warning-16-filled"></iconify-icon>
  SOS
</span>
```

**금지**: Line/Outline variant 혼용, Phosphor/Tabler/Material 다른 라이브러리 혼용, 로고를 아이콘으로 대체하는 것 (`fluent:heart-pulse-*` 등을 브랜드 마크 대신 쓰지 말 것 — 진짜 로고 SVG 사용).

---

## 6. 유틸리티 클래스

급하게 prototyping할 때만. 정식 화면 코드는 되도록 CSS 속성으로 쓴다.

```html
<div class="u-text-primary u-bg-surface u-radius-card u-shadow-1">카드</div>
<header class="u-role-gradient">역할 그라디언트 자동 적용</header>
```

---

## 7. AI·코더를 위한 체크리스트

새 HTML 화면을 만들 때:

- [ ] `<html>`에 `data-role="..."` 선언했다.
- [ ] `<html>`에 `data-platform="..."` 선언했다.
- [ ] `tokens.css` 한 개만 import 했다. (common.css 추가로 import 금지)
- [ ] 색상/간격/크기 중 하드코딩된 값이 0개다.
- [ ] `--brand-*` / `--palette-*` 를 화면 스타일에서 직접 쓰지 않았다.
- [ ] 환자 화면이라면 `data-role="patient"` 하나로 충분하다 (별도 고령자 CSS 금지).

---

## 8. 변경 이력

| 버전 | 날짜 | 내용 |
|---|---|---|
| v1.0 | 2026.04.18 | 최초 통합 토큰. 3계층 + data-role/data-platform 2축 도입 |

---

## 9. 관련 문서

- `03_설계/하루안부_톤앤무드_확정.md` v2.0 — 톤, 무드, UX 라이팅
- `07_디자인/하루안부_브랜드아이덴티티_v2.0.md` — 브랜드 컬러/로고
- `07_디자인/하루안부_디자인시스템_v2.0.md` — 컴포넌트 상세 규격
- `07_디자인/하루안부_디자인일관성_재분석_v2.0.md` — 이 토큰 시스템이 해결한 문제 목록
- `07_디자인/tokens/template.html` — 빈 화면 스켈레톤
- `07_디자인/tokens/MIGRATION.md` — v9_보호자앱/common.css 통합 메모

---

*하루안부 프로젝트 | Design Tokens README v1.0 | 2026.04.18*
