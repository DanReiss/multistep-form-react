import React from "react";

function StepsViewBar({stepsMap}) {

  const {numberOfSteps, currentStep} = stepsMap();

  let itemClass = (i) => {
    if(i === currentStep) return "current";
    if(i === currentStep - 1) return "done last_done"
    if(i < currentStep) return "done";
    return;
  }

  const steps = Array.from({
    length: numberOfSteps}, 
    (_, i) =>{
      <li key={i} className={itemClass(i)}> 
      <span>{i + 1}</span>
    </li>
    }
  )

  return(
    <ul className="steps_bar">
      {
        Array.from({ length: numberOfSteps},  (_, i) =>{
          return (
            <li key={i} className={itemClass(i)}> 
              <span>{i + 1}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

export default React.memo(StepsViewBar);