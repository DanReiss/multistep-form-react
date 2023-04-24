import React from "react";

function StepsViewBar({stepsMap}){

  const [steps, currentStep] = stepsMap();

  let itemClass = (i) => {
    if(i === currentStep) return "current";
    if(i < currentStep) return "done";
    return ""
  }

  return(
    <ul className="steps_bar">
      {
      Array(steps.length)
      .fill()
      .map((_, i)=>{


        return <li key={i} className={itemClass(i)}>{i + 1}</li>
      })
      }
    </ul>
  )
}

export default StepsViewBar