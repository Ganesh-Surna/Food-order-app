import React from "react";

import classes from "./Input.module.css";

const Input=React.forwardRef((props, ref)=>{
    return(
        <div className={classes["input-group"]}>
            <label htmlFor={props.inputObj.id}>{props.label}</label>
            <input ref={ref} {...props.inputObj} />
        </div>
    );
});
export default Input;