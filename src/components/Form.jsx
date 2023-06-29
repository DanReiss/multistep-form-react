import React, {useContext, useEffect, useState } from "react";

import FormContext from "../context/FormContext";
import StepsViewBar from "./StepsViewBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function Form(props) {

    const {formData, setFormData} = useContext(FormContext);
    const {handleSubmit, reset, setCurrentErrors} = props.formControl;

    useEffect(()=> {
        setInitialValues();
    },[]);

    function setInitialValues() {
        const stepInitialData = (stepValues, formData) => {
            let initialValues = {};

            for(let item in stepValues){
                if(formData[item]){
                    initialValues[item] = formData[item]
                }
            }
            return initialValues;
        }

        reset(stepValues => stepInitialData(stepValues, formData))
    }

    function onSubmitStep(data) {
      props.stepSchema
      .validate(data, { abortEarly: false})
      .then(resData => {
          setFormData({...formData, ...resData})
          if(props.lastStepSubmit) {
            props.lastStepSubmit();
          }
          props.changeStep("next")
      })
      .catch(err => {
          let errObj = {};
          for(let errEl of err.inner){
              errObj[errEl.path] = errEl.message
          }
          
          setCurrentErrors(errObj)
      });
    };

    function onBackStep() {
      props.changeStep("back");
    }

    return (
      <div className="form_wrapper">
          <h2>{props.title}</h2>
          <StepsViewBar stepsMap={props.stepsMap}></StepsViewBar>
          <section className="form_container">
              <form onSubmit={handleSubmit(onSubmitStep)}>
                  {props.children}

                  <div className="form_buttons_box">
                        {
                        props.isFirstStep
                        ?
                        <button type="button" className="invisible"></button>
                        :
                        <button type="button" onClick={onBackStep}>
                            <span>
                            <FontAwesomeIcon icon={faArrowLeftLong}/>
                            </span>
                            <span className="d_none">Back</span>
                        </button>
                        }                
                        <button aria-label="next step" className={props.isLastStep? "submit_btn" : "next_btn"} type="submit">
                            <span>
                                <FontAwesomeIcon icon={faArrowRightLong}/>
                            </span>
                            <span className="d_none">Next</span>
                        </button>
                    </div>
              </form>
          </section>
      </div>
    );
}


export default Form;