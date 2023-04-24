import React, { useState } from "react";

import {useForm} from "react-hook-form";
import * as Yup from "yup";

import Form from "./Form";
import InputItem from "./InputItem";

function MeasurementsForm({changeStep, stepsMap, onSubmit}) {
    const {register, handleSubmit, reset} = useForm();
    const [currentErrors, setCurrentErrors] = useState();

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

    return (
        <Form
        changeStep={changeStep}
        formControl={{handleSubmit, reset, setCurrentErrors}} 
        lastStepSubmit={onSubmit}
        title="Sign Up" 
        stepSchema={stepSchema}
        stepsMap={stepsMap}>
            
            <InputItem name="weight" type="number" label="Weight(kg)" placeholder="83kg" register={register} error={currentErrors}/>
            <InputItem name="height" type="number" label="Height(cm)" placeholder="175cm" register={register} error={currentErrors}/>
            <InputItem name="age" type="number" label="Age" placeholder="33 years old" register={register} error={currentErrors}/>
            <div className="input_box input_text_box">
                <label htmlFor="activitylevel">Activity Level</label>
                <select name="activitylevel" {...register("activitylevel")}>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="very">Very Active</option>
                    <option value="extreme">Extremely Active</option>
                </select>
            </div>
            <div className="input_box">
                <label>Objective</label>
                <div className="radio_box">
                    <label>
                        <input type="radio" value="lose" {...register("objective")}/>
                        <span>Lose Weight</span>
                    </label>
                    <label>
                        <input type="radio" value="maintain" {...register("objective")}/>
                        <span>Maintain Weight</span>
                    </label>
                    <label>
                        <input type="radio" value="gain" {...register("objective")}/>
                        <span>Gain Weight</span>
                    </label>
                </div>
            </div>
        </Form>
    )
};

export default MeasurementsForm;