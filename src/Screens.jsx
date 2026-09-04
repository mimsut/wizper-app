import React from 'react';
import { Button } from './components/core/Button.jsx';
import { Chip } from './components/core/Chip.jsx';
import { Card } from './components/core/Card.jsx';
import { ListRow } from './components/core/ListRow.jsx';
import { Icon } from './components/core/Icon.jsx';
import { Amount } from './components/reward/Amount.jsx';
import { ProgressBar } from './components/reward/ProgressBar.jsx';
import { ProgressRing } from './components/reward/ProgressRing.jsx';

function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', font: '600 14px/1 var(--font-sans)', flexShrink: 0 }}>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>2:01</span>
      <span style={{ display: 'inline-flex', gap: 5 }}>
        <Icon name="signal" size={14} /><Icon name="wifi" size={14} /><Icon name="battery-medium" size={16} />
      </span>
    </div>
  );
}

function NavHeader({ title, close, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', flexShrink: 0 }}>
      <Icon name={close ? 'x' : 'arrow-left'} size={22} color="var(--text-body)" />
      <span style={{ flex: 1, textAlign: 'center', font: 'var(--text-heading)' }}>{title}</span>
      <span style={{ width: 22, display: 'inline-flex', justifyContent: 'flex-end' }}>{right || null}</span>
    </div>
  );
}

function CTA({ label, disabled, sub }) {
  return (
    <div style={{ padding: '12px 20px 24px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {sub ? <div style={{ font: 'var(--text-caption)', color: 'var(--text-weak)', textAlign: 'center' }}>{sub}</div> : null}
      <Button size="lg" disabled={disabled} style={{ width: '100%' }}>{label}</Button>
    </div>
  );
}

function Field({ label, value, placeholder, right, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ font: 'var(--text-label)', color: 'var(--text-sub)' }}>{label}</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, height: 52, borderRadius: 14, background: 'var(--surface-card)', display: 'flex', alignItems: 'center', padding: '0 16px', font: 'var(--text-body1)', color: value ? 'var(--text-strong)' : 'var(--text-disabled)', outline: error ? '1.5px solid var(--color-danger)' : 'none' }}>
          {value || placeholder}
        </div>
        {right || null}
      </div>
      {error ? <span style={{ font: 'var(--text-caption)', color: 'var(--color-danger)' }}>{error}</span> : null}
    </div>
  );
}

function Body({ children, gap = 12, pad = '4px 20px 12px' }) {
  return <div style={{ flex: 1, overflow: 'hidden', padding: pad, display: 'flex', flexDirection: 'column', gap }}>{children}</div>;
}

function Title({ main, sub }) {
  return (
    <div style={{ padding: '8px 0 4px' }}>
      <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)', whiteSpace: 'pre-line' }}>{main}</div>
      {sub ? <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', marginTop: 6, whiteSpace: 'pre-line' }}>{sub}</div> : null}
    </div>
  );
}

function Dot({ n, total }) {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '10px 20px 0' }}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} style={{ width: i === n ? 18 : 6, height: 6, borderRadius: 3, background: i === n ? 'var(--color-primary)' : 'var(--wz-gray-200)', transition: 'width .2s' }} />
      ))}
    </div>
  );
}

function Phone({ label, note, children, overlay }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 390, flexShrink: 0 }}>
      <div style={{ minHeight: 44 }}>
        <div style={{ font: 'var(--text-heading)' }}>{label}</div>
        {note ? <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)', marginTop: 2 }}>{note}</div> : null}
      </div>
      <div style={{ position: 'relative', width: 390, height: 844, background: 'var(--surface-bg)', borderRadius: 40, overflow: 'hidden', outline: '1px solid var(--wz-gray-300)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {children}
        {overlay || null}
      </div>
    </div>
  );
}

function Dialog({ title, body, primary, secondary }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(25,31,40,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '28px 24px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>{title}</div>
        <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', whiteSpace: 'pre-line' }}>{body}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12 }}>
          <Button size="lg" style={{ width: '100%' }}>{primary}</Button>
          <Button variant="ghost" size="lg" style={{ width: '100%', color: 'var(--text-sub)' }}>{secondary}</Button>
        </div>
      </div>
    </div>
  );
}

/* ── 1. 온보딩 ── */

function ScrAccount() {
  return (
    <Phone label="1-1 계정 생성" note="완료 시 연구 ID 자동 발급 (화면 미노출)">
      <Dot n={0} total={4} />
      <Body gap={14}>
        <Title main={'연구 참여를 위해\n계정을 만들어 주세요'} />
        <Field label="이메일" value="minji.k@example.com" />
        <Field label="비밀번호" value="••••••••••" />
        <Field label="휴대폰 번호" value="010-4821-7735" right={<Button variant="secondary" style={{ height: 52, flexShrink: 0 }}>인증됨</Button>} />
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}><Field label="출생연도" value="2002" /></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ font: 'var(--text-label)', color: 'var(--text-sub)' }}>성별</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {['여성', '남성'].map((g, i) => (
                <span key={g} style={{ flex: 1, height: 52, borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-body1)', background: i === 0 ? 'var(--color-primary-weak)' : 'var(--surface-card)', color: i === 0 ? 'var(--color-primary)' : 'var(--text-sub)' }}>{g}</span>
              ))}
            </div>
          </div>
        </div>
      </Body>
      <CTA label="다음" />
    </Phone>
  );
}

function ScrPairing() {
  return (
    <Phone label="1-2 WIZPR RING 페어링" note="연결 완료 시 자동으로 다음 단계 이동">
      <Dot n={1} total={4} />
      <Body gap={12}>
        <Title main={'반지를 찾았어요\n연결해 주세요'} sub="반지를 손가락에 착용한 상태로 진행해 주세요" />
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 48, height: 48, borderRadius: 24, background: 'var(--color-primary-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="circle-dot" size={24} color="var(--color-primary)" />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--text-body1)' }}>WIZPR RING A-3F27</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="bluetooth" size={12} color="var(--color-primary)" />신호 강함
              </div>
            </div>
            <Button size="sm">연결하기</Button>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 24 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--text-caption)', color: 'var(--text-weak)' }}>
            <Icon name="loader" size={14} color="var(--text-weak)" />주변 기기를 계속 찾고 있어요
          </span>
          <Button variant="ghost">다시 검색</Button>
        </div>
      </Body>
      <CTA label="다음" disabled sub="페어링에 문제가 있나요?" />
    </Phone>
  );
}

function PermRow({ icon, name, desc, ok }) {
  return (
    <ListRow
      left={<Icon name={icon} size={20} color={ok ? 'var(--color-success)' : 'var(--color-danger)'} />}
      title={name} subtitle={desc}
      right={ok ? <Chip tone="success"><Icon name="check" size={12} />허용됨</Chip> : <Button size="sm" variant="secondary">설정하러 가기</Button>}
    />
  );
}

function ScrPermissions() {
  return (
    <Phone label="1-3 권한 요청 · 상태 확인" note="연구 중에도 설정에서 다시 확인·복구 가능">
      <Dot n={2} total={4} />
      <Body gap={12}>
        <Title main={'연구에 필요한 권한을\n허용해 주세요'} sub="권한이 꺼져 있는 동안의 기록은 다시 수집할 수 없어요" />
        <Card padding={'6px 20px'}>
          <PermRow icon="bell" name="알림" desc="설문 시간을 알려드려요" ok />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <PermRow icon="map-pin" name="위치" desc="외출 반경 · 이동 거리만 계산해요" ok />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <PermRow icon="footprints" name="신체활동" desc="걸음 수와 활동 시간을 수집해요" ok />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <PermRow icon="bluetooth" name="Bluetooth" desc="반지와 연결을 유지해요" ok />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <PermRow icon="battery-charging" name="배터리 사용 제한 해제" desc="백그라운드 수집이 끊기지 않아요" ok={false} />
        </Card>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', padding: '0 4px' }}>
          위치 좌표나 통화 내용 원문은 서버로 보내지 않아요. 기기 안에서 계산한 값만 전송돼요.
        </div>
      </Body>
      <CTA label="다음" disabled sub="모든 항목을 허용하면 계속할 수 있어요" />
    </Phone>
  );
}

function ScrEmaTime({ withConfirm }) {
  const times = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  return (
    <Phone
      label={withConfirm ? '1-4b 시간 확정 확인' : '1-4 EMA 응답 시간 설정'}
      note={withConfirm ? "'다음' 선택 시 확인 팝업 1회 제공" : '1회차 선택 시 이후 회차 4시간 간격 자동 설정'}
      overlay={withConfirm ? (
        <Dialog title="이 시간으로 확정할까요?" body={'설정한 시간으로 설문 알림이 발송돼요.\n연구가 시작되면 직접 변경할 수 없어요.'} primary="확정하기" secondary="다시 고르기" />
      ) : null}
    >
      <Dot n={3} total={4} />
      <Body gap={14}>
        <Title main={'첫 설문 시간을\n골라 주세요'} sub="하루 4번, 4시간 간격으로 진행돼요. 일과를 시작한 뒤의 시간을 고르면 참여하기 좋아요." />
        <div style={{ display: 'flex', gap: 8 }}>
          {times.map((t) => (
            <span key={t} style={{ flex: 1, height: 44, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '600 14px/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums', background: t === '10:00' ? 'var(--color-primary)' : 'var(--surface-card)', color: t === '10:00' ? '#fff' : 'var(--text-sub)' }}>{t}</span>
          ))}
        </div>
        <Card padding={'8px 20px'}>
          {[['1회차', '10:00', 'sun'], ['2회차', '14:00', 'sun-medium'], ['3회차', '18:00', 'sunset'], ['4회차', '22:00', 'moon']].map(([n, t, ic], i) => (
            <React.Fragment key={n}>
              {i > 0 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
              <ListRow left={<Icon name={ic} size={20} color={i === 0 ? 'var(--color-primary)' : 'var(--text-weak)'} />} title={<span style={{ fontVariantNumeric: 'tabular-nums' }}>{t}</span>} right={<span style={{ font: 'var(--text-caption)', color: 'var(--text-weak)' }}>{i === 0 ? '직접 선택' : '자동 설정'}</span>} />
            </React.Fragment>
          ))}
        </Card>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '0 4px' }}>
          <Icon name="lock" size={14} color="var(--text-weak)" style={{ marginTop: 2 }} />
          <span style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>연구 시작 후에는 시간을 바꿀 수 없어요. 각 회차는 알림 후 60분 동안 참여할 수 있어요.</span>
        </div>
      </Body>
      <CTA label="다음" />
    </Phone>
  );
}

function ScrReady() {
  return (
    <Phone label="1-5 준비 완료" note="완료 여부 저장 → 재실행 시 온보딩 반복 없음">
      <Body gap={12} pad="4px 20px 12px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '48px 0 12px' }}>
          <span style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--color-primary-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check" size={36} color="var(--color-primary)" />
          </span>
          <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)', textAlign: 'center' }}>{'준비가 끝났어요'}</div>
        </div>
        <Card padding={'8px 20px'}>
          {[['계정 · 연구 ID 발급', 'user-check'], ['WIZPR RING 연결', 'circle-dot'], ['권한 허용', 'shield-check'], ['설문 시간 설정 · 10:00 시작', 'clock']].map(([t, ic], i) => (
            <React.Fragment key={t}>
              {i > 0 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
              <ListRow left={<Icon name={ic} size={20} color="var(--text-weak)" />} title={t} right={<Icon name="check" size={18} color="var(--color-success)" />} />
            </React.Fragment>
          ))}
        </Card>
        <Card padding={'16px 20px'} style={{ background: 'var(--color-primary-tint)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="calendar-clock" size={20} color="var(--color-primary)" />
            <div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>첫 설문 예정</div>
              <div style={{ font: '600 15px/22px var(--font-sans)', color: 'var(--color-primary)' }}>9월 4일 (금) 10:00</div>
            </div>
          </div>
        </Card>
      </Body>
      <CTA label="앱 시작하기" />
    </Phone>
  );
}

/* ── 2. EMA 자기보고 설문 ── */

function Likert({ value }) {
  const labels = ['전혀 아니다', '아니다', '그렇다', '매우 그렇다'];
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
      {labels.map((l, i) => (
        <span key={l} style={{ flex: 1, height: 40, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '500 12px/1 var(--font-sans)', background: i === value ? 'var(--color-primary)' : 'var(--surface-sunken)', color: i === value ? '#fff' : 'var(--text-sub)' }}>{l}</span>
      ))}
    </div>
  );
}

function ScrSurvey({ withExit }) {
  const qs = [
    ['주변에 마음을 터놓을 사람이 없다고 느꼈다', 2],
    ['혼자라고 느꼈다', 1],
    ['사람들과 어울리고 싶지 않았다', 2],
    ['기분이 가라앉거나 우울했다', 1],
    ['사소한 일에도 불안했다', null]
  ];
  return (
    <Phone
      label={withExit ? '3-3 중도 종료 안내' : '3-2 자기보고 설문'}
      note={withExit ? '종료 시 응답 미저장 · 보상 미지급 안내' : '4단계 × 5문항 · 미응답 시 다음 단계 이동 불가'}
      overlay={withExit ? (
        <Dialog title="설문을 그만할까요?" body={'지금 그만두면 응답이 저장되지 않고\n이번 회차 보상 250원도 받을 수 없어요.'} primary="계속 응답하기" secondary="그만하기" />
      ) : null}
    >
      <NavHeader title="14:00 자기보고 설문" close right={<span style={{ font: 'var(--text-caption)', color: 'var(--text-weak)', fontVariantNumeric: 'tabular-nums' }}>2/4</span>} />
      <div style={{ padding: '0 20px' }}><ProgressBar value={2} max={4} height={4} /></div>
      <Body gap={20} pad="16px 20px 12px">
        <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>지난 알림 이후, 얼마나 그렇게 느꼈는지 골라 주세요</div>
        {qs.map(([q, v], i) => (
          <div key={i}>
            <div style={{ font: 'var(--text-body1)', display: 'flex', gap: 8 }}>
              <span style={{ color: v === null ? 'var(--color-primary)' : 'var(--text-weak)', fontVariantNumeric: 'tabular-nums' }}>{'Q' + (i + 6)}</span>
              <span style={{ flex: 1 }}>{q}</span>
            </div>
            <Likert value={v} />
          </div>
        ))}
      </Body>
      <CTA label="다음" disabled sub="모든 문항에 답하면 넘어갈 수 있어요" />
    </Phone>
  );
}

function ScrSurveyDone() {
  return (
    <Phone label="3-4 설문 완료 · 보상" note="마지막 회차 완료 시 음성 과제로 자동 연결">
      <Body gap={12}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '56px 0 16px' }}>
          <span style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--reward-coin-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="coins" size={34} color="var(--reward-coin)" />
          </span>
          <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)' }}>250원이 적립됐어요</div>
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)' }}>오늘 2번째 설문까지 완료했어요</div>
        </div>
        <Card padding={'8px 20px'}>
          <ListRow title="오늘 적립액" right={<Amount value={500} size="md" />} />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <ListRow title="총 누적액" right={<Amount value={3500} size="md" />} />
        </Card>
        <Card padding={'16px 20px'} style={{ background: 'var(--color-primary-tint)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="bell" size={18} color="var(--color-primary)" />
            <span style={{ font: 'var(--text-body2)', color: 'var(--text-body)' }}>다음 설문은 <b style={{ color: 'var(--color-primary)' }}>18:00</b>에 열려요. 알림으로 알려드릴게요.</span>
          </div>
        </Card>
      </Body>
      <CTA label="홈으로" />
    </Phone>
  );
}

/* ── 3. 음성 발화 과제 ── */

function ScrVoiceReady() {
  return (
    <Phone label="4-1 음성 과제 준비" note="링 연결 확인 후에만 시작 가능">
      <NavHeader title="음성 대화 과제" close />
      <Body gap={14} pad="8px 20px 12px">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Chip tone="success"><Icon name="circle-dot" size={12} />WIZPR RING 연결됨</Chip>
        </div>
        <Card padding={24} style={{ textAlign: 'center' }}>
          <div style={{ font: 'var(--text-caption)', color: 'var(--color-primary)', marginBottom: 8 }}>오늘의 대화 주제</div>
          <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>요즘 하루를 어떻게 보내고 계세요?</div>
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', marginTop: 8 }}>답변에 따라 이어지는 질문을 드려요</div>
        </Card>
        <Card padding={'6px 20px'}>
          {[['volume-1', '조용한 곳에서 편하게 이야기해 주세요'], ['timer', '최소 20초, 최대 2분 동안 진행돼요'], ['message-circle', '정답은 없어요. 떠오르는 대로 말해 주세요']].map(([ic, t], i) => (
            <React.Fragment key={ic}>
              {i > 0 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
              <ListRow left={<Icon name={ic} size={18} color="var(--text-weak)" />} title={<span style={{ font: 'var(--text-body2)' }}>{t}</span>} />
            </React.Fragment>
          ))}
        </Card>
      </Body>
      <CTA label="대화 시작하기" sub="완료하면 500원이 적립돼요" />
    </Phone>
  );
}

function ScrVoiceRecording() {
  return (
    <Phone label="4-2 녹음 중" note="20초 이상 유효 발화 시 완료 버튼 활성화 · 2분 자동 종료">
      <NavHeader title="음성 대화 과제" close right={<Chip tone="danger"><span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--color-danger)' }} />REC</Chip>} />
      <Body gap={16} pad="8px 20px 12px">
        <Card padding={'16px 20px'}>
          <div style={{ font: 'var(--text-caption)', color: 'var(--text-weak)', marginBottom: 4 }}>질문</div>
          <div style={{ font: 'var(--text-body1)' }}>요즘 하루를 어떻게 보내고 계세요?</div>
          <div style={{ marginTop: 12, padding: '12px 14px', borderRadius: '2px 14px 14px 14px', background: 'var(--color-primary-tint)', font: 'var(--text-body2)', color: 'var(--text-body)' }}>
            방금 산책 이야기를 해주셨는데, 산책할 때 주로 어떤 생각을 하세요?
          </div>
          <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 6 }}>이어지는 질문 · 음성으로도 들려드려요</div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '12px 0' }}>
          <ProgressRing percent={39} size={148} color="var(--color-success)">
            <div style={{ textAlign: 'center' }}>
              <div style={{ font: '700 26px/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}>0:47</div>
              <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 4 }}>최대 2:00</div>
            </div>
          </ProgressRing>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: 'var(--text-caption)', color: 'var(--color-success)' }}>
            <Icon name="check" size={14} color="var(--color-success)" />최소 시간을 채웠어요 — 지금 마쳐도 돼요
          </div>
        </div>
      </Body>
      <CTA label="녹음 완료" sub="말이 3초 이상 끊기면 안내를 드려요" />
    </Phone>
  );
}

function ScrVoiceDone() {
  return (
    <Phone label="4-4 음성 과제 완료 · 보상" note="당일 과제 전체 완료 시 보너스 1,000원 가산">
      <Body gap={12}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '48px 0 12px' }}>
          <span style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--reward-coin-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="party-popper" size={34} color="var(--reward-coin)" />
          </span>
          <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)' }}>500원이 적립됐어요</div>
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)' }}>오늘 과제를 모두 마쳤어요</div>
        </div>
        <Card padding={'16px 20px'} style={{ background: 'var(--reward-coin-weak)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="gift" size={20} color="var(--reward-coin)" />
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 15px/22px var(--font-sans)', color: 'var(--wz-gray-900)' }}>모든 참여 완료 보너스</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>설문 4회 + 대화 1회</div>
            </div>
            <Amount value={1000} size="lg" color="var(--reward-coin)" />
          </div>
        </Card>
        <Card padding={'8px 20px'}>
          <ListRow title="오늘 적립액" right={<Amount value={2500} size="md" />} />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <ListRow title="다음 참여일" right={<span style={{ font: 'var(--text-body1)', fontVariantNumeric: 'tabular-nums' }}>9월 7일 (월)</span>} />
        </Card>
      </Body>
      <CTA label="홈으로" />
    </Phone>
  );
}

/* ── 4. 기기 · 설정 ── */

function ScrDevice() {
  return (
    <Phone label="기기 연결" note="연결 끊김 시 자동 재연결 + 안내">
      <Body gap={12} pad="8px 20px 12px">
        <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)', padding: '12px 0 4px' }}>기기 연결</div>
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 52, height: 52, borderRadius: 26, background: 'var(--color-success-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="circle-dot" size={26} color="var(--color-success)" />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--text-heading)' }}>WIZPR RING A-3F27</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--color-success)' }}>연결됨 · 방금 동기화</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--divider)', margin: '16px 0 6px' }} />
          <ListRow left={<Icon name="battery-medium" size={18} color="var(--text-weak)" />} title="반지 배터리" right={<span style={{ font: 'var(--text-body1)', fontVariantNumeric: 'tabular-nums' }}>68%</span>} />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <ListRow left={<Icon name="refresh-cw" size={18} color="var(--text-weak)" />} title="마지막 데이터 전송" right={<span style={{ font: 'var(--text-body1)', fontVariantNumeric: 'tabular-nums' }}>오늘 13:58</span>} />
        </Card>
        <Card padding={'16px 20px'} style={{ background: 'var(--color-primary-tint)' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <Icon name="info" size={16} color="var(--color-primary)" style={{ marginTop: 2 }} />
            <span style={{ font: 'var(--text-caption)', color: 'var(--text-body)' }}>연결이 끊기면 자동으로 다시 연결을 시도해요. 계속 실패하면 알림으로 알려드려요.</span>
          </div>
        </Card>
        <Button variant="secondary" size="lg" style={{ width: '100%' }}>다시 연결하기</Button>
      </Body>
    </Phone>
  );
}

function ScrSettings() {
  return (
    <Phone label="설정" note="연구설명문 · 권한 · 참여 철회">
      <Body gap={12} pad="8px 20px 12px">
        <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)', padding: '12px 0 4px' }}>설정</div>
        <Card padding={'16px 20px'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--color-primary-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 15px/1 var(--font-sans)', color: 'var(--color-primary)' }}>W</span>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--text-body1)' }}>WPR-135</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>연구 26일차 · 9월 28일 종료 예정</div>
            </div>
          </div>
        </Card>
        <Card padding={'6px 20px'}>
          {[['file-text', '연구 설명문 보기', null], ['shield-check', '권한 상태 확인', '1개 확인 필요'], ['bell', '알림 설정', null], ['clock', '설문 시간', '10:00 시작 · 변경 불가']].map(([ic, t, sub], i) => (
            <React.Fragment key={t}>
              {i > 0 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
              <ListRow
                left={<Icon name={ic} size={20} color="var(--text-weak)" />}
                title={t}
                right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {sub ? <span style={{ font: 'var(--text-caption)', color: sub.includes('확인') ? 'var(--color-danger)' : 'var(--text-weak)' }}>{sub}</span> : null}
                  {t === '설문 시간' ? <Icon name="lock" size={14} color="var(--text-disabled)" /> : <Icon name="chevron-right" size={18} color="var(--text-weak)" />}
                </span>}
              />
            </React.Fragment>
          ))}
        </Card>
        <Card padding={'6px 20px'}>
          <ListRow left={<Icon name="headphones" size={20} color="var(--text-weak)" />} title="연구팀에 문의하기" right={<Icon name="chevron-right" size={18} color="var(--text-weak)" />} />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <ListRow left={<Icon name="log-out" size={20} color="var(--color-danger)" />} title={<span style={{ color: 'var(--color-danger)' }}>연구 참여 철회</span>} />
        </Card>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', padding: '0 4px' }}>참여 철회 시 이후 수집이 즉시 중단돼요. 자세한 내용은 연구 설명문을 확인해 주세요.</div>
      </Body>
    </Phone>
  );
}

/* ── 갤러리 ── */

function Section({ title, sub, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>{title}</div>
        <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

export function AppScreens() {
  return (
    <div style={{ padding: '36px 40px 60px', display: 'flex', flexDirection: 'column', gap: 48, fontFamily: 'var(--font-sans)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-body)' }}>
      <div>
        <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)' }}>위즈퍼링 참가자 앱 — 전체 화면</div>
        <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', marginTop: 4 }}>기능목록 FINAL v4 · 화면구성예시(7/22) 기준 · 홈 화면은 별도 카드(위즈퍼앱 홈) 참고</div>
      </div>
      <Section title="01 온보딩" sub="계정 생성 → 링 페어링 → 권한 → EMA 시간 설정 → 준비 완료">
        <ScrAccount /><ScrPairing /><ScrPermissions /><ScrEmaTime /><ScrEmaTime withConfirm /><ScrReady />
      </Section>
      <Section title="02 EMA 자기보고 설문" sub="설문 응답 → 중도 종료 안내 → 완료 · 보상 (250원)">
        <ScrSurvey /><ScrSurvey withExit /><ScrSurveyDone />
      </Section>
      <Section title="03 음성 발화 과제 (LLM 대화형)" sub="준비 → 녹음 (최소 20초 · 최대 2분) → 완료 · 보상 (500원 + 일일 보너스)">
        <ScrVoiceReady /><ScrVoiceRecording /><ScrVoiceDone />
      </Section>
      <Section title="04 기기 연결 · 설정" sub="링 상태 확인 · 재연결 / 연구설명문 · 권한 · 참여 철회">
        <ScrDevice /><ScrSettings />
      </Section>
    </div>
  );
}
