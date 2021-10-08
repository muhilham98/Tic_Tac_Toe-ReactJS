import React from "react";

export default function Cell(props) {
  return (
    <div>
      <button className="btn" onClick={() => props.click()}>
        {props.render}
      </button>
    </div>
  );
}
