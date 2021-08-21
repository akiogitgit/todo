import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

function usePrevious(value) {
  // ref 属性を取得
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  // わかんない
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // 消すボタン 使うのはid
  function deleteTask(id) {
    // filter関数は 条件に一致した配列を返す
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // 編集ボタン 使うのはid, newName
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //スプレッド
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // return 内に書くと長いので{taskList}だけで表示できる
  // Activeボタン
  // index.js のデータを props の配列として使う
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      //それぞれの状態を渡している
      completed={task.completed}
      // key 使わないと怒られる
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    // ここで nanoid()を使わないと固有の Id を取得できない？？
    // 最初がtodo- に nanoidによって生成された一意の文字列を追加
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    // スプレッド構文！ 既存の配列をコピーし、最後にオブジェクトを追加
    setTasks([...tasks, newTask]);
  }

  //taskNoun に タスクの数が1個なら task を違うなら tasksを代入
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  // tasksNoun をなんか使ってる
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      {/* role タグはタグがどのような要素を表しているのかを説明 */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* 上でTodoを定義した定数
         */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
