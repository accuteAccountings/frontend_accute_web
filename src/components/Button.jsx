import React from "react";

export default function Button({ type, children,onHandleClick }) {
  return (
    <button
      className={
        (type === "green" && "green_btn btn") ||
        (type === "red" && "red_btn btn") ||
        (type === "blue" && "blue_btn btn")
      }
      onClick={onHandleClick}
    >
      {children}
    </button>
  );
}
