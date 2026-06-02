# 하루안부 쇼케이스 — 3분 발표 패키지

> **위치** `haru-anbu-showcase-v8-bundle/발표/`
> **작성일** 2026-05-22 (v1) → 2026-05-25 (v2, v8 번들 사이트로 이전)
> **상태** 컨셉·대본·계획 확정 / 음성 생성·사이트 통합 대기
> **발표 URL** `http://localhost:8765/haru-anbu-showcase-v8-bundle/haru-anbu-showcase-v8.html`

이 폴더는 *하루안부 쇼케이스 웹사이트*를 무대에서 3분 동안 발표하기 위한 자료 묶음입니다. 발표 컨셉은 "**하루안부 안에서 일하는 AI(Claude orb)가 직접 자기 일을 안내하는 형식**" 입니다.

---

## 파일 구조

```
발표/
├── README.md                       ← 지금 보는 파일 (폴더 인덱스)
├── 00_컨셉_및_의사결정.md          ← 왜 이렇게 가는지, 후보 검토 흐름
├── 01_발표대본_3분.md              ← Shon + Orb 라인, 큐, 시간표
├── 02_orb_음성생성계획.md          ← ElevenLabs 프롬프트 + 16 청크 + JS 컨트롤러
├── 03_큐시트.md                    ← 발표 중 1페이지 cheat sheet
├── audio/                          ← ElevenLabs mp3 16개 들어갈 자리 (현재 비어있음)
└── voice-tests/                    ← Yuna·Edge TTS 비교 샘플 (역사 자료)
```

---

## 누가 봐도 1분 안에 파악 가능한 요약

**컨셉**: 무대 위 Shon(20%) + 화면 위 떠있는 Claude orb(80%). Orb는 1인칭 "저"로 자기가 사이트 안에서 어떻게 일하는지 직접 설명. Shon은 호스트로 인트로·SOS 받아침·Demo·송별만 담당.

**시간표**: 3분 = 인트로(12s) → SOS Opening 6단계(38s) → Hero+Meet(10s) → Features 5앱(50s) → Impact(15s) → Demo(25s) → Epilogue(20s) → 송별(10s).

**기술 스택**:
- 사이트: `../haru-anbu-showcase-v8.html` (v8 번들)
- 음성: ElevenLabs Voice Design → 16개 mp3 청크 → 키보드 엔터로 재생
- 자막: orb UI 안에 한 줄씩 노출

---

## 어떤 순서로 읽으면 좋나

**처음 보는 사람** → `00 컨셉` → `01 대본` → `03 큐시트` 순서.
컨셉이 가장 추상적이지만 *왜 이렇게 갔는지*가 거기에만 적혀있어요. 컨셉 잡고 대본 보면 빠르게 흡수됩니다.

**음성을 만들러 가는 사람** → `02 음성 생성 계획` 만 봐도 됨. 16개 청크 텍스트와 ElevenLabs 프롬프트가 거기 다 있어요.

**발표 직전 사람** → `03 큐시트` 만. 1페이지 인쇄해서 무대 옆에 두세요.

**나중에 발표 다시 손볼 사람** → 반드시 `00 컨셉`의 "재사용 시 유의사항" 섹션 먼저 읽으세요. 사이트 와이어가 바뀌면 어느 파일을 같이 업데이트해야 하는지 적혀있어요.

---

## 진행 상태

| 항목 | 상태 |
|------|------|
| 발표 컨셉 확정 | ✅ |
| 3분 대본 작성 | ✅ |
| Orb 음성 생성 계획 | ✅ |
| 큐시트 작성 | ✅ |
| ElevenLabs 보이스 확정 (3 샘플 중 1 선택) | ⏳ |
| 16 mp3 일괄 생성 | ⏳ |
| 사이트에 orb 컨트롤러 코드 삽입 | ⏳ |
| HDMI 환경 리허설 (3회 권장) | ⏳ |
| 비상 백업 (PNG·대독 스크립트) 준비 | ⏳ |

---

## 보존된 음성 테스트 자산 (`voice-tests/`)

ElevenLabs 채택 전에 검토했던 무료 옵션들. 향후 다른 발표용으로 가벼운 보이스가 필요할 때 참고하세요.

| 파일 | 도구 | 평가 |
|------|------|------|
| `yuna_normal.m4a`, `yuna_slow.m4a` | macOS `say -v Yuna` | "ㅈㄴ 별로" (Shon 평가). 옛날 보이스 톤. |
| `edge_01_SunHi_여성.mp3` ~ `edge_04_SunHi_느리게.mp3` | Microsoft Edge TTS | Yuna보다 한 단계 위. 다만 평이한 안내 톤이라 인격 부여 어려움. |
| `01_say_yuna.sh`, `02_edge_tts.sh` | 재생성 스크립트 | 맥 터미널에서 `bash 파일명.sh`로 다시 생성 가능. |
| `01_SunHi_여성.mp3` 등 0바이트 파일들 | 샌드박스 실패 잔재 | 무시. 직접 삭제 가능. |

---

## 의존 관계

이 발표 패키지는 다음 자산에 의존합니다.

- **사이트 본체**: `../haru-anbu-showcase-v8.html` (v8 번들)
- **v8 리뷰 문서**: `../docs/haru-anbu-showcase-review.md`
- **이전 와이어 구성안 (역사 자료)**: `_archive/showcase-legacy/showcase-구성안.md` (Haru Anbu 루트)

사이트가 v9로 갱신되면 위 4개 .md 문서를 함께 점검해 주세요. 특히 섹션 ID(`#flow-overlay`, `#features-by-role` 등)가 바뀌면 큐시트의 스크롤 통과 목록도 다시 잡아야 합니다.

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1 | 2026-05-22 | 초안. 컨셉·대본·음성 계획·큐시트·voice-tests 묶음 완성. mp3 생성·사이트 통합 미실시. |
| v2 | 2026-05-25 | 사이트 정본을 `wireframe-preview.html` → `haru-anbu-showcase-v8-bundle/haru-anbu-showcase-v8.html`로 이전. 폴더 위치도 v8 번들 안으로 이동. v8 새 섹션(problem · app-preview · design · service-features · feature-bridge · flagship-features)은 스크롤 통과 목록으로 추가 (옵션 C 결정). SOS가 v8에서는 중간 위치로 이동했으나 시그니처 오프닝 자리는 유지 (URL 앵커 `#flow-overlay`로 점프). |
