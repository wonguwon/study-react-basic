# React 학습 프로젝트

React의 핵심 개념을 단계별로 학습하기 위한 실습 프로젝트입니다.  
각 주제는 **별도의 브랜치**로 관리되며, 브랜치를 전환하며 예제를 확인할 수 있습니다.

---

## 학습 브랜치 목록

| 브랜치 | 주제 | 주요 내용 |
|--------|------|-----------|
| `react00-es6` | ES6+ 기초 | var/let/const, 화살표 함수, 구조 분해 할당, 스프레드, 클래스, 모듈 |
| `react01--component` | 컴포넌트 & Props | 함수형 컴포넌트, Props 전달, 컴포넌트 재사용, VideoCard/VideoList 실습 |
| `react02-jsx` | JSX 문법 | JSX 표현식, 조건부 렌더링, 인라인 스타일, 이벤트 핸들링 기초 |
| `react03-classComponent` | 클래스형 컴포넌트 | 클래스 컴포넌트 구조, state, 생명주기(Lifecycle) 메서드 |
| `react04-hooks` | React Hooks | useState, useRef, useEffect, useMemo, useCallback, useContext, 커스텀 훅 |
| `react05-reactRouterDOM` | React Router DOM | BrowserRouter, Routes/Route, Link, useParams, 404 처리 |
| `react06-zustand` | Zustand 상태 관리 | 전역 store, 카운터/투두리스트 CRUD, 다크모드, styled-components 연동 |
| `react07-async` | 비동기 처리 | Promise, async/await, fetch API, Axios |
| `react08-etc1` | styled-components & 기타 | ThemeProvider, GlobalStyle, react-toastify, json-server, ESLint/Prettier |

---

## 빠른 시작

### 브랜치 전환

```bash
# 원하는 브랜치로 전환
git checkout react04-hooks

# 의존성 설치 (브랜치마다 package.json이 다를 수 있음)
npm install

# 개발 서버 시작
npm run dev
```

> 브라우저에서 http://localhost:5173 으로 확인

---

## 브랜치별 상세 내용

### react00-es6 — ES6+ 기초

React를 시작하기 전에 필요한 자바스크립트 문법을 정리합니다.

```
01_variable.js                  # var, let, const 차이
02_function.js                  # 화살표 함수, 기본 매개변수
03_template_destructuring_spread.js  # 템플릿 리터럴, 구조 분해, 스프레드
04_loop.js                      # for...of, forEach, map, filter
05_class.js                     # 클래스 문법
06_module/                      # import / export
```

---

### react01--component — 컴포넌트 & Props

```jsx
// 함수형 컴포넌트와 Props 전달 기초
function VideoCard({ video }) {
  return <div>{video.title}</div>
}
```

- `Hello.jsx`, `World.jsx`: 기본 컴포넌트 구조
- `VideoCard.jsx`, `VideoList.jsx`: Props를 활용한 카드/리스트 UI

---

### react02-jsx — JSX 문법

- JSX 안에서 자바스크립트 표현식 사용 (`{}`)
- 조건부 렌더링 (`&&`, 삼항 연산자)
- `className`, 인라인 스타일 적용
- `JavaScript.jsx`, `Style.jsx` 예제

---

### react03-classComponent — 클래스형 컴포넌트

```jsx
class LifecycleDemo extends React.Component {
  componentDidMount()  { /* 마운트 시 */ }
  componentDidUpdate() { /* 업데이트 시 */ }
  componentWillUnmount() { /* 언마운트 시 */ }
}
```

- `Comment.jsx`, `CommentList.jsx`: Props & 렌더링 실습
- `LifecycleDemo.jsx`: 생명주기 메서드 흐름 확인

---

### react04-hooks — React Hooks ⭐

가장 핵심적인 학습 브랜치입니다.

#### useState
```jsx
const [num, setNum] = useState(0);

// 배치 업데이트 주의 (두 번 호출해도 +1만 됨)
setNum(num + 1); setNum(num + 1);  // → +1

// 이전 상태 기반 업데이트 (안전한 방법)
setNum(prev => prev + 1); setNum(prev => prev + 1);  // → +2
```

#### useRef
```jsx
const inputRef = useRef(null);
inputRef.current.focus();  // DOM 직접 접근
```

#### useEffect
```jsx
useEffect(() => { /* 매 렌더링마다 */ });
useEffect(() => { /* 마운트 1회만 */ }, []);
useEffect(() => { /* name 변경 시 */ }, [name]);
useEffect(() => { return () => { /* 클린업 */ }; }, [name]);
```

#### useMemo / useCallback
```jsx
const result = useMemo(() => heavyCalc(data), [data]);
const handler = useCallback(() => doSomething(id), [id]);
```

#### useContext
```jsx
// ThemeContext, UserContext를 활용한 전역 데이터 공유
const theme = useContext(ThemeContext);
```

#### 커스텀 훅
```jsx
// useInput, useToggle — 반복 로직을 훅으로 추상화
const [value, onChange] = useInput('');
const [isOn, toggle] = useToggle(false);
```

---

### react05-reactRouterDOM — React Router

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/"                 element={<Home />} />
    <Route path="/about"            element={<About />} />
    <Route path="/profile/:username" element={<Profile />} />
    <Route path="*"                 element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

### react06-zustand — Zustand 상태 관리

```jsx
// store 생성
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// 컴포넌트에서 사용
const count = useCounterStore((state) => state.count);
```

- 카운터, 투두리스트(CRUD), 다크모드 테마 전환 예제
- `styled-components` + `ThemeProvider` 연동

---

### react07-async — 비동기 처리

```js
// fetch API
const res = await fetch('/api/data');
const data = await res.json();

// Axios
const { data } = await axios.get('/api/data');
```

---

### react08-etc1 — styled-components & 기타

```jsx
// styled-components 기본
const Box = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// 전역 스타일
const GlobalStyle = createGlobalStyle`
  body { margin: 0; font-family: 'Segoe UI', sans-serif; }
`;
```

- `react-toastify`로 알림(toast) 구현
- `json-server`로 간단한 REST API 백엔드
- `.eslintrc.js`, `.prettierrc` 코드 품질 관리

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| UI 라이브러리 | React 19 |
| 빌드 도구 | Vite 6 |
| 스타일링 | CSS, styled-components 6 |
| 상태 관리 | React Hooks, Zustand |
| 라우팅 | React Router DOM |
| HTTP 클라이언트 | fetch API, Axios |
| 코드 품질 | ESLint, Prettier |
| 간이 백엔드 | json-server |

---

## 학습 순서 추천

```
react00-es6
    ↓
react01--component
    ↓
react02-jsx
    ↓
react03-classComponent
    ↓
react04-hooks  ← 핵심
    ↓
react05-reactRouterDOM
    ↓
react06-zustand
    ↓
react07-async
    ↓
react08-etc1
```
