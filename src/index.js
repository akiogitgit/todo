import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// task"s" という名前の props で渡すデータ
// 初期値
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

ReactDOM.render(
  <React.StrictMode>
    {/* いつもと同じで、 App.js に tasks を渡している */}
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById("root")
);
