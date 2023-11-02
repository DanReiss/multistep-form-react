import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as Yup from "yup";
import Form from "./Form";
import InputItem from "./InputItem";
import InputRadio from "./InputRadio";

function MeasurementsForm({
		changeStep, 
		stepsMap,  
		title,
		onSubmit,
		setVisualEl,
	}) {
    const {register, handleSubmit, reset} = useFormContext();
    const [currentErrors, setCurrentErrors] = useState();

		useEffect(()=> {
			setVisualEl(["waves"]);
		},[]);

    const stepSchema = Yup.object().shape({
			weight: Yup.string()
				.required("Please, tip your weight")
				.matches(/^[0-9]{2,3}$/ , 'Please, tip a valid weight'),
			height: Yup.string()
				.required("Please, tip your height")
				.matches(/^[0-9]{2,3}$/ , 'Please, tip a valid height'),
			age: Yup.string()
				.required("Age is required")
				.matches(/^[0-9]{1,3}$/ , 'Please, tip a valid age'),
			activitylevel: Yup.string()
				.required("Activity Level is required"),
			objective: Yup.string()
				.required("Objective is required")
    });

		const objectiveOptions = [
			{value: "lose", label: "Lose Weight"},
			{value: "maintain", label: "Maintain Weight"},
			{value: "gain", label: "Gain Weight"}
		]

	return (
		<Form
			changeStep={changeStep}
			formControl={{ handleSubmit, reset, setCurrentErrors }}
			lastStepSubmit={onSubmit}
			title={title}
			stepSchema={stepSchema}
			stepsMap={stepsMap}
		>
			<InputItem name="weight" type="number" label="Weight(kg)" placeholder="83kg" error={currentErrors} />
			<InputItem name="height" type="number" label="Height(cm)" placeholder="175cm" error={currentErrors} />
			<InputItem name="age" type="number" label="Age" placeholder="33 years old" error={currentErrors} />
			<InputRadio options={objectiveOptions} label="Objective" name="objective"/>
			<div className="input_box select_box">
				<label htmlFor="activitylevel">Activity Level</label>
				<select name="activitylevel" defaultValue="" {...register("activitylevel")}>
					<option disabled value="">Choose a level</option>
					<option value="sedentary">Sedentary</option>
					<option value="light">Lightly Active</option>
					<option value="moderate">Moderately Active</option>
					<option value="very">Very Active</option>
					<option value="extreme">Extremely Active</option>
				</select>
			</div>
		</Form>
	)
};

export default MeasurementsForm;