import './App.css'

const branches = [
  {
    name: 'react00-es6',
    title: 'ES6+ 기초',
    topics: ['var / let / const', '화살표 함수', '템플릿 리터럴', '구조 분해 할당', '스프레드 연산자', '클래스', 'ES 모듈 (import / export)'],
  },
  {
    name: 'react01--component',
    title: '컴포넌트 & Props',
    topics: ['함수형 컴포넌트 작성', 'Props 전달 및 사용', '컴포넌트 분리 및 재사용', 'VideoCard / VideoList 실습'],
  },
  {
    name: 'react02-jsx',
    title: 'JSX 문법',
    topics: ['JSX 표현식 사용법', '조건부 렌더링', '인라인 스타일 / CSS 클래스', '이벤트 핸들링 기초'],
  },
  {
    name: 'react03-classComponent',
    title: '클래스형 컴포넌트',
    topics: ['클래스형 컴포넌트 구조', 'state 관리', '생명주기 메서드 (Lifecycle)', 'Comment / CommentList 실습'],
  },
  {
    name: 'react04-hooks',
    title: 'React Hooks',
    topics: ['useState — 상태 관리, 배치 업데이트, 폼 처리', 'useRef — DOM 접근, 스크롤 제어', 'useEffect — 의존성 배열, 클린업', 'useMemo — 연산 결과 메모이제이션', 'useCallback — 함수 메모이제이션', 'useContext — 전역 상태 공유 (ThemeContext, UserContext)', '커스텀 훅 — useInput, useToggle'],
  },
  {
    name: 'react05-reactRouterDOM',
    title: 'React Router DOM',
    topics: ['BrowserRouter / Routes / Route 설정', 'Link를 이용한 페이지 이동', 'useParams — URL 파라미터 처리', '404 Not Found 처리'],
  },
  {
    name: 'react06-zustand',
    title: 'Zustand 상태 관리',
    topics: ['Zustand store 생성 및 사용', '카운터 전역 상태 관리', 'Todo 리스트 CRUD', '다크모드 테마 전환', 'styled-components + ThemeProvider 연동'],
  },
  {
    name: 'react07-async',
    title: '비동기 처리',
    topics: ['Promise / async-await', 'fetch API 사용법', 'Axios HTTP 요청', '비동기 에러 처리'],
  },
  {
    name: 'react08-etc1',
    title: 'styled-components & 기타',
    topics: ['styled-components 기본 사용법', 'ThemeProvider 다크/라이트 모드', 'GlobalStyle 전역 스타일', 'react-toastify 알림', 'json-server 간단 백엔드', 'ESLint / Prettier 설정'],
  },
]

function App() {
  return (
    <div className="guide">
      <header className="guide-header">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
        <img src="/src/assets/react.svg" className="logo react" alt="React logo" />
        <h1>React 학습 프로젝트</h1>
        <p className="guide-desc">각 브랜치에서 주제별 학습 예제를 확인하세요.</p>
        <code className="guide-cmd">git checkout &lt;브랜치명&gt;</code>
      </header>

      <div className="branch-grid">
        {branches.map((b) => (
          <div key={b.name} className="branch-card">
            <div className="branch-name">{b.name}</div>
            <h2 className="branch-title">{b.title}</h2>
            <ul className="branch-topics">
              {b.topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
