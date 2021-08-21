import React from "react";

// Complete ボタン
function FilterButton(props) {
  return (
    // button のオプション
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      // 更新
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
