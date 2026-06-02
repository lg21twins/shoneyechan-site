# 하루안부 · 의료진 모바일앱 v15

**시작**: 2026.05.09
**대상**: 간호사·의사 (모바일, PWA)
**목적**: v10 의료진웹의 모바일 컴패니언. **회진·응급·소통·인수인계** 4가지 모바일 컨텍스트 전용.

> 데스크탑 분석/배치 처리는 v10 웹.
> 책상 떠난 순간(라운드·응급 콜·이동 중) = v15 모바일.
> 컬러 테마(`#22C55E` 케어 그린)는 의료진 공통.

---

## 원칙

- `07_디자인/tokens/tokens.css` **1개만** import.
- `<html data-role="medical" data-platform="mobile">` 고정.
- 하드코딩 금지. Layer 2 Semantic 토큰만 사용.
- 이모지 절대 금지. 아이콘은 `iconify-icon` (fluent:*) 통일.
- 글자 ≥16pt / 터치 ≥48×48 (장갑·시설 라이트 환경).
- 햅틱·SOS 풀스크린 필수 (시설 환경 시각만으로 부족).

---

## 화면 구조

```
v15_의료진앱/
├── README.md
├── d01-home.html        ← 지금 (Now)
├── d02-round.html       ← 회진 모드 (킬러)
├── d03-inbox.html       ← 통합 소통
├── d04-handover.html    ← 인수인계 적립함
├── d05-mypage.html      ← 마이
└── d-sos.html           ← SOS 풀스크린 (수신)
```

### 4탭 + 플로팅 SOS

| # | 탭 | 파일 | 아이콘 |
|---|---|---|---|
| 1 | 지금 | d01-home.html | `fluent:home-24-filled` |
| 2 | 회진 | d02-round.html | `fluent:stethoscope-24-filled` |
| 3 | 소통 | d03-inbox.html | 인라인 채팅버블 SVG (보호자앱 g03-sotong 동일) |
| 4 | 인수인계 | d04-handover.html | `fluent:arrow-swap-24-filled` |
| ㆍ | 마이 | d05-mypage.html | `fluent:person-24-filled` (헤더) |
| FAB | SOS | d-sos.html | `fluent:warning-24-filled` |

마이는 4탭 유지를 위해 헤더 우측 상단으로 분리.

---

## 핵심 기능 8선

| # | 기능 | 누가 |
|---|---|---|
| F1 | 회진 모드 — 환자 카드 시퀀스 스와이프 | 간호사 |
| F2 | 음성 차팅 (의료 STT, 다중 필드 분리) | 간호사·의사 |
| F3 | SOS 양방향 (수신 풀스크린 / 발신 코드블루) | 전체 |
| F4 | 빠른 처방 (Quick Rx) | 의사 |
| F5 | 보호자 빠른 회신 + 자동 답변 제안 | 간호사·의사 |
| F6 | 인수인계 적립함 (라운드 → SBAR 자동 분류) | 간호사 |
| F7 | 야간 모드 (다크 + 알림 민감도) | 야간 간호사 |
| F8 | 잠금화면 위젯 / Watch | 전체 |

---

## 개발

```bash
cd v15_의료진앱/
python3 -m http.server 9292
# http://localhost:9292/d01-home.html
```

---

## v10 웹과의 관계

| 기능 | v10 웹 | v15 모바일 |
|---|---|---|
| 분석·배치·통계 | 메인 | — |
| 환자 종합 상세 6탭 | 메인 | 빠른 조회 |
| 신규 처방 | 메인 | 반복 처방 1탭 |
| 회진 중 기록 | 사후 검토 | **킬러** |
| SOS 송수신 | 보조 | **메인** |
| 이동 중 소통 | — | **메인** |
| 인수인계 적립 | 정리·열람 | **현장 누적** |
