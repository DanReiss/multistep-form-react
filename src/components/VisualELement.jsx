import React from "react";

function VisualEl({names}) { 

  if(!names) return;

  return (
    <>
      {names.map((name)=> {
        return <div className={name} key={name}></div>
      })}
    </>
  );
};

export default VisualEl;