import React, { useState } from "react";
import "./styles/index.scss";

import FormContext from "./context/FormContext";

import SignUpForm from "./components/SignUpForm";
import PersonalDataForm from "./components/PersonalDataForm";
import MeasurementsForm from "./components/MeasurementsForm";
import FinalFormPage from "./components/FInalFormPage";
import VisualEl from "./components/VisualELement";

function App() {

  const [formData, setFormData] = useState({});
  const [currentVisualEl, setCurrentVisualEl] = useState();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <SignUpForm changeStep={changeStep} stepsMap={stepsMap}/>,
    <PersonalDataForm changeStep={changeStep} stepsMap={stepsMap}/>,
    <MeasurementsForm onSubmit={onSubmitForm} changeStep={changeStep} stepsMap={stepsMap}/>,
    <FinalFormPage username={formData.name} setVisualEl={setCurrentVisualEl} stepsMap={stepsMap}/>
  ];

  function changeStep(changeType) {
    if(changeType === "next") {

      if(currentStep === steps.length - 1){
        return;
      }else{
        setCurrentStep(currentStep + 1);
      }
      
    };
    
    if(changeType === "back") {
      setCurrentStep(currentStep - 1);
    }
  };

  function onSubmitForm() {
    /* em uma aplicação real, 
    enviaria os dados para o banco de dados */
      console.log(formData)
  };

  function stepsMap() {
    return [steps, currentStep];
  }

  return (
    <div className="App">
      <FormContext.Provider value={{formData, setFormData}}>
        {steps[currentStep]}
      </FormContext.Provider>   
      <VisualEl names={currentVisualEl}/>
    </div>
  )
};

export default App;