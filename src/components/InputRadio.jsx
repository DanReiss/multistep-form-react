import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

function InputRadio({label, options, name, register}){
  const [optionChecked, setOptionChecked] = useState(null);
  const { setValue, getValues } = useFormContext();

  function handleRadioChange(e){
    setOptionChecked(e.target.value);
    setValue(name, e.target.value);
  }

  useEffect(()=>{
    if(getValues(name)){
      setOptionChecked(getValues(name));
    }
  }, [])

  return (
    <div className="input_box">
			<label>{label}</label>
      <div className="radio_box">
        {
          options.map((option)=>{
            return (
              <label key={option.value} className={optionChecked === option.value ? "checked" : ""}>
                <input 
                  type="radio" 
                  value={option.value} 
                  onChange={handleRadioChange} 
                  checked={optionChecked === option.value}
                />
                <span>{option.label}</span>
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default InputRadio