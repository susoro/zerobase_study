;(function () {
  'use strict' // 엄격 모드 사용: 자바스크립트의 오류를 더 엄격하게 체크합니다.

  // DOM 요소를 선택하는 헬퍼 함수
  const get = (target) => {
    return document.querySelector(target)
  }
  const $todos = get('.todos') // .todos 클래스를 가진 요소를 선택

  // 할 일(todo) 요소를 생성하는 함수
  const createTodoElement = (item) => {
    const { id, content } = item // item 객체에서 id와 content를 구조 분해 할당
    const $todoItem = document.createElement('div') // 새로운 div 요소 생성
    $todoItem.classList.add('item') // 'item' 클래스를 추가
    $todoItem.dataset.id = id // 데이터 속성에 id를 설정
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' 
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `
    return $todoItem // 생성된 할 일 요소를 반환
  }

  // 모든 할 일을 렌더링하는 함수
  const renderAllTodos = (todos) => {
    $todos.innerHTML = '' // 기존 내용을 비웁니다.
    todos.forEach((item) => {
      const todoElement = createTodoElement(item) // 각 할 일 아이템에 대해 요소를 생성
      $todos.appendChild(todoElement) // 생성된 요소를 .todos 요소에 추가
    })
  }

  // 할 일 목록을 서버에서 가져오는 함수
  const getTodos = () => {
    fetch('http://localhost:3000/todos') // 서버에 GET 요청을 보냅니다.
    .then((response) => response.json()) // 응답을 JSON 형태로 변환
    .then((todos) => {renderAllTodos(todos)}) // 변환된 데이터를 이용해 모든 할 일을 렌더링
    .catch(error => console.error(error)) // 오류가 발생하면 콘솔에 출력   
  }

  // 초기화 함수 (현재는 아무 작업도 하지 않음)
  const init = () => {}
  
  // DOMContentLoaded 이벤트가 발생하면 getTodos 함수를 호출
  window.addEventListener('DOMContentLoaded',() =>{
    getTodos()
  })
  
  init() // 초기화 함수 호출 (현재는 아무 작업도 하지 않음)
})()
/*

DOMContentLoaded 이벤트가 발생하면 getTodos 함수를 호출하여 서버에서 할 일 목록을 가져옵니다.
가져온 데이터를 이용해 할 일 항목들을 생성하고 화면에 렌더링합니다.
각 할 일 항목에는 체크박스, 수정 및 삭제 버튼, 수정 확인 및 취소 버튼이 포함되어 있습니다.
*/ 