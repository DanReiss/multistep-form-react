import React, { useState } from "react";
import "./styles/index.scss";

import FormContext from "./context/FormContext";
import { useForm } from 'react-hook-form'

import SignUpForm from "./components/SignUpForm";
import PersonalDataForm from "./components/PersonalDataForm";
import MeasurementsForm from "./components/MeasurementsForm";
import FinalFormPage from "./components/FInalFormPage";
import VisualEl from "./components/VisualELement";

function App() {
  const [formData, setFormData] = useState({});
  const [currentVisualEl, setCurrentVisualEl] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const stepsMap = ()=> [steps, currentStep];

  const commonProps = {
    changeStep,
    stepsMap,
  }

  const steps = [
    <SignUpForm {...commonProps} title="Sign Up"/>,
    <PersonalDataForm {...commonProps} title="Personal Data"/>,
    <MeasurementsForm {...commonProps} title="Your Measurements" onSubmit={onSubmitForm}/>,
    <FinalFormPage  stepsMap={stepsMap} username={formData.name} setVisualEl={setCurrentVisualEl}/>
  ];

  function changeStep(changeType) {
    const isNext = changeType === "next";
    const isPrevious = changeType === "back";

    if(isNext && currentStep !== steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    if(isPrevious) {
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
