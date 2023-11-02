import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as Yup from "yup";
import Form from "./Form";
import InputItem from "./InputItem";

function PersonalDataForm({ 
		changeStep,
	 	stepsMap, 
	 	title,
		setVisualEl,	
	}) {
	const { register, handleSubmit, reset } = useFormContext();
	const [currentErrors, setCurrentErrors] = useState();

	useEffect(()=> {
		setVisualEl(["waves"]);
	},[]);

	const stepSchema = Yup.object().shape({
		name: Yup.string()
			.required("Please, tip your name")
			.matches(/^[a-zA-Z]{2,20}$/, 'Please, tip a valid name'),
		lastname: Yup.string()
			.required("Please, tip your last name")
			.matches(/^[a-zA-Z ]{2,20}$/, 'Please, tip a valid last name'),
		birthdate: Yup.string()
			.required("Date of Birth is required"),
		language: Yup.string()
			.required("Language is required")
	});

	return (
		<Form
			changeStep={changeStep}
			formControl={{ handleSubmit, reset, setCurrentErrors }}
			title={title}
			stepSchema={stepSchema}
			stepsMap={stepsMap}
		>
			<InputItem 
				name="name" 
				label="Name" 
				placeholder="Your Name" 
				error={currentErrors}
			/>
			<InputItem 
				name="lastname"  
				label="Last Name" 
				placeholder="Your LastName" 
				error={currentErrors}
			/>
			<InputItem 
				name="birthdate" 
				type="date" 
				label="Date of Birth" 
				error={currentErrors}
			/>
			<div className="input_box input_text_box">
				<label htmlFor="language">Language</label>
				<select name="language"  {...register("language")}>
					<option value="english">English</option>
					<option value="portuguese">Portuguese</option>
					<option value="chinese">Chinese</option>
					<option value="spanish">Spanish</option>
					<option value="french">French</option>
				</select>
			</div>
		</Form>
	)
};

export default PersonalDataForm;