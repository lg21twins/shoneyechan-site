# 하루안부 · 의료진 웹 v10

**시작**: 2026.04.18
**최근 정리**: 2026.04.19 (5개 탭 시각화 추가)
**대상**: 간호사·의사 (데스크톱 웹)
**목적**: 의료진이 데스크톱 웹에서 환자 케어를 관리하는 대시보드.

> **요양보호사는 이 트랙에 포함되지 않습니다.**
> 요양보호사는 모바일 앱(PWA) 트랙으로 별도 진행 — `v11_요양보호사앱/`.
> 컬러 테마(`#22C55E` 케어 그린 · Tailwind green-500)는 의료진과 공통이지만 플랫폼·정보구조가 달라 분리.

---

## 원칙

- `07_디자인/tokens/tokens.css` **1개만** import.
- 로컬 CSS 파일 신규 생성 금지. 공용 스타일이 필요하면 tokens.css Layer 3에 컴포넌트 토큰을 추가.
- `<html data-role="medical" data-platform="web">` 고정.
- 하드코딩 금지. `--brand-*` / `--palette-*` 직접 사용 금지. Layer 2(Semantic) 토큰만 쓸 것.
- 이모지 절대 금지. 아이콘은 `iconify-icon` (fluent:*) 통일.

---

## 현재 구조

```
v10_의료진웹/
├── README.md                      (이 파일)
├── 의료진_대시보드_v9.5.html       (메인 파일)
└── _archive/                      (참고용 · 운영 미사용)
    ├── v3_preview/                (초기 프리뷰 3종)
    ├── mockup_v1/                 (n01~n10 초기 목업)
    ├── m01-dashboard.html         (초기 POC)
    ├── 의료진_대시보드_v1.html
    └── 의료진_대시보드_v2.html
```

| 파일 | 설명 | 상태 |
|---|---|---|
| `의료진_대시보드_v9.5.html` | 의료진 메인 대시보드 — 오늘의 환자 / 케어 요약 / 소통 / 기록 / 스케줄 / 마이페이지 통합 | 현재 메인 |

---

## 규칙 준수 현황 (2026-04-19 기준)

- DONE — `<html data-role="medical" data-platform="web">` 설정
- DONE — `tokens.css` import (`../07_디자인/tokens/tokens.css`)
- DONE — `iconify-icon` CDN 로드 (버전 2.1.0)
- DONE — 이모지 0개
- DONE — 브랜드 그린 하드코딩 제거 (Chart.js fallback 1개만 방어적으로 유지)
- TODO — 잔여 항목 (2차 작업):
  - `--ink-*` 무채색 팔레트가 tokens.css의 `--palette-gray-*`와 톤이 달라 유지 중 (디자인 톤 리뷰 후 통합 예정)
  - 인라인 `style=` 속성 다수 (차트 높이, KPI 바 width 등) — CSS 클래스화 대상

---

## 탭별 시각화 컴포넌트 (2026-04-19 추가)

단순 텍스트 나열 탭에 시각적 데이터 블록을 추가해 at-a-glance 가독성을 확보했습니다.

| 탭 | 컴포넌트 | 프리픽스 | 설명 |
|---|---|---|---|
| Meds | 시간대별 투약 타임라인 | `.med-tl-*` | 06–22시 축 · 환자별 트랙 · 완료/지연/예정 블록 · `now` 라인 펄스 |
| Records | 유형별 게이지 + AI 큐 | `.rec-gauge-*`, `.rec-aiq-*` | conic-gradient 도넛링 4종 · AI 자동생성 대기 5건 + 일괄 버튼 |
| Handover | 우선순위 트리맵 | `.ho-tm-*` | CSS Grid span 기반 블록 크기 = 긴급도 · 클릭 시 리스트 스크롤 |
| Patients | 환자 × 케어 히트맵 | `.pt-hm-*` | 환자 세로축 × 카테고리(바이탈/투약/식사/위생/처치/기록) 가로축 · 셀 색상으로 완료·부분·누락·예정 표현 |
| Checklist | 카테고리 도넛 + 근무 타임라인 | `.cl-don-*`, `.cl-tl-*` | 4카테고리 도넛링 + 06–22시 진행 축 · 완료/지연/예정 이벤트 핀 2단 배치 |

모두 **tokens.css Layer 2 (Semantic)** 토큰만 사용합니다. (예: `var(--accent)`, `var(--danger)`, `var(--warn)`, `var(--accent-bg)`)

---

## 개발

```bash
cd v10_의료진웹/
python3 -m http.server 9191
# http://localhost:9191/의료진_대시보드_v9.5.html
```

---

## 계획된 후속 화면 (추후)

v9.5는 단일 파일로 모든 탭을 포함. 향후 화면 분리 시 네이밍 규칙:

- `m02-patients.html` — 환자 목록 (테이블 + 필터)
- `m03-patient-detail.html` — 환자 상세 (바이탈 / 케어 기록 / 소통)
- `m04-records.html` — 케어 기록 작성
- `m05-chat.html` — 보호자·환자 소통
