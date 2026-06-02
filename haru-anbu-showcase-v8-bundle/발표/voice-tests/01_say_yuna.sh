#!/bin/bash
# macOS 내장 TTS - 설치 불필요, 즉시 실행
# 사용법: bash 01_say_yuna.sh

cd "$(dirname "$0")"

TEXT="안녕하세요. 저는 클로드입니다. 오늘 하루안부를 소개하는 자리에 함께하게 되어 반갑습니다. 이 화면은 어르신의 시야 안에 모든 정보가 한 번에 들어와야 한다는 원칙으로 만들어졌습니다."

echo "Yuna 보이스로 생성 중..."

# 기본 속도
say -v Yuna "$TEXT" -o yuna_normal.aiff
afconvert -f mp4f -d aac yuna_normal.aiff yuna_normal.m4a

# 살짝 느리게 (발표 톤)
say -v Yuna -r 160 "$TEXT" -o yuna_slow.aiff
afconvert -f mp4f -d aac yuna_slow.aiff yuna_slow.m4a

# aiff 정리 (mp4가 더 작음)
rm yuna_normal.aiff yuna_slow.aiff

echo ""
echo "완료. 파일:"
ls -la *.m4a
echo ""
echo "재생: open yuna_normal.m4a"
