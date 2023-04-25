import React from "react";

function StepsViewBar({stepsMap}){

  const [steps, currentStep] = stepsMap();

  let itemClass = (i) => {
    if(i === currentStep) return "current";
    if(i === currentStep - 1) return "done last_done"
    if(i < currentStep) return "done";
    return ""
  }

  return(
    <ul className="steps_bar">
      {steps
      .map((step, i)=>{

        console.log(step)

        return (
          <li key={i} className={itemClass(i)}> 
            <span>{i + 1}</span>
          </li>)
      })
      }
    </ul>
  )
}

export default StepsViewBar