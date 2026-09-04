import React from 'react';
import { Button } from './components/core/Button.jsx';
import { Chip } from './components/core/Chip.jsx';
import { Card } from './components/core/Card.jsx';
import { ListRow } from './components/core/ListRow.jsx';
import { Icon } from './components/core/Icon.jsx';
import { BottomNav } from './components/core/BottomNav.jsx';
import { Amount } from './components/reward/Amount.jsx';
import { ProgressBar } from './components/reward/ProgressBar.jsx';
import { ProgressRing } from './components/reward/ProgressRing.jsx';

/* ────────── 토스트 (폰 프레임 안 피드백) ────────── */
let _pushToast = () => {};
function toast(msg) { _pushToast(msg); }
function ToastHost() {
  const [items, setItems] = React.useState([]);
  const idRef = React.useRef(0);
  React.useEffect(() => {
    _pushToast = (msg) => {
      const id = ++idRef.current;
      setItems((x) => [...x, { id, msg }]);
      setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 2000);
    };
    return () => { _pushToast = () => {}; };
  }, []);
  return (
    <div style={{ position: 'absolute', bottom: 84, left: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 30, alignItems: 'center', pointerEvents: 'none' }}>
      {items.map((t) => (
        <div key={t.id} style={{ background: 'var(--wz-gray-900)', color: '#fff', font: '500 13px/1.4 var(--font-sans)', padding: '10px 16px', borderRadius: 12, boxShadow: '0 4px 16px rgba(25,31,40,.24)', maxWidth: '100%', textAlign: 'center' }}>{t.msg}</div>
      ))}
    </div>
  );
}

/* ────────── 공통 chrome ────────── */
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
function NavHeader({ title, close, right, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', flexShrink: 0 }}>
      <button onClick={onBack} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex' }}>
        <Icon name={close ? 'x' : 'arrow-left'} size={22} color="var(--text-body)" />
      </button>
      <span style={{ flex: 1, textAlign: 'center', font: 'var(--text-heading)' }}>{title}</span>
      <span style={{ width: 22, display: 'inline-flex', justifyContent: 'flex-end' }}>{right || null}</span>
    </div>
  );
}
function CTA({ label, disabled, sub, onClick }) {
  return (
    <div style={{ padding: '12px 20px 24px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {sub ? <div style={{ font: 'var(--text-caption)', color: 'var(--text-weak)', textAlign: 'center' }}>{sub}</div> : null}
      <Button size="lg" disabled={disabled} onClick={onClick} style={{ width: '100%' }}>{label}</Button>
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
  return <div style={{ flex: 1, overflowY: 'auto', padding: pad, display: 'flex', flexDirection: 'column', gap }}>{children}</div>;
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
    <div style={{ display: 'flex', gap: 5, padding: '10px 20px 0', flexShrink: 0 }}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} style={{ width: i === n ? 18 : 6, height: 6, borderRadius: 3, background: i === n ? 'var(--color-primary)' : 'var(--wz-gray-200)', transition: 'width .2s' }} />
      ))}
    </div>
  );
}
function Dialog({ title, body, primary, secondary, onPrimary, onSecondary }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(25,31,40,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28, zIndex: 20 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '28px 24px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>{title}</div>
        <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', whiteSpace: 'pre-line' }}>{body}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12 }}>
          <Button size="lg" onClick={onPrimary} style={{ width: '100%' }}>{primary}</Button>
          <Button variant="ghost" size="lg" onClick={onSecondary} style={{ width: '100%', color: 'var(--text-sub)' }}>{secondary}</Button>
        </div>
      </div>
    </div>
  );
}

/* ────────── 1. 온보딩 ────────── */
function ScrAccount({ go }) {
  const [sex, setSex] = React.useState(0);
  return (
    <>
      <StatusBar /><Dot n={0} total={4} />
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
                <span key={g} onClick={() => setSex(i)} style={{ flex: 1, height: 52, borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', font: 'var(--text-body1)', background: i === sex ? 'var(--color-primary-weak)' : 'var(--surface-card)', color: i === sex ? 'var(--color-primary)' : 'var(--text-sub)' }}>{g}</span>
              ))}
            </div>
          </div>
        </div>
      </Body>
      <CTA label="다음" onClick={() => go('pairing')} />
    </>
  );
}

function ScrPairing({ go }) {
  const [connected, setConnected] = React.useState(false);
  return (
    <>
      <StatusBar /><Dot n={1} total={4} />
      <Body gap={12}>
        <Title main={'반지를 찾았어요\n연결해 주세요'} sub="반지를 손가락에 착용한 상태로 진행해 주세요" />
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 48, height: 48, borderRadius: 24, background: connected ? 'var(--color-success-weak)' : 'var(--color-primary-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="circle-dot" size={24} color={connected ? 'var(--color-success)' : 'var(--color-primary)'} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--text-body1)' }}>WIZPR RING A-3F27</div>
              <div style={{ font: 'var(--text-caption)', color: connected ? 'var(--color-success)' : 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="bluetooth" size={12} color={connected ? 'var(--color-success)' : 'var(--color-primary)'} />{connected ? '연결됨' : '신호 강함'}
              </div>
            </div>
            <Button size="sm" variant={connected ? 'secondary' : 'primary'} onClick={() => setConnected(true)}>{connected ? '연결됨' : '연결하기'}</Button>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 24 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--text-caption)', color: 'var(--text-weak)' }}>
            <Icon name="loader" size={14} color="var(--text-weak)" />주변 기기를 계속 찾고 있어요
          </span>
          <Button variant="ghost" onClick={() => toast('주변 기기를 다시 검색 중이에요')}>다시 검색</Button>
        </div>
      </Body>
      <CTA label="다음" disabled={!connected} onClick={() => go('permissions')} sub={connected ? null : '페어링에 문제가 있나요?'} />
    </>
  );
}

function PermRow({ icon, name, desc, ok, onFix }) {
  return (
    <ListRow
      left={<Icon name={icon} size={20} color={ok ? 'var(--color-success)' : 'var(--color-danger)'} />}
      title={name} subtitle={desc}
      right={ok ? <Chip tone="success"><Icon name="check" size={12} />허용됨</Chip> : <Button size="sm" variant="secondary" onClick={onFix}>설정하러 가기</Button>}
    />
  );
}
function ScrPermissions({ go }) {
  const [battery, setBattery] = React.useState(false);
  return (
    <>
      <StatusBar /><Dot n={2} total={4} />
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
          <PermRow icon="battery-charging" name="배터리 사용 제한 해제" desc="백그라운드 수집이 끊기지 않아요" ok={battery} onFix={() => setBattery(true)} />
        </Card>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', padding: '0 4px' }}>
          위치 좌표나 통화 내용 원문은 서버로 보내지 않아요. 기기 안에서 계산한 값만 전송돼요.
        </div>
      </Body>
      <CTA label="다음" disabled={!battery} onClick={() => go('emaTime')} sub={battery ? null : '모든 항목을 허용하면 계속할 수 있어요'} />
    </>
  );
}

function ScrEmaTime({ go }) {
  const times = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  const [pick, setPick] = React.useState('10:00');
  const [confirm, setConfirm] = React.useState(false);
  const base = parseInt(pick);
  const rounds = [0, 1, 2, 3].map((i) => String(base + i * 4).padStart(2, '0') + ':00');
  const icons = ['sun', 'sun-medium', 'sunset', 'moon'];
  return (
    <>
      <StatusBar /><Dot n={3} total={4} />
      <Body gap={14}>
        <Title main={'첫 설문 시간을\n골라 주세요'} sub="하루 4번, 4시간 간격으로 진행돼요. 일과를 시작한 뒤의 시간을 고르면 참여하기 좋아요." />
        <div style={{ display: 'flex', gap: 8 }}>
          {times.map((t) => (
            <span key={t} onClick={() => setPick(t)} style={{ flex: 1, height: 44, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', font: '600 14px/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums', background: t === pick ? 'var(--color-primary)' : 'var(--surface-card)', color: t === pick ? '#fff' : 'var(--text-sub)' }}>{t}</span>
          ))}
        </div>
        <Card padding={'8px 20px'}>
          {rounds.map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
              <ListRow left={<Icon name={icons[i]} size={20} color={i === 0 ? 'var(--color-primary)' : 'var(--text-weak)'} />} title={<span style={{ fontVariantNumeric: 'tabular-nums' }}>{`${i + 1}회차 ${t}`}</span>} right={<span style={{ font: 'var(--text-caption)', color: 'var(--text-weak)' }}>{i === 0 ? '직접 선택' : '자동 설정'}</span>} />
            </React.Fragment>
          ))}
        </Card>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '0 4px' }}>
          <Icon name="lock" size={14} color="var(--text-weak)" style={{ marginTop: 2 }} />
          <span style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>연구 시작 후에는 시간을 바꿀 수 없어요. 각 회차는 알림 후 60분 동안 참여할 수 있어요.</span>
        </div>
      </Body>
      <CTA label="다음" onClick={() => setConfirm(true)} />
      {confirm ? (
        <Dialog title="이 시간으로 확정할까요?" body={'설정한 시간으로 설문 알림이 발송돼요.\n연구가 시작되면 직접 변경할 수 없어요.'}
          primary="확정하기" secondary="다시 고르기" onPrimary={() => go('ready')} onSecondary={() => setConfirm(false)} />
      ) : null}
    </>
  );
}

function ScrReady({ go }) {
  return (
    <>
      <StatusBar />
      <Body gap={12} pad="4px 20px 12px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '48px 0 12px' }}>
          <span style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--color-primary-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check" size={36} color="var(--color-primary)" />
          </span>
          <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)', textAlign: 'center' }}>준비가 끝났어요</div>
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
      <CTA label="앱 시작하기" onClick={() => go('home')} />
    </>
  );
}

/* ────────── 2. 메인 홈 (탭) ────────── */
const cap = (s) => <span style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>{s}</span>;
function SectionTitle({ children, extra }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
      <div style={{ font: 'var(--text-heading)', letterSpacing: 'var(--tracking-body)' }}>{children}</div>
      {extra}
    </div>
  );
}
const EMA = [
  { time: '10:00', icon: 'sun' },
  { time: '14:00', icon: 'sun-medium' },
  { time: '18:00', icon: 'sunset' },
  { time: '22:00', icon: 'moon' }
];

function HomeTab({ done, voiceDone, onStartSurvey, onStartVoice, goRewards }) {
  const nowIdx = 1;
  const doneCount = Object.values(done).filter(Boolean).length;
  const today = doneCount * 250 + (voiceDone ? 500 : 0);
  const total = 3000 + today;
  const percent = Math.round(((doneCount + (voiceDone ? 1 : 0)) / 5) * 100);
  const rowRight = (i) => {
    if (done[i]) return <Chip tone="success"><Icon name="check" size={12} />완료</Chip>;
    if (i === nowIdx) return <Button size="sm" onClick={() => onStartSurvey(i)}>참여하기</Button>;
    return <Chip tone="neutral">{parseInt(EMA[i].time) + '시에 열려요'}</Chip>;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0 4px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>안녕하세요, WPR-135님</div>
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', marginTop: 2 }}>오늘도 소중한 참여 부탁드려요</div>
        </div>
        <button onClick={() => toast('알림 3건 (목업)')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 4 }}><Icon name="bell" size={22} color="var(--text-sub)" /></button>
      </div>
      <Card padding={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{cap('오늘 적립액')}<Icon name="info" size={13} color="var(--text-weak)" /></div>
        <div style={{ marginTop: 2, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <Amount value={today} size="display" />
          {doneCount > 1 ? <Chip tone="coin">+250원</Chip> : null}
        </div>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 4 }}>매일 자정에 총 누적액으로 옮겨져요</div>
        <div style={{ height: 1, background: 'var(--divider)', margin: '14px 0 10px' }} />
        <div onClick={goRewards} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ font: 'var(--text-body1)', color: 'var(--text-body)', flex: 1 }}>총 누적액</span>
          <Amount value={total} size="lg" />
          <Icon name="chevron-right" size={18} color="var(--text-weak)" style={{ marginLeft: 4 }} />
        </div>
      </Card>
      <Card padding={'16px 20px'} onClick={() => toast('오늘 설문 4회 + 음성 1회 완료 시 보너스 1,000원')} style={{ background: 'var(--color-primary-tint)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 20, background: 'var(--color-primary-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="gift" size={20} color="var(--color-primary)" />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ font: 'var(--text-body1)' }}>오늘 모든 참여를 완료하면</div>
            <div style={{ font: '600 15px/22px var(--font-sans)', color: 'var(--color-primary)' }}>보너스 1,000원을 드려요</div>
          </div>
          <Icon name="chevron-right" size={18} color="var(--text-weak)" />
        </div>
      </Card>
      <Card padding={'16px 20px 8px'}>
        <SectionTitle extra={cap('9월 1일 (화)')}>오늘의 설문</SectionTitle>
        <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>하루 4번, 각 회차 60분 이내에 참여할 수 있어요</div>
        <div style={{ marginTop: 4 }}>
          {EMA.map((e, i) => (
            <React.Fragment key={e.time}>
              <ListRow
                left={<Icon name={e.icon} size={20} color={i === nowIdx && !done[i] ? 'var(--color-primary)' : 'var(--text-weak)'} />}
                title={<span style={{ fontVariantNumeric: 'tabular-nums' }}>{e.time} 자기보고 설문</span>}
                subtitle="20문항 · 250원"
                right={rowRight(i)}
                muted={i > nowIdx && !done[i]}
              />
              {i < 3 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
            </React.Fragment>
          ))}
        </div>
      </Card>
      <Card padding={'16px 20px 8px'}>
        <SectionTitle extra={cap('9월 1일 (화)')}>오늘의 음성 과제</SectionTitle>
        <ListRow
          left={<Icon name="mic" size={20} color={voiceDone ? 'var(--text-weak)' : 'var(--color-primary)'} />}
          title={<span style={{ fontVariantNumeric: 'tabular-nums' }}>22:00 음성 발화 과제</span>}
          subtitle="2분 이내 · 500원"
          right={voiceDone ? <Chip tone="success"><Icon name="check" size={12} />완료</Chip> : <Button size="sm" onClick={onStartVoice}>참여하기</Button>}
        />
      </Card>
      <Card padding={20}>
        <SectionTitle>오늘의 진행</SectionTitle>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 8 }}>
          <ProgressRing percent={percent}><span style={{ font: '700 18px/1 var(--font-sans)' }}>{percent}%</span></ProgressRing>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: '자기보고 설문', n: doneCount, of: 4, v: doneCount * 250, max: 1000 },
              { name: '음성 발화 과제', n: voiceDone ? 1 : 0, of: 1, v: voiceDone ? 500 : 0, max: 500 },
              { name: '참여 완료 보너스', n: 0, of: 1, v: 0, max: 1000 }
            ].map((r) => (
              <div key={r.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--text-caption)', marginBottom: 5 }}>
                  <span style={{ color: 'var(--text-body)' }}>{r.name} <span style={{ color: 'var(--text-weak)' }}>{r.n}/{r.of}</span></span>
                  <span style={{ color: 'var(--text-sub)', fontVariantNumeric: 'tabular-nums' }}>{r.v.toLocaleString()} / {r.max.toLocaleString()}원</span>
                </div>
                <ProgressBar value={r.v} max={r.max} height={6} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function RewardsTab({ today }) {
  const total = 3000 + today;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 24px' }}>
      <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)', padding: '12px 0 4px' }}>누적 보상</div>
      <Card padding={20}>
        {cap('총 누적액')}
        <div style={{ marginTop: 2 }}><Amount value={total} size="display" /></div>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 4 }}>연구 종료 후 일괄 지급돼요</div>
      </Card>
      <Card padding={'8px 20px'}>
        {[{ d: '9월 1일 (화)', v: today, n: '오늘 참여' }, { d: '8월 31일 (월)', v: 1750, n: '5회 참여 · 보너스 포함' }, { d: '8월 30일 (일)', v: 1250, n: '4회 참여' }].map((r, i) => (
          <React.Fragment key={r.d}>
            {i > 0 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
            <ListRow title={r.d} subtitle={r.n} right={<Amount value={r.v} size="md" />} />
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
}

function DeviceTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 24px' }}>
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
      <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={() => toast('WIZPR RING 재연결을 시도해요')}>다시 연결하기</Button>
    </div>
  );
}

function SettingsTab({ onWithdraw }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 24px' }}>
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
              onClick={() => toast(t === '설문 시간' ? '설문 시간은 연구 시작 후 변경할 수 없어요' : t + ' (목업)')}
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
        <ListRow onClick={() => toast('연구팀 문의 채널 (목업)')} left={<Icon name="headphones" size={20} color="var(--text-weak)" />} title="연구팀에 문의하기" right={<Icon name="chevron-right" size={18} color="var(--text-weak)" />} />
        <div style={{ height: 1, background: 'var(--divider)' }} />
        <ListRow onClick={onWithdraw} left={<Icon name="log-out" size={20} color="var(--color-danger)" />} title={<span style={{ color: 'var(--color-danger)' }}>연구 참여 철회</span>} />
      </Card>
      <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', padding: '0 4px' }}>참여 철회 시 이후 수집이 즉시 중단돼요. 자세한 내용은 연구 설명문을 확인해 주세요.</div>
    </div>
  );
}

function MainApp({ done, voiceDone, onStartSurvey, onStartVoice, onWithdraw }) {
  const [tab, setTab] = React.useState(0);
  const doneCount = Object.values(done).filter(Boolean).length;
  const today = doneCount * 250 + (voiceDone ? 500 : 0);
  const [withdraw, setWithdraw] = React.useState(false);
  return (
    <>
      <StatusBar />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 0 ? <HomeTab done={done} voiceDone={voiceDone} onStartSurvey={onStartSurvey} onStartVoice={onStartVoice} goRewards={() => setTab(1)} />
          : tab === 1 ? <RewardsTab today={today} />
          : tab === 2 ? <DeviceTab />
          : <SettingsTab onWithdraw={() => setWithdraw(true)} />}
      </div>
      <BottomNav
        items={[{ icon: 'house', label: '홈' }, { icon: 'coins', label: '누적 보상' }, { icon: 'watch', label: '기기 연결' }, { icon: 'settings', label: '설정' }]}
        activeIndex={tab} onChange={setTab}
      />
      {withdraw ? (
        <Dialog title="연구 참여를 철회할까요?" body={'철회하면 이후 데이터 수집이 즉시 중단되고\n되돌릴 수 없어요.'}
          primary="철회하기" secondary="계속 참여하기" onPrimary={() => { setWithdraw(false); onWithdraw(); }} onSecondary={() => setWithdraw(false)} />
      ) : null}
    </>
  );
}

/* ────────── 3. EMA 설문 플로우 ────────── */
function Likert({ value, onPick }) {
  const labels = ['전혀 아니다', '아니다', '그렇다', '매우 그렇다'];
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
      {labels.map((l, i) => (
        <span key={l} onClick={() => onPick(i)} style={{ flex: 1, height: 40, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', font: '500 12px/1 var(--font-sans)', background: i === value ? 'var(--color-primary)' : 'var(--surface-sunken)', color: i === value ? '#fff' : 'var(--text-sub)' }}>{l}</span>
      ))}
    </div>
  );
}
const SURVEY_STEPS = [
  ['주변에 마음을 터놓을 사람이 없다고 느꼈다', '혼자라고 느꼈다', '사람들과 어울리고 싶지 않았다', '기분이 가라앉거나 우울했다', '사소한 일에도 불안했다'],
  ['오늘 하루 활력이 있었다', '집중이 잘 되었다', '잠을 충분히 잤다고 느꼈다', '식사를 규칙적으로 했다', '몸이 피로했다'],
  ['다른 사람과 대화를 나눴다', '외출을 했다', '즐거운 일이 있었다', '스트레스를 받았다', '누군가에게 도움을 요청했다'],
  ['내일이 기대된다', '스스로가 가치 있다고 느꼈다', '감정을 잘 조절했다', '계획한 일을 해냈다', '전반적으로 만족스러운 하루였다']
];
function SurveyFlow({ onDone, onExit }) {
  const [step, setStep] = React.useState(0);
  const [ans, setAns] = React.useState({});
  const [exit, setExit] = React.useState(false);
  const qs = SURVEY_STEPS[step];
  const allAnswered = qs.every((_, i) => ans[step + '-' + i] !== undefined);
  return (
    <>
      <NavHeader title="14:00 자기보고 설문" close right={<span style={{ font: 'var(--text-caption)', color: 'var(--text-weak)', fontVariantNumeric: 'tabular-nums' }}>{step + 1}/4</span>} onBack={() => setExit(true)} />
      <div style={{ padding: '0 20px', flexShrink: 0 }}><ProgressBar value={step + 1} max={4} height={4} /></div>
      <Body gap={20} pad="16px 20px 12px">
        <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>지난 알림 이후, 얼마나 그렇게 느꼈는지 골라 주세요</div>
        {qs.map((q, i) => (
          <div key={i}>
            <div style={{ font: 'var(--text-body1)', display: 'flex', gap: 8 }}>
              <span style={{ color: ans[step + '-' + i] === undefined ? 'var(--color-primary)' : 'var(--text-weak)', fontVariantNumeric: 'tabular-nums' }}>{'Q' + (step * 5 + i + 1)}</span>
              <span style={{ flex: 1 }}>{q}</span>
            </div>
            <Likert value={ans[step + '-' + i]} onPick={(v) => setAns({ ...ans, [step + '-' + i]: v })} />
          </div>
        ))}
      </Body>
      <CTA label={step < 3 ? '다음' : '제출하기'} disabled={!allAnswered} onClick={() => (step < 3 ? setStep(step + 1) : onDone())} sub={allAnswered ? null : '모든 문항에 답하면 넘어갈 수 있어요'} />
      {exit ? (
        <Dialog title="설문을 그만할까요?" body={'지금 그만두면 응답이 저장되지 않고\n이번 회차 보상 250원도 받을 수 없어요.'}
          primary="계속 응답하기" secondary="그만하기" onPrimary={() => setExit(false)} onSecondary={onExit} />
      ) : null}
    </>
  );
}
function SurveyDone({ onHome, today, total }) {
  return (
    <>
      <StatusBar />
      <Body gap={12}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '56px 0 16px' }}>
          <span style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--reward-coin-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="coins" size={34} color="var(--reward-coin)" />
          </span>
          <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)' }}>250원이 적립됐어요</div>
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)' }}>설문에 참여해 주셔서 감사해요</div>
        </div>
        <Card padding={'8px 20px'}>
          <ListRow title="오늘 적립액" right={<Amount value={today} size="md" />} />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <ListRow title="총 누적액" right={<Amount value={total} size="md" />} />
        </Card>
        <Card padding={'16px 20px'} style={{ background: 'var(--color-primary-tint)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="bell" size={18} color="var(--color-primary)" />
            <span style={{ font: 'var(--text-body2)', color: 'var(--text-body)' }}>다음 설문은 <b style={{ color: 'var(--color-primary)' }}>18:00</b>에 열려요. 알림으로 알려드릴게요.</span>
          </div>
        </Card>
      </Body>
      <CTA label="홈으로" onClick={onHome} />
    </>
  );
}

/* ────────── 4. 음성 발화 과제 플로우 ────────── */
function VoiceReady({ go, onBack }) {
  return (
    <>
      <NavHeader title="음성 대화 과제" close onBack={onBack} />
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
      <CTA label="대화 시작하기" onClick={() => go('voiceRec')} sub="완료하면 500원이 적립돼요" />
    </>
  );
}
function VoiceRecording({ go, onBack }) {
  const [sec, setSec] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setSec((s) => (s >= 120 ? 120 : s + 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mmss = String(Math.floor(sec / 60)) + ':' + String(sec % 60).padStart(2, '0');
  const enough = sec >= 20;
  return (
    <>
      <NavHeader title="음성 대화 과제" close onBack={onBack} right={<Chip tone="danger"><span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--color-danger)' }} />REC</Chip>} />
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
          <ProgressRing percent={Math.round((sec / 120) * 100)} size={148} color="var(--color-success)">
            <div style={{ textAlign: 'center' }}>
              <div style={{ font: '700 26px/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}>{mmss}</div>
              <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 4 }}>최대 2:00</div>
            </div>
          </ProgressRing>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: 'var(--text-caption)', color: enough ? 'var(--color-success)' : 'var(--text-weak)' }}>
            <Icon name={enough ? 'check' : 'timer'} size={14} color={enough ? 'var(--color-success)' : 'var(--text-weak)'} />{enough ? '최소 시간을 채웠어요 — 지금 마쳐도 돼요' : `최소 ${20 - sec}초 더 이야기해 주세요`}
          </div>
        </div>
      </Body>
      <CTA label="녹음 완료" disabled={!enough} onClick={() => go('voiceDone')} sub="말이 3초 이상 끊기면 안내를 드려요" />
    </>
  );
}
function VoiceDone({ onHome, today }) {
  return (
    <>
      <StatusBar />
      <Body gap={12}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '48px 0 12px' }}>
          <span style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--reward-coin-weak)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="party-popper" size={34} color="var(--reward-coin)" />
          </span>
          <div style={{ font: 'var(--text-display)', letterSpacing: 'var(--tracking-tight)' }}>500원이 적립됐어요</div>
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)' }}>음성 과제를 완료했어요</div>
        </div>
        <Card padding={'8px 20px'}>
          <ListRow title="오늘 적립액" right={<Amount value={today} size="md" />} />
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <ListRow title="다음 참여일" right={<span style={{ font: 'var(--text-body1)', fontVariantNumeric: 'tabular-nums' }}>9월 7일 (월)</span>} />
        </Card>
      </Body>
      <CTA label="홈으로" onClick={onHome} />
    </>
  );
}

/* ────────── 루트 프로토타입 ────────── */
export function Prototype() {
  const [screen, setScreen] = React.useState('account');
  const [done, setDone] = React.useState({ 0: true });
  const [voiceDone, setVoiceDone] = React.useState(false);
  const [round, setRound] = React.useState(1);
  const go = (s) => setScreen(s);
  const doneCount = Object.values(done).filter(Boolean).length;
  const today = doneCount * 250 + (voiceDone ? 500 : 0);
  const total = 3000 + today;

  let content;
  switch (screen) {
    case 'account': content = <ScrAccount go={go} />; break;
    case 'pairing': content = <ScrPairing go={go} />; break;
    case 'permissions': content = <ScrPermissions go={go} />; break;
    case 'emaTime': content = <ScrEmaTime go={go} />; break;
    case 'ready': content = <ScrReady go={go} />; break;
    case 'home': content = <MainApp done={done} voiceDone={voiceDone}
      onStartSurvey={(i) => { setRound(i); go('survey'); }}
      onStartVoice={() => go('voiceReady')}
      onWithdraw={() => { setDone({ 0: true }); setVoiceDone(false); go('account'); }} />; break;
    case 'survey': content = <SurveyFlow onDone={() => { setDone((d) => ({ ...d, [round]: true })); go('surveyDone'); }} onExit={() => go('home')} />; break;
    case 'surveyDone': content = <SurveyDone onHome={() => go('home')} today={today} total={total} />; break;
    case 'voiceReady': content = <VoiceReady go={go} onBack={() => go('home')} />; break;
    case 'voiceRec': content = <VoiceRecording go={go} onBack={() => go('home')} />; break;
    case 'voiceDone': content = <VoiceDone onHome={() => { setVoiceDone(true); go('home'); }} today={doneCount * 250 + 500} />; break;
    default: content = <ScrAccount go={go} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--wz-gray-200)', padding: 24, fontFamily: 'var(--font-sans)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-body)' }}>
      <ScreenJump current={screen} onJump={go} />
      <div style={{ position: 'relative', width: 390, height: 844, maxHeight: '96vh', background: 'var(--surface-bg)', borderRadius: 40, overflow: 'hidden', outline: '1px solid var(--wz-gray-300)', display: 'flex', flexDirection: 'column' }}>
        {content}
        <ToastHost />
      </div>
    </div>
  );
}

/* 화면 점프 메뉴 — 모든 화면 직접 이동 (프로토타입 네비게이션) */
const SCREEN_LIST = [
  ['온보딩', [['account', '1 · 계정 생성'], ['pairing', '2 · 링 페어링'], ['permissions', '3 · 권한 요청'], ['emaTime', '4 · EMA 시간 설정'], ['ready', '5 · 준비 완료']]],
  ['메인', [['home', '홈 · 누적보상 · 기기 · 설정']]],
  ['EMA 설문', [['survey', '설문 4단계'], ['surveyDone', '설문 완료 · 보상']]],
  ['음성 과제', [['voiceReady', '준비'], ['voiceRec', '녹음 중'], ['voiceDone', '완료 · 보상']]],
];
function ScreenJump({ current, onJump }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const on = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', on);
    return () => document.removeEventListener('mousedown', on);
  }, [open]);
  return (
    <div ref={ref} style={{ position: 'fixed', top: 16, right: 16, zIndex: 100 }}>
      <button onClick={() => setOpen((o) => !o)} style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', borderRadius: 999, background: open ? 'var(--color-primary)' : 'var(--surface-card)', color: open ? '#fff' : 'var(--text-sub)', font: '600 13px/1 var(--font-sans)', boxShadow: '0 1px 2px rgba(25,31,40,.08)' }}>
        <Icon name="layout-grid" size={14} color={open ? '#fff' : 'var(--text-sub)'} />화면 이동
      </button>
      {open ? (
        <div style={{ position: 'absolute', top: 42, right: 0, width: 240, background: 'var(--surface-card)', borderRadius: 14, boxShadow: '0 8px 32px rgba(25,31,40,.18)', padding: 8, display: 'flex', flexDirection: 'column', gap: 4, maxHeight: '80vh', overflowY: 'auto' }}>
          {SCREEN_LIST.map(([group, items]) => (
            <div key={group}>
              <div style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--text-weak)', padding: '8px 10px 4px' }}>{group}</div>
              {items.map(([key, label]) => (
                <button key={key} onClick={() => { onJump(key); setOpen(false); }} style={{ border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, font: '500 13px/1.3 var(--font-sans)', background: current === key ? 'var(--color-primary-weak)' : 'transparent', color: current === key ? 'var(--color-primary)' : 'var(--text-body)' }}>{label}</button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
