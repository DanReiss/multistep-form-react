import React, { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function InputItem({
		type = "text", 
    name, 
    label, 
    placeholder, 
    error
	}) {
	const { register } = useFormContext();
	const [passwordShow, setPasswordShow] = useState(false);
	const boxRef = useRef();

	function changePasswordVisibility() {
		setPasswordShow(oldState => !oldState);
	};

	function handleFocus() {
		if(boxRef.current){
			boxRef.current.classList.add("focused");
		}
	}

	function handleBlur(){
		if(boxRef.current){
			boxRef.current.classList.remove("focused");
		}
	}

	if(type === "password") {
		return(
			<div key={name} className="input_box" ref={boxRef}>
				<label htmlFor={name}>{label}</label>
				<div className="input_password_box">
					<input 
						name={name} 
						type={passwordShow? "text": "password"} 
						placeholder={placeholder} 
						{...register(name)} 
						onFocus={handleFocus} 
						onBlur={handleBlur}
					/>
					<button type="button" aria-label="next step" onClick={changePasswordVisibility}>
						<span>
								<FontAwesomeIcon icon={passwordShow? faEyeSlash: faEye} size="lg" />
						</span>
					</button>
				</div>
				<span className="input_warning">
					{error? error[name]: ""}
				</span>
			</div>
		);
	};

	return (
		<div key={name} className="input_box" ref={boxRef}>
			<label htmlFor={name}>{label}</label>
			<input 
				name={name} 
				type={type} 
				placeholder={placeholder}
				{...register(name)} 
				onFocus={handleFocus} 
				onBlur={handleBlur} 
			/>
			<span className="input_warning">
				{error? error[name]: ""}
			</span>
		</div>
	);  
}

export default InputItem;