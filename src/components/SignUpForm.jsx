import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Form from "./Form";
import InputItem from "./InputItem";

function SignUpForm({ changeStep, stepsMap, title, ...rest }) {

	const { register, handleSubmit, reset } = useForm();
	const [currentErrors, setCurrentErrors] = useState({});

	const stepSchema = Yup.object().shape({
		email: Yup.string()
			.required("Please, tip your email")
			.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please, tip a valid email'),
		username: Yup.string()
			.required("Please, tip your username")
			.matches(/^\w{4,29}$/, 'Your username must only contain letters, numbers or underscores'),
		password: Yup.string()
			.required("Password is required")
			.min(4, 'Password length should be at least 4 characters')
			.max(12, 'Password cannot exceed more than 12 characters'),
		cpassword: Yup.string()
			.oneOf([Yup.ref("password")], 'Passwords do not match')
			.required('Confirm Password is required')
			.min(4, 'Password length should be at least 4 characters')
			.max(12, 'Password cannot exceed more than 12 characters'),
		agreeterms: Yup.boolean()
			.oneOf([true], 'Check, if you agree with our policies'),
	});

	return (
		<Form
			changeStep={changeStep}
			formControl={{ handleSubmit, reset, setCurrentErrors }}
			isFirstStep={true}
			title={title}
			stepSchema={stepSchema}
			stepsMap={stepsMap}
		>
			<InputItem name="email" type="text" label="Email" placeholder="youremail@gmail.com" register={register} error={currentErrors} />
			<InputItem name="username" type="text" label="Username" placeholder="Username" register={register} error={currentErrors} />
			<InputItem name="password" type="password" label="Password" placeholder="Your password" register={register} error={currentErrors} />
			<InputItem name="cpassword" type="password" label="Confirm Password" placeholder="Confirm password" register={register} error={currentErrors} />

			<div className="input_box input_no_text">
				<div>
					<label className="agree_terms_label" htmlFor="agreeterms">
						<input {...register("agreeterms")} name="agreeterms" type="checkbox" />
						I have read and agree to the Terms of Use and
						<a href="#"> Privacy Policy</a>
					</label>
				</div>
				<span className="input_warning">
					{currentErrors && currentErrors["agreeterms"] ? (
            currentErrors["agreeterms"]
          ) : (
            ""
          )}
				</span>
			</div>
		</Form>
	)
};

export default SignUpForm;