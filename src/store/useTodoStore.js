import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  filter: 'all', // all, active, completed
  addTodo: (text) => 
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }]
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    })),
  setFilter: (filter) => set({ filter }),
  getFilteredTodos: () => {
    const { todos, filter } = useTodoStore.getState();
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
}));

export default useTodoStore; 


1. 직접 원인 — getFilteredTodos가 선언된 적이 없음

TodoList.jsx:65

const todos = getFilteredTodos();

TodoList.jsx:60-63을 보면 나머지는 전부 스토어에서 꺼내 씁니다.

const filter = useTodoStore(state => state.filter)
const setFilter = useTodoStore(state => state.setFilter)
const toggleTodo = useTodoStore(state => state.toggleTodo)
const deleteTodo = useTodoStore(state => state

그런데 getFilteredTodos만 이 과정이 빠졌습니다. 스토어 안에 정의돼 있어도 컴포넌트 스코프에는 아무 것도 없는 그냥 미선언 별자라서, 평가 시점에 ReferenceError가 납니  트가 그 값을 가져오는 것은 별개입니다.

기대되는 수정:
const getFilteredTodos = useTodoStore(state => state.getFilteredTodos)                                                   
2. 그런데 위 수정만으로는 안 됩니다 — 스토어 정의 자체가 깨져 있음                                                       
useTodoStore.js:4-43의 괄호 구조를 보세요.                                                                               
create((set) => (
    persist({ ...상태와 액션들... }),   // ← 여기서 persist( 가 닫히고 쉼표                                                { name: "todo-storage", partialize }  // ←
))
                                                                                                                         살표 함수의 본문이 (A, B) 형태의 쉼표 연산자로:

- persist(...)는 상태 객체를 config 자리에 받은 채 호출만 되고 반환값은 버려집니다 (initializer로 실행되지 않으니 에러도 안 남).
- 쉼표 연산자는 마지막 값을 반환하므로, 스토어의 실제 state는 { name: "todo-storage", partialize: fn }이 됩니다.
- 즉 todos, filter, setFilter, toggleTodo, deleteTodo, addTodo, getFilteredTodos가 **전부 undefined**입니다.              - persist 미들웨어도 적용되지 않아 localStorag다.

그래서 1번만 고치면 다음 에러가 TypeError: getFilteredTodos is not a function으로 바뀌고, "추가" 버튼을 누르면 addTodo is not a function이 납니다.
                                                                                                                          올바른 형태는 persist가 initializer를 감싸는
                                                                                                                          const useTodoStore = create(
  persist(
    (set, get) => ({ ...상태와 액션들... }),   // ← 1번 인자: 함수                                                            { name: "todo-storage", partialize: ... }
  )
)
                                                                                                                          추가로 스토어 내부에서는 useTodoStore.getStatet()을 쓰는 게 맞습니다 (자기 자신을 참조하는순환을 피함).                                                                                                             
3. 1, 2번을 고쳐도 남는 문제 — 목록이 갱신되지 않음                                                                       
getter 방식의 파생 상태에는 구독 함정이 있습니다. TodoList는 filter와 액션 함수들만 구독하고 todos는 구독하지 않습니다. getFilteredTodos()는 getState()로 최신 값을 읽지만, 그건 "렌더가 일어났을 때" 얘기입니다. TodoIput에서 할 일을 추가하거나 toggle/delete로 todos가 바뀌어도 TodoList를 리 그대로 멈춥니다.

권장 방향은 렌더 중에 스토어 getter를 호출하지 말고, 컴포넌트에서 원본 상태를 구독한 뒤 직접 파생시키는 것입니다.

const todos = useTodoStore(state => state.todos)
const filter = useTodoStore(state => state.filter)
const visibleTodos = useMemo(() => { /* filterfilter])

새 배열을 만드는 셀렉터(state => state.todos.filter(...))를 그대로 쓰면 매 렌더마다 참조가 달라져 무한 렌더가 날 수 있으니, 거르는 작업은 셀렉터 밖(useMemo)에서 하는 편이 안전합니다.

정리: 에러 메시지는 65번 줄을 가리키지만 근본 원인은 스토어의 create/persist 괄호 구조이고, 셀렉터 누락은 그 위에 얹힌 두 번째 문제입니다.