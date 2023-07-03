import React from "react";

function StepsViewBar({stepsMap}) {

  const [steps, currentStep] = stepsMap();

  let itemClass = (i) => {
    if(i === currentStep) return "current";
    if(i === currentStep - 1) return "done last_done"
    if(i < currentStep) return "done";
    return;
  }

  return(
    <ul className="steps_bar">
      {
        steps.map((step, i)=> {
          return (
            <li key={step.props.title ?? "Success Page"} className={itemClass(i)}> 
              <span>{i + 1}</span>
            </li>)
        })
      }
    </ul>
  )
}

export default React.memo(StepsViewBar);