import React, { useContext, useEffect } from "react";
import FormContext from "../context/FormContext";
import StepsViewBar from "./StepsViewBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function Form({
		formControl,
		stepSchema,
		title,
		lastStepSubmit,
		changeStep,
		stepsMap,
		children
	}) {
	const {formData, setFormData} = useContext(FormContext);
	const {handleSubmit, reset, setCurrentErrors} = formControl;
	const {numberOfSteps, currentStep} = stepsMap();

	useEffect(()=> {
			setInitialValues();
	},[formData]);

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
		stepSchema
		.validate(data, { abortEarly: false})
		.then(resData => {
				setFormData({...formData, ...resData})
				if(lastStepSubmit) {
					lastStepSubmit();
				}
				changeStep("next")
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
		changeStep("back");
	}

	return (
		<div className="form_wrapper">
			<h2>{title}</h2>
			<StepsViewBar stepsMap={stepsMap}/>
			<section className="form_container">
				<form onSubmit={handleSubmit(onSubmitStep)}>
					{children}

					<div className="form_buttons_box">
						{
							currentStep === 0
							? <button type="button" className="invisible"></button>
							:	<button type="button" onClick={onBackStep}>
									<span>
										<FontAwesomeIcon icon={faArrowLeftLong}/>
									</span>
									<span className="d_none">Back</span>
								</button>
						}                
						<button 
							aria-label="next step"
						 	className={
								currentStep === numberOfSteps 
								? "submit_btn" 
								: "next_btn"
							} 
							type="submit"
						>
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