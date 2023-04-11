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
    <SignUpForm changeStep={changeStep}/>,
    <PersonalDataForm changeStep={changeStep}/>,
    <MeasurementsForm onSubmit={onSubmitForm} changeStep={changeStep}/>,
    <FinalFormPage username={formData.name} setVisualEl={setCurrentVisualEl}/>
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
