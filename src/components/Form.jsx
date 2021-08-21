import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  // Add押したとき実行
  function handleSubmit(e) {
    // リンク先への遷移を抑制
    e.preventDefault();
    // trimはその文字列の空白を削除する
    // 文字列が空白の時のみ実行
    if (!name.trim()) {
      // 空白なら終了
      return;
    }
    // 文字入力されている時のみ実行
    // つまり入力されていたら、入力欄を消す
    props.addTask(name);
    setName("");
  }

  function handleChange(e) {
    // input 内で登場
    // input 内の文字が変わるたびにそれを取得して
    // setName に代入
    setName(e.target.value);
  }

  return (
    // 送信した時 この関数を実行
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        // 入力欄が変わる都度 関数を実行
        onChange={handleChange}
      />

      <button
        // このボタンを押すと submit 送信になる
        type="submit"
        className="btn btn__primary btn__lg"
      >
        Add
      </button>
    </form>
  );
}

export default Form;
