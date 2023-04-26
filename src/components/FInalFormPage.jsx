import React, { useEffect } from "react";
import StepsViewBar from "./StepsViewBar";

function FinalFormPage({username, setVisualEl, stepsMap}) {

  useEffect(()=> {
    setVisualEl(["balloons"]);
  },[]);

  const SucessMessage = () => {
    return ( 
      <div className="success_message">
        <h2>{`Thanks ${username}!`}</h2>
        <span>You can now login in your account</span>
      </div> 
    );
  };

  return (
    <div className="form_wrapper">
        <StepsViewBar stepsMap={stepsMap}/> 
        <section className="form_container">
            <div className="success_box">
              <SucessMessage/>
              <button className="login_btn" type="button">Login</button>
            </div>
        </section>
    </div>  
  );
};

export default FinalFormPage;