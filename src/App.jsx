import React from 'react';
import { Home } from './Home.jsx';
import { AppScreens } from './Screens.jsx';

/* 홈(인터랙티브) 기본 · #/screens 전체 화면 갤러리 */
function useHashRoute() {
  const [hash, setHash] = React.useState(window.location.hash);
  React.useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

const linkStyle = {
  position: 'fixed', top: 16, right: 16, zIndex: 50,
  display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px',
  borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', color: 'var(--text-sub)',
  font: '600 13px/1 var(--font-sans)', textDecoration: 'none',
  boxShadow: '0 1px 2px rgba(25,31,40,.08)',
};

function PhoneFrame({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--wz-gray-200)', padding: 24 }}>
      <div style={{ width: 390, height: 844, maxHeight: '96vh', background: 'var(--surface-bg)', borderRadius: 40, overflow: 'hidden', outline: '1px solid var(--wz-gray-300)' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const hash = useHashRoute();
  const screens = hash.startsWith('#/screens');
  return (
    <>
      <a href={screens ? '#/' : '#/screens'} style={linkStyle}>
        {screens ? '홈으로' : '전체 화면 보기'}
      </a>
      {screens ? <AppScreens /> : <PhoneFrame><Home /></PhoneFrame>}
    </>
  );
}
