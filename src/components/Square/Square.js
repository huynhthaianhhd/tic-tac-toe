import React from "react";
import "./Square.css";

export default function Square(props) {
  let className = 'square' + (props.squareAt === props.currentIndex ? ' current' : '');
  className = className + (props.highlight ? ' highlight' : '');
  console.log('class',className);
  return (
    <button className={className} onClick={props.onClick} style={{color: (props.value === 'O'? 'red':'blue')}}>
      {props.value}
    </button>
  );
}

