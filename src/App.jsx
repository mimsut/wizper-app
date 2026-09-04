import React from 'react';
import { Prototype } from './Prototype.jsx';
import { AppScreens } from './Screens.jsx';

/* 프로토타입(온보딩→메인) 기본 · #/screens 전체 화면 갤러리 */
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
  position: 'fixed', top: 16, right: 16, zIndex: 100,
  display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px',
  borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', color: 'var(--text-sub)',
  font: '600 13px/1 var(--font-sans)', textDecoration: 'none',
  boxShadow: '0 1px 2px rgba(25,31,40,.08)',
};

export default function App() {
  const hash = useHashRoute();
  const screens = hash.startsWith('#/screens');
  return (
    <>
      <a href={screens ? '#/' : '#/screens'} style={linkStyle}>
        {screens ? '프로토타입 시작' : '전체 화면 보기'}
      </a>
      {screens ? <AppScreens /> : <Prototype key="proto" />}
    </>
  );
}
