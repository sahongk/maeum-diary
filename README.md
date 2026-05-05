<div align="center">

<img src="public/apple-touch-icon.png" alt="내맘일기 로고" width="120" height="120"/>

# 내맘일기 🌸
### MyHeart Journal

**내 마음을 키우는 평생의 친구**

[![배포](https://img.shields.io/badge/배포-Vercel-black?style=flat-square&logo=vercel)](https://maeumilgi.vercel.app)
[![라이선스](https://img.shields.io/badge/license-MIT-pink?style=flat-square)](LICENSE)
[![버전](https://img.shields.io/badge/version-2.0.0-e879a0?style=flat-square)]()
[![PWA](https://img.shields.io/badge/PWA-지원-7c3aed?style=flat-square)]()

[🌐 지금 바로 사용해보기](https://maeumilgi.vercel.app) · [📖 사용 가이드](#사용-방법) · [💡 기능 소개](#주요-기능)

</div>

---

## 🌟 내맘일기란?

> 매년 새해가 되면 다이어리를 사고 일기를 쓰겠다 다짐하지만, 대부분 며칠 만에 포기하게 됩니다.  
> **내맘일기**는 이 문제를 근본적으로 해결합니다.

매일 아침과 저녁, AI가 **계절·날씨·나의 이전 기록**을 바탕으로 감성적인 질문을 건네고, 그 답변을 차곡차곡 쌓아가는 **심리 웰니스 일기 앱**입니다. 초등학생부터 어르신까지, 글쓰기가 부담스러운 분도 자연스럽게 매일 자신의 마음을 들여다볼 수 있어요.

---

## 📱 미리보기

| 홈 화면 | 아침 일기 | 생각코너 | 나만의설정 |
|--------|---------|--------|---------|
| 계절별 감성 UI | 3단계 질문 흐름 | 피터 틸 역발상 질문 | 질문·시간 커스터마이징 |
| 🌸 봄 · ☀️ 여름 | 진행 바 표시 | 매일 새로운 질문 | 내 일상에 맞게 설정 |
| 🍂 가을 · ❄️ 겨울 | 답변 누적 표시 | 건너뛰기 가능 | 질문 추가·삭제·수정 |

---

## 💡 주요 기능

### 🌅 아침 일기
- 매일 아침 **명언 한 가지**와 함께 하루를 시작
- 오늘의 목표·기대·소망을 3가지 질문으로 정리
- 아침 일기 완료 후 **생각코너** 자동 등장

### 🌙 저녁 일기
- 하루를 마무리하는 **감사·성찰 질문**
- 오늘의 멋진 일 3가지 기록으로 긍정 습관 형성
- 저녁마다 따뜻한 응원 메시지 제공

### 💡 생각코너 _(피터 틸 스타일)_
> *"정말 중요한 진실인데 대부분의 사람들이 동의하지 않는 것은 무엇인가?"*

- 매일 새로운 역발상 질문 제공 (총 15개 순환)
- 당연하게 여기던 것을 새로운 시각으로 바라보는 힘
- 건너뛰기 가능 — 부담 없이!

### 📖 지난일기
- 최근 90일치 기록 열람
- 아침·저녁·생각코너 한눈에 확인
- **✏️ 고쳐쓰기** — 언제든 수정 가능

### 📥 내보내기
- 기간 선택 후 `.txt` 파일로 저장
- Word·메모장 등 어디서든 열람 가능
- 나만의 소중한 기록을 영구 보관

### ⚙️ 나만의설정
- 아침·저녁 시간대 직접 설정
- 질문 **추가·수정·삭제** 자유롭게
- 나만의 일기 루틴 완성

### 🎨 계절 감성 UI
- 봄🌸 여름☀️ 가을🍂 겨울❄️ 자동 전환
- 시간대별 (아침·저녁·오후) 다른 분위기
- 모바일 최적화 디자인

---

## 🚀 설치 방법

### 📲 스마트폰에 앱으로 설치 (PWA)

**iPhone (Safari)**
```
1. Safari로 https://maeumilgi.vercel.app 접속
2. 하단 공유버튼 (□↑) 탭
3. "홈 화면에 추가" 선택
4. "추가" 탭 → 앱 설치 완료!
```

**Android (Chrome)**
```
1. Chrome으로 https://maeumilgi.vercel.app 접속
2. 우측 상단 ⋮ 메뉴 탭
3. "앱 설치" 또는 "홈 화면에 추가" 선택
4. "설치" 탭 → 앱 설치 완료!
```

---

## 🛠️ 개발 환경 설정

### 필요 환경
- Node.js 18.x 이상
- npm 9.x 이상

### 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/sahongk/maeum-diary.git
cd maeum-diary

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🏗️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | React 18, Vite 5 |
| **스타일링** | Tailwind CSS 3 |
| **PWA** | vite-plugin-pwa, Workbox |
| **배포** | Vercel |
| **데이터 저장** | localStorage (기기 내 저장) |
| **폰트** | Noto Sans KR (Google Fonts) |

---

## 📁 프로젝트 구조

```
maeum-diary/
├── public/
│   ├── icon-192.png          # Android 아이콘
│   ├── icon-512.png          # Android 대형 아이콘
│   └── apple-touch-icon.png  # iPhone 홈화면 아이콘
├── src/
│   ├── App.jsx               # 메인 앱 컴포넌트
│   ├── main.jsx              # 앱 진입점
│   └── index.css             # 전역 스타일
├── index.html                # HTML 템플릿
├── vite.config.js            # Vite + PWA 설정
├── tailwind.config.js        # Tailwind 설정
└── package.json
```

---

## 🗺️ 개발 로드맵

- [x] v1.0 — 아침·저녁 일기, 계절 UI, PWA 설치
- [x] v1.1 — 아침 질문 개선, 명언 업그레이드
- [x] v2.0 — 고쳐쓰기·내보내기·나만의설정·생각코너
- [ ] v2.1 — 실시간 날씨 API 연동, AI 맞춤 질문
- [ ] v2.2 — 감정 추이 분석 차트
- [ ] v2.3 — 초등학생 특화 모드 (이모지 감정 선택)
- [ ] v3.0 — 보호자 알림, 심리 이상 징후 감지
- [ ] v4.0 — PDF 자서전 출판 기능

---

## 🤝 기여하기

내맘일기를 더 좋게 만들고 싶으신가요?

1. 이 저장소를 **Fork** 해주세요
2. 새 브랜치를 만들어주세요 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋해주세요 (`git commit -m '새기능 추가'`)
4. 브랜치에 Push 해주세요 (`git push origin feature/새기능`)
5. **Pull Request**를 열어주세요

버그 발견이나 기능 제안은 [Issues](https://github.com/sahongk/maeum-diary/issues)에 남겨주세요! 🙏

---

## 📄 라이선스

MIT License © 2025 비즈니스닥터센터

---

## 💝 만든 이유

> 많은 사람들이 새해가 되면 일기를 쓰겠다 다짐하지만 며칠 지나면 잊어버립니다.  
> 글자를 배우기 시작하는 초등학생 때부터 자연스럽게 일기를 쓰고,  
> 평소의 감정 변화를 읽어 어려움이 예측되면 미리 도움을 주는  
> **눈에 보이지 않지만 든든한 내면의 파트너**를 만들고 싶었습니다.

---

<div align="center">

**내맘일기와 함께 매일 조금씩 성장해요** 🌱

[🌐 지금 시작하기](https://maeumilgi.vercel.app)

*든든한 내면의 파트너 · MyHeart Journal*

</div>
