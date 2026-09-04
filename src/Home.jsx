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

const EMA = [
  { time: '10:00', icon: 'sun' },
  { time: '14:00', icon: 'sun-medium' },
  { time: '18:00', icon: 'sunset' },
  { time: '22:00', icon: 'moon' }
];
const cap = (s) => <span style={{ font: 'var(--text-caption)', color: 'var(--text-sub)' }}>{s}</span>;

function SectionTitle({ children, extra }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
      <div style={{ font: 'var(--text-heading)', letterSpacing: 'var(--tracking-body)' }}>{children}</div>
      {extra}
    </div>
  );
}

export function Home() {
  const [tab, setTab] = React.useState(0);
  const [done, setDone] = React.useState({ 0: true });
  const nowIdx = 1; // 14:00 회차가 열려 있는 시점
  const doneCount = Object.values(done).filter(Boolean).length;
  const today = doneCount * 250;
  const total = 3000 + today;
  const percent = Math.round((doneCount / 5) * 100);

  const rowRight = (i) => {
    if (done[i]) return <Chip tone="success"><Icon name="check" size={12} />완료</Chip>;
    if (i === nowIdx) return <Button size="sm" onClick={() => setDone({ ...done, [i]: true })}>참여하기</Button>;
    return <Chip tone="neutral">{parseInt(EMA[i].time) + '시에 열려요'}</Chip>;
  };

  const home = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0 4px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)' }}>안녕하세요, WPR-135님</div>
          <div style={{ font: 'var(--text-body2)', color: 'var(--text-sub)', marginTop: 2 }}>오늘도 소중한 참여 부탁드려요</div>
        </div>
        <Icon name="bell" size={22} color="var(--text-sub)" style={{ marginTop: 4 }} />
      </div>

      <Card padding={20}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {cap('오늘 적립액')}<Icon name="info" size={13} color="var(--text-weak)" />
        </div>
        <div style={{ marginTop: 2, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <Amount value={today} size="display" />
          {doneCount > 1 ? <Chip tone="coin">+250원</Chip> : null}
        </div>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 4 }}>매일 자정에 총 누적액으로 옮겨져요</div>
        <div style={{ height: 1, background: 'var(--divider)', margin: '14px 0 10px' }} />
        <div onClick={() => setTab(1)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ font: 'var(--text-body1)', color: 'var(--text-body)', flex: 1 }}>총 누적액</span>
          <Amount value={total} size="lg" />
          <Icon name="chevron-right" size={18} color="var(--text-weak)" style={{ marginLeft: 4 }} />
        </div>
      </Card>

      <Card padding={'16px 20px'} onClick={() => {}} style={{ background: 'var(--color-primary-tint)' }}>
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
          left={<Icon name="mic" size={20} color="var(--text-weak)" />}
          title={<span style={{ fontVariantNumeric: 'tabular-nums' }}>22:00 음성 발화 과제</span>}
          subtitle="2분 이내 · 500원"
          right={<Chip tone="neutral">22시에 열려요</Chip>}
          muted
        />
      </Card>

      <Card padding={20}>
        <SectionTitle>오늘의 진행</SectionTitle>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 8 }}>
          <ProgressRing percent={percent}><span style={{ font: '700 18px/1 var(--font-sans)' }}>{percent}%</span></ProgressRing>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: '자기보고 설문', n: doneCount, of: 4, v: today, max: 1000 },
              { name: '음성 발화 과제', n: 0, of: 1, v: 0, max: 500 },
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

      <Card padding={20}>
        <SectionTitle extra={cap('2026년 9월')}>참여 현황</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', textAlign: 'center', rowGap: 6, marginTop: 8 }}>
          {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
            <div key={d} style={{ font: 'var(--text-micro)', color: 'var(--text-weak)' }}>{d}</div>
          ))}
          {[{ d: 30, s: 'done' }, { d: 31, s: 'done' }, { d: 1, s: 'today' }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }].map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{
                width: 32, height: 32, borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                font: (c.s === 'today' ? '700' : '500') + ' 14px/1 var(--font-sans)', fontVariantNumeric: 'tabular-nums',
                background: c.s === 'today' ? 'var(--color-primary)' : c.s === 'done' ? 'var(--color-primary-weak)' : 'transparent',
                color: c.s === 'today' ? '#fff' : c.s === 'done' ? 'var(--color-primary)' : 'var(--text-sub)'
              }}>{c.d}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 12, font: 'var(--text-micro)', color: 'var(--text-weak)', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--color-primary-weak)' }}></span>참여 완료</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--color-primary)' }}></span>오늘</span>
        </div>
      </Card>
    </div>
  );

  const rewards = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 24px' }}>
      <div style={{ font: 'var(--text-title)', letterSpacing: 'var(--tracking-tight)', padding: '12px 0 4px' }}>누적 보상</div>
      <Card padding={20}>
        {cap('총 누적액')}
        <div style={{ marginTop: 2 }}><Amount value={total} size="display" /></div>
        <div style={{ font: 'var(--text-micro)', color: 'var(--text-weak)', marginTop: 4 }}>연구 종료 후 일괄 지급돼요</div>
      </Card>
      <Card padding={'8px 20px'}>
        {[{ d: '9월 1일 (화)', v: today, n: doneCount + '회 참여' }, { d: '8월 31일 (월)', v: 1750, n: '5회 참여 · 보너스 포함' }, { d: '8월 30일 (일)', v: 1250, n: '4회 참여' }].map((r, i) => (
          <React.Fragment key={r.d}>
            {i > 0 ? <div style={{ height: 1, background: 'var(--divider)' }} /> : null}
            <ListRow title={r.d} subtitle={r.n} right={<Amount value={r.v} size="md" />} />
          </React.Fragment>
        ))}
      </Card>
    </div>
  );

  const placeholder = (label, icon) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '120px 20px', color: 'var(--text-weak)' }}>
      <Icon name={icon} size={32} color="var(--text-disabled)" />
      <div style={{ font: 'var(--text-body2)' }}>{label} 화면은 준비 중이에요</div>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--surface-bg)', fontFamily: 'var(--font-sans)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-body)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 0', font: '600 14px/1 var(--font-sans)' }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>2:01</span>
        <span style={{ display: 'inline-flex', gap: 5 }}>
          <Icon name="signal" size={14} color="var(--text-strong)" />
          <Icon name="wifi" size={14} color="var(--text-strong)" />
          <Icon name="battery-medium" size={16} color="var(--text-strong)" />
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 0 ? home : tab === 1 ? rewards : tab === 2 ? placeholder('기기 연결', 'watch') : placeholder('설정', 'settings')}
      </div>
      <BottomNav
        items={[{ icon: 'house', label: '홈' }, { icon: 'coins', label: '누적 보상' }, { icon: 'watch', label: '기기 연결' }, { icon: 'settings', label: '설정' }]}
        activeIndex={tab} onChange={setTab}
      />
    </div>
  );
}
