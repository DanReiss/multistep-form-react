import React, { useState } from "react";

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function InputItem({
		type = "text", 
    name, 
    label, 
    placeholder, 
    register, 
    currentErrors:  error}) {
	const [passwordShow, setPasswordShow] = useState(false);

	function changePasswordVisibility() {
		setPasswordShow(oldState => !oldState);
	};

	if(type === "password") {
		return(
			<div key={name} className="input_box">
				<label htmlFor={name}>{label}</label>
				<div className="input_password_box">
					<input name={name} type={passwordShow? "text": "password"} placeholder={placeholder} {...register(name)}/>
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
		<div key={name} className="input_box">
			<label htmlFor={name}>{label}</label>
			<input name={name} type={type} placeholder={placeholder} {...register(name)}/>
			<span className="input_warning">
				{error? error[name]: ""}
			</span>
		</div>
	);  
}

export default InputItem;