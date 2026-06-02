# common.css → tokens.css 통합 메모

**작성: 2026.04.18**
**대상**: `v9_보호자앱/common.css` 및 각 HTML 파일
**목표**: v9 보호자앱은 **유지**하되, 그 외 역할(의료진/환자/요양보호사)은 **재제작하면서** `tokens.css` 하나로 통일

---

## 1. 결정사항 요약

| 항목 | 결정 |
|---|---|
| 기존 보호자앱(v9) | 현행 유지. common.css는 그대로 둠. 지금 당장 뜯지 않음. |
| 신규 제작분(의료진/환자/요양보호사) | 무조건 `tokens.css` 1개만 import. common.css 건드리지 말 것. |
| common.css의 운명 | **Deprecated**로 표시. v10 개편 때 제거. |
| 토큰 이름 충돌 | 신규 화면에서는 구 토큰(`--blue`, `--t1` 등) 사용 금지. |

---

## 2. 구 토큰 ↔ 신 토큰 대응표

v9 보호자앱 HTML 인라인 CSS에서 자주 쓰던 값들의 매핑.
**재제작 시 구 값은 신 토큰으로 교체**.

### 색

| 구 (v9 HANDOFF / common.css) | 신 (tokens.css Layer 2) |
|---|---|
| `--blue` / `#2C7AFC` | `var(--color-accent)` (data-role=guardian 시) |
| `--blue-l` / `#5B9BFF` | `var(--brand-blue-400)` *정의용*, 화면은 `--color-accent`로 |
| `--blue-d` / `#1D6AF2` | `var(--color-accent-strong)` |
| `--green` / `#34D399` | `var(--brand-green-400)` *정의용*, 화면은 `--color-success` |
| `--green-d` / `#059669` | `var(--color-success)` |
| `--amber` / `#F59E0B` | `var(--color-warning)` |
| `--red` / `#EF4444` / `#F43F5E` (rose) | `var(--color-danger)` (v3.2.7부터 `#E32B25` Rivian Alarm) |
| `--t1` / `#111827` | `var(--color-text-primary)` |
| `--t2` / `rgba(0,0,0,.5)` | `var(--color-text-secondary)` |
| `--t3` / `rgba(0,0,0,.25)` | `var(--color-text-tertiary)` |
| `#d4e4ff` (앱 배경) | `var(--color-bg-canvas)` *또는* `var(--color-bg-role-gradient)` |
| `rgba(255,255,255,.88)` (카드) | `var(--color-bg-glass)` 또는 `var(--card-bg)` |

### 크기 / 라운드

| 구 | 신 |
|---|---|
| `border-radius: 999px` (pill) | `var(--radius-pill)` |
| `border-radius: 20px` (카드) | `var(--radius-card-lg)` |
| `border-radius: 14px` (SOS) | `var(--radius-card)` |
| `height: 56px` (탭바) | `var(--tabbar-height)` |
| `padding: 18px` (위젯) | `var(--card-padding)` |

### 폰트

| 구 | 신 |
|---|---|
| `font-family: 'Pretendard Variable', ...` | `var(--font-family-base)` |
| 본문 | `var(--text-body)` |
| 캡션 | `var(--text-caption)` |
| 타이틀 | `var(--text-title)` |

---

## 3. 금지 목록 (재제작 시)

신규 화면에서는 절대 쓰지 말 것.

```css
/* DON'T — 구 변수명 */
color: var(--blue);
color: var(--t1);
background: var(--green);

/* DON'T — backdrop-filter: blur (성능 우려로 v9에서 금지했으나,
      tokens.css는 카드용 8px / 탭바용 20px 수준만 제한적으로 허용)
      남용 금지. 리스트 아이템 1개씩에 blur 넣지 말 것. */
backdrop-filter: blur(40px);

/* DON'T — 하드코딩 */
color: #2C7AFC;
padding: 16px;
border-radius: 12px;

/* DON'T — Layer 1 원시 팔레트 직접 사용 */
color: var(--brand-blue-500);
background: var(--palette-gray-50);
```

---

## 4. 재제작 순서 권장

플랫폼 매트릭스 (2026.04.18 결정):

| 역할 | 플랫폼 | data-role | data-platform | 스켈레톤 |
|---|---|---|---|---|
| 보호자 | 모바일 PWA | `guardian` | `mobile` | (v9 유지) |
| 의료진 (의사·간호사) | 데스크톱 웹 | `medical` / `doctor` / `nurse` | `web` | `template-web.html` |
| 요양보호사 | 모바일 PWA | `caregiver` | `mobile` | `template.html` |
| 환자 | 모바일 PWA | `patient` | `mobile` | `template.html` |

재제작 순서:

1. **의료진 웹** 먼저 — 데스크톱이라 화면 구조가 단순(사이드바+콘텐츠). 토큰 시스템 실전 검증용. → `v10_의료진웹/`
2. **요양보호사 앱** 다음 — 보호자앱(v9) 모바일 패턴을 거의 그대로 재사용, data-role만 `caregiver`로 교체. 3탭+플로팅 SOS 구조. → `v11_요양보호사앱/` (예정)
3. **환자 앱** 마지막 — `data-role="patient"` 하나로 접근성 자동. → `v12_환자앱/` (예정)

> **요양보호사는 데스크톱 웹이 아니라 모바일 PWA.** 의료진과 색 테마(녹색)는 같지만 플랫폼이 달라 사이드바 레이아웃을 쓰지 않음. 현장(환자 옆)에서 손에 들고 쓰기 위한 결정.

각 단계마다:
1. `template.html`을 복사해서 시작.
2. 페이지 1~2개 만들고 난 뒤 공용 스타일은 `tokens.css`의 Layer 3에 새 컴포넌트 토큰으로 올릴 것 (임의로 새 전역 CSS 파일 만들지 말 것).
3. 스크린샷 찍어서 보호자앱과 시각 언어가 일관되는지 확인.

---

## 5. v9 보호자앱을 나중에 정리할 때 할 일

(v10 개편 때 일괄 처리 예정 — **지금은 하지 말 것**)

1. `v9_보호자앱/common.css` 를 삭제.
2. 각 HTML의 `<link rel="stylesheet" href="./common.css">` 를 `tokens.css` 하나로 교체.
3. 인라인 `<style>` 안의 `--blue`, `--t1` 등을 위 대응표 대로 일괄 치환.
4. `<html data-role="guardian" data-platform="mobile">` 추가.
5. 색상/간격 하드코딩을 토큰으로 치환.
6. 회귀 테스트 — 주요 화면 스크린샷 비교.

---

## 6. 문의

새 역할/플랫폼을 추가해야 하면 `tokens.css`에 Theme 레이어를 확장하는 방식으로 처리. 개별 화면에서 `data-role` 값을 임의로 만들어 쓰지 말 것.

---

*하루안부 프로젝트 | Migration Notes v1.0 | 2026.04.18*
