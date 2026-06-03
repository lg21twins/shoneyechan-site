#!/bin/bash
# Microsoft Edge TTS - 더 자연스러운 한국어 보이스 4종 비교
# 사용법: bash 02_edge_tts.sh

cd "$(dirname "$0")"

# 설치 (PATH 문제 우회를 위해 python3 -m 방식 사용)
echo "edge-tts 설치 확인 중..."
python3 -m pip install --quiet --user edge-tts 2>&1 | tail -3

TEXT="안녕하세요. 저는 클로드입니다. 오늘 하루안부를 소개하는 자리에 함께하게 되어 반갑습니다. 이 화면은 어르신의 시야 안에 모든 정보가 한 번에 들어와야 한다는 원칙으로 만들어졌습니다."

echo "Edge TTS 한국어 보이스 4종 생성 중..."

# 1. SunHi - 차분한 여성
python3 -m edge_tts --voice ko-KR-SunHiNeural --text "$TEXT" --write-media "edge_01_SunHi_여성.mp3"

# 2. InJoon - 안정적인 남성
python3 -m edge_tts --voice ko-KR-InJoonNeural --text "$TEXT" --write-media "edge_02_InJoon_남성.mp3"

# 3. HyunSu - 다국어 호환 남성 (좀 더 중성적)
python3 -m edge_tts --voice ko-KR-HyunsuMultilingualNeural --text "$TEXT" --write-media "edge_03_HyunSu_남성.mp3"

# 4. SunHi 살짝 느리게 (발표 톤)
python3 -m edge_tts --voice ko-KR-SunHiNeural --rate=-10% --text "$TEXT" --write-media "edge_04_SunHi_느리게.mp3"

echo ""
echo "완료. 파일:"
ls -la edge_*.mp3
echo ""
echo "재생:"
echo "  open edge_01_SunHi_여성.mp3"
echo "  open edge_02_InJoon_남성.mp3"
echo "  open edge_03_HyunSu_남성.mp3"
echo "  open edge_04_SunHi_느리게.mp3"
