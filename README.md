# 위즈퍼앱 (wizper-app)

사회적 고립 DP 연구 — 참여자용 모바일 앱. `claude.ai/design` 핸드오프(위즈퍼앱 디자인 시스템)를 Vite + React 웹(모바일 프레임)으로 구현.

## 화면

- **홈** — 오늘 적립액 · 총 누적액 · 완료 보너스 · 오늘의 설문(4회차) · 음성 과제 · 오늘의 진행 · 참여 현황 달력 (인터랙티브: 회차 참여 → 적립액/진행률 갱신)
- **누적 보상** — 총 누적액 · 일자별 적립 이력
- **기기 연결 · 설정** — WIZPR RING 상태 · 권한 · 참여 철회
- **전체 화면 갤러리** (`#/screens`) — 온보딩 · EMA 설문 · 음성 발화 과제 · 기기/설정 전체 목업

우측 상단 **전체 화면 보기** 버튼으로 홈 ↔ 갤러리 전환.

## 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

## 디자인 토큰

`src/styles.css` → `src/tokens/{colors,typography,layout}.css`. 단일 강조색 `#5B50E5`, 보더리스·섀도리스 화이트 카드, Pretendard, 해요체 카피.
