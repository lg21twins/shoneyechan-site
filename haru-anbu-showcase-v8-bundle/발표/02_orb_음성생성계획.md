# Orb 음성 생성 계획 — ElevenLabs Voice Design

> **버전** v1 (2026-05-22)
> **목적** 발표 대본의 Orb 대사 14개 청크를 ElevenLabs Voice Design으로 생성. 발표 중 클릭마다 해당 mp3 재생.
> **참고** 공식 가이드 — https://elevenlabs.io/docs/eleven-creative/voices/voice-design#prompting-guide

---

## 1. Voice Design 프롬프트 (공식 양식)

ElevenLabs 사이트 → 보이스 디자인 → 프롬프트 입력란에 그대로 붙여넣기.

### 프롬프트 (영어, 공식 양식)

```
Native Korean, Seoul standard. Female, 30-36. Studio quality.
Persona: thoughtful product narrator from inside the system.
Emotion: warm, composed, sincere.
Smooth mid-low timbre with gentle intonation and measured pacing.
Speaks in first person about her own work, with quiet confidence
and soft emphasis on meaningful phrases — like a trusted system
voice that is also kind.
```

### 왜 이 프롬프트인가

- **Native Korean, Seoul standard** — 사투리/방언 회피 (공식 가이드: "accent"는 intonation 의미로 쓰지 말 것)
- **Female, 30-36** — 너무 어리면 신뢰감 부족, 너무 성숙하면 거리감. 30대 초중반이 의료/케어 톤 sweet spot
- **Studio quality** — 발표용 깨끗한 음질. "Excellent" 보다 한 단계 위
- **thoughtful product narrator from inside the system** — orb의 정체성 ("제품 안에서 일하는 AI") 반영. "from inside the system"이 핵심
- **first person** — orb가 "저"라고 자기 일을 말하는 톤. 영어 프롬프트에 명시
- **trusted system voice that is also kind** — 사무적이지만 차갑지 않게

### Voice Design 세팅

| 항목 | 값 | 이유 |
|------|-----|------|
| Guidance Scale | **32%** | 한국어 발음 정확도 + 프롬프트 충실도 sweet spot. 부정확하면 35로 ↑, 음질 거칠면 28로 ↓ |
| Loudness | 기본 | 발표장에서 볼륨은 무대 음향으로 조절 |

### Text to preview (Voice Design 미리듣기용)

공식 가이드 권장: 길수록 안정적, 보이스 톤과 결 일치.

```
새벽 두 시 삼십사 분. 305호 김순자 어르신이 SOS 버튼을 누르셨습니다.
야간 라운드 중이던 요양보호사 이서연이 접수했습니다. 영 점 삼 초 만에
간호사 박지현이 연결됐습니다. 그 사이 저는 김순자 어르신의 패턴을
분석하고 있었습니다. 지난 7일간 같은 시간대 SOS 3회. 케어팀 즉시
연결을 권장했습니다.
```

이 텍스트로 미리듣기 3샘플을 생성하고, 가장 좋은 보이스를 저장.

---

## 2. 청크 생성 목록 (14개)

저장된 보이스가 정해지면, 아래 14개 텍스트를 각각 mp3로 생성. 한 클릭 = 한 mp3 재생 단위.

파일명 규칙: `orb_{섹션번호}_{청크번호}_{설명}.mp3`

| # | 파일명 | 한국어 텍스트 | 글자수 | 섹션 |
|---|--------|--------------|--------|------|
| 1 | `orb_01_sos1_환자.mp3` | 새벽 두 시 삼십사 분. 305호 김순자 어르신이 SOS 버튼을 누르셨습니다. | 38 | SOS ① |
| 2 | `orb_01_sos2_요양간호.mp3` | 야간 라운드 중이던 요양보호사 이서연이 접수했습니다. 영 점 삼 초 만에 간호사 박지현이 연결됐습니다. | 56 | SOS ②③ |
| 3 | `orb_01_sos3_ai판단.mp3` | 그 사이 저는 김순자 어르신의 패턴을 분석하고 있었습니다. 지난 7일간 같은 시간대 SOS 3회. 케어팀 즉시 연결을 권장했습니다. | 70 | SOS ④ |
| 4 | `orb_01_sos4_보호자.mp3` | 딸 김미영 씨의 잠금화면에 정리된 상황이 도착했습니다. | 30 | SOS ⑤ |
| 5 | `orb_01_sos5_리포트.mp3` | 다음 날 아침 여덟 시. 가족은 안심을 받습니다. | 24 | SOS ⑥ |
| 6 | `orb_02_hero.mp3` | 하루안부. 환자, 케어팀, 보호자. 흩어진 세 시선을 하루의 안부 한 줄로 잇습니다. | 44 | Hero+Meet |
| 7 | `orb_02_meet_bridge.mp3` | 세 시선이 다섯 화면으로 만나서 일합니다. | 22 | Meet→Features |
| 8 | `orb_03_app1_보호자.mp3` | 보호자에게는 — 매일 오전 여덟 시, 어머니의 하루가 한 줄로 도착합니다. | 40 | Features 01 |
| 9 | `orb_03_app2_요양.mp3` | 요양보호사에게는 — 한 환자 회진을 1~2분 안에 기록할 수 있습니다. | 36 | Features 02 |
| 10 | `orb_03_app3_간호.mp3` | 간호사에게는 — 환자 마흔일곱 명을 한 대시보드에 펼쳐 보여드립니다. | 35 | Features 03 |
| 11 | `orb_03_app4_의사.mp3` | 의사에게는 — 병동 이동 중에도 처치를 바로 기록하실 수 있습니다. | 35 | Features 04 |
| 12 | `orb_03_app5_환자.mp3` | 어르신에게는 — 큰 버튼 하나로 가족에게 닿게 해 드립니다. | 30 | Features 05 |
| 13 | `orb_04_impact.mp3` | 한국에 187만 가구의 어르신이 혼자 삽니다. 의료진은 하루 스물두 통의 안부 응대에 두 시간을 씁니다. 시장에는 한 곳도 없었습니다. 저는 그 한 곳이 됩니다. | 90 | Impact |
| 14 | `orb_05_demo_bridge.mp3` | 지금 보고 계신 이 화면들이, 실제로 작동하는 우리의 다섯 도구입니다. | 35 | Demo |
| 15 | `orb_06_epilogue1.mp3` | 매일 잊지 않고 안부를 묻는 마음. 그것이 곧 하루안부입니다. | 30 | Epilogue 1/2 |
| 16 | `orb_06_epilogue2.mp3` | 오늘 하루도, 안녕하셨습니다. | 14 | Epilogue 2/2 |

**총 글자수: 약 629자 (한국어)**
**ElevenLabs 크레딧: 글자수 기준 약 629 크레딧 (Free 플랜 월 10,000자 한도 내 여유)**

---

## 3. 생성 순서 (권장)

1. **Voice Design으로 보이스 먼저 확정** (3 샘플 중 1개 선택해서 voice slot에 저장)
2. **저장된 보이스로 Text-to-Speech 페이지로 이동**
3. **위 16개 텍스트를 하나씩 입력 → 생성 → 다운로드**
4. **파일명을 위 표 순서대로 정리**
5. **`/Users/yechanshon/Desktop/Haru Anbu/haru-anbu-showcase-v8-bundle/발표/audio/` 폴더에 저장**

---

## 4. 발표 페이지 구현 (사이트에 orb 연결)

각 클릭/엔터에서 해당 mp3가 재생되도록 사이트에 작은 컨트롤러 추가.

### 최소 구현 (Vanilla JS, 위 mp3들이 audio/ 폴더에 있다고 가정)

```html
<!-- orb floating UI (어디든 fixed) -->
<div id="orb" class="orb-idle" aria-hidden="true">
  <div class="orb-pulse"></div>
  <div class="orb-caption"></div>
</div>

<script>
  const ORB_SCRIPT = [
    { id: 1, file: 'audio/orb_01_sos1_환자.mp3',    text: '새벽 두 시 삼십사 분...' },
    { id: 2, file: 'audio/orb_01_sos2_요양간호.mp3', text: '야간 라운드 중이던...' },
    // ... 16개 전부
  ];

  let cursor = 0;
  const orb = document.getElementById('orb');
  const caption = orb.querySelector('.orb-caption');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && cursor < ORB_SCRIPT.length) {
      const chunk = ORB_SCRIPT[cursor++];
      orb.classList.add('orb-active');
      caption.textContent = chunk.text;
      const audio = new Audio(chunk.file);
      audio.onended = () => {
        orb.classList.remove('orb-active');
        orb.classList.add('orb-idle');
      };
      audio.play();
    }
  });
</script>
```

세부 UI/애니메이션은 와이어 잠금 후 별도 작업. 우선 발표 가능한 최소 동작이 위 코드로 확보됨.

---

## 5. 리허설 체크리스트

- [ ] Voice Design으로 3 샘플 생성 → 1 선택 → voice slot 저장
- [ ] TTS로 16개 mp3 일괄 생성
- [ ] 파일명 표 순서대로 정리
- [ ] `audio/` 폴더에 모두 배치
- [ ] 사이트에 orb 컨트롤러 코드 삽입
- [ ] 발표 노트북에서 사이트 로딩 + 키보드 엔터 동작 확인
- [ ] 외부 모니터/HDMI 환경에서 한 번 더 리허설
- [ ] 무대 음향 볼륨 사전 체크 (orb 음성이 들리는 수준)
