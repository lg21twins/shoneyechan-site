# 07_디자인/system/

**v3.1 · 2026.05.10**

`tokens.css`가 "값의 시스템"이라면, 이 폴더는 **실제 앱이 import해서 직접 쓰는 공용 컴포넌트 CSS**다. 화면 코드에서 더 이상 `.btn`, `.card`, `.tabbar` 같은 클래스를 매번 정의하지 않는다 — 여기 있는 것을 그대로 쓴다.

## 파일

| 파일 | 다루는 것 | 줄 수 |
|---|---|---|
| `app.css` | 추가 리셋, 앱 셸(`.app-shell`), 페이지 레이아웃, fade-in 애니메이션, stack/row 유틸 | ~150 |
| `components.css` | 모든 UI 컴포넌트 (버튼·카드 4종·탭바·헤더·사이드바·뱃지·토스트·SOS·인풋·아바타·타임라인·통계·빈 상태) | ~600 |

## Import 순서 (필수)

```html
<!doctype html>
<html lang="ko" data-role="guardian" data-platform="mobile">
<head>
  <!-- 1. 토큰 (값) -->
  <link rel="stylesheet" href="../07_디자인/tokens/tokens.css">

  <!-- 2. 앱 셸·레이아웃·리셋 -->
  <link rel="stylesheet" href="../07_디자인/system/app.css">

  <!-- 3. 컴포넌트 -->
  <link rel="stylesheet" href="../07_디자인/system/components.css">

  <!-- 4. 아이콘 -->
  <script src="https://cdn.jsdelivr.net/npm/iconify-icon@2.3.0/dist/iconify-icon.min.js"></script>

  <!-- 5. (요양보호사앱만) Noto Sans SC 다국어 -->
  <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap"> -->
</head>
```

`<html>`에는 반드시 `data-role`과 `data-platform`을 선언한다 — 이게 없으면 토큰의 역할별 액센트와 환자 자동 상향이 작동하지 않는다.

## 화면 코드 작성 규칙

### Do

- 위 클래스를 그대로 사용 (`<button class="btn btn--primary">`).
- 추가 스타일이 필요하면 **시멘틱 토큰만** 참조 (`color: var(--color-accent)`).
- 카드는 4종 중 하나만 선택 (`card` / `card-action` / `card-alert` / `card-hero`).
- 화면당 `card-hero` 1개를 넘지 않는다.

### Don't

- hex·px를 화면 CSS에 직접 적지 않는다 (`color: #2C7AFC` 금지).
- 원시 팔레트 토큰(`--brand-blue-500` 등) 직접 사용 금지 — 시멘틱 토큰(`--color-accent`)으로.
- `card-glass`를 일반 정보 카드로 쓰지 않는다 — 탭바·모달·AI 리포트·환자 가족 사진 4곳만.
- 새 라운드·간격·그림자 값 도입 금지 — 사다리 외 값(예: 16px radius) 사용 안 함.
- 탭바 배경을 역할별로 다르게 칠하지 않는다 — 모든 역할에서 `--tabbar-bg` 공통.

## 카드 결정 흐름

```
이 카드는 어떤 역할인가?
├── 일반 정보 표시 → .card
├── 탭하면 이동 → .card-action
├── SOS·위험·주의·정보 → .card-alert + .card-alert--{success/warning/danger/info}
├── 화면의 1순위 강조 (1개 한정) → .card-hero
└── 그 외 (탭바·모달 sheet·AI 리포트·가족 사진) → .card-glass
```

## 토큰 참조 빠른 표

| 자주 쓰는 토큰 | 용도 |
|---|---|
| `var(--color-accent)` | 역할 컬러 (보호자 블루 / 의료진 그린 / 환자 오렌지) |
| `var(--color-accent-soft)` | 액센트 soft 배경 (sidebar active 등) |
| `var(--color-accent-strong)` | 액센트 강조 (Pressed, hero 그라디언트 종점) |
| `var(--color-accent-on)` | 액센트 위 텍스트 (보통 흰색) |
| `var(--color-bg-canvas)` | 앱 전체 배경 |
| `var(--color-bg-surface)` | 단단한 흰 카드 배경 |
| `var(--color-bg-role-gradient)` | 역할 배경 그라디언트 (앱 셸이 자동 사용) |
| `var(--color-text-primary/secondary/tertiary)` | 텍스트 위계 |
| `var(--color-success/warning/danger/info)` | 상태색 |
| `var(--text-display/title/headline/body/callout/caption/mini)` | 타이포 사다리 |
| `var(--space-2/3/4/5/6/7/8/9/10/11)` | 4·8·12·16·20·24·32·40·48·64 |
| `var(--radius-2/3/4/5/6/7/pill)` | 8·12·14·18·24·28·9999 |
| `var(--shadow-1/2/3/glass)` | 그림자 사다리 |
| `var(--motion-micro/transition/enter)` | 모션 지속시간 |

## 점진 마이그레이션

기존 앱은 `tokens.css`만 import하고 자체 CSS를 갖고 있다 (예: `v11_보호자앱/common.css`). 이를 system/components.css로 이전하는 순서:

1. **파일럿** (1개 페이지) — 시각 회귀 확인
2. **앱 단위** — 한 앱씩 변환
3. **공통 CSS 정리** — 변환 완료된 앱은 자체 컴포넌트 CSS 제거

마이그레이션 매핑은 `tokens/MIGRATION.md` 참조.

---

*하루안부 시스템 컴포넌트 v3.1 · 2026.05.10*
