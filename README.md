# 위즈퍼앱 (wizper-app)

사회적 고립 DP 연구 — 참여자용 모바일 앱. `claude.ai/design` 핸드오프(위즈퍼앱 디자인 시스템)를 Vite + React 웹(모바일 프레임)으로 구현.

## 화면

온보딩부터 메인 기능까지 실제로 클릭해서 진행하는 인터랙티브 프로토타입.

- **온보딩** — 계정 생성 → WIZPR RING 페어링 → 권한 → EMA 시간 설정(확정 팝업) → 준비 완료
- **홈** — 오늘 적립액 · 총 누적액 · 완료 보너스 · 오늘의 설문(4회차) · 음성 과제 · 진행률 · 참여 달력 (회차 참여 → 적립액/진행률 실시간 갱신)
- **EMA 설문** — 4단계 Likert, 전 문항 응답 시 진행 → 250원 적립
- **음성 발화 과제** — 준비 → 녹음(실시간 타이머, 20초 후 완료 활성) → 500원 적립
- **누적 보상 / 기기 연결 / 설정** — 하단 탭 이동 · 참여 철회 팝업

우측 상단 **화면 이동** 메뉴로 모든 화면에 직접 점프 가능. 아이콘은 로컬 번들(`public/icons/`, lucide) — CDN 의존 없음.

## 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

## 디자인 토큰

`src/styles.css` → `src/tokens/{colors,typography,layout}.css`. 단일 강조색 `#5B50E5`, 보더리스·섀도리스 화이트 카드, Pretendard, 해요체 카피.
