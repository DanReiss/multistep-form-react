import React, { useState } from "react";
import "./styles/index.scss";

import FormContext from "./context/FormContext";

import SignUpForm from "./components/SignUpForm";
import PersonalDataForm from "./components/PersonalDataForm";
import MeasurementsForm from "./components/MeasurementsForm";
import FinalFormPage from "./components/FInalFormPage";
import VisualEl from "./components/VisualELement";
import { useForm, FormProvider } from "react-hook-form";

function App() {
  const [formData, setFormData] = useState({});
  const methods = useForm();
  const [currentVisualEl, setCurrentVisualEl] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const stepsMap = ()=> ({
    numberOfSteps: steps.length,
    currentStep
  });

  const commonProps = {
    changeStep,
    stepsMap,
  }

  const steps = [
    <SignUpForm {...commonProps} title="Sign Up" setVisualEl={setCurrentVisualEl}/>,
    <PersonalDataForm {...commonProps} title="Personal Data" setVisualEl={setCurrentVisualEl}/>,
    <MeasurementsForm {...commonProps} title="Your Measurements" onSubmit={onSubmitForm} setVisualEl={setCurrentVisualEl}/>,
    <FinalFormPage  stepsMap={stepsMap} username={formData.name} setVisualEl={setCurrentVisualEl}/>,
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
        <FormProvider {...methods}>
          {steps[currentStep]}
        </FormProvider>
      </FormContext.Provider>   
      <VisualEl names={currentVisualEl}/>
    </div>
  )
};

export default App;
